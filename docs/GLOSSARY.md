# Glossary

Every term you'll encounter in this toolkit, explained in plain English.

Whether you're brand new to crypto, AI, or both — this page has you covered. Terms are organized by topic, with the simplest explanations first and technical details for those who want them.

---

## How to Use This Glossary

- **New to everything?** Read the [Basics](#basics) section first — it covers the foundational concepts.
- **Know crypto but not AI?** Jump to [AI & Agent Terms](#ai--agent-terms).
- **Know AI but not crypto?** Jump to [Blockchain & Crypto Terms](#blockchain--crypto-terms).
- **Looking for a specific term?** Use your browser's search (Ctrl+F / Cmd+F).

> **Tip:** Terms that appear **bold** in other docs link back here. If you see a word you don't recognize, check this page.

---

## Basics

These are the building blocks. If you're new, start here.

### Blockchain

A digital ledger (record book) that's shared across thousands of computers worldwide. Once something is written to a blockchain, it can't be changed or deleted. Think of it like a Google Sheet that everyone can read, nobody can edit after the fact, and no single person controls.

**Why it matters here:** This toolkit helps AI assistants read from and write to blockchains.

### Token

A digital asset on a blockchain. Tokens can represent money (like USDT), ownership (like an NFT), or voting power (like governance tokens). They're similar to digital coins, but more versatile.

**Common types:**
- **Coins** (BNB, ETH) — The "native currency" of a blockchain, used to pay transaction fees
- **Stablecoins** (USDT, USDC) — Tokens pegged to $1 USD
- **Utility tokens** (CAKE, XVS) — Tokens with specific uses in a protocol

### Wallet

Software (or hardware) that stores your private keys and lets you send/receive tokens. Your wallet doesn't actually "hold" tokens — it holds the keys that prove you own them on the blockchain.

**Analogy:** Your bank app doesn't hold cash — it holds your credentials to access your account. A crypto wallet works the same way.

### Transaction (TX)

An action recorded on the blockchain — like sending tokens, swapping coins, or interacting with a smart contract. Every transaction costs a small fee (called "gas").

### Gas

The fee you pay to use a blockchain. Just like postage for a letter, gas is the cost of having the network process your transaction. On BNB Chain, gas fees are paid in BNB and are typically very low (fractions of a cent).

### Address

A unique identifier on a blockchain, like a bank account number. Looks like: `0x1234...abcd`. You share your address to receive tokens. Anyone can see what an address holds, but they can't move funds without the private key.

### Private Key

A secret code that proves you own a wallet. **Never share your private key with anyone.** If someone has your private key, they can take everything in your wallet. Think of it as the master password to your bank account.

### Seed Phrase (Mnemonic)

A set of 12 or 24 words that can regenerate your private key. It's a human-readable backup of your wallet. Write it down on paper and store it in a safe place.

**Example:** `abandon ability able about above absent absorb abstract absurd abuse access accident`

---

## Blockchain & Crypto Terms

### BNB Chain

A family of blockchains built by Binance, one of the world's largest cryptocurrency exchanges. It includes:
- **BNB Smart Chain (BSC)** — The main blockchain for apps and tokens (fast, cheap fees)
- **opBNB** — A "Layer 2" that makes BSC even faster and cheaper
- **BNB Greenfield** — A blockchain for decentralized file storage

**Why it matters here:** This toolkit is primarily built for BNB Chain, though it supports  other networks.

### BSC (BNB Smart Chain)

The main BNB Chain blockchain where most DeFi activity happens. It's compatible with Ethereum tools and apps (because it's "EVM-compatible") but with faster transactions and lower fees.

### EVM (Ethereum Virtual Machine)

The "engine" that runs smart contracts on Ethereum and compatible blockchains. If a blockchain is "EVM-compatible" (like BSC), it can run the same apps as Ethereum. This is why many Ethereum tools also work on BNB Chain.

### Smart Contract

A program that lives on the blockchain and runs automatically when certain conditions are met. Think of it like a vending machine: you put in the right input (tokens), and it automatically gives you the right output (other tokens, an NFT, etc.) — no middleman needed.

### DeFi (Decentralized Finance)

Financial services (lending, borrowing, trading, earning interest) built on blockchains instead of traditional banks. Everything runs on smart contracts, so there's no company in the middle. You interact directly with the code.

**Key DeFi activities:**
- **Trading** — Swapping one token for another
- **Lending** — Depositing tokens to earn interest
- **Borrowing** — Taking a loan using crypto as collateral
- **Staking** — Locking up tokens to earn rewards
- **Yield farming** — Moving tokens between protocols to maximize returns

### DEX (Decentralized Exchange)

A platform for trading tokens directly from your wallet, without a company holding your funds. Examples: PancakeSwap, Uniswap. Unlike centralized exchanges (Binance, Coinbase), you always control your own tokens.

### CEX (Centralized Exchange)

A traditional crypto exchange run by a company (Binance, Coinbase, Kraken). You deposit funds to the exchange, and they handle trading for you. Easier for beginners but requires trusting the company with your funds.

### TVL (Total Value Locked)

The total amount of money deposited in a DeFi protocol. It's a common measure of how popular and trusted a protocol is. Higher TVL generally means more usage and liquidity.

### Liquidity

How easily a token can be bought or sold without significantly moving its price. High liquidity = easy to trade. Low liquidity = hard to trade, prices may slip.

### Slippage

The difference between the expected price of a trade and the actual price when the trade executes. Happens because prices change between when you submit a trade and when it's processed. Most tools let you set a "slippage tolerance" (e.g., 1%) to protect yourself.

### Dust

Tiny token balances in your wallet — often worth just pennies or a few cents. They accumulate from airdrops, incomplete trades, or DeFi rewards. Individually worthless, but the toolkit's Dust Sweeper can combine them into something useful.

### Bridge

A tool that moves tokens between different blockchains. For example, moving USDC from Ethereum to BNB Chain. Bridging is necessary because each blockchain is a separate network — tokens can't just "jump" between them.

### Airdrop

Free tokens sent to your wallet, usually as a marketing promotion or reward for using a protocol. Sometimes valuable, sometimes worthless "dust."

### NFT (Non-Fungible Token)

A unique digital asset on the blockchain. Unlike regular tokens (where each one is identical), each NFT is one-of-a-kind. Used for art, gaming items, memberships, and in this toolkit — agent identities (ERC-8004).

### RPC (Remote Procedure Call)

A way for your software to talk to a blockchain node. When the toolkit checks a wallet balance or sends a transaction, it's making RPC calls to a BSC node. Think of it as an API for the blockchain.

**Example RPC endpoint:** `https://bsc-dataseed.binance.org`

### ABI (Application Binary Interface)

A description of how to interact with a smart contract — what functions it has, what inputs they need, and what outputs they return. Think of it as the "instruction manual" for a contract.

**Why it matters here:** The UCAI tool can take any contract's ABI and automatically turn it into an AI-accessible MCP server.

### BEP-20

The token standard on BNB Smart Chain, similar to Ethereum's ERC-20. If a token is "BEP-20," it follows a specific set of rules that makes it compatible with BSC wallets and exchanges.

### Wei / Gwei

The smallest unit of measurement for BNB/ETH. Like cents to dollars, or satoshis to Bitcoin.
- **1 BNB** = 1,000,000,000,000,000,000 wei (10^18)
- **1 Gwei** = 1,000,000,000 wei (used for gas prices)

### Layer 2 (L2)

A secondary blockchain built on top of a main chain (Layer 1) to make transactions faster and cheaper. opBNB is a Layer 2 for BNB Smart Chain.

---

## AI & Agent Terms

### AI Agent

A software personality defined by a set of instructions (a "system prompt") that shapes how an AI assistant behaves. In this toolkit, agents are JSON files that turn a general-purpose AI into a crypto specialist.

**Example:** Loading the "PancakeSwap Trader" agent makes Claude behave like a DEX trading expert with deep PancakeSwap knowledge.

### System Prompt

Hidden instructions given to an AI assistant before the conversation starts. They define the AI's personality, expertise, and behavior rules. You can't usually see them — they run "behind the scenes."

**In this toolkit:** Each agent's `systemRole` field is a system prompt you can give to any AI assistant.

### LLM (Large Language Model)

The AI technology behind assistants like Claude, ChatGPT, and Gemini. LLMs are trained on vast amounts of text and can understand and generate human language. They're the "brain" that agents run on.

### MCP (Model Context Protocol)

An open standard (created by Anthropic) that lets AI assistants connect to external tools and data. Think of it as **USB for AI** — a universal plug that connects AI to databases, APIs, blockchains, or anything else.

**Without MCP:** AI can only talk. "The BNB price is probably around $600."
**With MCP:** AI can look things up. "The BNB price right now is $623.47."

**Why it matters here:** The toolkit's 6 MCP servers give AI assistants direct access to blockchains and exchanges.

### MCP Server

A running program that exposes "tools" via the MCP protocol. Each tool is a specific action the AI can take — like `getBalance`, `swapTokens`, or `getLatestNews`. The AI calls these tools during conversations.

### MCP Tool

A single action an MCP server can perform. Think of it as one button on a remote control.

**Examples:**
- `get_bnb_balance` — Check a wallet's BNB balance
- `swap_tokens` — Swap one token for another on a DEX
- `get_price` — Get the current price of a cryptocurrency

### Hallucination

When an AI makes something up and presents it as fact. Without MCP tools, AI might "hallucinate" a wrong token price. With MCP tools, it can check the actual price on-chain — drastically reducing errors.

### Context Window

The amount of text an AI can "remember" in a single conversation. Larger context windows allow longer, more detailed conversations. When context runs out, the AI "forgets" earlier parts of the conversation.

### Temperature

A setting that controls how creative/random an AI's responses are. Lower temperature (0.0-0.3) = more focused and predictable. Higher temperature (0.7-1.0) = more creative and varied. Agents in this toolkit set temperature based on their role — trading agents are low (precise), creative agents are higher.

### JSON (JavaScript Object Notation)

A text format for storing structured data. It looks like this:
```json
{
  "name": "PancakeSwap Trader",
  "type": "agent",
  "tools": ["swap", "liquidity", "farming"]
}
```
All agent definitions in this toolkit are JSON files.

---

## DeFi Protocol Terms

These terms relate to specific DeFi protocols supported by the toolkit's agents.

### PancakeSwap

The largest DEX on BNB Chain. Lets you swap tokens, provide liquidity, and farm yield. Think of it as the "Uniswap of BSC." The toolkit includes a dedicated PancakeSwap Trader agent.

### Venus Protocol

The leading lending/borrowing platform on BSC. Deposit tokens to earn interest, or borrow against your deposits. Similar to Aave on Ethereum.

### Liquid Staking

Staking your tokens while still being able to use them. Normally, staking locks your tokens. With liquid staking, you get a receipt token (like stkBNB) that represents your staked BNB — and you can use that receipt token in DeFi.

### Yield Farming

Moving your tokens between DeFi protocols to maximize returns (APY). Some protocols offer very high rewards to attract users. Yield farming involves finding and capitalizing on these opportunities.

### APY (Annual Percentage Yield)

The percentage return you'd earn in a year, including compound interest. An APY of 10% means $1,000 would grow to $1,100 in a year (if rates stay constant, which they usually don't).

### Impermanent Loss (IL)

A risk when you provide liquidity to a DEX. If the price of your deposited tokens changes significantly, you might end up with less value than if you had just held the tokens. Called "impermanent" because it reverses if prices return to their original levels.

### ve(3,3)

A tokenomics model where you lock tokens for voting power and earn a share of protocol fees. Used by platforms like Thena. The more you lock and the longer you lock for, the more influence and rewards you get.

### x402 Payment Protocol

A standard for machine-to-machine micropayments using HTTP. The toolkit's Dust Sweeper uses x402 for its API pricing — AI agents can pay for sweep services using USDC on Base chain.

---

## Standards Terms

### ERC-8004

An Ethereum standard (proposed by this project) for on-chain AI agent identity. It lets AI agents register themselves on the blockchain, build reputation, and discover other agents — all without relying on a central authority.

**Think of it as:** A "LinkedIn for AI agents" — but on the blockchain, so no one can fake credentials.

### W3AG (Web3 Accessibility Guidelines)

A set of guidelines (proposed by this project) for making crypto and DeFi applications accessible to people with disabilities. Based on WCAG (web accessibility standards) but tailored for Web3-specific challenges like gas estimation, wallet connections, and token approvals.

### CREATE2

A way to deploy smart contracts to a predictable address. Instead of getting a random address, you can calculate the exact address beforehand. The ERC-8004 contracts all share the `0x8004` prefix because they were deployed using CREATE2.

### ERC-721

The standard for NFTs on Ethereum-compatible blockchains. In this toolkit, ERC-8004 agent identities are minted as ERC-721 NFTs — each agent gets a unique, verifiable on-chain identity.

---

## Infrastructure Terms

### Monorepo

A single repository that contains multiple projects. This toolkit is a monorepo — agents, MCP servers, market data, and tools all live in one repo instead of being scattered across many separate repositories.

### Runtime

The environment where code executes. "Edge Runtime" means code can run on Cloudflare Workers or Vercel Edge Functions — extremely fast, globally distributed servers.

### Docker

A tool that packages software into isolated "containers" that run the same way everywhere. The toolkit includes Docker support for easy deployment.

### Redis

A fast, in-memory database. Used by the Dust Sweeper for caching and rate limiting.

### BullMQ

A job queue system. The Dust Sweeper uses BullMQ to process sweep and bridge operations as background jobs — so you don't have to wait for each step.

### Hono

A lightweight web framework (like Express, but faster). The Dust Sweeper's API is built with Hono.

### viem

A TypeScript library for interacting with EVM blockchains. Used throughout the toolkit to make blockchain calls.

---

## Quick Reference Table

| Term | One-line Definition |
|------|-------------------|
| ABI | Instruction manual for a smart contract |
| Address | Your account number on the blockchain |
| Agent | An AI personality specialized in one domain |
| Airdrop | Free tokens sent to your wallet |
| APY | Annual percentage return on an investment |
| BEP-20 | Token standard on BNB Smart Chain |
| Bridge | Tool that moves tokens between blockchains |
| BSC | BNB Smart Chain — BNB Chain's main network |
| CEX | Centralized exchange (Binance, Coinbase) |
| DeFi | Financial services on blockchains |
| DEX | Decentralized exchange (PancakeSwap, Uniswap) |
| Dust | Tiny leftover token balances |
| ERC-8004 | On-chain AI agent identity standard |
| EVM | Engine that runs smart contracts |
| Gas | Fee for using the blockchain |
| Hallucination | When AI makes up incorrect information |
| JSON | Text format for structured data |
| L2 | Layer 2 — faster blockchain built on top of L1 |
| LLM | Large Language Model (Claude, ChatGPT, etc.) |
| Liquidity | How easily a token can be traded |
| MCP | Universal protocol connecting AI to tools |
| NFT | Unique digital asset on the blockchain |
| Private key | Secret code that controls your wallet |
| RPC | Interface for talking to blockchain nodes |
| Seed phrase | Backup words for your wallet |
| Slippage | Price difference during a trade |
| Smart contract | Auto-executing program on the blockchain |
| Staking | Locking tokens to earn rewards |
| Token | Digital asset on a blockchain |
| TVL | Total money deposited in a DeFi protocol |
| Wallet | Software that manages your crypto keys |
| W3AG | Web3 accessibility guidelines |
| Yield farming | Moving tokens between protocols for returns |

---

## Still Lost?

- Start with [What Is This?](what-is-this.md) for a big-picture overview
- Read the [Getting Started](getting-started.md) guide for hands-on setup
- Check the [FAQ](faq.md) for common questions
- Open an [issue](https://github.com/nirholas/bnb-chain-toolkit/issues) if something isn't clear enough — we'll add it here
