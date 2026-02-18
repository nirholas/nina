# BNB Chain AI Toolkit — Good Vibes Only: OpenClaw Edition

> 78 AI agents, 6 MCP servers, 900+ tools for BNB Chain, BSC, and opBNB.
> The most comprehensive open-source AI toolkit for the BNB Chain ecosystem.

## Track: Agent (AI Agent × Onchain Actions)

## On-Chain Proof

| Network | Contract | Address | Explorer |
|---------|----------|---------|----------|
| BSC Testnet | IdentityRegistry | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | [View](https://testnet.bscscan.com/address/0x8004A818BFB912233c491871b3d84c89A494BD9e) |
| BSC Testnet | ReputationRegistry | `0x8004B663056A597Dffe9eCcC1965A193B7388713` | [View](https://testnet.bscscan.com/address/0x8004B663056A597Dffe9eCcC1965A193B7388713) |
| BSC Testnet | ValidationRegistry | `0x8004Cb1BF31DAf7788923b405b754f57acEB4272` | [View](https://testnet.bscscan.com/address/0x8004Cb1BF31DAf7788923b405b754f57acEB4272) |
| BSC Mainnet | IdentityRegistry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` | [View](https://bscscan.com/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432) |
| BSC Mainnet | ReputationRegistry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` | [View](https://bscscan.com/address/0x8004BAa17C55a88189AE136b182e5fdA19dE9b63) |
| opBNB Testnet | IdentityRegistry | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | [View](https://testnet.opbnbscan.com/address/0x8004A818BFB912233c491871b3d84c89A494BD9e) |
| opBNB Testnet | ReputationRegistry | `0x8004B663056A597Dffe9eCcC1965A193B7388713` | [View](https://testnet.opbnbscan.com/address/0x8004B663056A597Dffe9eCcC1965A193B7388713) |
| opBNB Testnet | ValidationRegistry | `0x8004Cb1BF31DAf7788923b405b754f57acEB4272` | [View](https://testnet.opbnbscan.com/address/0x8004Cb1BF31DAf7788923b405b754f57acEB4272) |
| opBNB Mainnet | IdentityRegistry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` | [View](https://opbnbscan.com/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432) |
| opBNB Mainnet | ReputationRegistry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` | [View](https://opbnbscan.com/address/0x8004BAa17C55a88189AE136b182e5fdA19dE9b63) |

**Key Transaction(s):**
- First Deployment TX: [`0xfc55d83d...dc1962`](https://testnet.bscscan.com/tx/0xfc55d83d20e6d92ff522f302fd3424d3fd5557f25c06f4bfc38ecf3246dc1962) on BSC Testnet
<!-- Fill in additional agent registration TXs after demo/run-demo.ts is executed -->

> All addresses share the deterministic `0x8004` vanity prefix (CREATE2 via SAFE Singleton Factory).
> Full 24-chain deployment list: [`erc8004-agents/docs/contracts.md`](erc8004-agents/docs/contracts.md)

## Live Demo

- **Web App:** [bnb-chain-toolkit.vercel.app](https://bnb-chain-toolkit.vercel.app/)
- **Repository:** [github.com/nirholas/bnb-chain-toolkit](https://github.com/nirholas/bnb-chain-toolkit)

## What We Built

### The Problem
AI agents lack on-chain identity, reputation, and standardized tooling for blockchain interaction. Building AI × crypto requires stitching together fragmented libraries, writing custom integrations, and having no way to verify an agent's identity or track record.

### The Solution
BNB Chain AI Toolkit provides the **complete stack** for AI agents on BNB Chain:

| Layer | Component | What It Does |
|-------|-----------|-------------|
| **Identity** | ERC-8004 Contracts | On-chain agent registration (ERC-721 NFTs) with reputation & validation |
| **Runtime** | Agent Runtime SDK | A2A protocol, x402 micropayments, discovery, task execution |
| **Tools** | 6 MCP Servers | 900+ blockchain tools (swap, stake, deploy, bridge, market data, etc.) |
| **Knowledge** | 78 AI Agents | Specialized system prompts for every major BNB Chain protocol |
| **Creator** | ERC-8004 Agents App | Web app + CLI + SDKs to register agents on-chain in minutes |
| **Market Data** | Price & News | Real-time crypto prices, 200+ news sources, Fear & Greed Index |
| **DeFi Tools** | Dust Sweeper | Multi-chain token consolidation with gasless execution |
| **Standards** | W3AG + ERC-8004 | Open standards for agent identity and Web3 accessibility |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   AI Assistant                        │
│              (Claude, ChatGPT, etc.)                  │
├─────────────────────────────────────────────────────┤
│              Agent Runtime (ERC-8004)                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ Identity  │ │ A2A      │ │ x402     │ │ Tasks  │ │
│  │ On-chain  │ │ Protocol │ │ Payments │ │ Engine │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
├─────────────────────────────────────────────────────┤
│                  MCP Servers (6)                      │
│  ┌────────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ BNBChain   │ │ Binance  │ │ Universal Crypto │  │
│  │ (BSC/opBNB)│ │ (CEX)    │ │ (60+ chains)     │  │
│  └────────────┘ └──────────┘ └──────────────────┘  │
│  ┌────────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Binance.US │ │ Agenti   │ │ UCAI (ABI→MCP)   │  │
│  └────────────┘ └──────────┘ └──────────────────┘  │
├─────────────────────────────────────────────────────┤
│          BSC / opBNB / Greenfield / 60+ Chains       │
└─────────────────────────────────────────────────────┘
```

## How to Reproduce

### Quick Start (< 5 minutes)

```bash
# Clone
git clone https://github.com/nirholas/bnb-chain-toolkit.git
cd bnb-chain-toolkit

# Install
bun install  # or npm install

# Start the MCP server (gives AI agents 100+ BNB Chain tools)
cd mcp-servers/bnbchain-mcp
npm install && npm start

# Start an AI agent with on-chain identity
cd ../../agent-runtime
npm install
PRIVATE_KEY=0x... npm run start:dev
# (Without PRIVATE_KEY, runs in dev mode — no on-chain registration)
```

### Run the On-Chain Demo

```bash
cd demo
npm install
export PRIVATE_KEY=0x...  # Needs tBNB from faucet
npm run demo
# Registers an agent on BSC Testnet and prints tx hashes
```

### Use with Claude Desktop

```json
{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": { "BSC_RPC_URL": "https://bsc-dataseed.binance.org" }
    }
  }
}
```

## AI Build Log

This project was built using AI-assisted development:
- **Claude Code** — Architecture design, implementation, code review
- **GitHub Copilot** — Code completion, bug fixing
- **Cursor** — Multi-file refactoring

The AI tools were used for accelerating development, not for generating boilerplate. All architectural decisions, protocol designs (ERC-8004, W3AG), and smart contract logic were human-directed.

See [docs/AI_BUILD_LOG.md](docs/AI_BUILD_LOG.md) for the full log.

## Team

- **nich** ([@nichxbt](https://x.com/nichxbt)) — Builder, BNB Chain ecosystem

## Links

| Resource | URL |
|----------|-----|
| Repository | https://github.com/nirholas/bnb-chain-toolkit |
| Live Demo | https://bnb-chain-toolkit.vercel.app |
| npm | [@nirholas/bnbchain-mcp](https://www.npmjs.com/package/@nirholas/bnbchain-mcp) |
| ERC-8004 Spec | [standards/erc-8004/](https://github.com/nirholas/bnb-chain-toolkit/blob/main/standards/erc-8004/) |
| Judges Guide | [JUDGES.md](JUDGES.md) |

---

## License

MIT © [nirholas](https://github.com/nirholas)
