# BNB Chain AI Toolkit — Development Guidelines

> 78 AI agents, 6 MCP servers, 1,100+ tools for BNB Chain, BSC, opBNB, and  networks.

## Project Overview

BNB Chain AI Toolkit is a monorepo containing AI agent definitions, MCP servers, market data libraries, DeFi tools, wallet utilities, and Web3 standards — all focused on the BNB Chain ecosystem.

## Project Structure

```
bnb-chain-toolkit/
├── agents/                  # AI agent definitions (JSON)
│   ├── bnb-chain-agents/    # 36 BNB Chain-specific agents
│   └── defi-agents/         # 42 general DeFi agents
├── mcp-servers/             # 6 Model Context Protocol servers
│   ├── bnbchain-mcp/        # BNB Chain + EVM (TypeScript)
│   ├── binance-mcp/         # Binance.com exchange (TypeScript)
│   ├── binance-us-mcp/      # Binance.US (TypeScript)
│   ├── universal-crypto-mcp/#  networks (TypeScript)
│   ├── agenti/              # Universal EVM + Solana (TypeScript)
│   └── ucai/                # ABI-to-MCP generator (Python)
├── market-data/             # Market data services
├── defi-tools/              # DeFi utilities (dust sweeper)
├── wallets/                 # Wallet tooling
├── standards/               # ERC-8004 + W3AG
├── docs/                    # Documentation
├── src/                     # Original agent source JSONs
├── scripts/                 # Build pipeline
└── locales/                 # 30+ translations
```

## Commands

```bash
bun install           # Install dependencies
bun run build         # Build agent index (src/ → public/index.json)
bun run format        # Format agent JSONs
bun run lint          # Lint TypeScript
bun run test          # Run tests
bun run type-check    # Type checking
bun run i18n:validate # Validate translations
```

## Terminal Management

- **Always use background terminals** (`isBackground: true`) for every command so a terminal ID is returned
- **Always kill the terminal** after the command completes, whether it succeeds or fails — never leave terminals open
- Do not reuse foreground shell sessions — stale sessions block future terminal operations in Codespaces
- In GitHub Codespaces, agent-spawned terminals may be hidden — they still work. Do not assume a terminal is broken if you cannot see it
- If a terminal appears unresponsive, kill it and create a new one rather than retrying in the same terminal

## Key Design Decisions

- Agent definitions are JSON for portability — no code execution
- Each MCP server is self-contained with its own dependencies
- Components are independent — use any subset without the rest
- BNB Chain focus but chain-agnostic architecture

## Contributing

- Git commit messages use gitmoji prefixes
- Follow existing code patterns and style
- Update docs when changing behavior
- See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines

