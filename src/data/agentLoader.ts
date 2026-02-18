/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BNB CHAIN AI TOOLKIT — Agent Data Loader
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Loads and parses all 78 agent JSON files from both directories,
 * extracting capabilities, key facts, MCP tools, and system role sections.
 *
 * @module agentLoader
 * @author nich (@nichxbt)
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface SystemRoleSection {
  heading: string;
  content: string;
}

export interface AgentData {
  identifier: string;
  title: string;
  description: string;
  avatar: string;
  tags: string[];
  category: string;
  group: "bnb-chain" | "defi";
  openingMessage: string;
  openingQuestions: string[];
  capabilities: string[];
  keyFacts: string[];
  mcpTools: string[];
  plugins: string[];
  systemRoleSections: SystemRoleSection[];
  createdAt: string;
  relatedAgentIds: string[];
}

/** Raw agent JSON shape from BNB Chain agents */
interface RawAgentJson {
  identifier: string;
  meta: {
    title: string;
    description: string;
    avatar: string;
    tags: string[];
    category: string;
  };
  config: {
    systemRole: string;
    openingMessage?: string;
    openingQuestions?: string[];
    plugins?: string[];
  };
  createdAt?: string;
}

// ── System Role Parser ─────────────────────────────────────────────────────

/**
 * Parse a systemRole string into structured sections.
 * Sections are identified by uppercase headings followed by a colon,
 * e.g. "CAPABILITIES:", "KEY FACTS:", "MCP TOOLS AVAILABLE:"
 */
function parseSystemRoleSections(systemRole: string): SystemRoleSection[] {
  if (!systemRole) return [];

  const sections: SystemRoleSection[] = [];
  // Match lines that are ALL-CAPS headings (with spaces, apostrophes, hyphens)
  // followed by a colon. Use literal space [ ] instead of \s to avoid matching
  // across newlines which would merge separate headings.
  const sectionRegex = /\n([A-Z][A-Z '/\-—().]+):?[ ]*\n/g;

  // Find all heading positions — store both the content-start index and
  // the match-start index so we can compute section boundaries precisely.
  const headings: { heading: string; contentStart: number; matchStart: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = sectionRegex.exec(systemRole)) !== null) {
    headings.push({
      heading: match[1].trim().replace(/:$/, ""),
      contentStart: match.index + match[0].length,
      matchStart: match.index,
    });
  }

  if (headings.length === 0) {
    // No sections found — treat the whole text as a single intro section
    return [{ heading: "Overview", content: systemRole.trim() }];
  }

  // Extract intro text before first section heading
  if (headings[0].matchStart > 0) {
    const intro = systemRole.substring(0, headings[0].matchStart).trim();
    if (intro) {
      sections.push({ heading: "Overview", content: intro });
    }
  }

  // Extract content for each section using adjacent heading boundaries
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].contentStart;
    const end = i < headings.length - 1
      ? headings[i + 1].matchStart
      : systemRole.length;
    const content = systemRole.substring(start, end).trim();
    sections.push({ heading: headings[i].heading, content });
  }

  return sections;
}

/**
 * Extract bullet-point items from a section of text.
 * Handles lines starting with "- " or "• " or "✅ " or "❌ " etc.
 */
function extractBulletItems(text: string): string[] {
  const lines = text.split("\n");
  const items: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines starting with -, •, *, ✅, ❌, or numbered (1.)
    const bulletMatch = trimmed.match(/^[-•*✅❌]\s+(.+)$/);
    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (bulletMatch) {
      items.push(bulletMatch[1].trim());
    } else if (numberedMatch) {
      items.push(numberedMatch[1].trim());
    }
  }
  return items;
}

/**
 * Find a section by heading patterns and extract its bullet items.
 */
function extractSectionItems(
  sections: SystemRoleSection[],
  headingPatterns: string[]
): string[] {
  for (const section of sections) {
    const heading = section.heading.toUpperCase();
    for (const pattern of headingPatterns) {
      if (heading.includes(pattern.toUpperCase())) {
        const items = extractBulletItems(section.content);
        if (items.length > 0) return items;
        // If no bullets, split by newlines and return non-empty lines
        return section.content
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0 && !l.startsWith("#"));
      }
    }
  }
  return [];
}

// ── Agent Processing ───────────────────────────────────────────────────────

