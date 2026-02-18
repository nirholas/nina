# MCP Servers Guide

How to set up and use the 6 Model Context Protocol servers — the core technology that connects AI to blockchains.

> **New to MCP?** Don't worry — this guide explains everything from scratch. Also see the [Glossary](GLOSSARY.md) for term definitions.

---

## What Is MCP?

**Model Context Protocol (MCP)** is an open standard (created by Anthropic) that lets AI assistants connect to external tools and data sources.

**The simplest way to understand MCP:** Without MCP, AI can only *talk about* crypto. With MCP, AI can *interact with* crypto.

| Without MCP | With MCP |
|------------|---------|
| "BNB is probably around $600" | "BNB is exactly $623.47 right now" |
| "You could try swapping on PancakeSwap" | *Actually executes the swap for you* |
| "I can't check your wallet" | "Your wallet has 1.5 BNB and 4 tokens" |

Think of MCP like **USB for AI** — a universal way to plug in new capabilities. Each MCP server exposes "tools" (individual actions the AI can call), and any MCP-compatible AI client can use them.

### How MCP Works (Simplified)

```
 You ask Claude a question
        │
        ▼
 Claude recognizes it needs real data
        │
        ▼
 Claude calls an MCP tool (e.g., "get_balance")
        │
        ▼
 The MCP server handles the request
   (talks to the blockchain, exchange, or API)
        │
        ▼
 Server returns the data to Claude
        │
        ▼
 Claude uses the data to answer you in plain English
```

This all happens in about 1-2 seconds, completely automatically.

### Which AI Assistants Support MCP?

| Assistant | MCP Support | Notes |
|-----------|:-----------:|-------|
| Claude Desktop | ✅ | First-class support |
| Claude Code | ✅ | CLI-based |
| GitHub Copilot | ✅ | Via extensions |
| Cursor | ✅ | Built-in |
| Windsurf | ✅ | Built-in |
| ChatGPT | ❌ | Not yet — use as API with wrapper |
| Any MCP client | ✅ | The protocol is open standard |

---

## Quick Setup

All MCP servers follow the same pattern:

```bash
# 1. Navigate to the server
cd mcp-servers/<server-name>

# 2. Install dependencies
bun install    # or npm install

# 3. Build (if needed)
bun run build  # or npm run build

# 4. Start the server
bun start      # or npm start
```

Then add it to your AI assistant's config (details for each server below).

> **Which server should I start with?** If you're on BNB Chain, start with **BNB Chain MCP** (#1 below). If you trade on Binance.com, start with **Binance MCP** (#2). If you work across many chains, try **Universal Crypto MCP** (#4).

---

## The 6 Servers

### 1. BNB Chain MCP

**Location:** `mcp-servers/bnbchain-mcp/`
**Tools:** 466+
**Best for:** BNB Smart Chain (BSC), opBNB, BNB Greenfield, Sperax Protocol, and 10+ EVM chains

#### What It Can Do

| Category | Examples |
|----------|---------|
| **Token Operations** | Transfer BNB/BEP-20, check balances, approve tokens |
| **DEX Trading** | Swap on PancakeSwap, add/remove liquidity |
| **Smart Contracts** | Deploy, read, write, verify contracts |
| **Chain Data** | Block info, transaction history, gas prices |
| **BNB Greenfield** | Upload/download files, manage buckets |
| **Staking** | Delegate BNB, check rewards, validator info |
| **Market Data** | CoinGecko prices, OHLCV, trending tokens |
| **DeFi Analytics** | DefiLlama TVL, yields, fees, protocols |
| **Social Sentiment** | LunarCrush metrics, influencers, trending |
| **DEX Analytics** | GeckoTerminal pools, trades, OHLCV |
| **Sperax Protocol** | USDs, SPA, veSPA, Demeter vaults (72 tools) |

#### Setup

```bash
cd mcp-servers/bnbchain-mcp
npm install
npm run build
```

**Claude Desktop config:**
```json
{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": {
        "PRIVATE_KEY": "your-private-key-here"
      }
    }
  }
}
```

#### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PRIVATE_KEY` | For writes | Wallet private key (for transactions) |
| `COINGECKO_API_KEY` | No | CoinGecko Pro API key |
| `LUNARCRUSH_API_KEY` | No | LunarCrush social sentiment API key |
| `CRYPTOCOMPARE_API_KEY` | No | CryptoCompare social data API key |
| `COINSTATS_API_KEY` | No | CoinStats API key |
| `UNIVERSAL_CRYPTO_API_KEY` | No | Tatum / Universal Crypto API key |
| `ARBITRUM_RPC_URL` | No | Arbitrum RPC for Sperax module |
| `PORT` | No | HTTP/SSE server port (default: 3001) |
| `LOG_LEVEL` | No | Logging level (DEBUG, INFO, WARN, ERROR) |

> **Security Note:** Never commit private keys. Use environment variables or a secrets manager.

---

### 2. Binance Exchange MCP

**Location:** `mcp-servers/binance-mcp/`
**Tools:** 554+
**Best for:** Trading on Binance.com, portfolio management, market data

#### What It Can Do

| Category | Examples |
|----------|---------|
| **Spot Trading** | Place orders, cancel orders, order history |
| **Futures Trading** | Open/close positions, set leverage, funding rates |
| **Margin Trading** | Borrow, repay, margin transfers |
| **Portfolio** | Balances, P&L, asset allocation |
| **Market Data** | Order books, candlesticks, ticker data |
| **Staking & Earn** | Stake, savings, Launchpool |
| **NFTs** | Browse, buy, list NFTs |
| **Sub-Accounts** | Create, manage, transfer between |

#### Setup

```bash
cd mcp-servers/binance-mcp
bun install
```

