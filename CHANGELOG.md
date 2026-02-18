# Changelog

All notable changes to the BNB Chain AI Toolkit are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-02-18

### Added

#### opBNB Chain Support (Chain ID: 204 + 5611)

- **ERC-8004 Contracts deployed on opBNB** — Both mainnet (204) and testnet (5611) with deterministic `0x8004` vanity addresses via CREATE2
- **CLI support for 26 chains** — Expanded from 6 to 26 chains: BSC, opBNB, Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, Linea, Scroll, zkSync Era, Mantle, Fantom, Gnosis, Celo, Moonbeam (testnets + mainnets)
- **opBNB in erc8004-agents web app** — Full chain support in the agent creator UI
- **Agent Runtime SDK** — Production-ready TypeScript runtime with A2A protocol, x402 micropayments, ERC-8004 on-chain identity, and discovery endpoints

#### Documentation & Submission

- **JUDGES.md** — Enhanced evaluator guide with agent runtime walkthrough
- **contracts.md** — 24-chain deployment list (up from 22) including opBNB
- **HACKATHON.md** — Complete on-chain proof table with opBNB testnet + mainnet
- **Docker support** — Server environment configuration for docker-compose

### Security

#### Critical

- **Command injection fix** — `auto-submit.ts` scripts (both copies) replaced `execSync` with `execFileSync` using argument arrays; added strict regex validation (`^[a-zA-Z0-9_-]+$`) for agent names and branch names

#### High

- **CORS hardening** — All HTTP servers (agent runtime, MCP servers, translate API, search service) now restrict cross-origin requests via `CORS_ORIGINS` / `CORS_ORIGIN` environment variables; wildcard only in dev mode
- **XSS prevention** — Replaced `innerHTML` assignments with safe DOM APIs (`textContent`, `createElement`, `appendChild`) in web templates (3 locations) and VS Code extension webview
- **Input validation** — Deploy route enforces network allowlist, hex bytecode format, ABI array check, and constructor args limit (max 20); IPFS route validates CID format and enforces 5 MB content limit
- **SQL injection mitigation** — Search service escapes LIKE metacharacters (`%`, `_`, `\`) in user queries

#### Medium

- **Docker hardening** — Nginx and agent-runtime containers run as non-root users; Redis requires password and binds to localhost only
- **CSP tightening** — Removed `unsafe-eval` from nginx Content-Security-Policy; added `Permissions-Policy` and `strict-origin-when-cross-origin` referrer policy
- **Rate limiter fix** — Enabled `X-Forwarded-For` validation in production for all 4 rate limiters; proxy trust is now opt-in via `TRUST_PROXY` env var
- **Error handler** — Stack traces no longer leak in production; opt-in via `SHOW_STACK_TRACES` env var
- **API key masking** — Deploy marketplace script now masks API keys in log output

#### Low

- **WebSocket limits** — Search service enforces max 1,000 concurrent WebSocket connections (configurable via `MAX_WS_CONNECTIONS`)
- **Cache limits** — In-memory cache capped at 10,000 entries with LRU-style eviction (configurable via `MAX_CACHE_SIZE`)
- **Wallet warnings** — Python wallet toolkit displays security warnings when outputting private keys or mnemonics

---

## [2.0.0] - 2026-02-11

### Added

#### BNB Chain AI Toolkit v2.0 — Complete Monorepo Transformation

Consolidated 14 independent repositories into one comprehensive AI toolkit for BNB Chain:

**AI Agents (78)**
- 30 BNB Chain-specific agents (PancakeSwap, Venus, staking, bridging, etc.)
- 42 general DeFi agents with 18-language support

**MCP Servers (6)**
- `bnbchain-mcp` — BNB Chain + EVM operations (100+ tools)
- `binance-mcp` — Binance.com exchange (478+ tools)
- `binance-us-mcp` — Binance.US (US compliance)
- `universal-crypto-mcp` — 60+ networks (100+ tools)
- `agenti` — Universal EVM + Solana MCP
- `ucai` — ABI-to-MCP generator (Python)

**Market Data**
- `crypto-market-data` — CoinGecko, DeFiLlama, Fear & Greed Index
- `crypto-news` — 200+ sources, 150+ API endpoints, sentiment analysis

**DeFi Tools**
- `sweep` — Multi-chain dust sweeper (8 chains)

**Wallets**
- `ethereum-wallet-toolkit` — Offline-capable, BSC-compatible wallet operations

**Standards**
- `erc-8004` — Agent discovery & trust protocol (Solidity contracts + demo)
- `w3ag` — Web3 Accessibility Guidelines

**Documentation**
- Comprehensive docs/ directory with 12 guides
- Beginner-friendly "What Is This?" guide
- Progressive complexity (non-technical → advanced)
- Animated SVG header
- ASCII art README
- Full FAQ, troubleshooting, examples, awesome list

**Meta Files**
- `llms.txt` and `llms-full.txt` for AI discovery
- `CITATION.cff` for academic citation
- `humans.txt` for human-readable credits
- Agent instruction files for all major AI coding assistants
- Comprehensive SECURITY.md, CONTRIBUTING.md

### Changed

- Renamed from `defi-agents` to `BNB Chain AI Toolkit`
- Package name: `@nirholas/bnb-chain-ai-toolkit`
- Complete README rewrite with ASCII art + SVG header
- Updated all branding across meta files

---

## [1.1.0] - 2025-12-21

### Added

#### Master Agent for Simplified UX

- **sperax-portfolio** — All-in-one cryptocurrency portfolio management master agent
  - Combines ALL 16 portfolio plugin features into ONE comprehensive agent
  - Portfolio tracking, trading automation, DeFi protocols, analytics
  - Recommended as primary agent for most use cases

### Changed

- **Total Agents**: 57 → 58 (added master agent)

---

## [1.0.0] - 2025-12-21

### Added

#### Initial Release

- 57 AI agent definitions
- JSON Schema validation
- 18-language translation support
- Build pipeline (format, build, validate)
- Vercel deployment
- GitHub Pages support
- SEO optimization
- API documentation

#### Agent Categories

- 16 Sperax Portfolio Plugin agents
- 7 Core Sperax agents
- 34 General DeFi agents

---

[2.0.0]: https://github.com/nirholas/bnb-chain-toolkit/compare/v1.0.0...v2.0.0
[1.1.0]: https://github.com/nirholas/bnb-chain-toolkit/releases/tag/v1.1.0
[1.0.0]: https://github.com/nirholas/bnb-chain-toolkit/releases/tag/v1.0.0
