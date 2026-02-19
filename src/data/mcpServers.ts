/**
 * MCP Server & Tool Catalog Data
 * ═══════════════════════════════════════════════════
 * Static data for all 6 MCP servers and 9 standalone tools.
 * Data extracted from each server's README.md.
 *
 * @author nich (@nichxbt)
 * @license MIT
 * @preserve
 */

// ── Interfaces ──────────────────────────────────────────────────────────

export interface ToolCategory {
  name: string;
  count: number;
  tools: string[];
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  language: "TypeScript" | "Python";
  toolCount: string;
  repoPath: string;
  npmPackage?: string;
  features: string[];
  toolCategories: ToolCategory[];
  installCommand: string;
  configSnippet: string;
  chains?: string[];
  highlights: string[];
  httpEndpoint?: string;
}

export interface ToolEntry {
  id: string;
  name: string;
  description: string;
  category: "Market Data" | "DeFi Tools" | "Wallets" | "Standards" | "Packages";
  detail: string;
  repoPath: string;
  featured: boolean;
  icon: string;
}

// ── MCP Servers ─────────────────────────────────────────────────────────

export const mcpServers: MCPServer[] = [
  {
    id: "bnbchain-mcp",
    name: "BNB Chain MCP",
    description:
      "BNB Chain + EVM — balances, transfers, contract calls, GoPlus security, gas tracking",
    longDescription:
      "The most comprehensive Model Context Protocol server for BNB Chain & EVM blockchains. Enable AI agents to interact with BNB Chain, opBNB, and other EVM networks through natural language — covering DeFi, security, market data, and smart contract operations.",
    language: "TypeScript",
    toolCount: "150+",
    repoPath: "mcp-servers/bnbchain-mcp",
    npmPackage: "@nirholas/bnb-chain-mcp",
    features: [
      "Token swaps via 1inch, 0x, ParaSwap DEX aggregators",
      "Cross-chain transfers via LayerZero & Stargate bridges",
      "GoPlus security — honeypot detection, rug pull analysis",
      "Aave & Compound lending positions and borrow rates",
      "CoinGecko & DefiLlama market data and TVL tracking",
      "Flashbots MEV protection and private transactions",
      "ENS/domain registration, transfers, and records",
      "Smart contract deployment, CREATE2, upgradeable proxies",
    ],
    toolCategories: [
      {
        name: "Core Blockchain",
        count: 45,
        tools: [
          "get_chain_info",
          "get_block",
          "get_transaction",
          "send_transaction",
          "estimate_gas",
          "get_balance",
          "call_contract",
        ],
      },
      {
        name: "Token Operations",
        count: 30,
        tools: [
          "get_token_info",
          "get_token_balance",
          "transfer_token",
          "approve_token",
          "get_nft_metadata",
          "transfer_nft",
        ],
      },
      {
        name: "DeFi",
        count: 50,
        tools: [
          "get_swap_quote",
          "execute_swap",
          "add_liquidity",
          "get_lending_rates",
          "supply_to_lending",
          "get_farming_apy",
        ],
      },
      {
        name: "Security",
        count: 15,
        tools: [
          "check_token_security",
          "detect_honeypot",
          "check_rug_pull",
          "get_holder_distribution",
          "screen_address",
        ],
      },
      {
        name: "Market Data",
        count: 25,
        tools: [
          "get_price",
          "get_price_history",
          "get_trending_coins",
          "get_tvl",
          "get_dex_pools",
          "get_social_metrics",
        ],
      },
    ],
    installCommand: "npx -y @nirholas/bnb-chain-mcp@latest",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          "bnb-chain-mcp": {
            command: "npx",
            args: ["-y", "@nirholas/bnb-chain-mcp@latest"],
          },
        },
      },
      null,
      2,
    ),
    chains: [
      "BNB Chain",
      "opBNB",
      "Ethereum",
      "Arbitrum",
      "Polygon",
      "Base",
      "Optimism",
      "Avalanche",
      "Fantom",
    ],
    highlights: [
      "150+ tools",
      "BNB Chain native",
      "GoPlus security",
      "DEX aggregation",
      "DeFi analytics",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/bnbchain-mcp",
  },
  {
    id: "binance-mcp",
    name: "Binance MCP",
    description:
      "Binance.com — spot, futures, options, algo trading, copy trading, earn, staking, NFT, Pay",
    longDescription:
      "The most comprehensive Model Context Protocol server for the Binance exchange — 478+ tools covering the entire Binance.com API. Execute trades, manage portfolios, analyze markets, and automate strategies through natural language with Claude, ChatGPT, or any MCP client.",
    language: "TypeScript",
    toolCount: "478+",
    repoPath: "mcp-servers/binance-mcp",
    npmPackage: "@nirholas/binance-mcp",
    features: [
      "Spot, margin, and futures trading with full order management",
      "USD-M & COIN-M perpetual futures contracts",
      "European-style options and portfolio margin",
      "Algo trading — TWAP, VP algorithms",
      "Simple Earn flexible & locked products",
      "Copy trading — lead trader and copy features",
      "NFT marketplace operations and gift cards",
      "Sub-accounts, mining pools, and fiat on/off ramps",
    ],
    toolCategories: [
      {
        name: "Spot Trading",
        count: 35,
        tools: [
          "get_ticker",
          "place_order",
          "cancel_order",
          "get_open_orders",
          "get_order_book",
        ],
      },
      {
        name: "Futures (USD-M)",
        count: 40,
        tools: [
          "get_futures_position",
          "place_futures_order",
          "set_leverage",
          "get_funding_rate",
        ],
      },
      {
        name: "Futures (COIN-M)",
        count: 35,
        tools: [
          "get_coin_futures_position",
          "place_coin_futures_order",
          "get_coin_funding_rate",
        ],
      },
      {
        name: "Wallet",
        count: 40,
        tools: [
          "get_account_balance",
          "withdraw",
          "get_deposit_history",
          "transfer_between_accounts",
        ],
      },
      {
        name: "Margin Trading",
        count: 41,
        tools: [
          "borrow_margin",
          "repay_margin",
          "get_margin_account",
          "get_margin_pairs",
        ],
      },
      {
        name: "Options",
        count: 27,
        tools: [
          "get_options_info",
          "place_options_order",
          "get_options_positions",
        ],
      },
      {
        name: "Earn & Staking",
        count: 50,
        tools: [
          "get_earn_products",
          "subscribe_earn",
          "get_staking_products",
          "stake_asset",
          "get_auto_invest_plans",
        ],
      },
      {
        name: "Algo Trading",
        count: 11,
        tools: [
          "create_twap_order",
          "create_vp_order",
          "get_algo_orders",
        ],
      },
      {
        name: "Copy Trading",
        count: 10,
        tools: [
          "get_lead_traders",
          "copy_trade",
          "get_copy_positions",
        ],
      },
      {
        name: "Additional Services",
        count: 48,
        tools: [
          "get_mining_stats",
          "get_nft_assets",
          "create_gift_card",
          "get_p2p_ads",
          "get_fiat_orders",
          "send_pay",
          "get_convert_quote",
        ],
      },
    ],
    installCommand: "npm install && npm run build && npm start",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          binance: {
            command: "node",
            args: ["/path/to/Binance-MCP/build/index.js"],
            env: {
              BINANCE_API_KEY: "your_api_key",
              BINANCE_API_SECRET: "your_api_secret",
            },
          },
        },
      },
      null,
      2,
    ),
    highlights: [
      "478+ tools",
      "Full Binance API",
      "Algo trading",
      "Copy trading",
      "Earn & staking",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/binance-mcp",
  },
  {
    id: "binance-us-mcp",
    name: "Binance.US MCP",
    description:
      "Binance.US — spot, staking, OTC, custodial (US regulatory compliant)",
    longDescription:
      "A Model Context Protocol server purpose-built for the US-regulated Binance.US exchange. Access market data, spot trading, wallet management, staking, OTC trading, and custodial solutions — all fully compliant with US SEC and FinCEN regulations.",
    language: "TypeScript",
    toolCount: "120+",
    repoPath: "mcp-servers/binance-us-mcp",
    features: [
      "Real-time prices, order books, trade history, and kline data",
      "Spot trading — limit, market, and stop-limit orders",
      "Wallet deposits, withdrawals, and balance management",
      "Staking products with reward tracking",
      "OTC over-the-counter trading",
      "Sub-account creation and management",
      "Custodial solution API for custody partners",
      "US SEC / FinCEN regulatory compliant",
    ],
    toolCategories: [
      {
        name: "Market Data",
        count: 25,
        tools: [
          "get_ticker_price",
          "get_order_book",
          "get_recent_trades",
          "get_kline_data",
          "get_24hr_stats",
          "get_exchange_info",
        ],
      },
      {
        name: "Spot Trading",
        count: 30,
        tools: [
          "place_order",
          "cancel_order",
          "get_open_orders",
          "get_order_status",
          "get_trade_history",
        ],
      },
      {
        name: "Wallet",
        count: 25,
        tools: [
          "get_balances",
          "get_deposit_address",
          "get_deposit_history",
          "get_withdrawal_history",
          "withdraw_funds",
        ],
      },
      {
        name: "Account & Staking",
        count: 20,
        tools: [
          "get_account_info",
          "get_api_permissions",
          "get_staking_products",
          "stake_asset",
          "get_staking_history",
        ],
      },
      {
        name: "OTC & Sub-Accounts",
        count: 20,
        tools: [
          "get_otc_quote",
          "place_otc_order",
          "create_sub_account",
          "get_sub_account_balances",
        ],
      },
    ],
    installCommand: "npm install && npm run build && npm start",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          "binance-us-mcp": {
            command: "node",
            args: ["/path/to/binance-us-mcp-server/build/index.js"],
            env: {
              BINANCE_US_API_KEY: "your_api_key",
              BINANCE_US_API_SECRET: "your_api_secret",
            },
          },
        },
      },
      null,
      2,
    ),
    highlights: [
      "120+ tools",
      "US compliant",
      "Spot trading",
      "OTC trading",
      "Custodial API",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/binance-us-mcp",
  },
  {
    id: "universal-crypto-mcp",
    name: "Universal Crypto MCP",
    description:
      "Multi-chain — multi-aggregator DEX, Aave, Compound, Lido, LayerZero bridges, x402",
    longDescription:
      "A universal Model Context Protocol server supporting multiple blockchain networks. Features multi-aggregator DEX swaps, DeFi protocol integration, cross-chain bridges, GoPlus security scanning, and the x402 payment protocol — enabling AI agents to transact autonomously across chains.",
    language: "TypeScript",
    toolCount: "380+",
    repoPath: "mcp-servers/universal-crypto-mcp",
    npmPackage: "@nirholas/universal-crypto-mcp",
    features: [
      "380+ tools across multiple blockchain networks",
      "Multi-aggregator DEX swaps — 1inch, 0x, ParaSwap",
      "DeFi protocols — Aave, Compound, Lido, Uniswap",
      "Cross-chain bridges — LayerZero, Stargate, Wormhole",
      "GoPlus security scanning and honeypot detection",
      "x402 payment protocol — AI agents pay for APIs autonomously",
      "AI Service Marketplace for monetisation and discovery",
      "Technical indicators — RSI, MACD, Bollinger Bands, 50+ more",
    ],
    toolCategories: [
      {
        name: "DEX & Swaps",
        count: 40,
        tools: [
          "get_swap_quote",
          "execute_swap",
          "get_dex_pools",
          "get_pool_liquidity",
          "find_best_route",
        ],
      },
      {
        name: "DeFi Protocols",
        count: 60,
        tools: [
          "aave_supply",
          "aave_borrow",
          "compound_supply",
          "lido_stake",
          "uniswap_add_liquidity",
        ],
      },
      {
        name: "Bridges",
        count: 25,
        tools: [
          "bridge_tokens",
          "get_bridge_quote",
          "layerzero_send",
          "stargate_transfer",
          "wormhole_transfer",
        ],
      },
      {
        name: "Market Data",
        count: 60,
        tools: [
          "get_price",
          "get_ohlcv",
          "get_trending",
          "get_fear_greed",
          "get_tvl",
          "get_social_sentiment",
        ],
      },
      {
        name: "Security",
        count: 20,
        tools: [
          "check_token_security",
          "detect_honeypot",
          "check_rug_pull",
          "screen_address",
        ],
      },
      {
        name: "Wallets & Portfolio",
        count: 30,
        tools: [
          "get_balance",
          "send_transaction",
          "get_portfolio",
          "track_whale",
        ],
      },
      {
        name: "x402 Payments",
        count: 15,
        tools: [
          "x402_check_balance",
          "x402_pay",
          "x402_get_history",
          "register_service",
        ],
      },
      {
        name: "Technical Analysis",
        count: 50,
        tools: [
          "get_rsi",
          "get_macd",
          "get_bollinger_bands",
          "get_moving_average",
        ],
      },
    ],
    installCommand: "npx -y @nirholas/universal-crypto-mcp",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          "universal-crypto-mcp": {
            command: "npx",
            args: ["-y", "@nirholas/universal-crypto-mcp"],
          },
        },
      },
      null,
      2,
    ),
    chains: [
      "Ethereum",
      "BNB Chain",
      "Polygon",
      "Arbitrum",
      "Base",
      "Optimism",
      "Avalanche",
      "Fantom",
      "zkSync",
      "Linea",
      "Scroll",
      "Blast",
      "Solana",
      "Cosmos",
      "Near",
      "Sui",
      "Aptos",
      "and more",
    ],
    highlights: [
      "380+ tools",
      "Multi-chain",
      "x402 payments",
      "Multi-DEX",
      "Bridge support",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/universal-crypto-mcp",
  },
  {
    id: "agenti",
    name: "Agenti",
    description:
      "EVM + Solana — Flashbots MEV protection, Wormhole bridges, x402 payments",
    longDescription:
      "A universal Model Context Protocol server for EVM + Solana blockchains. Includes Flashbots MEV protection, Wormhole cross-chain bridges, x402 autonomous payment protocol, and comprehensive DeFi tooling — enabling AI agents to operate across 20+ chains with full autonomy.",
    language: "TypeScript",
    toolCount: "380+",
    repoPath: "mcp-servers/agenti",
    npmPackage: "@nirholas/agenti",
    features: [
      "380+ tools across EVM + Solana chains",
      "Flashbots MEV protection and private transactions",
      "Wormhole cross-chain bridge integration",
      "x402 payment protocol — AI-to-AI and AI-to-API payments",
      "Multi-aggregator DEX — 1inch, 0x, ParaSwap",
      "DeFi protocols — Aave, Compound, Lido, Uniswap",
      "Real-time WebSocket price streams and mempool monitoring",
      "Whale tracking, wallet scoring, and behavior analysis",
    ],
    toolCategories: [
      {
        name: "DEX & Swaps",
        count: 40,
        tools: [
          "get_swap_quote",
          "execute_swap",
          "find_best_route",
          "get_pool_data",
        ],
      },
      {
        name: "DeFi Protocols",
        count: 60,
        tools: [
          "aave_supply",
          "compound_borrow",
          "lido_stake",
          "uniswap_v3_positions",
        ],
      },
      {
        name: "Bridges",
        count: 30,
        tools: [
          "wormhole_transfer",
          "layerzero_send",
          "stargate_bridge",
          "get_bridge_status",
        ],
      },
      {
        name: "MEV Protection",
        count: 15,
        tools: [
          "flashbots_send_bundle",
          "flashbots_simulate",
          "private_transaction",
        ],
      },
      {
        name: "Market Data",
        count: 55,
        tools: [
          "get_price",
          "get_ohlcv",
          "get_trending",
          "get_tvl",
          "get_social_metrics",
          "get_predictions",
        ],
      },
      {
        name: "Security",
        count: 20,
        tools: [
          "check_token_security",
          "detect_honeypot",
          "check_rug_pull",
          "screen_address",
        ],
      },
      {
        name: "x402 Payments",
        count: 15,
        tools: [
          "x402_check_balance",
          "x402_pay",
          "x402_register_service",
          "x402_discover_services",
        ],
      },
      {
        name: "Wallets & Analytics",
        count: 35,
        tools: [
          "get_balance",
          "send_tx",
          "track_whale",
          "wallet_score",
          "portfolio_summary",
        ],
      },
    ],
    installCommand: "npx -y @nirholas/agenti",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          agenti: {
            command: "npx",
            args: ["-y", "@nirholas/agenti"],
          },
        },
      },
      null,
      2,
    ),
    chains: [
      "Ethereum",
      "BNB Chain",
      "Polygon",
      "Arbitrum",
      "Base",
      "Optimism",
      "Solana",
      "Cosmos",
      "Near",
      "Sui",
      "Aptos",
      "20+ more",
    ],
    highlights: [
      "380+ tools",
      "EVM + Solana",
      "MEV protection",
      "x402 payments",
      "Whale tracking",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/agenti",
  },
  {
    id: "ucai",
    name: "UCAI",
    description:
      "ABI-to-MCP generator — turn any smart contract ABI into an MCP server",
    longDescription:
      "The Universal Contract AI Interface — generate a production-ready MCP server from any smart contract ABI in seconds. Supports any EVM chain, includes built-in transaction simulation, security scanning, and the UCAI standard for AI–smart-contract interoperability.",
    language: "Python",
    toolCount: "∞",
    repoPath: "mcp-servers/ucai",
    npmPackage: undefined,
    features: [
      "Generate MCP servers from any verified contract ABI",
      "Works on any EVM chain — Ethereum, BNB Chain, Polygon, etc.",
      "Built-in transaction simulation before execution",
      "Security scanner — detects rug pulls, honeypots, 50+ risks",
      "Contract Whisperer — explains contracts in plain English",
      "Pro templates — Flash Loans, Arbitrage, Yield Aggregators",
      "Web builder at mcp.ucai.tech — no install required",
      "Listed in the official Anthropic MCP Registry",
    ],
    toolCategories: [
      {
        name: "Generator",
        count: 5,
        tools: [
          "generate_server",
          "validate_abi",
          "list_functions",
          "list_events",
        ],
      },
      {
        name: "Security Scanner",
        count: 8,
        tools: [
          "scan_contract",
          "detect_rug_pull",
          "check_honeypot",
          "ownership_analysis",
        ],
      },
      {
        name: "Contract Whisperer",
        count: 4,
        tools: [
          "explain_contract",
          "explain_function",
          "explain_event",
        ],
      },
      {
        name: "Templates",
        count: 6,
        tools: [
          "flash_loan_template",
          "arbitrage_template",
          "yield_aggregator_template",
        ],
      },
    ],
    installCommand: "pip install abi-to-mcp",
    configSnippet: JSON.stringify(
      {
        mcpServers: {
          ucai: {
            command: "python",
            args: ["-m", "abi_to_mcp", "serve"],
            env: {
              RPC_URL: "https://bsc-dataseed.binance.org",
            },
          },
        },
      },
      null,
      2,
    ),
    chains: [
      "Any EVM chain",
      "Ethereum",
      "BNB Chain",
      "Polygon",
      "Arbitrum",
      "Base",
      "Optimism",
    ],
    highlights: [
      "∞ dynamic tools",
      "Any ABI → MCP",
      "Security scanner",
      "Web builder",
      "Python",
    ],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/ucai",
  },
  // ── Gateway-deployed MCP servers ──────────────────────────────────────
  {
    id: "crypto-market-data",
    name: "Crypto Market Data",
    description:
      "Live cryptocurrency and DeFi market data from CoinGecko",
    longDescription:
      "Real-time and historical cryptocurrency market data powered by CoinGecko. Get prices, market caps, volumes, trending coins, and global statistics — perfect for AI agents that need live market context.",
    language: "TypeScript",
    toolCount: "6",
    repoPath: "market-data/crypto-market-data",
    features: [
      "Real-time prices for 10,000+ cryptocurrencies",
      "Market cap and volume data",
      "Trending coins and global stats",
      "Historical price data and OHLCV",
      "CoinGecko API integration",
      "Zero API key required for basic usage",
    ],
    toolCategories: [
      {
        name: "Price Data",
        count: 4,
        tools: ["get_price", "get_market_overview", "get_trending", "search_coins"],
      },
      {
        name: "Analytics",
        count: 2,
        tools: ["get_coin_detail", "get_global_stats"],
      },
    ],
    installCommand: "npx -y @nirholas/crypto-market-data",
    configSnippet: JSON.stringify(
      { mcpServers: { "crypto-market-data": { type: "http", url: "https://modelcontextprotocol.name/mcp/crypto-market-data" } } },
      null, 2,
    ),
    highlights: ["6 tools", "CoinGecko", "No API key", "Real-time", "Free tier"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/crypto-market-data",
  },
  {
    id: "crypto-market-data-ts",
    name: "Crypto Market Data TS",
    description:
      "Cryptocurrency market data with CoinGecko, DeFiLlama, and Fear & Greed Index",
    longDescription:
      "Comprehensive cryptocurrency market data service combining CoinGecko prices, DeFiLlama TVL and protocol data, and the Fear & Greed Index. Built-in caching, rate limiting, and Edge Runtime compatibility.",
    language: "TypeScript",
    toolCount: "10",
    repoPath: "market-data/crypto-market-data-ts",
    features: [
      "CoinGecko price feeds with caching",
      "DeFiLlama TVL and protocol analytics",
      "Fear & Greed Index integration",
      "Built-in rate limiting",
      "Edge Runtime compatible",
      "TypeScript-first with full type safety",
    ],
    toolCategories: [
      {
        name: "Prices",
        count: 4,
        tools: ["get_price", "get_market_overview", "get_trending", "search_coins"],
      },
      {
        name: "DeFi Analytics",
        count: 4,
        tools: ["get_defi_protocols", "get_protocol_detail", "get_chain_tvl", "get_yield_opportunities"],
      },
      {
        name: "Sentiment",
        count: 2,
        tools: ["get_fear_greed_index", "get_global_stats"],
      },
    ],
    installCommand: "npx -y @nirholas/crypto-market-data-ts",
    configSnippet: JSON.stringify(
      { mcpServers: { "crypto-market-data-ts": { type: "http", url: "https://modelcontextprotocol.name/mcp/crypto-market-data-ts" } } },
      null, 2,
    ),
    highlights: ["10 tools", "3 data sources", "Edge ready", "TypeScript", "Cached"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/crypto-market-data-ts",
  },
  {
    id: "crypto-data-aggregator",
    name: "Crypto Data Aggregator",
    description:
      "Real-time cryptocurrency market data aggregator — 10,000+ coins, 200+ DeFi protocols, portfolios, alerts, sentiment",
    longDescription:
      "Full-featured cryptocurrency market data aggregator. Track 10,000+ coins, monitor 200+ DeFi protocols, manage portfolios, set price alerts, and analyze market sentiment — all in one service.",
    language: "TypeScript",
    toolCount: "10",
    repoPath: "market-data/crypto-data-aggregator",
    features: [
      "10,000+ coin tracking",
      "200+ DeFi protocol monitoring",
      "Portfolio management",
      "Price alerts",
      "Market sentiment analysis",
      "Multi-source data aggregation",
    ],
    toolCategories: [
      {
        name: "Market Data",
        count: 5,
        tools: ["get_price", "get_market_overview", "get_trending", "search_coins", "get_global_stats"],
      },
      {
        name: "DeFi",
        count: 3,
        tools: ["get_defi_protocols", "get_protocol_detail", "get_chain_tvl"],
      },
      {
        name: "Analytics",
        count: 2,
        tools: ["get_sentiment", "get_portfolio_summary"],
      },
    ],
    installCommand: "npx -y @nirholas/crypto-data-aggregator",
    configSnippet: JSON.stringify(
      { mcpServers: { "crypto-data-aggregator": { type: "http", url: "https://modelcontextprotocol.name/mcp/crypto-data-aggregator" } } },
      null, 2,
    ),
    highlights: ["10 tools", "10K+ coins", "200+ protocols", "Alerts", "Sentiment"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/crypto-data-aggregator",
  },
  {
    id: "free-crypto-news",
    name: "Free Crypto News",
    description:
      "Free crypto news — real-time aggregator for Bitcoin, Ethereum, DeFi, and altcoins",
    longDescription:
      "Free crypto news API — real-time aggregator for Bitcoin, Ethereum, DeFi, Solana & altcoins. No API key required. RSS/Atom feeds, JSON REST API, historical archive with market context. AI/LLM ready.",
    language: "TypeScript",
    toolCount: "4",
    repoPath: "market-data/free-crypto-news",
    features: [
      "Real-time crypto news aggregation",
      "No API key required",
      "RSS/Atom feeds and JSON API",
      "Historical archive with market context",
      "AI/LLM optimized output",
      "Bitcoin, Ethereum, DeFi, altcoin coverage",
    ],
    toolCategories: [
      {
        name: "News",
        count: 4,
        tools: ["get_latest_news", "search_news", "get_trending_topics", "get_news_by_coin"],
      },
    ],
    installCommand: "npx -y @nirholas/free-crypto-news",
    configSnippet: JSON.stringify(
      { mcpServers: { "free-crypto-news": { type: "http", url: "https://modelcontextprotocol.name/mcp/free-crypto-news" } } },
      null, 2,
    ),
    highlights: ["4 tools", "No API key", "Real-time", "Free", "AI-ready"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/free-crypto-news",
  },
  {
    id: "sperax-crypto-mcp",
    name: "Sperax Crypto MCP",
    description:
      "MCP server for Sperax Protocol — USDs, SPA, veSPA & Demeter on Arbitrum and BNB Chain",
    longDescription:
      "Dedicated MCP server for the Sperax Protocol ecosystem. Access USDs stablecoin data, SPA tokenomics, veSPA governance, and Demeter yield farming — all on Arbitrum and BNB Chain. Listed on Anthropic's official MCP Registry.",
    language: "TypeScript",
    toolCount: "6",
    repoPath: "mcp-servers/sperax-crypto-mcp",
    features: [
      "USDs stablecoin balance and yield data",
      "SPA token price and supply metrics",
      "veSPA governance and voting power",
      "Demeter farming pool analytics",
      "Arbitrum and BNB Chain support",
      "Listed on Anthropic MCP Registry",
    ],
    toolCategories: [
      {
        name: "Sperax Protocol",
        count: 6,
        tools: ["get_usds_info", "get_spa_price", "get_vespa_stats", "get_demeter_pools", "get_protocol_tvl", "get_yield_data"],
      },
    ],
    installCommand: "npx -y @nirholas/sperax-crypto-mcp",
    configSnippet: JSON.stringify(
      { mcpServers: { "sperax-crypto-mcp": { type: "http", url: "https://modelcontextprotocol.name/mcp/sperax-crypto-mcp" } } },
      null, 2,
    ),
    chains: ["Arbitrum", "BNB Chain"],
    highlights: ["6 tools", "Sperax", "USDs", "Arbitrum", "Official registry"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/sperax-crypto-mcp",
  },
  {
    id: "defi-agents",
    name: "DeFi Agents",
    description:
      "DeFi agent definitions — production-ready agents for Web3, crypto trading, portfolio management, and blockchain automation",
    longDescription:
      "42 production-ready AI agent definitions for DeFi, portfolio management, trading, and Web3 workflows. Includes market data tools for prices, protocols, trending coins, and yield opportunities.",
    language: "TypeScript",
    toolCount: "10",
    repoPath: "agents/defi-agents",
    features: [
      "42 production-ready agent definitions",
      "Crypto price feeds via CoinGecko",
      "DeFi protocol data via DeFiLlama",
      "Trending coins and market overview",
      "Yield opportunity discovery",
      "30+ language translations",
    ],
    toolCategories: [
      {
        name: "Market Data",
        count: 6,
        tools: ["get_price", "get_market_overview", "get_trending", "search_coins", "get_coin_detail", "get_global_stats"],
      },
      {
        name: "DeFi",
        count: 4,
        tools: ["get_defi_protocols", "get_protocol_detail", "get_chain_tvl", "get_yield_opportunities"],
      },
    ],
    installCommand: "npx -y @nirholas/defi-agents",
    configSnippet: JSON.stringify(
      { mcpServers: { "defi-agents": { type: "http", url: "https://modelcontextprotocol.name/mcp/defi-agents" } } },
      null, 2,
    ),
    highlights: ["10 tools", "42 agents", "DeFi", "Trading", "Multi-language"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/defi-agents",
  },
  {
    id: "ethereum-wallet-toolkit",
    name: "Ethereum Wallet Toolkit",
    description:
      "Ethereum wallet information — ENS resolution, balance lookups, and address validation (read-only)",
    longDescription:
      "Python toolkit for Ethereum wallets — ENS resolution, balance lookups, address validation, BIP39/BIP44 HD wallets, Web3 Secret Storage V3 keystores, and EIP-712 typed data signing. Read-only public data via MCP.",
    language: "Python",
    toolCount: "3",
    repoPath: "wallets/ethereum-wallet-toolkit",
    features: [
      "ENS name resolution",
      "ETH balance lookups",
      "Address validation",
      "Read-only — no private keys",
      "BIP39/BIP44 HD wallet generation (CLI)",
      "EIP-712 typed data signing (CLI)",
    ],
    toolCategories: [
      {
        name: "Wallet Info",
        count: 3,
        tools: ["resolve_ens", "get_balance", "validate_address"],
      },
    ],
    installCommand: "pip install ethereum-wallet-toolkit",
    configSnippet: JSON.stringify(
      { mcpServers: { "ethereum-wallet-toolkit": { type: "http", url: "https://modelcontextprotocol.name/mcp/ethereum-wallet-toolkit" } } },
      null, 2,
    ),
    chains: ["Ethereum"],
    highlights: ["3 tools", "ENS", "Read-only", "Python", "Secure"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/ethereum-wallet-toolkit",
  },
  {
    id: "solana-wallet-toolkit",
    name: "Solana Wallet Toolkit",
    description:
      "Solana Development Toolkit — SOL price, network stats, and token lookups",
    longDescription:
      "Solana development toolkit with vanity address generation, SOL price data, network statistics, and token lookups. Multi-threaded search using all CPU cores for efficient address generation.",
    language: "TypeScript",
    toolCount: "4",
    repoPath: "wallets/solana-wallet-toolkit",
    features: [
      "SOL price and market data",
      "Solana network statistics",
      "Token information lookups",
      "Vanity address generation (CLI)",
      "Multi-threaded Rust + TypeScript",
      "Read-only public data via MCP",
    ],
    toolCategories: [
      {
        name: "Solana Data",
        count: 4,
        tools: ["get_sol_price", "get_network_stats", "get_token_info", "get_account_info"],
      },
    ],
    installCommand: "npx -y @nirholas/solana-wallet-toolkit",
    configSnippet: JSON.stringify(
      { mcpServers: { "solana-wallet-toolkit": { type: "http", url: "https://modelcontextprotocol.name/mcp/solana-wallet-toolkit" } } },
      null, 2,
    ),
    chains: ["Solana"],
    highlights: ["4 tools", "Solana", "SOL price", "Network stats", "TypeScript"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/solana-wallet-toolkit",
  },
  {
    id: "boosty-defi",
    name: "Boosty DeFi",
    description:
      "DeFi yield farming, price analysis, and portfolio tools — compare yields across protocols, find opportunities",
    longDescription:
      "All-in-one DeFi toolkit for yield farming analysis, price comparisons, and portfolio management. Compare yields across protocols, discover farming opportunities, analyze token performance, and track portfolio allocations.",
    language: "TypeScript",
    toolCount: "14",
    repoPath: "defi-tools/boosty",
    features: [
      "Yield farming comparison across protocols",
      "Token price analysis and charting",
      "Portfolio tracking and allocation",
      "APY/APR calculations",
      "Impermanent loss estimation",
      "Multi-chain DeFi coverage",
    ],
    toolCategories: [
      {
        name: "Yield Farming",
        count: 5,
        tools: ["get_yield_farms", "compare_yields", "get_pool_stats", "estimate_rewards", "get_farming_history"],
      },
      {
        name: "Price Analysis",
        count: 5,
        tools: ["get_token_price", "get_price_chart", "compare_tokens", "get_market_cap", "get_volume"],
      },
      {
        name: "Portfolio",
        count: 4,
        tools: ["get_portfolio", "get_allocation", "get_pnl", "rebalance_suggestion"],
      },
    ],
    installCommand: "npx -y @nirholas/boosty-defi",
    configSnippet: JSON.stringify(
      { mcpServers: { "boosty-defi": { type: "http", url: "https://modelcontextprotocol.name/mcp/boosty-defi" } } },
      null, 2,
    ),
    highlights: ["14 tools", "Yield farming", "Portfolio", "Multi-chain", "DeFi"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/boosty-defi",
  },
  {
    id: "x402-stablecoin",
    name: "x402 Stablecoin",
    description:
      "Read-only tools for x402 payment protocol and Sperax USDs stablecoin — check balances, gas estimates, and payment info on Arbitrum",
    longDescription:
      "Read-only tools for the x402 payment protocol enabling AI agents to autonomously pay for APIs. Check USDs stablecoin balances, estimate gas costs, and query payment channel info on Arbitrum.",
    language: "TypeScript",
    toolCount: "4",
    repoPath: "standards/x402-stablecoin",
    features: [
      "USDs stablecoin balance checks",
      "Gas estimation for Arbitrum transactions",
      "Payment channel status queries",
      "x402 protocol information",
      "Read-only — no private keys required",
      "Arbitrum network support",
    ],
    toolCategories: [
      {
        name: "x402 Protocol",
        count: 4,
        tools: ["check_balance", "estimate_gas", "get_payment_info", "get_protocol_status"],
      },
    ],
    installCommand: "npx -y @nirholas/x402-stablecoin",
    configSnippet: JSON.stringify(
      { mcpServers: { "x402-stablecoin": { type: "http", url: "https://modelcontextprotocol.name/mcp/x402-stablecoin" } } },
      null, 2,
    ),
    chains: ["Arbitrum"],
    highlights: ["4 tools", "x402", "USDs", "Read-only", "Arbitrum"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/x402-stablecoin",
  },
  {
    id: "sweep-defi",
    name: "Sweep DeFi",
    description:
      "DeFi dust analysis — find small token balances worth consolidating, estimate gas costs, and discover yield opportunities for idle tokens",
    longDescription:
      "Multi-chain dust sweeper that analyzes small token balances worth consolidating into DeFi yield. Find dust across wallets, estimate gas costs for consolidation, and discover yield opportunities for idle tokens.",
    language: "TypeScript",
    toolCount: "4",
    repoPath: "defi-tools/sweep",
    features: [
      "Multi-chain dust detection",
      "Gas cost estimation for consolidation",
      "Yield opportunity discovery",
      "Token balance analysis",
      "ERC-4337 account abstraction support",
      "MEV-protected swaps via CoW Protocol",
    ],
    toolCategories: [
      {
        name: "Dust Analysis",
        count: 4,
        tools: ["find_dust", "estimate_sweep_cost", "get_yield_options", "analyze_balances"],
      },
    ],
    installCommand: "npx -y @nirholas/sweep-defi",
    configSnippet: JSON.stringify(
      { mcpServers: { "sweep-defi": { type: "http", url: "https://modelcontextprotocol.name/mcp/sweep-defi" } } },
      null, 2,
    ),
    chains: ["Ethereum", "Base", "Arbitrum", "Polygon", "Solana"],
    highlights: ["4 tools", "Dust sweeper", "Multi-chain", "Yield", "Gasless"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/sweep-defi",
  },
  {
    id: "github-to-mcp",
    name: "GitHub to MCP",
    description:
      "Convert GitHub repositories to MCP servers — extract tools from OpenAPI, GraphQL & REST APIs",
    longDescription:
      "Automatically convert GitHub repositories into MCP servers. Extract tools from OpenAPI, GraphQL & REST APIs for Claude Desktop, Cursor, Windsurf, Cline & VS Code. AI-powered code generation creates type-safe TypeScript/Python MCP servers.",
    language: "TypeScript",
    toolCount: "2",
    repoPath: "mcp-servers/github-to-mcp",
    features: [
      "Auto-extract tools from OpenAPI specs",
      "GraphQL schema to MCP conversion",
      "REST API endpoint extraction",
      "AI-powered code generation",
      "Type-safe TypeScript/Python output",
      "Zero config — just paste a repo URL",
    ],
    toolCategories: [
      {
        name: "Conversion",
        count: 2,
        tools: ["convert_repo", "analyze_api"],
      },
    ],
    installCommand: "npx -y @nirholas/github-to-mcp",
    configSnippet: JSON.stringify(
      { mcpServers: { "github-to-mcp": { type: "http", url: "https://modelcontextprotocol.name/mcp/github-to-mcp" } } },
      null, 2,
    ),
    highlights: ["2 tools", "Auto-convert", "OpenAPI", "GraphQL", "Zero config"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/github-to-mcp",
  },
  {
    id: "mcp-notify",
    name: "MCP Notify",
    description:
      "Monitor the MCP Registry for new, updated, and removed servers. Get MCP ecosystem stats.",
    longDescription:
      "Monitor the Model Context Protocol Registry for changes. Get real-time notifications via Discord, Slack, Email, Telegram, Microsoft Teams, Webhooks, or RSS feeds. Track new servers, updates, and ecosystem statistics.",
    language: "TypeScript",
    toolCount: "2",
    repoPath: "mcp-servers/mcp-notify",
    features: [
      "MCP Registry change monitoring",
      "Multi-channel notifications",
      "Discord, Slack, Telegram support",
      "Ecosystem statistics",
      "RSS feed generation",
      "CLI and Go SDK available",
    ],
    toolCategories: [
      {
        name: "Registry",
        count: 2,
        tools: ["get_registry_stats", "get_recent_changes"],
      },
    ],
    installCommand: "npx -y @nirholas/mcp-notify",
    configSnippet: JSON.stringify(
      { mcpServers: { "mcp-notify": { type: "http", url: "https://modelcontextprotocol.name/mcp/mcp-notify" } } },
      null, 2,
    ),
    highlights: ["2 tools", "Registry monitor", "Notifications", "Stats", "Multi-channel"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/mcp-notify",
  },
  {
    id: "mcp-servers-collection",
    name: "MCP Servers Collection",
    description:
      "Curated collection of production-ready MCP servers for crypto, blockchain, DeFi, and Web3",
    longDescription:
      "A curated catalog of production-ready MCP servers focused on crypto, blockchain, DeFi, and Web3. Browse available servers, discover capabilities, and find the right MCP server for your AI agent workflow.",
    language: "TypeScript",
    toolCount: "1",
    repoPath: "mcp-servers/collection",
    features: [
      "Curated MCP server catalog",
      "Crypto and Web3 focused",
      "Server capability discovery",
      "Production-ready recommendations",
      "Category-based browsing",
      "Integration guides",
    ],
    toolCategories: [
      {
        name: "Catalog",
        count: 1,
        tools: ["list_servers"],
      },
    ],
    installCommand: "npx -y @nirholas/mcp-servers-collection",
    configSnippet: JSON.stringify(
      { mcpServers: { "mcp-servers-collection": { type: "http", url: "https://modelcontextprotocol.name/mcp/mcp-servers-collection" } } },
      null, 2,
    ),
    highlights: ["1 tool", "Curated", "Web3", "Catalog", "Discovery"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/mcp-servers-collection",
  },
  {
    id: "lyra-intel",
    name: "Lyra Intel",
    description:
      "Code intelligence — analyze GitHub repos, search code, get repo structure and security insights via GitHub API",
    longDescription:
      "Intelligence platform for analyzing repositories of any size. Analyze GitHub repos, search code, get repo structure, and security insights — from small projects to enterprise monorepos with millions of lines of code.",
    language: "TypeScript",
    toolCount: "6",
    repoPath: "packages/lyra-intel",
    features: [
      "GitHub repository analysis",
      "Code search across repos",
      "Repository structure mapping",
      "Security vulnerability scanning",
      "Dependency analysis",
      "Enterprise monorepo support",
    ],
    toolCategories: [
      {
        name: "Repo Analysis",
        count: 4,
        tools: ["analyze_repo", "search_code", "get_structure", "get_dependencies"],
      },
      {
        name: "Security",
        count: 2,
        tools: ["scan_vulnerabilities", "get_security_insights"],
      },
    ],
    installCommand: "npx -y @nirholas/lyra-intel",
    configSnippet: JSON.stringify(
      { mcpServers: { "lyra-intel": { type: "http", url: "https://modelcontextprotocol.name/mcp/lyra-intel" } } },
      null, 2,
    ),
    highlights: ["6 tools", "Code intel", "GitHub API", "Security", "Enterprise"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/lyra-intel",
  },
  {
    id: "lyra-registry",
    name: "Lyra Registry",
    description:
      "MCP server registry — search and discover MCP servers, tools, and capabilities across the ecosystem",
    longDescription:
      "Standalone API + MCP service that catalogs, scores, and serves metadata for all tools in the Lyra ecosystem. Enables discovery, evaluation, and integration of 800+ crypto, blockchain, DeFi, and Web3 tools.",
    language: "TypeScript",
    toolCount: "3",
    repoPath: "packages/lyra-registry",
    features: [
      "800+ tool catalog",
      "Tool scoring and evaluation",
      "Full-text search across tools",
      "Category-based discovery",
      "Metadata and capability queries",
      "REST API + MCP interface",
    ],
    toolCategories: [
      {
        name: "Discovery",
        count: 3,
        tools: ["search_tools", "get_tool_detail", "list_categories"],
      },
    ],
    installCommand: "npx -y @nirholas/lyra-registry",
    configSnippet: JSON.stringify(
      { mcpServers: { "lyra-registry": { type: "http", url: "https://modelcontextprotocol.name/mcp/lyra-registry" } } },
      null, 2,
    ),
    highlights: ["3 tools", "800+ tools", "Registry", "Search", "Scoring"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/lyra-registry",
  },
  {
    id: "extract-llms-docs",
    name: "Extract LLMs Docs",
    description:
      "Extract documentation from websites supporting llms.txt — the standard for making docs AI-ready",
    longDescription:
      "Extract documentation for AI agents from any site with llms.txt support. Features MCP server, REST API, batch processing, and multiple export formats — the standard for making documentation AI-ready.",
    language: "TypeScript",
    toolCount: "5",
    repoPath: "packages/extract-llms-docs",
    features: [
      "llms.txt standard support",
      "Documentation extraction",
      "Batch URL processing",
      "Multiple export formats",
      "REST API interface",
      "AI-ready output formatting",
    ],
    toolCategories: [
      {
        name: "Extraction",
        count: 5,
        tools: ["extract_docs", "batch_extract", "get_llms_txt", "convert_format", "validate_llms_txt"],
      },
    ],
    installCommand: "npx -y @nirholas/extract-llms-docs",
    configSnippet: JSON.stringify(
      { mcpServers: { "extract-llms-docs": { type: "http", url: "https://modelcontextprotocol.name/mcp/extract-llms-docs" } } },
      null, 2,
    ),
    highlights: ["5 tools", "llms.txt", "Docs extraction", "Batch", "AI-ready"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/extract-llms-docs",
  },
  {
    id: "ai-agents-library",
    name: "AI Agents Library",
    description:
      "Browse and search 400+ specialized AI agent templates — crypto, DeFi, trading, research, coding, and more",
    longDescription:
      "A comprehensive collection of 400+ specialized AI agents with universal compatibility. Browse, search, and discover agent templates for crypto, DeFi, trading, research, coding, and more — works with any AI platform.",
    language: "TypeScript",
    toolCount: "3",
    repoPath: "agents",
    features: [
      "400+ agent templates",
      "Full-text search",
      "Category browsing",
      "Universal format",
      "No vendor lock-in",
      "30+ language translations",
    ],
    toolCategories: [
      {
        name: "Agent Discovery",
        count: 3,
        tools: ["search_agents", "get_agent_detail", "list_categories"],
      },
    ],
    installCommand: "npx -y @nirholas/ai-agents-library",
    configSnippet: JSON.stringify(
      { mcpServers: { "ai-agents-library": { type: "http", url: "https://modelcontextprotocol.name/mcp/ai-agents-library" } } },
      null, 2,
    ),
    highlights: ["3 tools", "400+ agents", "Universal", "Multi-language", "Search"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/ai-agents-library",
  },
  {
    id: "xactions",
    name: "XActions",
    description:
      "X/Twitter data tools — search tweets, trending topics, and social media intelligence (read-only public data)",
    longDescription:
      "The complete X/Twitter toolkit for AI agents. Search tweets, track trending topics, and gather social media intelligence from public data — no API keys or fees required. Read-only public data access.",
    language: "TypeScript",
    toolCount: "3",
    repoPath: "packages/xactions",
    features: [
      "Tweet search and discovery",
      "Trending topic tracking",
      "Social media intelligence",
      "No API keys required",
      "Read-only public data",
      "Real-time data access",
    ],
    toolCategories: [
      {
        name: "X/Twitter",
        count: 3,
        tools: ["search_tweets", "get_trending", "get_user_tweets"],
      },
    ],
    installCommand: "npx -y @nirholas/xactions",
    configSnippet: JSON.stringify(
      { mcpServers: { xactions: { type: "http", url: "https://modelcontextprotocol.name/mcp/xactions" } } },
      null, 2,
    ),
    highlights: ["3 tools", "X/Twitter", "No API key", "Read-only", "Real-time"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/xactions",
  },
  {
    id: "w3ag",
    name: "W3AG",
    description:
      "Web3 Accessibility Guidelines (W3AG) reference — the first open standard for making blockchain applications accessible to everyone",
    longDescription:
      "Web3 Accessibility Guidelines (W3AG) MCP server — the first open standard for making blockchain, DeFi, and crypto applications accessible to people with disabilities. Query guidelines, check compliance, and get accessibility recommendations.",
    language: "TypeScript",
    toolCount: "2",
    repoPath: "standards/w3ag",
    features: [
      "W3AG guideline reference",
      "Accessibility compliance checking",
      "Blockchain UX recommendations",
      "Wallet accessibility standards",
      "Transaction signing guidelines",
      "Address readability standards",
    ],
    toolCategories: [
      {
        name: "Accessibility",
        count: 2,
        tools: ["get_guidelines", "check_compliance"],
      },
    ],
    installCommand: "npx -y @nirholas/w3ag",
    configSnippet: JSON.stringify(
      { mcpServers: { w3ag: { type: "http", url: "https://modelcontextprotocol.name/mcp/w3ag" } } },
      null, 2,
    ),
    highlights: ["2 tools", "Accessibility", "Open standard", "Web3 UX", "WCAG"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/w3ag",
  },
  {
    id: "plugin-delivery",
    name: "Plugin Delivery",
    description:
      "AI plugin marketplace toolkit — search plugins, discover integrations, and explore the plugin.delivery ecosystem",
    longDescription:
      "AI plugin marketplace SDK and gateway. Search plugins, discover integrations, and explore the plugin.delivery ecosystem. OpenAPI compatible, multi-language support, and Vercel edge deployment.",
    language: "TypeScript",
    toolCount: "2",
    repoPath: "packages/plugin-delivery",
    features: [
      "Plugin marketplace search",
      "Integration discovery",
      "OpenAPI compatible",
      "Multi-language support",
      "Vercel edge deployment",
      "Developer tools and SDK",
    ],
    toolCategories: [
      {
        name: "Marketplace",
        count: 2,
        tools: ["search_plugins", "get_plugin_detail"],
      },
    ],
    installCommand: "npx -y @nirholas/plugin-delivery",
    configSnippet: JSON.stringify(
      { mcpServers: { "plugin-delivery": { type: "http", url: "https://modelcontextprotocol.name/mcp/plugin-delivery" } } },
      null, 2,
    ),
    highlights: ["2 tools", "Marketplace", "OpenAPI", "Edge", "SDK"],
    httpEndpoint: "https://modelcontextprotocol.name/mcp/plugin-delivery",
  },
];

// ── Tool Catalog ────────────────────────────────────────────────────────

export const toolCatalog: ToolEntry[] = [
  {
    id: "crypto-market-data",
    name: "Crypto Market Data",
    description:
      "Real-time and historical price feeds from CoinGecko, CoinMarketCap, and DexPaprika.",
    category: "Market Data",
    detail: "Multi-source price aggregation with OHLCV support",
    repoPath: "market-data/crypto-market-data",
    featured: true,
    icon: "TrendingUp",
  },
  {
    id: "crypto-news",
    name: "Crypto News Aggregator",
    description:
      "Aggregated news from CryptoPanic, RSS feeds, and social media with sentiment analysis.",
    category: "Market Data",
    detail: "NLP-powered sentiment scoring on crypto news",
    repoPath: "market-data/crypto-news",
    featured: true,
    icon: "Newspaper",
  },
  {
    id: "dust-sweeper",
    name: "Dust Sweeper",
    description:
      "Automatically sweep small token balances (dust) and consolidate into a single asset.",
    category: "DeFi Tools",
    detail: "Multi-token dust aggregation → single consolidated swap",
    repoPath: "defi-tools/sweep",
    featured: true,
    icon: "Sparkles",
  },
  {
    id: "hd-wallet-generator",
    name: "HD Wallet Generator",
    description:
      "Generate hierarchical deterministic (BIP-39/44) wallets — fully offline and secure.",
    category: "Wallets",
    detail: "BIP-39 mnemonic + BIP-44 derivation, air-gapped",
    repoPath: "wallets",
    featured: true,
    icon: "KeyRound",
  },
  {
    id: "transaction-signer",
    name: "Transaction Signer",
    description:
      "Sign Ethereum & BNB Chain transactions offline for maximum security.",
    category: "Wallets",
    detail: "Offline EIP-1559 & legacy transaction signing",
    repoPath: "wallets",
    featured: true,
    icon: "PenTool",
  },
  {
    id: "offline-wallet-html",
    name: "Offline Wallet HTML",
    description:
      "A single HTML file for generating wallets completely offline — no internet required.",
    category: "Wallets",
    detail: "Self-contained HTML5 wallet generator",
    repoPath: "wallets",
    featured: false,
    icon: "Globe",
  },
  {
    id: "erc-8004-verifier",
    name: "ERC-8004 Verifier",
    description:
      "Verify agent compliance with the ERC-8004 standard for on-chain AI agent identification.",
    category: "Standards",
    detail: "ERC-8004 on-chain agent identity verification",
    repoPath: "standards/erc-8004",
    featured: true,
    icon: "ShieldCheck",
  },
  {
    id: "w3ag-checker",
    name: "W3AG Checker",
    description:
      "Check adherence to the W3AG (Web3 Agent Guidelines) specification for AI agents.",
    category: "Standards",
    detail: "W3AG spec compliance checker",
    repoPath: "standards/w3ag",
    featured: true,
    icon: "CheckCircle",
  },
  {
    id: "lyra-market-data",
    name: "Lyra Market Data",
    description:
      "An npm package for streaming real-time crypto market data — prices, candles, tickers.",
    category: "Packages",
    detail: "npm: @nirholas/lyra-market-data — streaming WebSocket API",
    repoPath: "packages/lyra-market-data",
    featured: true,
    icon: "Package",
  },
];

// ── Helper functions ────────────────────────────────────────────────────

export function getServerById(id: string): MCPServer | undefined {
  return mcpServers.find((s) => s.id === id);
}

export function getToolsByCategory(
  category: ToolEntry["category"],
): ToolEntry[] {
  return toolCatalog.filter((t) => t.category === category);
}

export function getFeaturedTools(): ToolEntry[] {
  return toolCatalog.filter((t) => t.featured);
}

export const toolCategories: ToolEntry["category"][] = [
  "Market Data",
  "DeFi Tools",
  "Wallets",
  "Standards",
  "Packages",
];

/** Combined claude_desktop_config.json for all 27 servers */
export const allServersConfig = JSON.stringify(
  {
    mcpServers: {
      // ── Local / stdio servers ──
      "bnb-chain-mcp": {
        command: "npx",
        args: ["-y", "@nirholas/bnb-chain-mcp@latest"],
      },
      binance: {
        command: "node",
        args: ["/path/to/Binance-MCP/build/index.js"],
        env: {
          BINANCE_API_KEY: "your_api_key",
          BINANCE_API_SECRET: "your_api_secret",
        },
      },
      "binance-us": {
        command: "node",
        args: ["/path/to/binance-us-mcp-server/build/index.js"],
        env: {
          BINANCE_US_API_KEY: "your_api_key",
          BINANCE_US_API_SECRET: "your_api_secret",
        },
      },
      "universal-crypto-mcp": {
        command: "npx",
        args: ["-y", "@nirholas/universal-crypto-mcp"],
      },
      agenti: {
        command: "npx",
        args: ["-y", "@nirholas/agenti"],
      },
      ucai: {
        command: "python",
        args: ["-m", "abi_to_mcp", "serve"],
        env: {
          RPC_URL: "https://bsc-dataseed.binance.org",
        },
      },
      // ── HTTP gateway servers (modelcontextprotocol.name) ──
      "crypto-market-data": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/crypto-market-data",
      },
      "crypto-market-data-ts": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/crypto-market-data-ts",
      },
      "crypto-data-aggregator": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/crypto-data-aggregator",
      },
      "free-crypto-news": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/free-crypto-news",
      },
      "sperax-crypto-mcp": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/sperax-crypto-mcp",
      },
      "defi-agents": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/defi-agents",
      },
      "ethereum-wallet-toolkit": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/ethereum-wallet-toolkit",
      },
      "solana-wallet-toolkit": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/solana-wallet-toolkit",
      },
      "boosty-defi": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/boosty-defi",
      },
      "x402-stablecoin": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/x402-stablecoin",
      },
      "sweep-defi": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/sweep-defi",
      },
      "github-to-mcp": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/github-to-mcp",
      },
      "mcp-notify": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/mcp-notify",
      },
      "mcp-servers-collection": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/mcp-servers-collection",
      },
      "lyra-intel": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/lyra-intel",
      },
      "lyra-registry": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/lyra-registry",
      },
      "extract-llms-docs": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/extract-llms-docs",
      },
      "ai-agents-library": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/ai-agents-library",
      },
      xactions: {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/xactions",
      },
      w3ag: {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/w3ag",
      },
      "plugin-delivery": {
        type: "http",
        url: "https://modelcontextprotocol.name/mcp/plugin-delivery",
      },
    },
  },
  null,
  2,
);
