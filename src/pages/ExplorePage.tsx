/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Every bug fixed is a lesson learned 🎓
 */

import { useState, useMemo } from "react";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  Search,
  Bot,
  Server,
  Wrench,
  ExternalLink,
  Shield,
  Wallet,
  Zap,
  BarChart3,
  Eye,
  Database,
  Terminal,
} from "lucide-react";

type Tab = "agents" | "servers" | "tools";

interface ServerItem {
  name: string;
  description: string;
  toolCount: string;
  language: string;
  highlights: string[];
}

interface ToolItem {
  name: string;
  description: string;
  category: string;
  detail: string;
}

// Agent data for HoverEffect cards
const agentHoverItems = [
  { title: "PancakeSwap Expert", description: "Swap, LP, V3 liquidity, CAKE staking with live MCP data on BNB Chain", link: "#" },
  { title: "Venus Protocol Expert", description: "Lending, borrowing, XVS staking, and liquidation risk management", link: "#" },
  { title: "BNB Staking Advisor", description: "Native delegation, slisBNB, BNBx, ankrBNB liquid staking strategies", link: "#" },
  { title: "BSC Developer", description: "Smart contract development with Solidity, Hardhat, Foundry, and BSCScan verification", link: "#" },
  { title: "BSC Security Auditor", description: "Vulnerability detection, rug-pull analysis, and DeFi exploit prevention", link: "#" },
  { title: "BNB Chain Expert", description: "Architecture, DeFi, staking, development — powered by 175+ MCP tools", link: "#" },
  { title: "opBNB L2 Expert", description: "Sub-cent transactions, bridging, and deployment on opBNB L2", link: "#" },
  { title: "BNB Greenfield Expert", description: "Decentralized storage, data marketplace, and programmable ownership", link: "#" },
  { title: "BSC Whale Tracker", description: "Track large wallet movements, smart money flows, and exchange activity", link: "#" },
  { title: "Lista DAO Expert", description: "slisBNB liquid staking, lisUSD CDPs, and veLISTA governance", link: "#" },
  { title: "Thena DEX Expert", description: "Concentrated liquidity, veTHE voting, and bribes on the ve(3,3) DEX", link: "#" },
  { title: "Alpaca Finance Expert", description: "Leveraged yield farming and Automated Vaults on BNB Chain", link: "#" },
];

// DeFi agents for scrolling marquee
const defiAgentCards = [
  { quote: "Identify and strategize for potential protocol airdrops across DeFi", name: "Airdrop Hunter", title: "DeFi Agent", icon: <Zap className="w-5 h-5" /> },
  { quote: "Protect users from front-running, sandwich attacks, and MEV exploitation", name: "MEV Protection Advisor", title: "DeFi Agent", icon: <Shield className="w-5 h-5" /> },
  { quote: "Calculate and explain impermanent loss scenarios for LP positions", name: "IL Calculator", title: "DeFi Agent", icon: <BarChart3 className="w-5 h-5" /> },
  { quote: "Monitor and manage liquidation risks in lending protocols", name: "Liquidation Risk Manager", title: "DeFi Agent", icon: <Eye className="w-5 h-5" /> },
  { quote: "Find optimal swap routes across DEX aggregators like 1inch and ParaSwap", name: "DEX Route Optimizer", title: "DeFi Agent", icon: <Wrench className="w-5 h-5" /> },
  { quote: "Analyze whether high yields are sustainable or temporary Ponzi dynamics", name: "Yield Analyst", title: "DeFi Agent", icon: <Database className="w-5 h-5" /> },
  { quote: "Comprehensive risk assessment framework for DeFi protocol evaluation", name: "Risk Scoring Engine", title: "DeFi Agent", icon: <Shield className="w-5 h-5" /> },
  { quote: "Track and analyze token unlock events and their market impact", name: "Token Unlock Tracker", title: "DeFi Agent", icon: <BarChart3 className="w-5 h-5" /> },
];

const servers: ServerItem[] = [
  {
    name: "bnbchain-mcp",
    description: "The most comprehensive MCP server for BNB Chain and EVM blockchains",
    toolCount: "150+",
    language: "TypeScript",
    highlights: ["Balances & transfers", "Contract calls", "Token analytics", "GoPlus security", "Gas tracking"],
  },
  {
    name: "binance-mcp",
    description: "478+ tools for Binance.com — the most comprehensive exchange MCP ever built",
    toolCount: "478+",
    language: "TypeScript",
    highlights: ["Spot & Futures trading", "Options & Algo (TWAP, VP)", "Copy Trading", "Simple Earn & Staking", "NFT & Binance Pay"],
  },
  {
    name: "binance-us-mcp",
    description: "Regulated US exchange operations — spot, staking, OTC, and custody",
    toolCount: "120+",
    language: "TypeScript",
    highlights: ["US regulatory compliance", "Spot trading", "Staking & OTC", "Custodial solution"],
  },
  {
    name: "universal-crypto-mcp",
    description: "Universal MCP for 60+ blockchain networks with advanced capabilities",
    toolCount: "380+",
    language: "TypeScript",
    highlights: ["Multi-aggregator DEX", "Aave, Compound, Lido", "LayerZero & Stargate bridges", "x402 Payment Protocol", "AI Service Marketplace"],
  },
  {
    name: "agenti",
    description: "Advanced agent operations for EVM + Solana with cutting-edge integrations",
    toolCount: "380+",
    language: "TypeScript",
    highlights: ["EVM + Solana support", "Flashbots MEV protection", "Wormhole bridges", "x402 payments"],
  },
  {
    name: "ucai",
    description: "Generate custom MCP tools from any smart contract ABI — registered in Anthropic MCP Registry",
    toolCount: "∞",
    language: "Python",
    highlights: ["ABI → MCP generation", "50+ security detections", "Contract Whisperer", "Pro templates (Flash Loans)", "pip install abi-to-mcp"],
  },
];

