# Extras

> Supplementary materials for the BNB Chain AI Toolkit. Video and slide deck support what's already in the repo — the code is the submission.

## Demo Video

_Demo video to be recorded — link will be added here._

Suggested format: 3–5 minute walkthrough showing:

1. Agent browser UI at [bnb-chain-toolkit.vercel.app](https://bnb-chain-toolkit.vercel.app/)
2. MCP server connecting to Claude Desktop
3. AI executing a blockchain query via MCP
4. ERC-8004 agent registration on BSC at [erc8004.agency](https://erc8004.agency/)
5. Contract verification on BscScan

## Slide Deck

_Slide deck to be prepared — link will be added here._

Should cover: **Problem → Solution → Architecture → Demo → Onchain Proof → Roadmap**

## Live Deployments

| Deployment | URL | Description |
|---|---|---|
| Agent Browser | https://bnb-chain-toolkit.vercel.app/ | Browse 72+ AI agent definitions |
| ERC-8004 Agent Creator | https://erc8004.agency/ | Register AI agents as on-chain NFTs |
| UCAI Web Builder | https://mcp.ucai.tech | Convert any ABI to an MCP server |
| GitHub Repo | https://github.com/nirholas/bnb-chain-toolkit | Full source code |

## Onchain Proof Links

| Network | Contract | Explorer Link |
|---|---|---|
| BSC Mainnet | IdentityRegistry | [0x8004A169…a432](https://bscscan.com/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432) |
| BSC Mainnet | ReputationRegistry | [0x8004BAa1…b63](https://bscscan.com/address/0x8004BAa17C55a88189AE136b182e5fdA19dE9b63) |
| BSC Testnet | IdentityRegistry | [0x8004A818…d9e](https://testnet.bscscan.com/address/0x8004A818BFB912233c491871b3d84c89A494BD9e) |
| BSC Testnet | ReputationRegistry | [0x8004B663…713](https://testnet.bscscan.com/address/0x8004B663056A597Dffe9eCcC1965A193B7388713) |
| BSC Testnet | ValidationRegistry | [0x8004Cb1B…272](https://testnet.bscscan.com/address/0x8004Cb1BF31DAf7788923b405b754f57acEB4272) |
| BSC Testnet | First Deployment TX | [0xfc55d83d…962](https://testnet.bscscan.com/tx/0xfc55d83d20e6d92ff522f302fd3424d3fd5557f25c06f4bfc38ecf3246dc1962) |

> Contracts are deployed on 22 chains total — see `erc8004-agents/docs/contracts.md` for the full list.

## npm Packages

| Package | Install |
|---|---|
| BNB Chain MCP | `npx -y @nirholas/bnbchain-mcp` |
| Universal Crypto MCP | `npx -y @anthropic/universal-crypto-mcp` |

## Related Standards

| Standard | Description |
|---|---|
| ERC-8004 | On-chain AI agent identity & reputation protocol |
| W3AG | Web3 Accessibility Guidelines |

## Press & Community

_Add links to any tweets, blog posts, Discord discussions, or community feedback here as they become available._
