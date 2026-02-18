# AI Agents Guide

Everything you need to know about the 78 AI agents — what they are, how to use them, and how to create your own.

> **New here?** An AI agent is just a set of instructions (a "personality") that makes a general-purpose AI act like a domain expert. No coding required to use them. See the [Glossary](GLOSSARY.md) for term definitions.

---

## What Are AI Agents?

AI agents are pre-configured personality definitions for AI assistants. Each agent is a JSON file that contains:

- **A specific role** — What it specializes in (trading, analysis, staking, etc.)
- **System prompt** — Instructions that shape how the AI behaves and what it knows
- **Tool access** — Which MCP tools it can use for real-time data
- **Knowledge** — Domain-specific context and expertise
- **Opening questions** — Suggested first questions to ask the agent

You load an agent into your AI assistant (Claude, ChatGPT, etc.), and it becomes a specialist in that domain.

**Analogy:** Loading an agent is like handing an expert a role card before a conversation. The expert (your AI) reads the card and acts accordingly — bringing the right knowledge, using the right tools, and giving domain-specific answers.

### What Agents Can NOT Do

- Agents don't *run* code — they're inert JSON text
- Agents don't access your wallet or keys — they need an MCP server for that
- Agents aren't magic — they improve AI accuracy in their domain but don't guarantee correct answers
- Agents don't learn between sessions — each conversation starts fresh

---

## Find the Right Agent for Your Task

Not sure which agent to use? Start with your goal:

| I Want To... | Best Agent(s) | Category |
|-------------|---------------|----------|
| Trade tokens on PancakeSwap | PancakeSwap Trader | BNB Chain |
| Earn interest on my crypto | Venus Protocol Expert, Binance Earn Specialist | BNB Chain |
| Stake BNB for rewards | BNB Staking Advisor, BNB Liquid Staking | BNB Chain |
| Check if a token is safe | BSC Smart Contract Auditor, BEP-20 Token Analyst | Security |
| Track whale wallets | BSC Whale Tracker | Intelligence |
| Bridge tokens between chains | BNB Bridge Expert, BNB Cross-Chain Bridge | Infrastructure |
| Trade futures on Binance | Binance Futures Expert | Trading |
| Manage a portfolio | BSC Portfolio Tracker | Portfolio |
| Get BNB Chain news and alpha | BNB Chain News Alpha | Intelligence |
| Build smart contracts on BSC | BSC Developer | Development |
| Optimize yields across DeFi | DeFi agents — Yield Optimization | DeFi |
| Set up a grid trading bot | DeFi agents — Trading Automation | DeFi |

---

## Agent Categories

### BNB Chain Agents (36)

Purpose-built for the BNB Chain ecosystem. Located in `agents/bnb-chain-agents/`.

| # | Agent | What It Does |
|---|-------|-------------|
| 1 | **PancakeSwap Trader** | DEX trading, liquidity, yield farming on PancakeSwap v3 |
| 2 | **Venus Protocol Expert** | Lending, borrowing, liquidation on Venus |
| 3 | **BNB Staking Advisor** | Liquid staking optimization across validators |
| 4 | **Binance Earn Specialist** | Savings, staking, Launchpool yields |
| 5 | **Binance Earn Advisor** | Personalized Binance Earn recommendations |
| 6 | **Binance Futures Expert** | Futures trading strategies on Binance |
| 7 | **Binance Spot Trader** | Spot trading execution on Binance |
| 8 | **BNB Chain Expert** | General BNB Chain ecosystem knowledge |
| 9 | **BNB DeFi Aggregator** | Cross-protocol DeFi aggregation on BNB Chain |
| 10 | **BEP-20 Token Analyst** | Token security, smart money tracking |
| 11 | **Binance Copy Trading** | Mirror top performers' strategies |
| 12 | **Greenfield Storage** | Decentralized storage on BNB Greenfield |
| 13 | **Thena DEX Expert** | ve(3,3) DEX trading on Thena |
| 14 | **BNB Liquid Staking** | stkBNB, BNBx, ankrBNB strategies |
| 15 | **BSC NFT Specialist** | NFT trading and analysis on BSC |
| 16 | **Binance Launchpad** | IEO and token sale participation |
| 17 | **opBNB Gaming Expert** | GameFi on opBNB |
| 18 | **BSC MEV Protection** | Front-running protection strategies |
| 19 | **BNB Chain Governance** | DAO voting and proposals |
| 20 | **BSC Smart Contract Auditor** | Contract security analysis |
| 21 | **BNB Chain News Alpha** | Real-time BNB Chain news, alpha signals |
| 22 | **BNB Cross-Chain Bridge** | Cross-chain bridging between BSC and other networks |
| 23 | **BNB RWA Stablecoin Expert** | Real-world asset tokenization and stablecoins |
| 24 | **BNB Token Launcher** | Token creation and launch strategies on BSC |
| 25 | **BSC Developer** | Smart contract development on BSC |
| 26 | **BSC Portfolio Tracker** | Portfolio tracking across BSC protocols |
| 27 | **BSC Whale Tracker** | Smart money and whale wallet monitoring |
| 28 | **BscScan Analytics** | On-chain analytics via BscScan |
| 29 | **CZ / Binance Expert** | Binance ecosystem knowledge and history |
| 30 | **Lista DAO Expert** | Lista DAO lending and liquid staking |
| 31 | **opBNB L2 Expert** | Layer 2 scaling on opBNB |
| 32 | **BNB Agent Builder** | Building and deploying AI agents for BNB Chain |
| 33 | **Binance Margin Expert** | Margin trading strategies on Binance |
| 34 | **Binance Web3 Wallet** | Binance Web3 Wallet operations |
| 35 | **Alpaca Finance Expert** | Leveraged yield farming on Alpaca Finance |
| 36 | **BNB Bridge Expert** | Cross-chain bridging (BSC ↔ opBNB ↔ L2s) |

