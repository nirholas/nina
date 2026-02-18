# Examples

Runnable scripts showcasing BNB Chain AI Toolkit capabilities.

> **Prerequisites:** [Bun](https://bun.sh) or Node.js 20+

## Quick Start

```bash
# From repository root
bun install

# Run any example
bun run examples/01-agent-discovery.ts
bun run examples/02-market-data.ts
bun run examples/03-mcp-client-demo.ts
```

## Examples

| # | Script | Description | Needs Keys? |
|---|--------|-------------|-------------|
| 01 | [agent-discovery](01-agent-discovery.ts) | Browse all 78 AI agents, filter by tag, inspect capabilities | No |
| 02 | [market-data](02-market-data.ts) | Live BNB/BTC/ETH prices and 24h market overview | No |
| 03 | [mcp-client-demo](03-mcp-client-demo.ts) | Simulates MCP tool calls (balance, gas, token info) | No |
| 04 | [erc8004-agent](04-erc8004-agent.ts) | Start an ERC-8004 agent with A2A protocol support | Optional |

## Agent Runtime Examples

For full agent examples with x402 payments and on-chain registration, see:

- [`agent-runtime/examples/simple-agent/`](../agent-runtime/examples/simple-agent/) — Minimal agent in 20 lines
- [`agent-runtime/examples/defi-agent/`](../agent-runtime/examples/defi-agent/) — DeFi trading agent with pricing
- [`agent-runtime/examples/paid-agent/`](../agent-runtime/examples/paid-agent/) — x402 micropayment agent
- [`agent-runtime/examples/multi-agent/`](../agent-runtime/examples/multi-agent/) — Multi-agent orchestration
