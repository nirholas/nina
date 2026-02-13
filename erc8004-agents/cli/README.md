# ERC-8004 CLI

> Terminal-based management for ERC-8004 AI agents on BNB Chain and Ethereum.

![npm](https://img.shields.io/badge/npm-@nirholas/erc8004--cli-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)

## Installation

```bash
npm install -g @nirholas/erc8004-cli
```

## Quick Start

```bash
# Check supported chains and connectivity
erc8004 chains

# Register a new agent (interactive)
erc8004 register

# View an agent by token ID
erc8004 view 1

# List agents owned by an address
erc8004 list 0xYourAddress

# Search recent registrations
erc8004 search --limit 20

# Check reputation
erc8004 reputation 1
```

## Commands

### `erc8004 register`

Interactively register a new ERC-8004 agent.

```bash
erc8004 register [options]

Options:
  -c, --chain <chain>  Chain to register on (default: bsc-testnet)
  -k, --key <key>      Private key (or set ERC8004_PRIVATE_KEY)
```

Walks you through:
1. Agent name, description, and image URL
2. Service definitions (name, type, endpoint, method)
3. Trust mechanisms and x402 payment support
4. URI method (data URI or HTTPS URL)

### `erc8004 view <agentId>`

Display full agent details including metadata, services, trust, and registrations.

```bash
erc8004 view 1 --chain bsc-testnet
```

### `erc8004 list <owner>`

List all agents owned by an address.

```bash
erc8004 list 0xABC... --chain bsc-mainnet --limit 50
```

### `erc8004 search`

Search for recently registered agents with optional service type filter.

```bash
erc8004 search --service inference --limit 10 --chain bsc-testnet
```

### `erc8004 update <agentId>`

Update the metadata URI for an agent you own.

```bash
erc8004 update 1 --chain bsc-testnet --key $ERC8004_PRIVATE_KEY
```

### `erc8004 reputation <agentId>`

View reputation scores and recent feedback for an agent.

```bash
erc8004 reputation 1 --chain bsc-testnet --limit 20
```

### `erc8004 init`

Scaffold `.well-known/agent-card.json` and `ai-plugin.json` templates.

```bash
erc8004 init --dir ./my-agent
```

### `erc8004 chains`

List supported chains with live connectivity status.

```bash
erc8004 chains
```

## Configuration

Config is stored at `~/.erc8004/config.json`:

```json
{
  "defaultChain": "bsc-testnet",
  "privateKey": "0x..."
}
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ERC8004_PRIVATE_KEY` | Default private key (overrides config) |

## Supported Chains

| Chain | ID | Explorer |
|-------|----|----------|
| BSC Testnet | 97 | testnet.bscscan.com |
| BSC Mainnet | 56 | bscscan.com |
| Ethereum Sepolia | 11155111 | sepolia.etherscan.io |
| Ethereum Mainnet | 1 | etherscan.io |

## Development

```bash
cd cli
npm install
npm run build
npm link        # Link for local testing
erc8004 --help
```

## Security

- Private keys can be passed via environment variable or config file
- Config file permissions should be restricted: `chmod 600 ~/.erc8004/config.json`
- Never commit private keys to source control

## License

MIT
