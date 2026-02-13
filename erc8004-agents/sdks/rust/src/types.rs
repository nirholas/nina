//! Data types for ERC-8004 interactions.

use serde::{Deserialize, Serialize};

/// A service endpoint exposed by an agent.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentService {
    /// Service protocol name (A2A, MCP, REST, etc.)
    pub name: String,
    /// URL of the service endpoint
    pub endpoint: String,
    /// Human-readable service description
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// Service version string
    #[serde(skip_serializing_if = "Option::is_none")]
    pub version: Option<String>,
}

/// A key-value metadata pair for on-chain storage.
#[derive(Debug, Clone)]
pub struct MetadataEntry {
    /// Metadata key
    pub key: String,
    /// Metadata value (will be UTF-8 encoded)
    pub value: String,
}

/// Trust mechanism configuration.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TrustConfig {
    /// Trust type (e.g., "signature", "reputation", "stake")
    #[serde(rename = "type")]
    pub trust_type: String,
    /// Trust provider address or URL
    #[serde(skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    /// Minimum trust score
    #[serde(skip_serializing_if = "Option::is_none")]
    pub threshold: Option<u64>,
}

/// x402 payment protocol configuration.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct X402PaymentConfig {
    pub enabled: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tokens: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub min_amount: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub receiver: Option<String>,
}

/// Full agent registration metadata (stored as JSON URI).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AgentMetadata {
    /// Agent type identifier
    #[serde(rename = "type")]
    pub agent_type: String,
    /// Agent display name
    pub name: String,
    /// Agent description
    pub description: String,
    /// Agent image URL or data URI
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image: Option<String>,
    /// Service endpoints
    #[serde(default)]
    pub services: Vec<AgentService>,
    /// x402 payment support
    #[serde(skip_serializing_if = "Option::is_none")]
    pub x402_support: Option<X402PaymentConfig>,
    /// Whether the agent is active
    #[serde(default = "default_true")]
    pub active: bool,
    /// Registration records
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub registrations: Vec<serde_json::Value>,
    /// Supported trust mechanisms
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub supported_trust: Vec<TrustConfig>,
}

fn default_true() -> bool {
    true
}

impl AgentMetadata {
    /// Create a new agent metadata with minimal fields.
    pub fn new(name: impl Into<String>, description: impl Into<String>) -> Self {
        Self {
            agent_type: "AI Agent".to_string(),
            name: name.into(),
            description: description.into(),
            image: None,
            services: Vec::new(),
            x402_support: None,
            active: true,
            registrations: Vec::new(),
            supported_trust: Vec::new(),
        }
    }

    /// Add a service endpoint.
    pub fn with_service(mut self, name: impl Into<String>, endpoint: impl Into<String>) -> Self {
        self.services.push(AgentService {
            name: name.into(),
            endpoint: endpoint.into(),
            description: None,
            version: None,
        });
        self
    }

    /// Set the agent image.
    pub fn with_image(mut self, image: impl Into<String>) -> Self {
        self.image = Some(image.into());
        self
    }
}

/// An agent that has been registered on-chain.
#[derive(Debug, Clone)]
pub struct RegisteredAgent {
    /// On-chain agent token ID
    pub agent_id: u64,
    /// Owner wallet address
    pub owner: String,
    /// Chain ID where registered
    pub chain_id: u64,
    /// Registration transaction hash
    pub tx_hash: String,
    /// Block number of registration
    pub block_number: u64,
    /// Agent metadata URI
    pub agent_uri: Option<String>,
    /// Parsed agent metadata
    pub metadata: Option<AgentMetadata>,
}

/// A reputation score result.
#[derive(Debug, Clone)]
pub struct ReputationScore {
    /// Reputation score value
    pub score: u64,
    /// Number of reviews
    pub count: u64,
}
