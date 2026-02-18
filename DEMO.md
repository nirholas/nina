# Demo Guide

> How to see BNB Chain AI Toolkit in action.

---

## Live Demo

**[bnb-chain-toolkit.vercel.app](https://bnb-chain-toolkit.vercel.app/)**

The live demo showcases the agent explorer, MCP server documentation, and interactive components — no setup required.

---

## Running the Demo Locally

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+) or Node.js 20+
- Git

### Quick Start

```bash
# Clone
git clone https://github.com/nirholas/bnb-chain-toolkit.git
cd bnb-chain-toolkit

# Install dependencies
bun install

# Start the frontend
bun run dev
# → Opens at http://localhost:5173
```

### MCP Server Demo (Claude Desktop)

```bash
# Start the BNB Chain MCP server
cd mcp-servers/bnbchain-mcp
bun install
bun start
```

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": {
        "BSC_RPC_URL": "https://bsc-dataseed.binance.org"
      }
    }
  }
}
```

Then ask Claude: *"What's the current BNB price?"* or *"Show me the top PancakeSwap pools."*

---

## Demo Scenarios

### Scenario 1: Agent Explorer
1. Visit the live demo site
2. Browse the 78 agents organized by category
3. Click an agent to see its full definition, capabilities, and tools
4. Filter by protocol (PancakeSwap, Venus, etc.)

### Scenario 2: MCP Server + Claude
1. Configure Claude Desktop with the BNB Chain MCP server
2. Ask: *"What is the current gas price on BSC?"*
3. Ask: *"Get the top 10 tokens by market cap on BNB Chain"*
4. Ask: *"Show me PancakeSwap v3 liquidity pools"*

### Scenario 3: Market Data
```typescript
import { CoinGecko } from './market-data/crypto-market-data';

const btcPrice = await CoinGecko.getPrice('bitcoin');
console.log(`BTC: $${btcPrice.usd}`);
```

### Scenario 4: Dust Sweeper
```bash
cd defi-tools/sweep
bun install
bun run scan --wallet 0xYourAddress --chain bsc
```

---


