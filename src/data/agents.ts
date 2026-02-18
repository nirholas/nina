/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Every bug fixed is a lesson learned 🎓
 *
 * Static agent data for the Explore page.
 * All 78 agents organized by group and category.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AgentGroup = "bnb" | "defi";

export type BnbCategory =
  | "DeFi Protocols"
  | "Trading & Exchange"
  | "Staking & Yield"
  | "Development"
  | "Security & Analytics"
  | "Infrastructure"
  | "News & Intel"
  | "Ecosystem";

export type DefiCategory =
  | "Yield & Farming"
  | "Risk & Security"
  | "Trading & MEV"
  | "Analysis & Intel"
  | "Education"
  | "Portfolio";

export type AgentCategory = BnbCategory | DefiCategory;

export interface AgentEntry {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tags: string[];
  category: AgentCategory;
  group: AgentGroup;
  mcpCount: number;
}

export interface CategoryInfo {
  name: AgentCategory;
  group: AgentGroup;
  count: number;
}

// ---------------------------------------------------------------------------
// BNB Chain Agents (30)
// ---------------------------------------------------------------------------

const bnbAgents: AgentEntry[] = [
  // ── DeFi Protocols ──
  {
    id: "pancakeswap-expert",
    title: "PancakeSwap Expert",
    description: "Expert in PancakeSwap DEX — swaps, farming, V3 liquidity, CAKE staking with live MCP data on BNB Chain",
    emoji: "🥞",
    tags: ["bnb-chain", "pancakeswap", "dex", "farming", "liquidity", "defi"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "venus-protocol-expert",
    title: "Venus Protocol Expert",
    description: "Expert in Venus Protocol lending, borrowing, XVS staking, and liquidation risk management with live MCP data",
    emoji: "♀️",
    tags: ["bnb-chain", "venus", "lending", "borrowing", "defi", "liquidation"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "thena-dex-expert",
    title: "Thena DEX Expert",
    description: "Expert in Thena ve(3,3) DEX — concentrated liquidity, veTHE voting, bribes with live MCP data",
    emoji: "⚡",
    tags: ["bnb-chain", "thena", "dex", "ve33", "liquidity", "defi"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "lista-dao-expert",
    title: "Lista DAO Expert",
    description: "Expert in Lista DAO — slisBNB liquid staking, lisUSD CDPs, veLISTA governance with live MCP data",
    emoji: "🏛️",
    tags: ["bnb-chain", "lista", "liquid-staking", "stablecoin", "defi", "governance"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "alpaca-finance-expert",
    title: "Alpaca Finance Expert",
    description: "Expert in Alpaca Finance — leveraged yield farming, Automated Vaults, and lending on BNB Chain",
    emoji: "🦙",
    tags: ["bnb-chain", "alpaca", "yield-farming", "leverage", "defi", "vaults"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bnb-defi-aggregator",
    title: "BNB DeFi Aggregator",
    description: "Aggregates and compares ALL DeFi yields across 50+ BSC protocols with live MCP data",
    emoji: "🧮",
    tags: ["bnb-chain", "defi", "aggregator", "yield", "comparison", "tvl"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 5,
  },
  {
    id: "bnb-crosschain-bridge",
    title: "BNB Cross-Chain Bridge Expert",
    description: "Expert in cross-chain bridging — compares all routes to/from BSC and opBNB with live MCP data",
    emoji: "🌉",
    tags: ["bnb-chain", "bridge", "cross-chain", "layerzero", "stargate", "defi"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "bnb-rwa-stablecoin-expert",
    title: "BNB RWA & Stablecoin Expert",
    description: "Expert in Real-World Assets and stablecoins on BNB Chain — FDUSD, lisUSD, tokenized treasuries, and de-peg risk",
    emoji: "🏦",
    tags: ["bnb-chain", "rwa", "stablecoin", "fdusd", "yield", "defi"],
    category: "DeFi Protocols",
    group: "bnb",
    mcpCount: 3,
  },

  // ── Trading & Exchange ──
  {
    id: "binance-spot-trader",
    title: "Binance Spot Trader",
    description: "Expert in Binance spot trading with 478+ live MCP tools — prices, orderbooks, Earn products, and account security",
    emoji: "💹",
    tags: ["binance", "trading", "spot", "earn", "exchange", "launchpad"],
    category: "Trading & Exchange",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "binance-futures-expert",
    title: "Binance Futures Expert",
    description: "Expert in Binance Futures — perpetuals, leverage, funding rates, risk management with live MCP data",
    emoji: "📈",
    tags: ["binance", "futures", "leverage", "perpetual", "trading", "risk"],
    category: "Trading & Exchange",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "binance-copy-trading",
    title: "Binance Copy Trading",
    description: "Expert in Binance Copy Trading — lead trader analysis, risk management, and portfolio allocation for spot and futures",
    emoji: "👥",
    tags: ["binance", "copy-trading", "trading", "risk", "portfolio", "automation"],
    category: "Trading & Exchange",
    group: "bnb",
    mcpCount: 2,
  },
  {
    id: "binance-margin-expert",
    title: "Binance Margin Expert",
    description: "Expert in Binance margin trading — cross/isolated margin, leverage optimization, liquidation prevention",
    emoji: "📈",
    tags: ["binance", "margin", "leverage", "trading", "risk-management"],
    category: "Trading & Exchange",
    group: "bnb",
    mcpCount: 3,
  },

  // ── Staking & Yield ──
  {
    id: "bnb-staking-advisor",
    title: "BNB Staking Advisor",
    description: "Expert in BNB staking — native delegation, liquid staking (slisBNB, BNBx, ankrBNB), and DeFi composability",
    emoji: "🥩",
    tags: ["bnb-chain", "staking", "liquid-staking", "validator", "delegation", "yield"],
    category: "Staking & Yield",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "bnb-liquid-staking",
    title: "BNB Liquid Staking Optimizer",
    description: "Compares ALL BNB liquid staking derivatives — slisBNB, BNBx, ankrBNB, and more with live MCP data",
    emoji: "💧",
    tags: ["bnb-chain", "liquid-staking", "staking", "slisBNB", "BNBx", "defi"],
    category: "Staking & Yield",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "binance-earn-specialist",
    title: "Binance Earn Specialist",
    description: "Expert in Binance Earn products — Simple Earn, BNB Vault, Launchpool, Dual Investment, and staking",
    emoji: "💰",
    tags: ["binance", "earn", "staking", "yield", "launchpool", "savings"],
    category: "Staking & Yield",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "binance-earn-advisor",
    title: "Binance Earn Advisor",
    description: "Expert in Binance Earn products with live MCP rate data — Simple Earn, BNB Vault, Launchpool, staking, DCA",
    emoji: "🏦",
    tags: ["binance", "earn", "staking", "yield", "savings", "launchpool"],
    category: "Staking & Yield",
    group: "bnb",
    mcpCount: 4,
  },

  // ── Development ──
  {
    id: "bsc-developer",
    title: "BSC Developer",
    description: "Expert in BNB Chain smart contract development — Solidity, Hardhat, Foundry, deployment, and BSCScan verification",
    emoji: "👨‍💻",
    tags: ["bnb-chain", "solidity", "hardhat", "development", "smart-contracts", "bscscan"],
    category: "Development",
    group: "bnb",
    mcpCount: 2,
  },
  {
    id: "bnb-agent-builder",
    title: "BNB Agent Builder",
    description: "Build custom AI agents for BNB Chain — generate agent definitions, connect MCP servers, and deploy to the toolkit",
    emoji: "🏗️",
    tags: ["bnb-chain", "agent-builder", "mcp", "developer", "tooling", "ai"],
    category: "Development",
    group: "bnb",
    mcpCount: 1,
  },
  {
    id: "bnb-token-launcher",
    title: "BNB Token Launcher",
    description: "Launch tokens on BNB Chain — tokenomics design, BEP-20 deployment, PancakeSwap liquidity, and security",
    emoji: "🚀",
    tags: ["bnb-chain", "token-launch", "bep20", "pancakeswap", "liquidity", "deployment"],
    category: "Development",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "opbnb-l2-expert",
    title: "opBNB L2 Expert",
    description: "Expert in opBNB Layer 2 — sub-cent transactions, bridging, deployment with live MCP chain data",
    emoji: "🚀",
    tags: ["opbnb", "layer2", "bnb-chain", "rollup", "scaling", "bridge"],
    category: "Development",
    group: "bnb",
    mcpCount: 3,
  },

  // ── Security & Analytics ──
  {
    id: "bsc-security-auditor",
    title: "BSC Security Auditor",
    description: "Expert in BNB Chain smart contract security — vulnerability detection, rug-pull analysis, and DeFi exploit prevention",
    emoji: "🛡️",
    tags: ["bnb-chain", "security", "audit", "vulnerability", "exploit", "defi"],
    category: "Security & Analytics",
    group: "bnb",
    mcpCount: 2,
  },
  {
    id: "bsc-whale-tracker",
    title: "BSC Whale Tracker",
    description: "Tracks whale movements, smart money flows, and exchange activity on BNB Chain with live MCP tools",
    emoji: "🐋",
    tags: ["bnb-chain", "whale", "analytics", "tracking", "smart-money", "onchain"],
    category: "Security & Analytics",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bscscan-analytics",
    title: "BSCScan Analytics",
    description: "BSCScan explorer expert — transaction analysis, contract verification, whale tracking with 175+ live MCP tools",
    emoji: "🔍",
    tags: ["bscscan", "bnb-chain", "analytics", "explorer", "whale", "contract"],
    category: "Security & Analytics",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bsc-mev-gas-expert",
    title: "BSC MEV & Gas Expert",
    description: "Expert in BSC gas optimization, MEV protection, and transaction debugging with live MCP chain data",
    emoji: "⛽",
    tags: ["bnb-chain", "gas", "mev", "optimization", "transactions", "security"],
    category: "Security & Analytics",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bep20-token-analyst",
    title: "BEP-20 Token Analyst",
    description: "BEP-20 token analysis, security scanning, rug-pull detection with live GoPlus + MCP tools on BNB Chain",
    emoji: "🪙",
    tags: ["bnb-chain", "bep20", "token", "security", "audit", "solidity"],
    category: "Security & Analytics",
    group: "bnb",
    mcpCount: 3,
  },

  // ── Infrastructure ──
  {
    id: "bnb-bridge-expert",
    title: "BNB Bridge Expert",
    description: "Expert in cross-chain bridges — BSC ↔ opBNB ↔ Ethereum bridging, fee optimization, and security assessment",
    emoji: "🌉",
    tags: ["bnb-chain", "bridge", "cross-chain", "layerzero", "opbnb", "defi"],
    category: "Infrastructure",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "bnb-greenfield-expert",
    title: "BNB Greenfield Expert",
    description: "Expert in BNB Greenfield decentralized storage — data marketplace, programmable ownership, BSC integration",
    emoji: "🌿",
    tags: ["greenfield", "bnb-chain", "storage", "decentralized", "data", "nft"],
    category: "Infrastructure",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bnb-governance-expert",
    title: "BNB Governance Expert",
    description: "Expert in BNB Chain governance — BEP proposals, validator voting, protocol DAOs, and BNB tokenomics",
    emoji: "🏛️",
    tags: ["bnb-chain", "governance", "dao", "voting", "bep", "tokenomics"],
    category: "Infrastructure",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bnb-gaming-expert",
    title: "BNB Gaming Expert",
    description: "Expert in BNB Chain GameFi — play-to-earn games, gaming NFTs, opBNB gaming, and game development",
    emoji: "🎮",
    tags: ["bnb-chain", "gaming", "gamefi", "play-to-earn", "nft", "opbnb"],
    category: "Infrastructure",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "bsc-portfolio-tracker",
    title: "BSC Portfolio Tracker",
    description: "Track and analyze your entire BNB Chain DeFi portfolio — positions, P&L, risk metrics, and liquidation alerts",
    emoji: "📊",
    tags: ["bnb-chain", "portfolio", "tracking", "defi", "analytics", "risk"],
    category: "Infrastructure",
    group: "bnb",
    mcpCount: 3,
  },

  // ── News & Intel ──
  {
    id: "bnb-chain-news-alpha",
    title: "BNB Chain News & Alpha",
    description: "Real-time BNB Chain news, alpha hunting, social sentiment with live MCP tools and on-chain verification",
    emoji: "📰",
    tags: ["bnb-chain", "news", "alpha", "sentiment", "social", "trading"],
    category: "News & Intel",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "bnb-chain-expert",
    title: "BNB Chain Expert",
    description: "The definitive BNB Smart Chain specialist — architecture, DeFi, staking, development, powered by 175+ MCP tools",
    emoji: "⛓️",
    tags: ["bnb-chain", "bsc", "blockchain", "ecosystem", "staking", "development"],
    category: "News & Intel",
    group: "bnb",
    mcpCount: 6,
  },
  {
    id: "binance-launchpad-analyst",
    title: "Binance Launchpad Analyst",
    description: "Expert in Binance Launchpad, Launchpool, Megadrop — new token launches, ROI analysis, and participation strategies",
    emoji: "🚀",
    tags: ["binance", "launchpad", "launchpool", "megadrop", "ido", "token-launch"],
    category: "News & Intel",
    group: "bnb",
    mcpCount: 3,
  },

  // ── Ecosystem ──
  {
    id: "bnb-nft-expert",
    title: "BNB NFT Expert",
    description: "Expert in BNB Chain NFTs — BEP-721/1155 creation, marketplace analysis, gaming NFTs, and NFT-Fi on BSC and opBNB",
    emoji: "🎨",
    tags: ["bnb-chain", "nft", "bep721", "marketplace", "gaming", "art"],
    category: "Ecosystem",
    group: "bnb",
    mcpCount: 3,
  },
  {
    id: "binance-web3-wallet",
    title: "Binance Web3 Wallet Expert",
    description: "Expert in Binance Web3 Wallet — MPC security, DApp browser, swaps, yields, and airdrop hunting",
    emoji: "👛",
    tags: ["binance", "web3", "wallet", "mpc", "self-custody", "dapp"],
    category: "Ecosystem",
    group: "bnb",
    mcpCount: 4,
  },
  {
    id: "cz-binance",
    title: "CZ — Binance Founder",
    description: "AI agent embodying CZ's philosophy, BUIDL mentality, Binance insights, and BNB Chain vision with live MCP data",
    emoji: "🔶",
    tags: ["cz", "binance", "bnb-chain", "leadership", "crypto", "buidl"],
    category: "Ecosystem",
    group: "bnb",
    mcpCount: 3,
  },
];

// ---------------------------------------------------------------------------
// DeFi Agents (42)
// ---------------------------------------------------------------------------

const defiAgents: AgentEntry[] = [
  // ── Yield & Farming ──
  {
    id: "defi-yield-farmer",
    title: "DeFi Yield Farming Strategist",
    description: "Identify and optimize yield farming opportunities across DeFi protocols",
    emoji: "🚜",
    tags: ["defi", "yield-farming", "apy", "strategy", "optimization"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "staking-rewards-calculator",
    title: "Staking Rewards Calculator",
    description: "Calculate and optimize staking rewards across protocols",
    emoji: "💰",
    tags: ["staking", "rewards", "calculator", "pos", "yields"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "yield-sustainability-analyst",
    title: "DeFi Yield Sustainability Analyst",
    description: "Analyze whether high yields are sustainable or temporary",
    emoji: "🔬",
    tags: ["defi", "yield", "sustainability", "analysis", "tokenomics"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "yield-dashboard-builder",
    title: "Personal DeFi Dashboard Builder",
    description: "Design and track your custom DeFi portfolio dashboard",
    emoji: "📊",
    tags: ["dashboard", "tracking", "portfolio", "analytics", "monitoring"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "liquidity-pool-analyzer",
    title: "Liquidity Pool Deep Analyzer",
    description: "Analyze LP pool health, risks, and optimal entry/exit timing",
    emoji: "🏊",
    tags: ["defi", "liquidity-pools", "amm", "analysis", "risk"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-yield-aggregator",
    title: "Sperax Yield Aggregator",
    description: "Find and optimize best yield opportunities in Sperax ecosystem",
    emoji: "🌾",
    tags: ["sperax", "yield", "farming", "optimization", "apy"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-liquidity-strategist",
    title: "Sperax Liquidity Provider Strategist",
    description: "Optimize liquidity provision strategies across Sperax pools",
    emoji: "💧",
    tags: ["sperax", "liquidity", "amm", "yield-farming", "impermanent-loss"],
    category: "Yield & Farming",
    group: "defi",
    mcpCount: 0,
  },

  // ── Risk & Security ──
  {
    id: "liquidation-risk-manager",
    title: "Liquidation Risk Manager",
    description: "Monitor and manage liquidation risks in lending protocols",
    emoji: "⚠️",
    tags: ["lending", "liquidation", "risk", "collateral", "defi"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "defi-risk-scoring-engine",
    title: "DeFi Protocol Risk Scoring Engine",
    description: "Comprehensive risk assessment framework for DeFi protocols",
    emoji: "⚖️",
    tags: ["risk", "assessment", "scoring", "analysis", "framework"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "smart-contract-auditor",
    title: "Smart Contract Security Auditor",
    description: "Review and assess smart contract security for DeFi protocols",
    emoji: "🔍",
    tags: ["security", "smart-contracts", "audit", "solidity", "risk"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "bridge-security-analyst",
    title: "Cross-Chain Bridge Security Analyst",
    description: "Evaluate bridge security and recommend safest cross-chain routes",
    emoji: "🌉",
    tags: ["bridge", "security", "cross-chain", "risk", "multichain"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "wallet-security-advisor",
    title: "Crypto Wallet Security Advisor",
    description: "Best practices for securing crypto wallets and assets",
    emoji: "🔐",
    tags: ["security", "wallet", "safety", "best-practices", "hardware"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "defi-insurance-advisor",
    title: "DeFi Insurance & Risk Coverage Advisor",
    description: "Navigate DeFi insurance options for smart contract protection",
    emoji: "🛡️",
    tags: ["insurance", "protection", "risk", "coverage", "safety"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "mev-protection-advisor",
    title: "MEV Protection Advisor",
    description: "Protect users from front-running, sandwich attacks, and MEV exploitation",
    emoji: "🛡️",
    tags: ["mev", "security", "front-running", "flashbots", "protection"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-risk-monitor",
    title: "Sperax Protocol Risk Monitor",
    description: "Track and analyze security risks across Sperax smart contracts",
    emoji: "🛡️",
    tags: ["sperax", "security", "risk", "audit", "monitoring"],
    category: "Risk & Security",
    group: "defi",
    mcpCount: 0,
  },

  // ── Trading & MEV ──
  {
    id: "dex-aggregator-optimizer",
    title: "DEX Aggregator Route Optimizer",
    description: "Find optimal swap routes across DEX aggregators",
    emoji: "🔀",
    tags: ["dex", "swap", "routing", "aggregator", "optimization"],
    category: "Trading & MEV",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "gas-optimization-expert",
    title: "Gas Cost Optimization Expert",
    description: "Minimize gas costs and optimize transaction timing",
    emoji: "⛽",
    tags: ["ethereum", "gas", "optimization", "layer-2", "efficiency"],
    category: "Trading & MEV",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "airdrop-hunter",
    title: "DeFi Airdrop Hunter",
    description: "Identify and strategize for potential protocol airdrops",
    emoji: "🪂",
    tags: ["airdrop", "rewards", "strategy", "farming", "allocation"],
    category: "Trading & MEV",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "impermanent-loss-calculator",
    title: "Impermanent Loss Calculator",
    description: "Calculate and explain impermanent loss scenarios for LP positions",
    emoji: "📉",
    tags: ["defi", "liquidity", "impermanent-loss", "calculator", "amm"],
    category: "Trading & MEV",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "nft-liquidity-advisor",
    title: "NFT Liquidity & Lending Advisor",
    description: "Navigate NFT-backed lending and liquidity solutions",
    emoji: "🎨",
    tags: ["nft", "liquidity", "lending", "collateral", "defi"],
    category: "Trading & MEV",
    group: "defi",
    mcpCount: 0,
  },

  // ── Analysis & Intel ──
  {
    id: "protocol-revenue-analyst",
    title: "Protocol Revenue & Fundamentals Analyst",
    description: "Analyze DeFi protocol business models and revenue generation",
    emoji: "💼",
    tags: ["defi", "revenue", "analysis", "fundamentals", "tokenomics"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "protocol-treasury-analyst",
    title: "DAO Treasury & Resource Analyst",
    description: "Analyze DAO treasury holdings, runway, and capital allocation",
    emoji: "💎",
    tags: ["treasury", "dao", "capital", "runway", "allocation"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "whale-watcher",
    title: "Crypto Whale Watcher",
    description: "Track and analyze large wallet movements and whale behavior",
    emoji: "🐋",
    tags: ["on-chain", "whale", "analytics", "trading", "monitoring"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "narrative-trend-analyst",
    title: "Crypto Narrative & Trend Analyst",
    description: "Track and analyze dominant narratives and trends in crypto markets",
    emoji: "📈",
    tags: ["narrative", "trends", "analysis", "sentiment", "market-cycles"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "alpha-leak-detector",
    title: "Crypto Alpha & Signal Detector",
    description: "Identify trading alpha and early signals in DeFi markets",
    emoji: "🎯",
    tags: ["alpha", "trading", "signals", "research", "opportunities"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "crypto-news-analyst",
    title: "Crypto News Analyst",
    description: "Aggregate and analyze breaking crypto news from major publications",
    emoji: "📰",
    tags: ["news", "analysis", "market", "research", "sentiment"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "governance-proposal-analyst",
    title: "DAO Governance Proposal Analyst",
    description: "Analyze and explain DAO governance proposals and their implications",
    emoji: "🏛️",
    tags: ["governance", "dao", "voting", "proposals", "analysis"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "spa-tokenomics-analyst",
    title: "SPA Tokenomics Analyst",
    description: "Expert in SPA token economics, staking rewards, and protocol revenue",
    emoji: "📊",
    tags: ["sperax", "spa", "tokenomics", "staking", "governance"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-governance-guide",
    title: "Sperax Governance Guide",
    description: "Navigate Sperax DAO proposals, voting, and protocol upgrades",
    emoji: "🗳️",
    tags: ["sperax", "governance", "dao", "voting", "proposals"],
    category: "Analysis & Intel",
    group: "defi",
    mcpCount: 0,
  },

  // ── Education ──
  {
    id: "defi-onboarding-mentor",
    title: "DeFi Beginner Onboarding Mentor",
    description: "Guide complete beginners through their first DeFi experiences",
    emoji: "🎓",
    tags: ["education", "beginner", "onboarding", "tutorial", "defi-basics"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "apy-vs-apr-educator",
    title: "APY vs APR Educator",
    description: "Explain and calculate the difference between APY and APR in DeFi",
    emoji: "📈",
    tags: ["defi", "education", "apy", "apr", "yields"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "defi-protocol-comparator",
    title: "DeFi Protocol Comparison Expert",
    description: "Compare similar DeFi protocols across features, risks, and yields",
    emoji: "⚖️",
    tags: ["defi", "comparison", "protocols", "analysis", "research"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "stablecoin-comparator",
    title: "Stablecoin Deep Comparator",
    description: "Compare stablecoin mechanisms, risks, and use cases",
    emoji: "🪙",
    tags: ["stablecoin", "usdc", "dai", "usdt", "comparison"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "layer-2-comparison-guide",
    title: "Layer 2 Comparison Guide",
    description: "Compare Ethereum L2 solutions: Arbitrum, Optimism, Base, zkSync",
    emoji: "⚡",
    tags: ["layer-2", "scaling", "arbitrum", "optimism", "ethereum"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "usds-stablecoin-expert",
    title: "USDs Stablecoin Expert",
    description: "Specialist in Sperax USDs mechanism, collateralization, and yield strategies",
    emoji: "💵",
    tags: ["sperax", "stablecoin", "usds", "defi", "yield"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-onboarding-guide",
    title: "Sperax Ecosystem Onboarding Guide",
    description: "Help newcomers understand and start using Sperax protocol",
    emoji: "🎓",
    tags: ["sperax", "education", "onboarding", "beginner", "tutorial"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-bridge-assistant",
    title: "Sperax Bridge Assistant",
    description: "Guide users through cross-chain bridging with optimal routes and costs",
    emoji: "🌉",
    tags: ["sperax", "bridge", "cross-chain", "arbitrum", "layer-2"],
    category: "Education",
    group: "defi",
    mcpCount: 0,
  },

  // ── Portfolio ──
  {
    id: "portfolio-rebalancing-advisor",
    title: "DeFi Portfolio Rebalancing Advisor",
    description: "Optimize portfolio allocation and rebalancing strategies",
    emoji: "⚖️",
    tags: ["portfolio", "rebalancing", "allocation", "strategy", "optimization"],
    category: "Portfolio",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "crypto-tax-strategist",
    title: "Crypto Tax Strategy Advisor",
    description: "Optimize crypto taxes and provide tax-efficient DeFi strategies",
    emoji: "📋",
    tags: ["tax", "strategy", "accounting", "optimization", "compliance"],
    category: "Portfolio",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "token-unlock-tracker",
    title: "Token Unlock Schedule Tracker",
    description: "Monitor and analyze token unlock events and their market impact",
    emoji: "🔓",
    tags: ["tokenomics", "unlocks", "vesting", "supply", "analysis"],
    category: "Portfolio",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "vespa-optimizer",
    title: "veSPA Lock Optimizer",
    description: "Maximize returns through optimal veSPA locking strategies",
    emoji: "🔒",
    tags: ["sperax", "vespa", "staking", "optimization", "voting-power"],
    category: "Portfolio",
    group: "defi",
    mcpCount: 0,
  },
  {
    id: "sperax-portfolio-tracker",
    title: "Sperax Portfolio Tracker",
    description: "Track and analyze your complete Sperax ecosystem holdings",
    emoji: "💼",
    tags: ["sperax", "portfolio", "tracking", "analytics", "dashboard"],
    category: "Portfolio",
    group: "defi",
    mcpCount: 0,
  },
];

// ---------------------------------------------------------------------------
// Combined exports
// ---------------------------------------------------------------------------

/** All agents (BNB + DeFi combined) */
export const allAgents: AgentEntry[] = [...bnbAgents, ...defiAgents];

/** All unique categories */
export const allCategories: AgentCategory[] = [
  // BNB
  "DeFi Protocols",
  "Trading & Exchange",
  "Staking & Yield",
  "Development",
  "Security & Analytics",
  "Infrastructure",
  "News & Intel",
  "Ecosystem",
  // DeFi
  "Yield & Farming",
  "Risk & Security",
  "Trading & MEV",
  "Analysis & Intel",
  "Education",
  "Portfolio",
];

/** BNB categories only */
export const bnbCategories: BnbCategory[] = [
  "DeFi Protocols",
  "Trading & Exchange",
  "Staking & Yield",
  "Development",
  "Security & Analytics",
  "Infrastructure",
  "News & Intel",
  "Ecosystem",
];

/** DeFi categories only */
export const defiCategories: DefiCategory[] = [
  "Yield & Farming",
  "Risk & Security",
  "Trading & MEV",
  "Analysis & Intel",
  "Education",
  "Portfolio",
];

/** Category metadata with counts */
export const categoryInfo: CategoryInfo[] = allCategories.map((name) => {
  const agents = allAgents.filter((a) => a.category === name);
  return {
    name,
    group: agents[0]?.group ?? "bnb",
    count: agents.length,
  };
});

/** Get agents filtered by group and/or category */
export function getFilteredAgents(
  group: AgentGroup | "all",
  category: AgentCategory | "all",
  search: string
): AgentEntry[] {
  let results = allAgents;

  if (group !== "all") {
    results = results.filter((a) => a.group === group);
  }
  if (category !== "all") {
    results = results.filter((a) => a.category === category);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
    );
  }

  return results;
}

/** Get categories visible for a given group filter */
export function getCategoriesForGroup(
  group: AgentGroup | "all"
): AgentCategory[] {
  if (group === "all") return allCategories;
  if (group === "bnb") return bnbCategories;
  return defiCategories;
}
