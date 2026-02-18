# Architecture

How everything in the BNB Chain AI Toolkit fits together.

---

## High-Level Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     BNB Chain AI Toolkit                      │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│   AI Agents  │ MCP Servers  │  Market Data │   DeFi Tools    │
│   (78)       │   (6)        │  (2)         │   + Wallets     │
│              │              │              │   + Standards    │
│  BNB Chain   │  bnbchain    │  prices      │   sweep         │
│  agents (36) │  binance     │  news        │   wallet-tk     │
│  DeFi        │  binance-us  │  sentiment   │   ERC-8004      │
│  agents (42) │  universal   │              │   W3AG          │
│              │  agenti      │              │                 │
│              │  ucai        │              │                 │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬────────┘
       │              │              │                │
       ▼              ▼              ▼                ▼
   Claude/GPT    Blockchains     CoinGecko      Smart Contracts
   Copilot       BSC, opBNB      DeFiLlama      on BSC/Ethereum
   Any LLM       60+ chains      200+ sources
```

---

## Directory Structure

```
bnb-chain-toolkit/
│
├── agents/                          # AI Agent definitions
│   ├── bnb-chain-agents/            # 36 BNB Chain-specific agents
│   │   ├── pancakeswap-trader.json  # PancakeSwap trading agent
│   │   ├── venus-protocol.json      # Venus lending agent
│   │   ├── bnb-staking-advisor.json # Staking optimization
│   │   ├── agent-template.json      # Template for new agents
│   │   └── ...
│   └── defi-agents/                 # 42 general DeFi agents
│       ├── src/                     # Agent source definitions
│       ├── schema/                  # JSON schema validation
│       ├── locales/                 # 30+-language translations
│       └── scripts/                 # Build tools
│
├── mcp-servers/                     # Model Context Protocol servers
│   ├── bnbchain-mcp/                # BNB Chain + EVM (466+ tools)
│   ├── binance-mcp/                 # Binance.com (554+ tools)
│   ├── binance-us-mcp/              # Binance.US (US compliance)
│   ├── universal-crypto-mcp/        # 60+ networks (59+ tools)
│   ├── agenti/                      # EVM + Solana MCP
│   └── ucai/                        # ABI-to-MCP generator (Python)
│
├── market-data/                     # Market data services
│   ├── crypto-market-data/          # Price feeds & analytics
│   └── crypto-news/                 # News aggregation (200+ sources)
│
├── defi-tools/                      # DeFi utilities
│   └── sweep/                       # Multi-chain dust sweeper
│       ├── src/api/                 # Hono REST API + x402 payments
│       ├── src/queue/               # BullMQ workers (sweep, bridge)
│       ├── src/services/bridge/     # 6-provider bridge aggregator
│       ├── src/services/payments/   # x402 facilitator + disputes
│       └── src/config/              # Chain + token configuration
│
├── wallets/                         # Wallet tooling
│   └── ethereum-wallet-toolkit/     # Offline wallet operations
│
├── standards/                       # Web3 standards
│   ├── erc-8004/                    # Agent discovery protocol
│   │   ├── contracts/               # Solidity smart contracts
│   │   └── demo-agent/              # Reference implementation
│   └── w3ag/                        # Web3 accessibility
│
├── src/                             # Original agent source JSONs
├── scripts/                         # Build & formatting tools
├── locales/                         # 30+ language translations
├── schema/                          # JSON Schema definitions
├── public/                          # Built output (index.json)
│
├── docs/                            # Documentation (you are here)
│
├── README.md                        # Main readme
├── CONTRIBUTING.md                  # How to contribute
├── CHANGELOG.md                     # Version history
├── SECURITY.md                      # Security policy
├── LICENSE                          # MIT license
├── AGENTS.md                        # AI agent dev guidelines
├── CLAUDE.md                        # Claude Code instructions
├── GEMINI.md                        # Gemini instructions
├── .github/copilot-instructions.md  # GitHub Copilot instructions
├── llms.txt                         # AI discovery (summary)
├── llms-full.txt                    # AI discovery (full)
├── CITATION.cff                     # Academic citation
├── humans.txt                       # Human-readable credits
└── meta.json                        # Project metadata
```

---

## Data Flow

### Agent Discovery Flow

```
User installs toolkit
       │
       ▼
  bun run build
       │
       ▼
  Reads src/*.json (agent definitions)
       │
       ▼
  Validates against schema/
       │
       ▼
  Generates public/index.json
       │
       ▼
  Available as JSON API
```

### MCP Server Flow

```
AI Assistant (e.g., Claude)
       │
       │ MCP Protocol
       ▼
  MCP Server (e.g., bnbchain-mcp)
       │
       │ JSON-RPC / REST
       ▼
  Blockchain RPC Node
       │
       │ On-chain query/transaction
       ▼
  Smart Contract or Chain State
       │
       ▼
  Response back to AI
```

### Market Data Flow

```
  crypto-market-data library
       │
       ├── CoinGecko API ──→ Prices, market caps, volume
       ├── DeFiLlama API ──→ TVL, protocol data, yields
       └── Fear & Greed  ──→ Market sentiment
       │
       ▼
  Cached response with TTL
       │
       ▼
  Your application / AI agent
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Agent Definitions** | JSON | Portable, schema-validated agent configs |
| **MCP Servers** | TypeScript / Node.js | AI-to-blockchain bridges |
| **UCAI** | Python | ABI-to-MCP code generation |
| **Market Data** | TypeScript | Zero-dependency data fetching |
| **Smart Contracts** | Solidity / Foundry | On-chain protocols (ERC-8004) |
| **Wallet Toolkit** | TypeScript | Offline-capable wallet operations |
| **Build System** | bun | Fast builds and script execution |
| **Translations** | JSON (i18n) | 30+ language support |
| **Schema** | JSON Schema | Agent definition validation |

---

## Component Dependencies

```
                ┌─────────────┐
                │  AI Agent   │
                │ Definitions │
                └──────┬──────┘
                       │ uses
           ┌───────────┼───────────┐
           ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │   MCP    │ │  Market  │ │  Wallet  │
    │ Servers  │ │  Data    │ │  Toolkit │
    └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │
         ▼            ▼            ▼
    Blockchains   Data APIs    Key Mgmt
```

Each component is **independent** — you can use MCP servers without agents, market data without MCP servers, etc. They integrate well together but don't require each other.

---

## Design Principles

1. **Modular** — Use only what you need, skip the rest
2. **Standard Protocols** — MCP for AI, JSON Schema for validation, Solidity for contracts
3. **Chain Agnostic** — Built for BNB Chain but works with 60+ networks
4. **Offline Capable** — Wallet operations and agent definitions work without internet
5. **Multi-Language** — 30+ translations for global accessibility
6. **AI-First** — Every component is designed for AI assistant consumption
7. **Secure by Default** — CORS locked down, non-root containers, input validation on all routes

---

## Security Architecture

### Defense in Depth

```
         Internet
            │
            ▼
  ┌──────────────────┐
  │     nginx         │  CSP headers, HTTPS, rate limiting
  │  (non-root user)  │  Permissions-Policy, X-Content-Type-Options
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │   Express/Hono    │  CORS validation, input sanitization
  │   Application     │  Rate limiting (X-Forwarded-For aware)
  └────────┬─────────┘  Error masking (no stack traces)
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
  Routes  MCP   WebSocket
  - Deploy validation    - CORS per-server     - Connection limits
  - IPFS CID checks      - Origin allowlists   - Max 1000 concurrent
  - Network allowlist     - No eval()
     │
     ▼
  ┌──────────────────┐
  │   Data Layer      │  SQL LIKE escaping, cache size limits
  │  (SQLite/Redis)   │  Redis password auth, localhost binding
  └──────────────────┘
```

### Container Security

- All Docker containers run as **non-root** users
- Redis requires password authentication and binds to `127.0.0.1`
- No secrets in container images — all credentials via environment variables

### Configuration

All security controls are configurable via environment variables. See [SECURITY.md](../SECURITY.md#environment-variables-reference) for the complete reference.

---

## Sweep Subsystem Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Hono API Server                     │
│   /wallet  /price  /sweep  /consolidate  /bridge     │
│              │ x402 Payment Middleware │               │
└──────┬───────┴───────────┬────────────┴──────────────┘
       │                   │
       ▼                   ▼
┌──────────────┐   ┌──────────────────┐
│   Redis      │   │   BullMQ Queues   │
│   Cache +    │   │   sweep-execute   │
│   Rate Limit │   │   sweep-track     │
│              │   │   bridge-execute  │
│              │   │   bridge-track    │
└──────────────┘   └────────┬─────────┘
                            │
                   ┌────────┴─────────┐
                   │  Bridge Aggregator │
                   │  6 Providers:      │
                   │  Across, Stargate, │
                   │  Hop, cBridge,     │
                   │  Socket, Synapse   │
                   └────────┬──────────┘
                            │
                   ┌────────┴─────────┐
                   │   viem Clients    │
                   │   (per chain)     │
                   └────────┬──────────┘
                            │
                   ┌────────┴─────────┐
                   │  EVM Chains (8+)  │
                   │  BSC, ETH, ARB,   │
                   │  OP, POLY, BASE,  │
                   │  AVAX, FTM        │
                   └───────────────────┘
```

---

## See Also

- [Getting Started](getting-started.md) — Quick setup guide
- [MCP Servers](mcp-servers.md) — Deep dive into each server
- [Agents](agents.md) — Complete agent catalog
