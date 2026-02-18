# BNB Chain AI Toolkit — Demo

End-to-end demonstration of on-chain AI agent registration and execution on BSC Testnet.

## Prerequisites

- Node.js 18+
- A BSC Testnet wallet with tBNB ([faucet](https://www.bnbchain.org/en/testnet-faucet))

## Quick Start

```bash
cd demo
npm install

# Set your private key (with tBNB on BSC Testnet)
export PRIVATE_KEY=0x...

# Run the on-chain demo
npm run demo
```

## What It Does

1. **Registers an AI agent** as an ERC-721 NFT on the ERC-8004 IdentityRegistry (BSC Testnet)
2. **Stores agent metadata** on-chain (MCP server, A2A endpoint)
3. **Queries the blockchain** to verify the agent's identity and reputation
4. **Prints transaction hashes** as on-chain proof

## Live Agent Demo

```bash
# Start a real AI agent with on-chain identity
export PRIVATE_KEY=0x...
npm run demo:agent

# In another terminal:
curl http://localhost:3000/health
curl http://localhost:3000/.well-known/agent.json
```

## Contract Addresses (BSC Testnet)

| Contract | Address |
|----------|---------|
| IdentityRegistry | `0x8004A818BFB912233c491871b3d84c89A494BD9e` |
| ReputationRegistry | `0x8004B663056A597Dffe9eCcC1965A193B7388713` |
| ValidationRegistry | `0x8004Cb1BF31DAf7788923b405b754f57acEB4272` |