**Claude Desktop config:**
```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": ["-y", "@nirholas/binance-mcp"],
      "env": {
        "BINANCE_API_KEY": "your-api-key",
        "BINANCE_SECRET_KEY": "your-secret-key"
      }
    }
  }
}
```

#### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BINANCE_API_KEY` | Yes | Binance API key |
| `BINANCE_SECRET_KEY` | Yes | Binance API secret |

---

### 3. Binance US MCP

**Location:** `mcp-servers/binance-us-mcp/`
**Best for:** US-based users who need regulatory compliance

Same as Binance MCP but connects to Binance.US servers with US-compliant endpoints. Supports spot trading, staking, and wallet management.

#### Setup

```bash
cd mcp-servers/binance-us-mcp
bun install
```

---

### 4. Universal Crypto MCP

**Location:** `mcp-servers/universal-crypto-mcp/`
**Tools:** 59+
**Networks:** 
**Best for:** Multi-chain DeFi, cross-chain operations

#### What It Can Do

| Category | Examples |
|----------|---------|
| **Multi-Chain DEX** | Swap on any chain via aggregators |
| **Cross-Chain Bridging** | Bridge tokens between  networks |
| **DeFi Protocols** | Interact with lending, yield, derivatives |
| **Automated Trading** | Set up strategies across chains |
| **Portfolio Tracking** | Unified view across all chains |

#### Supported Networks (Partial List)

BSC, opBNB, Ethereum, Polygon, Arbitrum, Base, Optimism, Avalanche, Fantom, Gnosis, zkSync, Scroll, Linea, Mantle, Celo, Moonbeam, Harmony, Cronos, Aurora, NEAR, Solana, and 40+ more.

---

### 5. Agenti

**Location:** `mcp-servers/agenti/`
**Best for:** Simple EVM + Solana access with AI-to-AI payment support

#### What It Can Do

- All EVM chains: BSC, Ethereum, Polygon, Arbitrum, Base, Optimism
- Solana network support
- x402 payment protocol for AI-to-AI transactions
- Smart contract deployment and interaction

---

### 6. UCAI (ABI-to-MCP Generator)

**Location:** `mcp-servers/ucai/`
**Best for:** Converting any smart contract into an MCP server

#### What It Does

Takes a smart contract's ABI (Application Binary Interface) and automatically generates an MCP server that exposes every contract function as a tool.

```bash
# Install
pip install ucai

# Generate an MCP server from a contract ABI
ucai generate --abi ./MyContract.json --chain bsc --output ./my-mcp-server

# Start the generated server
cd my-mcp-server && python server.py
```

This means you can turn **any** deployed smart contract into an AI-accessible tool in seconds.

---

## Using Multiple Servers Together

You can run multiple MCP servers simultaneously:

```json
{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": { "BSC_RPC_URL": "https://bsc-dataseed.binance.org" }
    },
    "binance": {
      "command": "npx",
      "args": ["-y", "@nirholas/binance-mcp"],
      "env": {
        "BINANCE_API_KEY": "your-key",
        "BINANCE_SECRET_KEY": "your-secret"
      }
    },
    "market-data": {
      "command": "npx",
      "args": ["-y", "@nirholas/crypto-market-data"]
    }
  }
}
```

Now Claude can query BNB Chain, trade on Binance, and fetch market data — all in one conversation.

**Example prompt when all three are connected:**

> "Check the current BNB price, compare it to the 7-day average, and if it's more than 5% below the average, place a limit buy order for 1 BNB on Binance at the current price."

Claude will use the BNB Chain MCP for on-chain data, market data for the 7-day history, and Binance MCP to place the order — all in one response.

---

## Security Best Practices

These are critical if you're using real funds. If you're just exploring, you can skip to the next section.

| Practice | Why | How |
|----------|-----|-----|
| **Never commit API keys** | Anyone who finds them can use your accounts | Use `.env` files (already in `.gitignore`) |
| **Use read-only API keys** first | Prevents accidental trades while learning | In Binance: uncheck "Enable Trading" when creating a key |
| **Set IP restrictions** | Blocks unauthorized access even if keys leak | In Binance API settings: whitelist your IP |
| **Start on testnet** | Use fake money while learning | Set `BSC_RPC_URL` to a testnet endpoint |
| **Start with small amounts** | Limit potential losses from bugs or mistakes | Don't connect your main wallet until you're confident |
| **Review transactions before confirming** | AI can make mistakes; you are the final check | MCP servers request confirmation for write operations |

> **Full security reference:** [SECURITY.md](../SECURITY.md)

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|---------|
| "Connection refused" | Server not running | Run `bun start` in the server directory |
| "Invalid API key" | Env var not set or typo | Check: `echo $BINANCE_API_KEY` — is it set? |
| Claude doesn't show MCP tools | Config file error or Claude not restarted | Validate JSON in config file, fully restart Claude |
| "Rate limited" | Too many requests | Add delays, use caching, or upgrade API plan |
| "Transaction failed" | Insufficient gas or balance | Check wallet has enough BNB for gas fees |
| Server crash on start | Missing dependencies | Run `bun install` first, verify Node.js 18+ |
| "CORS error" | Server blocking your origin | Set `CORS_ORIGINS` env var — see [Troubleshooting](troubleshooting.md) |

> **More help:** See the full [Troubleshooting](troubleshooting.md) guide for in-depth solutions.

---

## See Also

- [Glossary](GLOSSARY.md) — Definitions for MCP, RPC, ABI, and other terms
- [Getting Started](getting-started.md) — Initial setup walkthrough
- [Agents](agents.md) — AI agents that use these servers (best when combined)
- [Examples](examples.md) — Real-world usage patterns
- [Architecture](architecture.md) — How MCP servers fit in the overall system
- [Troubleshooting](troubleshooting.md) — More debugging help
