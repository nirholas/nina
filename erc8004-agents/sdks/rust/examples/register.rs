//! Example: Register an agent using the Rust SDK.

use erc8004::{ERC8004Client, ChainName, AgentMetadata};

#[tokio::main]
async fn main() -> erc8004::Result<()> {
    // Create client for BSC Testnet
    let client = ERC8004Client::new(ChainName::BscTestnet, None)?;

    println!("Chain: {}", client.chain().name);
    println!("IdentityRegistry: {}", client.chain().identity_registry);

    // Build agent metadata
    let metadata = AgentMetadata::new("My Rust Agent", "An AI agent built with the Rust SDK")
        .with_service("A2A", "https://my-agent.example.com/.well-known/agent.json")
        .with_service("MCP", "https://my-agent.example.com/mcp");

    // Build the metadata URI
    let uri = ERC8004Client::build_agent_uri(&metadata)?;
    println!("\nMetadata URI (first 100 chars): {}...", &uri[..100.min(uri.len())]);

    // Parse it back
    let parsed = ERC8004Client::parse_agent_uri(&uri)?;
    println!("Parsed name: {}", parsed.name);
    println!("Services: {}", parsed.services.len());
    for svc in &parsed.services {
        println!("  {} → {}", svc.name, svc.endpoint);
    }

    // CAIP-10 identifier
    let caip10 = ERC8004Client::caip10_address(
        client.chain().chain_id,
        client.chain().identity_registry,
    );
    println!("\nCAIP-10: {caip10}");

    Ok(())
}
