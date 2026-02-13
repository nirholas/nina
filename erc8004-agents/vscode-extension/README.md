# ERC-8004 Agent Manager — VSCode Extension

> Create, manage, and discover ERC-8004 AI agents directly from Visual Studio Code.

![VSCode](https://img.shields.io/badge/VSCode-1.85+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)

## Features

### 🤖 Agent Explorer Sidebar

Browse your registered agents in the Activity Bar:
- Connected wallet address and balance
- Current chain indicator
- Expandable agent cards with services, metadata, and reputation

### 📋 Command Palette

Access all agent operations from `Ctrl+Shift+P`:

| Command | Description |
|---------|-------------|
| `ERC-8004: Register New Agent` | Opens the agent creator webview |
| `ERC-8004: View Agent` | View agent details by token ID |
| `ERC-8004: Update Agent URI` | Update metadata for existing agent |
| `ERC-8004: Search Agents` | Search/discover agents on-chain |
| `ERC-8004: Switch Chain` | Change connected EVM chain |
| `ERC-8004: Generate .well-known Files` | Create agent-card.json, ai-plugin.json |
| `ERC-8004: Export Agent Config` | Export agent as JSON |
| `ERC-8004: Connect Wallet` | Connect via private key (stored securely) |
| `ERC-8004: Open Dashboard` | Full agent dashboard webview |
| `ERC-8004: View Reputation` | View reputation scores and feedback |

### 🔗 Status Bar

Shows connected chain and agent count. Click to switch chains.

### 🔍 Code Lens & Hover

Detects `0x8004` contract addresses in your code and shows:
- **Hover**: Agent details, explorer links, quick actions
- **Code Lens**: "View Agent" and "Check Reputation" inline buttons

### ✂️ Snippets

Code snippets for quick development:

| Prefix | Language | Description |
|--------|----------|-------------|
| `erc8004-register` | Solidity | Agent registration contract |
| `erc8004-reputation` | Solidity | Reputation submission contract |
| `erc8004-interface` | Solidity | Identity Registry interface |
| `erc8004-register` | TypeScript/JS | ethers.js registration |
| `erc8004-view` | TypeScript/JS | ethers.js agent viewing |
| `erc8004-agent-card` | TypeScript | Agent card object template |
| `erc8004-register` | Python | web3.py registration |
| `erc8004-view` | Python | web3.py agent viewing |
| `erc8004-agent-card` | JSON | agent-card.json template |
| `erc8004-registration` | JSON | Registration metadata template |
| `erc8004-ai-plugin` | JSON | ai-plugin.json template |

### 🌐 Webview Panels

- **Agent Creator**: Full 4-step wizard for agent registration
- **Dashboard**: Overview of all your agents with stats
- **Reputation Viewer**: Rating breakdown and feedback history

## Supported Chains

| Chain | ID | Contract |
|-------|----|----------|
| BSC Testnet | 97 | `0x8004A818...BD9e` |
| BSC Mainnet | 56 | `0x8004A169...a432` |
| Ethereum Sepolia | 11155111 | `0x8004A818...BD9e` |
| Ethereum Mainnet | 1 | `0x8004A169...a432` |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `erc8004.defaultChain` | `bsc-testnet` | Default blockchain network |
| `erc8004.rpcUrl` | (auto) | Custom RPC endpoint |
| `erc8004.explorerUrl` | (auto) | Custom block explorer URL |
| `erc8004.autoConnect` | `false` | Auto-connect wallet on startup |
| `erc8004.gasMultiplier` | `1.2` | Gas estimation multiplier |

## Security

- Private keys are stored in VSCode SecretStorage (encrypted)
- Keys never leave your machine
- No telemetry or external data collection

## Development

```bash
cd vscode-extension
npm install
npm run watch    # Development build with watch
npm run build    # Production build
npm run package  # Create .vsix
```

## License

MIT
