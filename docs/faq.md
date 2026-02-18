# Frequently Asked Questions

Honest answers to common questions about the BNB Chain AI Toolkit.

> **Don't know a term?** Check the [Glossary](GLOSSARY.md). **Having a technical problem?** See [Troubleshooting](troubleshooting.md).

---

## General

<details>
<summary><b>What is this project?</b></summary>

BNB Chain AI Toolkit is an open-source collection of AI agents, MCP servers, market data tools, DeFi utilities, wallet tools, and Web3 standards — all focused on the BNB Chain ecosystem.

In simplest terms: it gives AI assistants (like Claude, ChatGPT) the ability to interact with blockchains, trade on exchanges, and analyze crypto data — instead of just talking *about* crypto.

For a full non-technical explanation, see [What Is This?](what-is-this.md).

</details>

<details>
<summary><b>Do I need to know how to code?</b></summary>

**It depends on what you want to do:**

| Goal | Coding Required? |
|------|:----------------:|
| Use pre-built agents in Claude/ChatGPT | No — just copy-paste the system prompt |
| Start an MCP server | Minimal — you need to run a few terminal commands |
| Fetch market data in your app | Yes — basic TypeScript/JavaScript |
| Create custom agents | No — just edit JSON files |
| Extend MCP servers | Yes — TypeScript knowledge |
| Deploy smart contracts | Yes — Solidity knowledge |

The [Getting Started](getting-started.md) guide walks through everything step by step.

</details>

<details>
<summary><b>Is this free?</b></summary>

Yes. The entire toolkit is open source under the MIT license. You can use, modify, and distribute it freely — including for commercial purposes.

Some external services have their own pricing:
- **CoinGecko API** — Free tier (30 calls/min), Pro for higher limits
- **Binance API** — Free, but exchange trading has trading fees
- **RPC endpoints** — Free public nodes included, paid nodes for higher reliability

</details>

<details>
<summary><b>What's the difference between agents, MCP servers, and tools?</b></summary>

This is the most important distinction:

| Component | What It Is | Analogy |
|-----------|-----------|---------|
| **Agent** | A personality/expertise definition (JSON text) | A job description for an expert |
| **MCP Server** | A running program that connects AI to external data | The phone and computer the expert uses |
| **Tool** | A single action an MCP server can perform | One button on a remote control |

**They work together:** You load an agent (expertise) into Claude, connect an MCP server (tools), and the agent uses the tools to answer your questions with real data.

**They also work independently:** You can use agents without MCP servers (for theoretical/educational advice) or MCP servers without agents (Claude uses its built-in knowledge to call tools).

</details>

<details>
<summary><b>Is this free?</b></summary>

Yes. The entire toolkit is open source under the MIT license. You can use, modify, and distribute it freely.

Some external services (like CoinGecko Pro API or Binance exchange) may have their own pricing.

</details>

<details>
<summary><b>Which AI assistants does this work with?</b></summary>

| Assistant | MCP Support | Agent Support |
|-----------|:-----------:|:------------:|
| Claude Desktop | ✅ | ✅ |
| Claude Code | ✅ | ✅ |
| ChatGPT | ❌ (use API) | ✅ |
| GitHub Copilot | ✅ | ✅ |
| Cursor | ✅ | ✅ |
| Any LLM API | Via wrapper | ✅ |

</details>

<details>
<summary><b>Which blockchains are supported?</b></summary>

**Primary focus:** BNB Smart Chain (BSC), opBNB, BNB Greenfield

**Also supported:**  networks including Ethereum, Polygon, Arbitrum, Base, Optimism, Avalanche, Solana, and many more.

See the full list in the [Architecture](architecture.md) guide.

</details>

---

## Security

<details>
<summary><b>Is it safe to use?</b></summary>

The toolkit itself is open source and auditable. However, anything involving private keys or real money carries inherent risk.

**Safety guidelines:**
- Never share your private keys
- Start with testnet
- Start with small amounts
- Review transactions before confirming
- Use read-only API keys when possible

</details>

<details>
<summary><b>Does this store my private keys?</b></summary>

**No.** Private keys are provided via environment variables and never stored, logged, or transmitted by the toolkit. They stay in your local environment.

</details>

<details>
<summary><b>Has the code been audited?</b></summary>

Not yet. This is an open-source project and the code is available for anyone to review. We welcome security researchers to examine the codebase.

If you find a vulnerability, please follow the [Security Policy](../SECURITY.md).

</details>

---

## Technical

<details>
<summary><b>What are MCP servers?</b></summary>

MCP (Model Context Protocol) servers are bridges between AI assistants and external services. They expose "tools" that AI can call — like checking a wallet balance, placing a trade, or fetching news.

Think of them as APIs specifically designed for AI consumption.

Learn more: [MCP Servers Guide](mcp-servers.md).

</details>

<details>
<summary><b>What's the difference between agents and MCP servers?</b></summary>

| | Agents | MCP Servers |
|-|--------|-------------|
| **What** | Personality/expertise definitions | Live services with tools |
| **Format** | JSON files | Running processes |
| **Purpose** | Tell AI *how* to think about crypto | Let AI *do* things on-chain |
| **Needs internet?** | No | Yes |
| **Example** | "You are a PancakeSwap expert" | `getTokenBalance("BNB")` |

They work best together — agents provide the domain knowledge, MCP servers provide the tools.

</details>

<details>
<summary><b>Can I use this without BNB Chain?</b></summary>