function processAgent(
  raw: RawAgentJson,
  group: "bnb-chain" | "defi"
): Omit<AgentData, "relatedAgentIds"> {
  const systemRole = raw.config.systemRole || "";
  const sections = parseSystemRoleSections(systemRole);

  // Extract capabilities
  const capabilities = extractSectionItems(sections, [
    "CAPABILITIES",
    "CAPABILITY",
  ]);

  // Extract key facts
  const keyFacts = extractSectionItems(sections, [
    "KEY FACTS",
    "KEY BSC",
    "KEY ",
    "CORE PRINCIPLES",
    "KNOWLEDGE AREAS",
  ]);

  // Extract MCP tools from sections or plugins
  let mcpTools = extractSectionItems(sections, [
    "MCP TOOLS",
    "MCP TOOL",
    "TOOLS AVAILABLE",
  ]);
  if (mcpTools.length === 0 && raw.config.plugins) {
    mcpTools = [...raw.config.plugins];
  }

  return {
    identifier: raw.identifier,
    title: raw.meta.title,
    description: raw.meta.description,
    avatar: raw.meta.avatar,
    tags: raw.meta.tags || [],
    category: raw.meta.category || "general",
    group,
    openingMessage: raw.config.openingMessage || "",
    openingQuestions: raw.config.openingQuestions || [],
    capabilities,
    keyFacts,
    mcpTools,
    plugins: raw.config.plugins || [],
    systemRoleSections: sections,
    createdAt: raw.createdAt || "",
  };
}

// ── Import ALL Agent JSONs ─────────────────────────────────────────────────
// Using Vite's import.meta.glob for eager loading of JSON files

const bnbChainAgentModules = import.meta.glob<RawAgentJson>(
  "/agents/bnb-chain-agents/*.json",
  { eager: true, import: "default" }
);

const defiAgentModules = import.meta.glob<RawAgentJson>(
  "/agents/defi-agents/src/*.json",
  { eager: true, import: "default" }
);

// Files to skip (templates and manifests)
const SKIP_FILES = new Set([
  "agent-template-full",
  "agent-template",
  "agents-manifest",
]);

// ── Build the Agent Map ────────────────────────────────────────────────────

function buildAgentMap(): Map<string, AgentData> {
  const agentMap = new Map<string, AgentData>();
  const tempAgents: Omit<AgentData, "relatedAgentIds">[] = [];

  // Process BNB Chain agents
  for (const [path, raw] of Object.entries(bnbChainAgentModules)) {
    const filename = path.split("/").pop()?.replace(".json", "") || "";
    if (SKIP_FILES.has(filename)) continue;
    if (!raw?.identifier) continue;
    tempAgents.push(processAgent(raw, "bnb-chain"));
  }

  // Process DeFi agents  
  for (const [, raw] of Object.entries(defiAgentModules)) {
    if (!raw?.identifier) continue;
    tempAgents.push(processAgent(raw, "defi"));
  }

  // Compute related agents for each agent (3-5 with overlapping tags/category)
  for (const agent of tempAgents) {
    const scores: { id: string; score: number }[] = [];

    for (const other of tempAgents) {
      if (other.identifier === agent.identifier) continue;
      let score = 0;

      // Same category = +3
      if (other.category === agent.category) score += 3;

      // Same group = +1
      if (other.group === agent.group) score += 1;

      // Overlapping tags = +1 each
      for (const tag of agent.tags) {
        if (other.tags.includes(tag)) score += 1;
      }

      if (score > 0) {
        scores.push({ id: other.identifier, score });
      }
    }

    // Sort by score descending, pick top 5
    scores.sort((a, b) => b.score - a.score);
    const relatedAgentIds = scores.slice(0, 5).map((s) => s.id);

    agentMap.set(agent.identifier, {
      ...agent,
      relatedAgentIds,
    });
  }

  return agentMap;
}

// ── Singleton ──────────────────────────────────────────────────────────────

let _agentMap: Map<string, AgentData> | null = null;

function getAgentMap(): Map<string, AgentData> {
  if (!_agentMap) {
    _agentMap = buildAgentMap();
  }
  return _agentMap;
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Get a single agent by identifier. Returns undefined if not found.
 */
export function getAgent(id: string): AgentData | undefined {
  return getAgentMap().get(id);
}

/**
 * Get all agents as an array.
 */
export function getAllAgents(): AgentData[] {
  return Array.from(getAgentMap().values());
}

/**
 * Get related agents for a given agent ID.
 * Returns an array of AgentData for the related agents.
 */
export function getRelatedAgents(id: string): AgentData[] {
  const agent = getAgent(id);
  if (!agent) return [];
  return agent.relatedAgentIds
    .map((rid) => getAgent(rid))
    .filter((a): a is AgentData => a !== undefined);
}

/**
 * Get the GitHub URL for an agent's JSON source file.
 */
export function getAgentGitHubUrl(agent: AgentData): string {
  const base = "https://github.com/nirholas/bnb-chain-toolkit/blob/main";
  if (agent.group === "bnb-chain") {
    return `${base}/agents/bnb-chain-agents/${agent.identifier}.json`;
  }
  return `${base}/agents/defi-agents/src/${agent.identifier}.json`;
}
