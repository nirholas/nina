package agency.erc8004;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.util.Base64;
import java.util.List;
import java.util.Objects;

/**
 * High-level client for ERC-8004 AI Agent Registry operations.
 *
 * <pre>{@code
 * var client = new ERC8004Client("bsc-testnet");
 * var meta = AgentMetadata.of("My Agent", "Description",
 *     List.of(AgentService.of("A2A", "https://...")));
 * String uri = client.buildAgentUri(meta);
 * }</pre>
 */
public class ERC8004Client implements AutoCloseable {

    private static final Gson GSON = new GsonBuilder()
        .disableHtmlEscaping()
        .create();

    private final ChainConfig chain;
    private final Web3j web3j;

    /**
     * Create a client for a named chain.
     *
     * @param chainName Chain name (e.g., "bsc-testnet", "bsc", "ethereum")
     */
    public ERC8004Client(String chainName) {
        this.chain = Chains.getChain(chainName)
            .orElseThrow(() -> new IllegalArgumentException("Unknown chain: " + chainName));
        this.web3j = Web3j.build(new HttpService(chain.rpcUrl()));
    }

    /**
     * Create a client with a custom chain config.
     */
    public ERC8004Client(ChainConfig chain) {
        this.chain = Objects.requireNonNull(chain);
        this.web3j = Web3j.build(new HttpService(chain.rpcUrl()));
    }

    /**
     * Get the chain configuration.
     */
    public ChainConfig chain() {
        return chain;
    }

    /**
     * Get the underlying Web3j instance.
     */
    public Web3j web3j() {
        return web3j;
    }

    /**
     * Build agent metadata as a data URI.
     */
    public String buildAgentUri(AgentMetadata metadata) {
        String json = GSON.toJson(metadata);
        String encoded = Base64.getEncoder().encodeToString(json.getBytes());
        return "data:application/json;base64," + encoded;
    }

    /**
     * Parse an agent metadata URI.
     */
    public AgentMetadata parseAgentUri(String uri) {
        String json;
        if (uri.startsWith("data:application/json;base64,")) {
            String b64 = uri.substring("data:application/json;base64,".length());
            json = new String(Base64.getDecoder().decode(b64));
        } else if (uri.startsWith("{")) {
            json = uri;
        } else {
            throw new IllegalArgumentException("Unsupported URI format: " + uri.substring(0, Math.min(80, uri.length())));
        }
        return GSON.fromJson(json, AgentMetadata.class);
    }

    /**
     * Check if connected to the RPC endpoint.
     */
    public boolean isConnected() {
        try {
            web3j.web3ClientVersion().send();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void close() {
        web3j.shutdown();
    }
}
