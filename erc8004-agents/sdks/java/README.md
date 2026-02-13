# ERC-8004 Java/Kotlin SDK

> JVM SDK for ERC-8004 Trustless AI Agent Registries using web3j.

## Installation

### Gradle

```groovy
implementation 'agency.erc8004:erc8004:0.1.0'
```

### Maven

```xml
<dependency>
    <groupId>agency.erc8004</groupId>
    <artifactId>erc8004</artifactId>
    <version>0.1.0</version>
</dependency>
```

## Quick Start (Java)

```java
import agency.erc8004.*;
import java.util.List;

var client = new ERC8004Client("bsc-testnet");

var meta = AgentMetadata.of("My Agent", "Built with Java SDK",
    List.of(
        AgentService.of("A2A", "https://agent.example.com/a2a"),
        AgentService.of("MCP", "https://agent.example.com/mcp")
    ));

String uri = client.buildAgentUri(meta);
System.out.println("URI: " + uri.substring(0, 80) + "...");

client.close();
```

## Quick Start (Kotlin)

```kotlin
import agency.erc8004.*

val client = ERC8004Client("bsc-testnet")

val meta = AgentMetadata.of("My Agent", "Built with Kotlin",
    listOf(AgentService.of("A2A", "https://agent.example.com/a2a")))

val uri = client.buildAgentUri(meta)
println("URI: ${uri.take(80)}...")

client.close()
```

## Supported Chains

| Name | Chain ID | Key |
|------|----------|-----|
| BSC Testnet | 97 | `bsc-testnet` |
| BSC Mainnet | 56 | `bsc` |
| Ethereum | 1 | `ethereum` |
| Sepolia | 11155111 | `sepolia` |

## API

### `ERC8004Client`

- `ERC8004Client(chainName)` — Create client
- `buildAgentUri(metadata)` — Encode as data URI
- `parseAgentUri(uri)` — Decode metadata URI
- `isConnected()` — Check RPC connection
- `web3j()` — Access underlying Web3j instance

### `Chains`

- `Chains.getChain(name)` — Get config by name
- `Chains.getChainById(id)` — Get config by ID
- `Chains.BSC_TESTNET` / `BSC_MAINNET` / `ETHEREUM` / `SEPOLIA`

## Testing

```bash
./gradlew test
```

## License

Apache-2.0
