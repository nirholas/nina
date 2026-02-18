# What Is This?

A simple explanation for people who aren't developers.

---

## The Short Version

**BNB Chain AI Toolkit** is a collection of tools that lets AI assistants (like Claude, ChatGPT, and others) interact with cryptocurrency and blockchain technology — specifically the BNB Chain ecosystem built by Binance.

Think of it like giving your AI assistant a crypto wallet, a trading terminal, and a financial advisor — all at once.

---

## What Problems Does It Solve?

### Before This Toolkit

If you wanted an AI to help you with crypto:
- You'd have to manually copy-paste data between your wallet and ChatGPT
- The AI couldn't actually *do* anything — it could only give advice
- Each tool (trading, portfolio tracking, news) required separate setup
- Nothing worked together

### After This Toolkit

- AI assistants can directly read blockchain data, check prices, and execute trades
- Everything is in one place — agents, servers, data, tools
- Works with multiple AI platforms (Claude, ChatGPT, and more)
- Supports 60+ blockchain networks, not just BNB Chain

---

## The Main Components (In Plain English)

### 1. AI Agents (78)

**What they are:** Pre-built "personality profiles" for AI assistants. Each one is specialized for a specific crypto task.

**Real-world analogy:** Think of hiring 78 different financial experts. One knows everything about PancakeSwap (a crypto exchange), another is a staking specialist, another tracks whale wallets, and so on.

**Example agents:**
- 🥞 **PancakeSwap Trader** — Helps you trade tokens on PancakeSwap
- 🏦 **Venus Protocol Expert** — Knows lending and borrowing inside out
- 📊 **Portfolio Analyst** — Tracks your crypto portfolio performance
- 🔍 **Security Auditor** — Checks if a token or contract is safe

### 2. MCP Servers (6)

**What they are:** Bridges between AI assistants and blockchain networks. "MCP" stands for Model Context Protocol — it's a standard way for AI tools to connect to external services.

**Real-world analogy:** If AI agents are the experts, MCP servers are the phone lines that let them actually call the blockchain and get real data.

**The 6 servers:**
| Server | What It Connects To |
|--------|-------------------|
| BNB Chain MCP | BNB Smart Chain (BSC) + other EVM chains |
| Binance MCP | Binance.com exchange (trading, staking, etc.) |
| Binance US MCP | Binance.US (US-compliant) |
| Universal Crypto MCP | 60+ different blockchain networks |
| Agenti | EVM chains + Solana |
| UCAI | Turns any smart contract into an AI tool |

### 3. Market Data

**What it is:** Real-time cryptocurrency prices, news, and market sentiment.

- **Crypto Market Data** — Live prices from CoinGecko, DeFiLlama, and more
- **Crypto News** — Headlines from 200+ crypto news sources

### 4. DeFi Tools

**What it is:** Practical tools for managing your crypto.

- **Dust Sweeper** — Collects tiny leftover token balances (worth pennies each) and combines them into something useful

### 5. Wallets

**What it is:** Create and manage cryptocurrency wallets, completely offline if needed.

- Generate new wallets
- Sign transactions
- Import/export wallet files

### 6. Standards

**What they are:** Open specifications that make the crypto world better.

- **ERC-8004** — A system for AI agents to discover and trust each other on the blockchain
- **W3AG** — Guidelines for making crypto apps accessible to people with disabilities

---

## Who Is This For?

| You Are... | This Toolkit Helps You... |
|-----------|--------------------------|
| **An AI developer** | Add crypto capabilities to any AI assistant |
| **A crypto trader** | Automate trading strategies with AI |
| **A DeFi user** | Manage positions across protocols with AI help |
| **A researcher** | Analyze blockchain data with natural language |
| **A builder** | Create crypto-aware AI applications |
| **Just curious** | Learn how AI + crypto work together |

---

## How Does It Work?

```
You → AI Assistant (Claude, ChatGPT, etc.)
       ↓
     AI Agent (specialized crypto expert)
       ↓
     MCP Server (bridge to blockchain)
       ↓
     Blockchain (BNB Chain, Ethereum, etc.)
```

1. You ask your AI assistant a question like "What's my BNB balance?"
2. The AI uses an agent specialized in wallet queries
3. The agent talks to an MCP server that connects to BNB Chain
4. The blockchain returns your balance
5. The AI tells you the answer in plain English

---

## Is It Safe?

- **Open source** — Anyone can inspect the code
- **Your keys, your crypto** — Private keys never leave your machine
- **No tracking** — The toolkit doesn't collect any data about you
- **MIT licensed** — Free to use, modify, and share

---

## Next Steps

Ready to try it? Head to the [Getting Started](getting-started.md) guide.

Want more technical detail? Check the [Architecture](architecture.md) guide.
