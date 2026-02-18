# Examples

Real-world usage patterns for the BNB Chain AI Toolkit, organized by difficulty.

> **How to use this page:** Each example lists what you need, shows the code or conversation, and explains what happens. Start with Beginner and work up.

| Difficulty | What It Means |
|:----------:|--------------|
| 🟢 Beginner | No coding needed, or very simple commands |
| 🟡 Intermediate | Some setup required, basic code |
| 🔴 Advanced | Multiple components, scripting, or on-chain operations |

---

## 🟢 Beginner Examples

### Check a BNB Balance (No Code)

**What you need:** BNB Chain MCP server connected to Claude Desktop (see [Getting Started](getting-started.md#your-first-mcp-server))

**How it works:**

> **You:** What's the BNB balance of 0xF977814e90dA44bFA03b6295A0616a897441aceC?
>
> **Claude:** That address holds 1,234,567.89 BNB (approximately $768 million at current prices). This appears to be a Binance cold wallet.

**Behind the scenes:**
```
Your question → Claude → get_balance tool → BSC RPC → Real balance → Claude's answer
```

**What you learned:** Claude didn't guess. It called the MCP server, which queried the actual blockchain, and returned a real number.

---

### Get Today's Crypto Prices

**What you need:** Market Data component

```typescript
import { CoinGecko } from '@nirholas/crypto-market-data';

const prices = await CoinGecko.getPrices(['bitcoin', 'binancecoin', 'ethereum']);
console.log(prices);
// Expected output: { bitcoin: 95000, binancecoin: 620, ethereum: 3200 }
```

**What you learned:** The market data library fetches real-time prices with one function call. No API key needed for basic usage.

### Read the Latest Crypto News

**What you need:** Crypto News API

```bash
# Start the news server
cd market-data/crypto-news && bun start

# Fetch headlines
curl http://localhost:3000/api/news/latest | jq '.[0:5] | .[].title'
```

**Expected output:** A list of 5 recent crypto headlines.

---

### Check Market Sentiment (No Code)

**What you need:** BNB Chain MCP server connected to Claude

> **You:** What's the current crypto market sentiment? Is it a good time to buy?
>
> **Claude:** The Fear & Greed Index is currently at 35 (Fear). The BNB price is down 3.2% over the past 7 days. Major BNB Chain protocols show stable TVL. While "fear" periods have historically been favorable for long-term buying, this is not financial advice — always assess your own risk tolerance.

**What you learned:** Claude combines multiple data sources (sentiment index, price history, TVL) into a single coherent answer.

---

## 🟡 Intermediate Examples

### Set Up a Portfolio Tracking Agent

**What you need:** Agents + Market Data components
**Time:** 5 minutes

1. Load the portfolio agent:
```bash
cat agents/defi-agents/src/portfolio-analyst.json | jq '.systemRole'
```

2. Use it as Claude's system prompt in a Project

3. Ask questions like:
   - "My portfolio: 10 BNB, 5000 USDT, 2 ETH. How am I doing?"
   - "What's the total value and 24h change?"
   - "Should I rebalance?"

### Swap Tokens on PancakeSwap via AI

**What you need:** BNB Chain MCP + PancakeSwap Trader agent
**Time:** 10 minutes (first time setup), 30 seconds after that

1. Start the MCP server
2. Load the PancakeSwap agent
3. Ask: *"Swap 0.1 BNB for CAKE on PancakeSwap"*

**What happens step by step:**

The AI will:
1. Get the current price quote from PancakeSwap
2. Calculate expected output and check slippage
3. Show you the trade details and **ask for your confirmation**
4. Only after you say "yes" — execute the swap
5. Return the transaction hash so you can verify on BscScan

> **Safety note:** The AI always asks for confirmation before executing on-chain transactions. If you're nervous, use testnet first.

---

### Monitor BNB Chain DeFi TVL

**What you need:** Market Data component
**Time:** 2 minutes

```typescript
import { DeFiLlama } from '@nirholas/crypto-market-data';

// Get TVL for major BNB Chain protocols
const protocols = ['pancakeswap', 'venus', 'alpaca-finance', 'biswap'];
for (const p of protocols) {
  const tvl = await DeFiLlama.getProtocolTvl(p);
  console.log(`${p}: $${(tvl / 1e9).toFixed(2)}B`);
```

**Expected output:**
```
pancakeswap: $2.15B
venus: $1.83B
alpaca-finance: $0.32B
biswap: $0.08B
```
}
```

---

## 🔴 Advanced Examples

### Multi-Server AI Trading Setup

**What you need:** Multiple API keys, Claude Desktop
**Time:** 15-20 minutes

Run all servers together for a complete AI trading terminal:

```json
{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": {
        "BSC_RPC_URL": "https://bsc-dataseed.binance.org",
        "PRIVATE_KEY": "${BSC_PRIVATE_KEY}"
      }
    },
    "binance": {
      "command": "npx",
      "args": ["-y", "@nirholas/binance-mcp"],
      "env": {
        "BINANCE_API_KEY": "${BINANCE_KEY}",
        "BINANCE_SECRET_KEY": "${BINANCE_SECRET}"
      }
    },
    "market": {
      "command": "node",
      "args": ["market-data/crypto-market-data/dist/mcp-server.js"]
    },
    "news": {
      "command": "node",
      "args": ["market-data/crypto-news/dist/mcp-server.js"]
    }
  }
}
```

Now ask Claude:
- *"What's the sentiment around BNB today? Check the news and fear & greed index."*
- *"Show me the best yield opportunities on BSC right now."*
- *"If BNB drops below $600, set up a buy order on Binance for 10 BNB."*

### Convert Any Contract to an AI Tool

Using UCAI to make any BSC contract AI-accessible:

```bash
# 1. Get the contract ABI (from BSCScan or your deployment)
curl "https://api.bscscan.com/api?module=contract&action=getabi&address=0xContractAddress" \
  | jq -r '.result' > MyContract.json

