/**
 * Example 01 — Agent Discovery
 *
 * Browse all 72+ AI agents in the toolkit, filter by tag,
 * and inspect their capabilities.
 *
 * Usage:
 *   bun run examples/01-agent-discovery.ts
 *   npx tsx examples/01-agent-discovery.ts
 */

import { readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname ?? ".", "..");

// ── Load all agent definitions ──────────────────────────────────

interface AgentMeta {
  title: string;
  description: string;
  tags: string[];
  avatar?: string;
}

interface Agent {
  identifier: string;
  meta: AgentMeta;
  author?: string;
  homepage?: string;
  schemaVersion?: number;
}

function loadAgents(dir: string): Agent[] {
  const agents: Agent[] = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".json") && !entry.name.includes("template") && !entry.name.includes("manifest") && !entry.name.includes("schema")) {
        const jsonPath = join(dir, entry.name);
        try {
          const raw = readFileSync(jsonPath, "utf-8");
          agents.push(JSON.parse(raw));
        } catch {
          // skip invalid JSON
        }
      } else if (entry.isDirectory()) {
        const jsonPath = join(dir, entry.name, "index.json");
        try {
          const raw = readFileSync(jsonPath, "utf-8");
          agents.push(JSON.parse(raw));
        } catch {
          // skip directories without index.json
        }
      }
    }
  } catch {
    // directory doesn't exist
  }
  return agents;
}

const bnbAgents = loadAgents(join(ROOT, "agents/bnb-chain-agents"));
const defiAgents = loadAgents(join(ROOT, "agents/defi-agents"));
const allAgents = [...bnbAgents, ...defiAgents].filter(
  (a) => a.identifier && a.meta?.title
);

// ── Display Summary ─────────────────────────────────────────────

console.log("╔══════════════════════════════════════════════════╗");
console.log("║   BNB Chain AI Toolkit — Agent Discovery        ║");
console.log("╚══════════════════════════════════════════════════╝\n");

console.log(`Found ${allAgents.length} agents total:`);
console.log(`  • BNB Chain Agents: ${bnbAgents.length}`);
console.log(`  • DeFi Agents:      ${defiAgents.length}\n`);

// ── Collect all tags ────────────────────────────────────────────

const tagCounts = new Map<string, number>();
for (const agent of allAgents) {
  for (const tag of agent.meta?.tags ?? []) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
}

const topTags = [...tagCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

console.log("📊 Top 15 Tags:");
for (const [tag, count] of topTags) {
  const bar = "█".repeat(Math.min(count, 30));
  console.log(`  ${tag.padEnd(20)} ${bar} (${count})`);
}
console.log();

// ── List all agents ─────────────────────────────────────────────

console.log("📋 All Agents:\n");
console.log("  #  Identifier                          Title");
console.log("  ── ──────────────────────────────────── ─────────────────────────────────");

allAgents.forEach((agent, i) => {
  const num = String(i + 1).padStart(2);
  const id = (agent.identifier ?? "unknown").padEnd(40);
  const title = (agent.meta?.title ?? "Untitled").slice(0, 35);
  console.log(`  ${num} ${id} ${title}`);
});

console.log();

// ── Filter demo ─────────────────────────────────────────────────

const filterTag = "bnb-chain";
const filtered = allAgents.filter((a) =>
  a.meta?.tags?.includes(filterTag)
);

console.log(`🔍 Filter by "${filterTag}" tag: ${filtered.length} agents`);
for (const agent of filtered.slice(0, 5)) {
  console.log(`   → ${agent.meta?.title ?? agent.identifier}: ${(agent.meta?.description ?? "").slice(0, 60)}...`);
}
if (filtered.length > 5) {
  console.log(`   ... and ${filtered.length - 5} more\n`);
}

// ── Deep inspect one agent ──────────────────────────────────────

const showcase = allAgents.find((a) => a.identifier === "bnb-chain-expert") ?? allAgents[0];
if (showcase) {
  console.log("\n🔬 Deep Inspect: " + (showcase.meta?.title ?? showcase.identifier));
  console.log("─".repeat(50));
  console.log(`  Identifier:  ${showcase.identifier}`);
  console.log(`  Author:      ${showcase.author ?? "unknown"}`);
  console.log(`  Homepage:    ${showcase.homepage ?? "n/a"}`);
  console.log(`  Tags:        ${showcase.meta?.tags?.join(", ") ?? "none"}`);
  console.log(`  Description: ${showcase.meta?.description ?? "No description"}`);
}

console.log("\n✅ Done! Try editing the filterTag variable to explore more.\n");
