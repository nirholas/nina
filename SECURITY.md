# Security Policy

## Overview

BNB Chain AI Toolkit contains AI agent definitions (JSON), MCP server implementations (TypeScript/Python), market data libraries, wallet utilities, and documentation. Security is taken seriously given the financial nature of the tools.

## Reporting a Vulnerability

If you discover a security issue:

1. **DO NOT** open a public GitHub issue
2. Report via [GitHub Security Advisories](https://github.com/nirholas/bnb-chain-toolkit/security/advisories/new) (preferred)
3. Or email the maintainer directly
4. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
5. Allow reasonable time for a fix before public disclosure

## Security Considerations

### Private Keys & API Keys

- Private keys are **never** stored, logged, or transmitted by any component
- Keys are passed via environment variables and used only in memory
- The `.gitignore` excludes `.env` files by default
- Always use testnet keys during development

### MCP Servers

- MCP servers run locally on your machine
- No data is sent to external servers beyond the configured blockchain RPC and exchange APIs
- Review each server's source code before running
- Use read-only API keys when you don't need write access

### Smart Contracts (ERC-8004)

- Contracts in `standards/erc-8004/contracts/` are reference implementations
- They have **not been formally audited**
- Do not deploy to mainnet without independent audit
- Test thoroughly on testnet first

### Agent Definitions

- Agent JSON files contain system prompts, not executable code
- Review system prompts before using with any AI assistant
- Agents do not have inherent blockchain access — they need MCP servers

### Wallet Toolkit

- Designed for offline use (key generation, signing)
- Never transmits private keys over the network
- Verify wallet operations independently before trusting them with significant funds

## Best Practices

1. **Use testnet first** for all development and testing
2. **Review before running** — inspect any script before executing
3. **Limit API permissions** — use read-only API keys where possible
4. **Set IP restrictions** on exchange API keys
5. **Never commit secrets** — use environment variables or `.env` files
6. **Start small** — test with minimal amounts before scaling up
7. **Verify independently** — cross-check any financial calculations

## Supported Versions

| Version | Supported |
|---------|:---------:|
| v2.x    | ✅        |
| v1.x    | ❌        |

## Dependencies

- MCP server dependencies are listed in each server's `package.json`
- We monitor for known vulnerabilities via GitHub Dependabot
- Critical dependency updates are applied promptly