const tools: ToolItem[] = [
  { name: "Crypto Market Data", description: "Edge Runtime price feeds from CoinGecko and DeFiLlama with smart caching", category: "Market Data", detail: "Zero dependencies, 25 req/min" },
  { name: "Crypto News Aggregator", description: "662K+ articles from 200+ sources with AI sentiment analysis in 42 languages", category: "Market Data", detail: "Free API: cryptocurrency.cv/api/news" },
  { name: "Dust Sweeper", description: "Gasless multi-chain consolidation via ERC-4337 with CoW Protocol MEV protection", category: "DeFi Tools", detail: "8 chains, routes into Aave/Yearn/Beefy" },
  { name: "HD Wallet Generator", description: "BIP-39 mnemonics, BIP-32 derivation, vanity addresses — fully offline", category: "Wallets", detail: "Part of 57-tool wallet toolkit" },
  { name: "Transaction Signer", description: "EIP-191, EIP-712 typed data, legacy + EIP-1559 — sign without network access", category: "Wallets", detail: "V3 keystore encrypt/decrypt" },
  { name: "Offline Wallet HTML", description: "Self-contained offline1.html using official ethereumjs libraries (~500KB)", category: "Wallets", detail: "Zero network dependencies" },
  { name: "ERC-8004 Verifier", description: "Verify agent trust on Ethereum mainnet — Identity, Reputation, and Validation registries", category: "Standards", detail: "Deployed: 0x8004A169..." },
  { name: "W3AG Checker", description: "Web3 accessibility compliance against 50+ success criteria across 3 levels", category: "Standards", detail: "React components included" },
  { name: "Fear & Greed Index", description: "Alternative.me sentiment index integrated into the market data package", category: "Market Data", detail: "Historical + current" },
  { name: "OHLCV Candlestick Data", description: "Historical price data with configurable intervals from CoinGecko", category: "Market Data", detail: "Edge Runtime compatible" },
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>("agents");
  const [search, setSearch] = useState("");

  useSEO({
    title: "Explore",
    description:
      "Discover 72+ AI agents, 6 MCP servers, and 900+ tools in the BNB Chain AI Toolkit.",
    path: "/explore",
  });

  const filteredServers = useMemo(() => {
    if (!search.trim()) return servers;
    const q = search.toLowerCase();
    return servers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return tools;
    const q = search.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [search]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: string }[] = [
    { id: "agents", label: "AI Agents", icon: <Bot className="w-4 h-4" />, count: "72+" },
    { id: "servers", label: "MCP Servers", icon: <Server className="w-4 h-4" />, count: String(filteredServers.length) },
    { id: "tools", label: "Tools & Utilities", icon: <Wrench className="w-4 h-4" />, count: String(filteredTools.length) },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore the Toolkit
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            72+ agents, 6 MCP servers, 900+ tools — browse everything in the
            ecosystem and find exactly what you need.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents, servers, tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 rounded-2xl",
                "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10",
                "focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 focus:border-[#F0B90B]/50",
                "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                "text-gray-900 dark:text-white"
              )}
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === tab.id
                    ? "border-[#F0B90B] text-[#F0B90B]"
                    : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {tab.icon}
                {tab.label}
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          {/* Agents — HoverEffect + Scrolling DeFi Agents */}
          {activeTab === "agents" && (
            <div>
              <h3 className="text-xl font-bold mb-2">BNB Chain Agents</h3>
              <p className="text-sm text-gray-500 mb-4">30 protocol-specific agents with deep integrations</p>
              <HoverEffect items={agentHoverItems} />

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-2">DeFi Agents</h3>
                <p className="text-sm text-gray-500 mb-6">42 cross-protocol agents for analysis, optimization, and protection</p>
                <InfiniteMovingCards
                  items={defiAgentCards}
                  direction="right"
                  speed="slow"
                  pauseOnHover
                />
              </div>

              <div className="text-center pt-10">
                <p className="text-sm text-gray-500">
                  Showing a selection of 72+ total agents.{" "}
                  <a
                    href="https://github.com/nirholas/bnb-chain-toolkit/tree/main/agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F0B90B] hover:underline inline-flex items-center gap-1"
                  >
                    Browse all on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Servers — BackgroundGradient cards with details */}
          {activeTab === "servers" && (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredServers.map((server) => (
                <BackgroundGradient
                  key={server.name}
                  className="rounded-2xl p-6 bg-white dark:bg-black"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="w-5 h-5 text-[#F0B90B] shrink-0" />
                    <h3 className="font-bold">{server.name}</h3>
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                      {server.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {server.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {server.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-3">
                    <span className="text-sm font-bold text-[#F0B90B]">
                      {server.toolCount} tools
                    </span>
                    <a
                      href={`https://github.com/nirholas/bnb-chain-toolkit/tree/main/mcp-servers/${server.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-[#F0B90B] inline-flex items-center gap-1 transition-colors"
                    >
                      View source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </BackgroundGradient>
              ))}
              {filteredServers.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No servers match your search.
                </div>
              )}
            </div>
          )}

          {/* Tools — Rich detail cards */}
          {activeTab === "tools" && (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  className={cn(
                    "rounded-2xl border border-gray-200 dark:border-white/10 p-5",
                    "bg-white dark:bg-black",
                    "hover:border-[#F0B90B]/40 dark:hover:border-white/20 transition-all duration-200"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench className="w-4 h-4 text-[#F0B90B] shrink-0" />
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {tool.description}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {tool.detail}
                  </p>
                </div>
              ))}
              {filteredTools.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No tools match your search.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
