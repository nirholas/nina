# Contributing to BNB Chain AI Toolkit

Thanks for your interest in contributing! Every contribution — from fixing a typo to adding a new MCP server — helps make this toolkit better for everyone.

---

## Ways to Contribute

### 🐛 Report Bugs

Found something broken? [Open an issue](https://github.com/nirholas/bnb-chain-toolkit/issues/new) with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (Node.js version, OS)

### 💡 Suggest Features

Have an idea? Open an issue with the `enhancement` label. Describe:
- What problem it would solve
- How you imagine it working
- Why it would benefit others

### 🤖 Add a New Agent

1. Copy the template: `cp agents/bnb-chain-agents/agent-template.json agents/bnb-chain-agents/my-agent.json`
2. Edit the agent definition (see [Agents Guide](docs/agents.md#creating-your-own-agent))
3. Rebuild: `bun run build`
4. Submit a PR

### 🔌 Add or Improve an MCP Server

MCP servers live in `mcp-servers/`. Each server is self-contained with its own `package.json`.

### 📝 Improve Documentation

Documentation is in `docs/` and root-level `.md` files. Fix typos, add examples, clarify confusing sections — all welcome.

### ⭐ Star the Repo

The simplest contribution. It helps others discover the project.

---

## Pull Request Process

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR-USERNAME/bnb-chain-toolkit.git
cd bnb-chain-toolkit
bun install
```

### 2. Create a Branch

```bash
git checkout -b feat/my-improvement
# or
git checkout -b fix/bug-description
```

**Branch naming:**
- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code restructuring

### 3. Make Changes

- Follow the existing code style
- Update documentation if you change behavior
- Test your changes
- Keep commits focused and atomic

### 4. Commit

Use [gitmoji](https://gitmoji.dev/) prefixes:

```bash
git commit -m "✨ feat: add new PancakeSwap v4 agent"
git commit -m "🐛 fix: correct gas estimation in bnbchain-mcp"
git commit -m "📝 docs: improve MCP server setup guide"
git commit -m "♻️ refactor: simplify market data caching"
```

### 5. Push & PR

```bash
git push origin feat/my-improvement
```

Then [open a Pull Request](https://github.com/nirholas/bnb-chain-toolkit/pulls) with:
- Clear title describing the change
- Description of what and why
- Screenshots if relevant
- Link to related issues

---

## Development Setup

```bash
# Install dependencies
bun install

# Build agent index
bun run build

# Format agent JSON files
bun run format

# Lint TypeScript
bun run lint

# Run tests
bun run test

# Type check
bun run type-check
```

### Project Structure

```
bnb-chain-toolkit/
├── agents/          # Agent definitions (JSON)
├── mcp-servers/     # MCP server implementations
├── market-data/     # Market data libraries
├── defi-tools/      # DeFi utilities
├── wallets/         # Wallet tooling
├── standards/       # ERC-8004 & W3AG
├── docs/            # Documentation
├── src/             # Original agent source JSONs
├── scripts/         # Build tools
└── locales/         # Translation files
```

---

## Code Style

- **TypeScript** — Use strict mode, prefer interfaces over types
- **JSON** — 2-space indentation, trailing newline
- **Markdown** — One sentence per line in docs (easier diffs)
- **Commits** — Gitmoji prefix, imperative mood, keep under 72 chars

---

## Adding Translations

Agent translations live in `locales/`. To add a new language:

1. Copy an existing locale directory (e.g., `cp -r locales/en-US locales/xx-XX`)
2. Translate the JSON files
3. Run `bun run i18n:validate` to check for completeness

> Only translate `locales/zh-CN/` for development preview. CI handles the rest.

---

## Code of Conduct

Be respectful and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Questions?

Open an issue. There are no dumb questions — if something is confusing, it's a documentation bug.
