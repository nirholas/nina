package agency.erc8004;

import java.util.*;

/**
 * Chain configurations for supported EVM networks.
 */
public final class Chains {

    public static final String TESTNET_IDENTITY = "0x8004A818BFB912233c491871b3d84c89A494BD9e";
    public static final String TESTNET_REPUTATION = "0x8004B663056A597Dffe9eCcC1965A193B7388713";
    public static final String TESTNET_VALIDATION = "0x8004Cb1BF31DAf7788923b405b754f57acEB4272";
    public static final String MAINNET_IDENTITY = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";
    public static final String MAINNET_REPUTATION = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63";

    public static final ChainConfig BSC_TESTNET = new ChainConfig(
        "BSC Testnet", 97L,
        "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
        "https://testnet.bscscan.com",
        "tBNB", "tBNB",
        TESTNET_IDENTITY, TESTNET_REPUTATION, TESTNET_VALIDATION
    );

    public static final ChainConfig BSC_MAINNET = new ChainConfig(
        "BSC Mainnet", 56L,
        "https://bsc-dataseed.bnbchain.org",
        "https://bscscan.com",
        "BNB", "BNB",
        MAINNET_IDENTITY, MAINNET_REPUTATION, TESTNET_VALIDATION
    );

    public static final ChainConfig ETHEREUM = new ChainConfig(
        "Ethereum Mainnet", 1L,
        "https://eth.llamarpc.com",
        "https://etherscan.io",
        "ETH", "ETH",
        MAINNET_IDENTITY, MAINNET_REPUTATION, null
    );

    public static final ChainConfig SEPOLIA = new ChainConfig(
        "Ethereum Sepolia", 11155111L,
        "https://rpc.sepolia.org",
        "https://sepolia.etherscan.io",
        "ETH", "ETH",
        TESTNET_IDENTITY, TESTNET_REPUTATION, null
    );

    private static final Map<String, ChainConfig> CHAINS = Map.of(
        "bsc-testnet", BSC_TESTNET,
        "bsc", BSC_MAINNET,
        "ethereum", ETHEREUM,
        "sepolia", SEPOLIA
    );

    /**
     * Get chain config by name.
     */
    public static Optional<ChainConfig> getChain(String name) {
        return Optional.ofNullable(CHAINS.get(name));
    }

    /**
     * Get chain config by chain ID.
     */
    public static Optional<ChainConfig> getChainById(long chainId) {
        return CHAINS.values().stream()
            .filter(c -> c.chainId() == chainId)
            .findFirst();
    }

    private Chains() {}
}
