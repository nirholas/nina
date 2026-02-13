# ERC-8004 Agent Search & Discovery Service

Full-text search, filtering, ranking, and real-time WebSocket feed for on-chain AI agents registered via the [ERC-8004](https://erc8004.agency) standard.

## Features

- **Multi-chain indexing** — BSC, BSC Testnet, Ethereum, Sepolia
- **Full-text search** — Name, description, services, and metadata
- **Reputation ranking** — Weighted scoring (relevance + reputation + recency)
- **Filtering** — By chain, service type, minimum reputation, owner
- **Real-time feed** — WebSocket push for new registrations and updates
- **SQLite storage** — Persistent, single-file database
- **Docker ready** — One-command deployment

## Quick Start

```bash
# Install dependencies
npm install

# Development (with ts-node / bun)
npx ts-node src/index.ts
# or
bun run src/index.ts

# Production build
npx tsc --outDir dist
node dist/index.js
```

### Docker

```bash
docker compose up -d
```

## API Reference

### Search Agents

```
GET /api/agents?q=defi&chain=56&service=chat&minReputation=70&limit=20&offset=0
```

| Parameter      | Type   | Description                    |
| -------------- | ------ | ------------------------------ |
| `q`            | string | Free-text search query         |
| `chain`        | string | Chain ID or name (e.g. `56`)   |
| `service`      | string | Service type filter            |
| `minReputation`| number | Minimum reputation score (0-100) |
| `owner`        | string | Owner address filter           |
| `limit`        | number | Results per page (max 200)     |
| `offset`       | number | Pagination offset              |

Response:

```json
{
  "results": [
    {
      "chainId": 56,
      "tokenId": 1,
      "name": "My Agent",
      "description": "A DeFi assistant",
      "owner": "0x...",
      "services": [{ "type": "chat", "url": "https://..." }],
      "reputationScore": 85,
      "relevanceScore": 0.942
    }
  ],
  "total": 142,
  "limit": 20,
  "offset": 0,
  "query": "defi"
}
```

### Get Agent

```
GET /api/agents/:chainId/:tokenId
```

### Get Agents by Owner

```
GET /api/agents/owner/:address
```

### Reputation

```
GET /api/reputation/:chainId/:tokenId
```

### Statistics

```
GET /api/stats
```

Returns total agents, breakdown by chain and service type, and supported chains.

### Health Check

```
GET /api/health
```

## WebSocket Feed

Connect to `ws://localhost:3100/api/feed` for real-time events:

```javascript
const ws = new WebSocket("ws://localhost:3100/api/feed");
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  // msg.type: "agent_registered" | "agent_updated" | "reputation_updated" | "ping"
  console.log(msg.type, msg.data);
};
```

## Configuration

| Environment Variable | Default                  | Description            |
| -------------------- | ------------------------ | ---------------------- |
| `PORT`               | `3100`                   | HTTP/WS port           |
| `DB_PATH`            | `./data/agents.db`       | SQLite database path   |
| `POLL_INTERVAL`      | `15000`                  | Chain poll interval ms |
| `BSC_TESTNET_RPC`    | Public RPC               | Custom RPC URL         |
| `BSC_RPC`            | Public RPC               | Custom RPC URL         |
| `ETHEREUM_RPC`       | Public RPC               | Custom RPC URL         |
| `SEPOLIA_RPC`        | Public RPC               | Custom RPC URL         |

## Architecture

```
src/
├── index.ts              # Entry point
├── api/
│   ├── routes.ts         # REST endpoints
│   └── websocket.ts      # Real-time feed
├── indexer/
│   ├── listener.ts       # Chain event listener
│   ├── metadata.ts       # Metadata fetcher/parser
│   └── reputation.ts     # Reputation updater
├── search/
│   ├── engine.ts         # MiniSearch full-text engine
│   ├── filters.ts        # Post-search filtering
│   └── ranking.ts        # Weighted ranking
├── storage/
│   ├── database.ts       # SQLite persistence
│   └── cache.ts          # In-memory TTL cache
└── utils/
    └── chains.ts         # Chain configurations
```

## License

MIT — Part of [BNB Chain AI Toolkit](https://github.com/bnb-chain/bnb-chain-toolkit)
