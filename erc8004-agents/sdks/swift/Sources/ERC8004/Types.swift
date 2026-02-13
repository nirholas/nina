import Foundation

/// A service endpoint exposed by an agent.
public struct AgentService: Codable, Sendable {
    /// Service protocol name (A2A, MCP, REST, etc.)
    public let name: String
    /// URL of the service endpoint
    public let endpoint: String
    /// Human-readable service description
    public let description: String?
    /// Service version string
    public let version: String?

    public init(name: String, endpoint: String, description: String? = nil, version: String? = nil) {
        self.name = name
        self.endpoint = endpoint
        self.description = description
        self.version = version
    }
}

/// Full agent registration metadata.
public struct AgentMetadata: Codable, Sendable {
    /// Agent type identifier
    public let type: String
    /// Agent display name
    public let name: String
    /// Agent description
    public let description: String
    /// Agent image URL
    public let image: String?
    /// Service endpoints
    public let services: [AgentService]
    /// Whether the agent is active
    public let active: Bool

    public init(
        name: String,
        description: String,
        services: [AgentService] = [],
        image: String? = nil,
        active: Bool = true
    ) {
        self.type = "AI Agent"
        self.name = name
        self.description = description
        self.image = image
        self.services = services
        self.active = active
    }
}

/// An agent registered on-chain.
public struct RegisteredAgent: Sendable {
    /// On-chain agent token ID
    public let agentId: UInt64
    /// Owner wallet address
    public let owner: String
    /// Chain ID
    public let chainId: UInt64
    /// Transaction hash
    public let txHash: String
    /// Metadata URI
    public let agentUri: String?
    /// Parsed metadata
    public let metadata: AgentMetadata?
}

/// A reputation score result.
public struct ReputationScore: Sendable {
    /// Score value
    public let score: UInt64
    /// Number of reviews
    public let count: UInt64
}
