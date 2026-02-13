package agency.erc8004;

/**
 * Configuration for a supported blockchain.
 */
public record ChainConfig(
    String name,
    long chainId,
    String rpcUrl,
    String explorer,
    String currencyName,
    String currencySymbol,
    String identityRegistry,
    String reputationRegistry,
    String validationRegistry
) {
    /**
     * Build a CAIP-10 identifier for this chain's identity registry.
     */
    public String caip10() {
        return "eip155:" + chainId + ":" + identityRegistry;
    }
}