# 2. Generate MCP server
cd mcp-servers/ucai
ucai generate --abi ./MyContract.json --chain bsc --output ./my-contract-mcp

# 3. Start it
cd my-contract-mcp && python server.py

# 4. Add to Claude Desktop config
```

### Automated Dust Sweeping Pipeline

```bash
#!/bin/bash
# sweep-all-chains.sh — Run weekly via cron

CHAINS=("bsc" "ethereum" "polygon" "arbitrum" "base")
WALLET="0xYourAddress"

for chain in "${CHAINS[@]}"; do
  echo "Sweeping $chain..."
  cd defi-tools/sweep
  bun run sweep --wallet "$WALLET" --chain "$chain" --target USDC --threshold 5
done

echo "Done! All dust swept to USDC."
```

### Register an Agent On-Chain (ERC-8004)

```typescript
import { ethers } from 'ethers';
import { IdentityRegistry__factory } from '@erc-8004/contracts';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const registry = IdentityRegistry__factory.connect(REGISTRY_ADDRESS, wallet);

// Register your agent
const tx = await registry.registerAgent(
  'My Trading Agent',
  'Automated BNB/USDT grid trading bot',
  'https://my-agent.example.com/mcp',
  ethers.toUtf8Bytes(JSON.stringify({ version: '1.0', capabilities: ['trade', 'analyze'] }))
);
await tx.wait();
console.log('Agent registered on-chain!');
```

---

## Integration Patterns

These three patterns represent increasing levels of automation and risk. Start with Pattern 1 and work up as you gain confidence.

### Pattern 1: Read-Only Intelligence (Safest)

```
News API → AI Agent → Human-readable insights
```

**Use when:** You want analysis and insights without any risk. No blockchain writes, no trades, no wallet connections.

**Example prompts:**
- "Analyze the top 5 BNB Chain protocols by TVL"
- "What's the market sentiment today?"
- "Compare PancakeSwap vs Uniswap volume over the past week"

### Pattern 2: Monitored Trading (Recommended)

```
Market Data → AI Agent → Trade Recommendation → Human Approval → Exchange API
```

**Use when:** You want AI to find opportunities but you make the final call. AI suggests, human approves. Good for learning and trust-building.

**Example prompts:**
- "If BNB drops below $600, draft a limit buy order for me to review"
- "Find the best yield opportunities on BSC and show me before I deposit"
- "Scan my portfolio and suggest rebalancing moves — don't execute anything"

### Pattern 3: Autonomous Agent (Expert Only)

```
Market Data + Chain Data → AI Agent → Automated Execution → Exchange/Chain
```

**Use when:** You're experienced, understand the risks, and have proper safeguards (slippage limits, position size limits, stop losses). Fully automated — the AI acts without asking.

**Example prompts:**
- "Auto-compound my Venus lending rewards every 24 hours"
- "Run a grid trading strategy: buy every 2% dip, sell every 3% rise, max position 5 BNB"
- "Sweep dust tokens across all chains weekly and consolidate into USDC on BSC"

> **Warning:** Pattern 3 involves real money moving automatically. Never use Pattern 3 without thoroughly testing on testnet first. Start with tiny amounts. Set strict limits. Monitor logs.

---

## See Also

- [Glossary](GLOSSARY.md) — Definitions for terms used in these examples
- [Getting Started](getting-started.md) — Install and set up the toolkit
- [Agents](agents.md) — All 78 available agents
- [MCP Servers](mcp-servers.md) — Server setup and configuration
- [FAQ](faq.md) — Common questions
- [Troubleshooting](troubleshooting.md) — When examples don't work as expected
- [MCP Servers](mcp-servers.md) — Server setup details
- [Troubleshooting](troubleshooting.md) — When things go wrong
