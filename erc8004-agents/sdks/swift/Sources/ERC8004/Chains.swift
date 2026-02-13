import Foundation

/// Configuration for a supported blockchain.
public struct ChainConfig: Sendable {
    public let name: String
    public let chainId: UInt64
    public let rpcUrl: String
    public let explorer: String
    public let currencyName: String
    public let currencySymbol: String
    public let identityRegistry: String
    public let reputationRegistry: String?
    public let validationRegistry: String?

    /// Build a CAIP-10 identifier.
    public var caip10: String {
        "eip155:\(chainId):\(identityRegistry)"
    }
}

/// Predefined chain configurations.
public enum Chains {
    // Deterministic addresses
    static let testnetIdentity = "0x8004A818BFB912233c491871b3d84c89A494BD9e"
    static let testnetReputation = "0x8004B663056A597Dffe9eCcC1965A193B7388713"
    static let testnetValidation = "0x8004Cb1BF31DAf7788923b405b754f57acEB4272"
    static let mainnetIdentity = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432"
    static let mainnetReputation = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63"

    public static let bscTestnet = ChainConfig(
        name: "BSC Testnet",
        chainId: 97,
        rpcUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
        explorer: "https://testnet.bscscan.com",
        currencyName: "tBNB",
        currencySymbol: "tBNB",
        identityRegistry: testnetIdentity,
        reputationRegistry: testnetReputation,
        validationRegistry: testnetValidation
    )

    public static let bsc = ChainConfig(
        name: "BSC Mainnet",
        chainId: 56,
        rpcUrl: "https://bsc-dataseed.bnbchain.org",
        explorer: "https://bscscan.com",
        currencyName: "BNB",
        currencySymbol: "BNB",
        identityRegistry: mainnetIdentity,
        reputationRegistry: mainnetReputation,
        validationRegistry: testnetValidation
    )

    public static let ethereum = ChainConfig(
        name: "Ethereum Mainnet",
        chainId: 1,
        rpcUrl: "https://eth.llamarpc.com",
        explorer: "https://etherscan.io",
        currencyName: "ETH",
        currencySymbol: "ETH",
        identityRegistry: mainnetIdentity,
        reputationRegistry: mainnetReputation,
        validationRegistry: nil
    )

    public static let sepolia = ChainConfig(
        name: "Ethereum Sepolia",
        chainId: 11155111,
        rpcUrl: "https://rpc.sepolia.org",
        explorer: "https://sepolia.etherscan.io",
        currencyName: "SepoliaETH",
        currencySymbol: "ETH",
        identityRegistry: testnetIdentity,
        reputationRegistry: testnetReputation,
        validationRegistry: nil
    )

    /// All supported chains.
    public static let all: [String: ChainConfig] = [
        "bsc-testnet": bscTestnet,
        "bsc": bsc,
        "ethereum": ethereum,
        "sepolia": sepolia,
    ]

    /// Get chain config by name.
    public static func get(_ name: String) -> ChainConfig? {
        all[name]
    }

    /// Get chain config by chain ID.
    public static func getById(_ chainId: UInt64) -> ChainConfig? {
        all.values.first { $0.chainId == chainId }
    }
}