Yes! While the toolkit focuses on BNB Chain, many components support other networks:
- Universal Crypto MCP supports  chains
- Agenti supports all EVM chains + Solana
- Market data works for all listed cryptocurrencies
- DeFi agents work cross-chain
- Wallet toolkit works with any EVM chain

</details>

<details>
<summary><b>What Node.js version do I need?</b></summary>

Node.js 18 or higher. We recommend using the latest LTS version.

Check your version: `node --version`

</details>

<details>
<summary><b>Can I use npm instead of bun?</b></summary>

Yes. Replace `bun install` with `npm install` and `bun start` with `npm start`. Everything works the same.

</details>

---

## Troubleshooting

<details>
<summary><b>bun install fails</b></summary>

1. Make sure bun is installed: `bun --version`
2. If not: `curl -fsSL https://bun.sh/install | bash`
3. Try deleting `node_modules` and re-running: `rm -rf node_modules && bun install`

</details>

<details>
<summary><b>MCP server won't start</b></summary>

1. Check that you're in the right directory: `cd mcp-servers/<server-name>`
2. Run `bun install` first
3. Check environment variables are set
4. Check Node.js version: `node --version` (need 18+)
5. See [Troubleshooting](troubleshooting.md) for more

</details>

<details>
<summary><b>Claude doesn't see the MCP tools</b></summary>

1. Make sure the server is running before opening Claude
2. Check your `claude_desktop_config.json` for typos (use `jq . config.json` to validate JSON)
3. **Fully** restart Claude Desktop (Cmd+Q / right-click tray → Quit, then reopen)
4. Check Claude Desktop logs for errors

Config file locations:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

</details>

> **More troubleshooting?** See the full [Troubleshooting](troubleshooting.md) guide for step-by-step diagnosis of every known issue.

---

## Concepts

<details>
<summary><b>What is BNB Chain?</b></summary>

BNB Chain is a family of blockchains built by Binance (one of the world's largest crypto exchanges). It includes:
- **BNB Smart Chain (BSC)** — The main chain for apps and DeFi (fast, cheap fees)
- **opBNB** — A Layer 2 that makes BSC even faster
- **BNB Greenfield** — A chain for decentralized file storage

This toolkit primarily targets these networks but supports  others.

See the [Glossary](GLOSSARY.md) for detailed definitions of these terms.

</details>

<details>
<summary><b>What is DeFi?</b></summary>

DeFi (Decentralized Finance) = financial services built on blockchains instead of traditional banks. Trading, lending, borrowing, earning interest — all run by smart contracts (automated programs) instead of companies.

The toolkit's agents specialize in different DeFi activities. See the [Glossary](GLOSSARY.md) for a full breakdown.

</details>

<details>
<summary><b>Can the AI lose my money?</b></summary>

**Not by itself.** The toolkit has several safety layers:

1. **Write operations require confirmation** — Claude asks before sending transactions
2. **Dry run by default** — Tools like the Dust Sweeper preview actions without executing
3. **No stored secrets** — Private keys stay in your local environment variables
4. **Testnet support** — Practice with fake money first

However, crypto carries inherent risks (market volatility, smart contract bugs, user error). Always start with small amounts and understand what you're authorizing.

</details>

<details>
<summary><b>How is this different from other crypto AI tools?</b></summary>

| Feature | This Toolkit | Most Others |
|---------|:----------:|:-----------:|
| Open source | ✅ | Often closed |
| Number of agents | 78 | 1-5 |
| MCP servers | 6 | 0-1 |
| Multi-chain support |  | 1-3 |
| Agent definitions as JSON | ✅ | Proprietary format |
| On-chain agent identity (ERC-8004) | ✅ | ❌ |
| Accessibility standard (W3AG) | ✅ | ❌ |
| 30+ language translations | ✅ | ❌ |

The toolkit is unusually comprehensive. Most crypto AI tools solve one problem; this one aims to cover the entire BNB Chain stack.

</details>

---

## Contributing

<details>
<summary><b>How can I contribute?</b></summary>

Many ways, no matter your skill level:

| Skill Level | How To Contribute |
|:-----------:|------------------|
| **Anyone** | Star the repo, report bugs, suggest features |
| **Writer** | Improve docs, fix typos, add translations |
| **Beginner dev** | Add new agents (just JSON editing) |
| **Intermediate dev** | Add market data sources, write tests |
| **Advanced dev** | Extend MCP servers, add chain support |
| **Researcher** | Improve ERC-8004 or W3AG standards |

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full details.

</details>

<details>
<summary><b>Can I add my own agents?</b></summary>

Absolutely! It takes about 5 minutes. See the [Agents Guide](agents.md#creating-your-own-agent) for step-by-step instructions.

The short version:
1. Copy `agents/bnb-chain-agents/agent-template.json`
2. Edit the fields (identifier, title, systemRole)
3. Run `bun run build`
4. Your agent is now in the index

</details>

<details>
<summary><b>Can I use this in my own product?</b></summary>

Yes. The MIT license allows commercial use, modification, and redistribution. Attribution is appreciated but not legally required.

</details>

---

## See Also

- [Glossary](GLOSSARY.md) — Every term explained simply
- [What Is This?](what-is-this.md) — Non-technical project overview
- [Getting Started](getting-started.md) — Install and set up
- [Troubleshooting](troubleshooting.md) — Detailed problem solving
- [Examples](examples.md) — Real-world usage patterns
