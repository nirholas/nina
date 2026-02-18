# Hackathon Submission

> **BNB Chain AI Toolkit** — The most comprehensive open-source AI toolkit for BNB Chain

---

## Project Name

**BNB Chain AI Toolkit**

## Tagline

72+ AI agents, 6 MCP servers, 900+ tools for BNB Chain and 60+ networks.

## Links

| Resource | URL |
|----------|-----|
| **Live Demo** | [bnb-chain-toolkit.vercel.app](https://bnb-chain-toolkit.vercel.app/) |
| **GitHub Repo** | [github.com/nirholas/bnb-chain-toolkit](https://github.com/nirholas/bnb-chain-toolkit) |
| **Demo Video** | _[Insert link to demo video]_ |
| **Pitch Deck** | _[Insert link to slides]_ |

---

## Problem Statement

Building AI-powered applications on BNB Chain is fragmented and painful:

- **No unified tooling** — developers piece together disparate libraries
- **AI can't interact with blockchains** — LLMs are blind to on-chain data
- **Complex DeFi interactions** — each protocol requires specialized knowledge
- **Multi-chain complexity** — supporting 60+ chains requires separate integrations
- **No accessibility standards** — Web3 excludes users with disabilities

## Solution

BNB Chain AI Toolkit is a **single open-source repository** containing everything needed to build AI-powered blockchain applications:

| Component | What It Does |
|-----------|-------------|
| **72+ AI Agents** | Pre-built agent definitions for every major BNB Chain protocol |
| **6 MCP Servers** | Give AI assistants (Claude, GPT, etc.) direct blockchain access |
| **900+ Tools** | On-chain operations, trading, market data, wallets |
| **60+ Chain Support** | BSC, opBNB, Ethereum, Solana, and 57 more chains |
| **2 Original Standards** | ERC-8004 (agent trust) + W3AG (accessibility) |
| **30+ Languages** | Localized agent definitions for global reach |

---

## How It Works

```
User → AI Assistant (Claude/GPT) → MCP Server → Blockchain (BSC/opBNB/60+ chains)
                                  ↓
                            AI Agent Definition
                            (specialized prompt + tools)
                                  ↓
                            Market Data / DeFi Tools / Wallets
```

1. **User asks** a natural language question about DeFi, trading, or blockchain
2. **AI agent** provides domain expertise (e.g., PancakeSwap trading strategies)
3. **MCP server** executes on-chain operations (swaps, transfers, queries)
4. **Market data** enriches responses with real-time prices and sentiment
5. **Result** is returned in plain English — no technical knowledge required

---

## Key Features

### 1. AI Agents (72+)
- **30 BNB Chain agents** — PancakeSwap, Venus, staking, bridging, NFTs, governance
- **42 DeFi agents** — Portfolio management, trading, yield farming, security auditing
- JSON-based definitions — portable across any AI platform

### 2. MCP Servers (6)
- **bnbchain-mcp** — 100+ tools for BSC, opBNB, Greenfield
- **binance-mcp** — 478+ tools for Binance.com exchange
- **binance-us-mcp** — US regulatory-compliant access
- **universal-crypto-mcp** — 60+ networks with unified API
- **agenti** — EVM + Solana with AI-to-AI payments (x402)
- **ucai** — Turn any smart contract ABI into an MCP server automatically

### 3. Market Data
- Real-time prices from CoinGecko and DeFiLlama
- 200+ news sources with sentiment analysis
- Fear & Greed Index integration

### 4. DeFi Tools
- Multi-chain dust sweeper (8 chains)
- Ethereum wallet toolkit (offline-capable)

### 5. Original Standards
- **ERC-8004** — On-chain agent discovery, reputation, and trust protocol
- **W3AG** — Web3 Accessibility Guidelines for inclusive DeFi

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | TypeScript, Python |
| **Runtime** | Node.js, Bun |
| **Frontend** | React 19, Vite, Tailwind CSS |
| **Blockchain** | ethers.js, viem, Solana web3.js |
| **Protocol** | Model Context Protocol (MCP) |
| **Deployment** | Vercel, Docker |
| **Testing** | Vitest |

---

## What Makes This Unique

| # | Differentiator | Why It Matters |
|---|---------------|----------------|
| 1 | **Most comprehensive BNB Chain AI toolkit** | No other project covers the full stack — agents, MCP, market data, tools, standards |
| 2 | **Production-ready MCP servers** | 6 servers with 900+ tools, ready to plug into Claude, GPT, or any LLM |
| 3 | **Two original Web3 standards** | ERC-8004 (agent trust) and W3AG (accessibility) — novel research contributions |
| 4 | **Real, working DeFi tools** | Dust sweeper, wallet toolkit, market data — not just demos |
| 5 | **72+ specialized agents** | Fine-tuned for every major BNB Chain protocol |
| 6 | **30+ language translations** | Most globally accessible AI agent toolkit |
| 7 | **Fully open source (MIT)** | Complete transparency, community-driven |

---

## Challenges We Overcame

1. **Consolidation** — Merged 14 independent repositories into a single coherent monorepo
2. **MCP compatibility** — Built servers compatible with multiple AI assistants (Claude, GPT, Copilot)
3. **Multi-chain abstraction** — Unified interface across 60+ heterogeneous blockchains
4. **ABI-to-MCP generation** — Automated tool generation from any smart contract ABI
5. **Accessibility standards** — Created W3AG from scratch for an underserved Web3 need

---

## Future Roadmap

- [ ] Agent runtime for autonomous execution
- [ ] On-chain agent registry via ERC-8004
- [ ] AI-to-AI payment protocol integration
- [ ] Mobile SDK for agent interactions
- [ ] More chain support (Cosmos, Move-based chains)
- [ ] Community agent marketplace

---

## How to Test

```bash
# Clone and install
git clone https://github.com/nirholas/bnb-chain-toolkit.git
cd bnb-chain-toolkit
bun install && bun run build

# Visit the live demo
open https://bnb-chain-toolkit.vercel.app/

# Or start an MCP server locally
cd mcp-servers/bnbchain-mcp && bun install && bun start
```

See [JUDGES.md](JUDGES.md) for a step-by-step testing guide for evaluators.

---

## Team

See [TEAM.md](TEAM.md) for team information.

---

## License

MIT © [nirholas](https://github.com/nirholas)
