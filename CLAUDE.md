# BNB Chain AI Toolkit

> 78 AI agents, 6 MCP servers, 900+ tools for BNB Chain and 60+ networks.

## Project Structure

- `agents/` — 78 AI agent definitions (JSON)
- `mcp-servers/` — 6 MCP servers (TypeScript + Python)
- `market-data/` — Price feeds and news aggregation
- `defi-tools/` — Dust sweeper and DeFi utilities
- `wallets/` — Offline wallet operations
- `standards/` — ERC-8004 and W3AG specifications
- `docs/` — Comprehensive documentation

## Commands

```bash
bun install           # Install dependencies
bun run build         # Build agent index
bun run format        # Format agent JSONs
```

## Terminal Management

- **Always use background terminals** (`isBackground: true`) for every command so a terminal ID is returned
- **Always kill the terminal** after the command completes, whether it succeeds or fails — never leave terminals open
- Do not reuse foreground shell sessions — stale sessions block future terminal operations in Codespaces
- In GitHub Codespaces, agent-spawned terminals may be hidden — they still work. Do not assume a terminal is broken if you cannot see it
- If a terminal appears unresponsive, kill it and create a new one rather than retrying in the same terminal