### General DeFi Agents (42)

Cross-chain agents that work on any supported network. Located in `agents/defi-agents/`.

**Categories:**

| Category | Agents | Description |
|----------|--------|-------------|
| Portfolio Management | 8 | Tracking, rebalancing, tax, risk |
| Trading Automation | 7 | Grid, DCA, arbitrage, signals |
| Yield Optimization | 6 | Compounding, IL protection, rotation |
| Risk & Security | 5 | Auditing, rug detection, exposure |
| Market Intelligence | 5 | Sentiment, whale tracking, analytics |
| DeFi Protocols | 6 | Lending, DEX, derivatives |
| Infrastructure | 5 | Bridge, gas, RPC, indexing |

---

## How to Use an Agent

There are three ways to use agents, from simplest to most technical.

### Option 1: With Claude Desktop (Recommended for Beginners)

This is the easiest approach. No coding needed.

1. **Choose an agent** from the lists above
2. **Find the agent file** — e.g., `agents/bnb-chain-agents/pancakeswap-trader.json`
3. **Open the file** and copy the `systemRole` field (the long text string)
4. **In Claude Desktop**, create a new Project → click "Instructions" → paste the text
5. **Start chatting** — Claude now behaves like that agent

**What a conversation looks like with the PancakeSwap Trader agent loaded:**

> **You:** I want to swap 0.5 BNB for CAKE. What's the best route?
>
> **Claude (as PancakeSwap Trader):** Let me check the current rates on PancakeSwap v3.
>
> Based on current pricing:
> - **Direct route:** 0.5 BNB → ~12.3 CAKE (via BNB/CAKE pool)
> - **Split route:** 0.5 BNB → USDT → CAKE gives ~12.1 CAKE (slightly worse due to two swaps)
>
> I recommend the direct route. The BNB/CAKE v3 pool has $45M TVL and tight spreads. With 0.5% slippage tolerance, your minimum output would be ~12.24 CAKE.
>
> Want me to execute the swap?

### Option 2: With Any AI Platform

The `systemRole` field in each agent JSON works with any AI platform:

```json
{
  "identifier": "pancakeswap-trader",
  "meta": {
    "title": "PancakeSwap Trader",
    "description": "Expert DEX trading agent for PancakeSwap v3"
  },
  "systemRole": "You are a PancakeSwap trading expert..."
}
```

Copy the `systemRole` value and use it as a system prompt in:
- ChatGPT (Custom Instructions)
- Claude (Projects → Instructions)
- Gemini
- Any LLM API

### Option 3: Via the JSON API

After running `bun run build`, all agents are available at `public/index.json`:

```bash
# Get all agents
cat public/index.json | jq '.agents | length'  # → 78

# Find a specific agent
cat public/index.json | jq '.agents[] | select(.identifier == "pancakeswap-trader")'
```

---

## Agent JSON Format

Every agent follows this schema:

```json
{
  "identifier": "unique-agent-id",
  "author": "nirholas",
  "createdAt": "2025-12-21",
  "meta": {
    "title": "Agent Display Name",
    "description": "One-line description",
    "tags": ["defi", "trading", "bnb"],
    "avatar": "🥞",
    "category": "trading"
  },
  "config": {
    "model": "gpt-4o",
    "temperature": 0.7,
    "maxTokens": 4096
  },
  "systemRole": "You are a specialized AI agent that..."
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | string | Unique ID (kebab-case) |
| `meta.title` | string | Display name |
| `meta.description` | string | Short description |
| `systemRole` | string | The agent's personality and expertise |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.tags` | string[] | Searchable tags |
| `meta.avatar` | string | Emoji avatar |
| `meta.category` | string | Category for grouping |
| `config.model` | string | Preferred LLM model |
| `config.temperature` | number | Creativity (0-1) |

---

## Creating Your Own Agent

### Step 1: Copy the Template

```bash
cp agents/bnb-chain-agents/agent-template.json agents/bnb-chain-agents/my-agent.json
```

### Step 2: Edit the Definition

```json
{
  "identifier": "my-custom-agent",
  "meta": {
    "title": "My Custom Agent",
    "description": "A specialized agent for my use case",
    "tags": ["custom", "bnb"],
    "avatar": "🤖"
  },
  "systemRole": "You are an expert in [your domain]. You help users with [specific tasks]. You always [key behaviors]."
}
```

### Step 3: Rebuild the Index

```bash
bun run build
```

### Tips for Good System Prompts

1. **Be specific** — "You are a PancakeSwap v3 liquidity expert" beats "You know about DeFi"
2. **Define boundaries** — Tell the agent what it should NOT do
3. **Include context** — Reference specific protocols, contracts, or APIs
4. **Set tone** — Professional? Casual? Technical? Define it
5. **Add safety rails** — "Always warn about risks before recommending trades"

---

## Multi-Language Support

DeFi agents support 30+ languages:

| Language | Code | Status |
|----------|------|--------|
| English | en-US | ✅ Complete |
| Chinese (Simplified) | zh-CN | ✅ Complete |
| Japanese | ja-JP | ✅ Complete |
| Korean | ko-KR | ✅ Complete |
| Spanish | es-ES | ✅ Complete |
| French | fr-FR | ✅ Complete |
| German | de-DE | ✅ Complete |
| Portuguese (BR) | pt-BR | ✅ Complete |
| Russian | ru-RU | ✅ Complete |
| Arabic | ar | ✅ Complete |
| Turkish | tr-TR | ✅ Complete |
| Vietnamese | vi-VN | ✅ Complete |
| Thai | th-TH | ✅ Complete |
| Hindi | hi-IN | ✅ Complete |
| Polish | pl-PL | ✅ Complete |
| Italian | it-IT | ✅ Complete |
| Dutch | nl-NL | ✅ Complete |
| Indonesian | id-ID | ✅ Complete |
| Czech | cs-CZ | ✅ Complete |
| Danish | da-DK | ✅ Complete |
| Finnish | fi-FI | ✅ Complete |
| Greek | el-GR | ✅ Complete |
| Hebrew | he-IL | ✅ Complete |
| Hungarian | hu-HU | ✅ Complete |
| Malay | ms-MY | ✅ Complete |
| Norwegian | nb-NO | ✅ Complete |
| Romanian | ro-RO | ✅ Complete |
| Serbian | sr-RS | ✅ Complete |
| Swedish | sv-SE | ✅ Complete |
| Ukrainian | uk-UA | ✅ Complete |

---

## Understanding Agent + MCP Server Combos

Agents provide expertise, but they need MCP servers to access real data. Here are the most powerful combinations:

| Agent | + MCP Server | Result |
|-------|-------------|--------|
| PancakeSwap Trader | BNB Chain MCP | AI can quote and execute real DEX trades |
| Binance Futures Expert | Binance MCP | AI can place and manage futures positions |
| Portfolio Tracker | Universal Crypto MCP | AI tracks holdings across  chains |
| Security Auditor | BNB Chain MCP | AI can read contract code and check on-chain data |
| BNB Chain News Alpha | Crypto News MCP | AI cross-references news with on-chain activity |

> **Without an MCP server:** The agent gives theoretical advice based on its training data.
> **With an MCP server:** The agent can look up real-time data, verify claims, and execute actions.

---

## See Also

- [Glossary](GLOSSARY.md) — Definitions for terms used on this page
- [MCP Servers](mcp-servers.md) — Connect agents to blockchains for live data
- [Examples](examples.md) — Real-world agent usage patterns
- [Architecture](architecture.md) — How agents fit in the system
- [Getting Started](getting-started.md) — Install the toolkit first
