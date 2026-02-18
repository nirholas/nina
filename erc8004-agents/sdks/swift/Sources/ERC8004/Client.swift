import Foundation

/// High-level client for ERC-8004 AI Agent Registry operations.
///
/// ```swift
/// let client = ERC8004Client(chain: .bscTestnet)
/// let meta = AgentMetadata(name: "My Agent", description: "Built with Swift SDK")
/// let uri = try client.buildAgentUri(meta)
/// ```
public final class ERC8004Client: Sendable {
    /// The chain configuration.
    public let chain: ChainConfig

    /// The decrypted wallet (if loaded from a keystore or private key).
    public let wallet: KeystoreWallet?

    /// Create a client for a predefined chain.
    public init(chain: ChainConfig) {
        self.chain = chain
        self.wallet = nil
    }

    /// Create a client by chain name.
    public convenience init(chainName: String) throws {
        guard let chain = Chains.get(chainName) else {
            throw ERC8004Error.unsupportedChain(chainName)
        }
        self.init(chain: chain)
    }

    /// Create a client by decrypting an Ethereum V3 keystore file.
    ///
    /// Supports `scrypt` and `pbkdf2` KDFs with `aes-128-ctr` cipher.
    ///
    /// - Parameters:
    ///   - keystorePath: URL pointing to the keystore JSON file.
    ///   - password: Password to decrypt the keystore.
    ///   - chain: The chain configuration to use.
    ///
    /// ```swift
    /// let client = try ERC8004Client(
    ///     keystorePath: URL(fileURLWithPath: "/path/to/keystore.json"),
    ///     password: "my-password",
    ///     chain: Chains.bscTestnet
    /// )
    /// print("Address: \(client.wallet!.address)")
    /// ```
    public init(keystorePath: URL, password: String, chain: ChainConfig) throws {
        self.chain = chain
        self.wallet = try Keystore.decrypt(path: keystorePath, password: password)
    }

    /// Create a client by decrypting a keystore file, looking up the chain by name.
    public convenience init(keystorePath: URL, password: String, chainName: String) throws {
        guard let chain = Chains.get(chainName) else {
            throw ERC8004Error.unsupportedChain(chainName)
        }
        try self.init(keystorePath: keystorePath, password: password, chain: chain)
    }

    /// Export the loaded wallet's private key as encrypted Ethereum V3 keystore JSON.
    ///
    /// - Parameter password: Password to encrypt with.
    /// - Returns: The keystore JSON as `Data`.
    /// - Throws: ``ERC8004Error/noPrivateKey`` if no wallet is loaded.
    public func exportKeystore(password: String) throws -> Data {
        guard let wallet = self.wallet else {
            throw ERC8004Error.noPrivateKey
        }
        return try Keystore.encrypt(privateKey: wallet.privateKey, password: password)
    }

    /// The wallet address, if a keystore or private key was loaded.
    public var address: String? {
        wallet?.address
    }

    /// Build agent metadata as a data URI.
    public func buildAgentUri(_ metadata: AgentMetadata) throws -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let data = try encoder.encode(metadata)
        let b64 = data.base64EncodedString()
        return "data:application/json;base64,\(b64)"
    }

    /// Parse an agent metadata URI.
    public func parseAgentUri(_ uri: String) throws -> AgentMetadata {
        let json: Data

        if uri.hasPrefix("data:application/json;base64,") {
            let b64 = String(uri.dropFirst("data:application/json;base64,".count))
            guard let decoded = Data(base64Encoded: b64) else {
                throw ERC8004Error.invalidUri("Invalid base64 encoding")
            }
            json = decoded
        } else if uri.hasPrefix("{") {
            guard let data = uri.data(using: .utf8) else {
                throw ERC8004Error.invalidUri("Invalid JSON string")
            }
            json = data
        } else {
            throw ERC8004Error.invalidUri("Unsupported URI format")
        }

        return try JSONDecoder().decode(AgentMetadata.self, from: json)
    }

    /// Build a CAIP-10 identifier.
    public static func caip10Address(chainId: UInt64, contractAddress: String) -> String {
        "eip155:\(chainId):\(contractAddress)"
    }
}

/// Errors from ERC-8004 operations.
public enum ERC8004Error: Error, Sendable {
    case unsupportedChain(String)
    case invalidUri(String)
    case contractError(String)
    case noPrivateKey
}
