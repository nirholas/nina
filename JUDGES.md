# Judges Guide

> Quick-start guide for hackathon evaluators. Get up and running in under 5 minutes.

---

## Option A: Just Visit the Live Demo (0 minutes)

**[bnb-chain-toolkit.vercel.app](https://bnb-chain-toolkit.vercel.app/)**

No setup needed. Browse agents, explore MCP servers, and see everything in action.

---

## Option B: Run Locally (5 minutes)

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/nirholas/bnb-chain-toolkit.git
cd bnb-chain-toolkit

# 2. Install dependencies
bun install

# 3. Start the development server
bun run dev
# → Opens at http://localhost:5173
```

That's it. The frontend works without any API keys.

---

## What to Look At

### 1. Agent Explorer (2 min)

On the live demo or local dev server:
- Browse **78 AI agents** organized by category
- Click any agent to see its full JSON definition
- Notice the depth: each agent has specialized prompts, tools, and configurations
- Check localized versions in `locales/` — **30+ languages**

### 2. MCP Servers (2 min)

Browse `mcp-servers/` — each is a self-contained server:

```
mcp-servers/
├── bnbchain-mcp/        # 100+ BNB Chain tools
├── binance-mcp/         # 478+ Binance exchange tools
├── binance-us-mcp/      # US-compliant access
├── universal-crypto-mcp/# 60+ network support
├── agenti/              # EVM + Solana universal MCP
└── ucai/                # ABI → MCP auto-generator
```

To test one locally:
```bash
cd mcp-servers/bnbchain-mcp
bun install
bun start
```

### 3. Agent Definitions (1 min)

Look at any agent JSON to see the structure:
```bash
cat agents/bnb-chain-agents/pancakeswap-expert.json | head -50
```

Each agent has:
- Specialized system prompt
- Tool configurations
- Protocol-specific knowledge
- Multi-language support

### 4. Original Standards (1 min)

- **ERC-8004** — `standards/` + `erc8004.md` — Agent discovery & trust protocol
- **W3AG** — `standards/` — Web3 Accessibility Guidelines

### 5. DeFi Tools (1 min)

```bash
# Dust sweeper — scans wallets for small token balances
ls defi-tools/sweep/

# Wallet toolkit
ls wallets/
```

### 6. Agent Runtime — ERC-8004 + A2A + x402 (2 min)

The agent runtime is a production-ready TypeScript SDK for autonomous AI agents:

```bash
cd agent-runtime
npm install

# Run the simple agent example (no private key needed for dev mode)
npm run start:simple

# Or the DeFi agent example
npm run start:defi
```

Key features:
- **A2A Protocol** — Agent-to-Agent communication with task routing
- **x402 Micropayments** — Pay-per-request via HTTP 402 responses
- **ERC-8004 On-Chain Identity** — Register agents as NFTs on BSC/opBNB
- **Discovery** — `.well-known/agent.json` endpoints for agent discovery

### 7. Market Data (1 min)

```bash
ls market-data/crypto-market-data/
ls market-data/crypto-news/
```

Zero-dependency price feeds and news aggregation from 200+ sources.

---

## Key Files to Review

| File | What It Shows |
|------|--------------|
| [README.md](README.md) | Full project overview |
| [HACKATHON.md](HACKATHON.md) | Hackathon submission details |
| [docs/architecture.md](docs/architecture.md) | System design |
| [CHANGELOG.md](CHANGELOG.md) | Development history |
| [PITCH.md](PITCH.md) | One-page pitch |
| [TEAM.md](TEAM.md) | Team info |
| [DEMO.md](DEMO.md) | Demo walkthrough |

---

## Evaluation Checklist

| Criteria | Where to Look |
|----------|--------------|
| **Innovation** | ERC-8004 standard, ABI-to-MCP generator (ucai), W3AG, Agent Runtime with A2A + x402 |
| **Technical Complexity** | 6 MCP servers, 900+ tools, 60+ chain support, agent-runtime SDK |
| **Completeness** | Full stack: agents, servers, data, tools, wallets, standards, runtime |
| **Usability** | Live demo, 30+ languages, comprehensive docs, 24-chain deployment |
| **Impact** | Enables any AI to interact with BNB Chain + 60 networks |
| **Code Quality** | TypeScript, tests, linting, CI/CD |
| **Documentation** | 12 docs, beginner-friendly guides, FAQ, troubleshooting |

---

## Questions?

- **GitHub Issues:** [github.com/nirholas/bnb-chain-toolkit/issues](https://github.com/nirholas/bnb-chain-toolkit/issues)
- **Twitter/X:** [@nichxbt](https://x.com/nichxbt)
