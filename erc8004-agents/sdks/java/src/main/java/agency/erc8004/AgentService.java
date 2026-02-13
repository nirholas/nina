package agency.erc8004;

/**
 * A service endpoint exposed by an agent.
 */
public record AgentService(
    String name,
    String endpoint,
    String description,
    String version
) {
    /**
     * Create a service with just name and endpoint.
     */
    public static AgentService of(String name, String endpoint) {
        return new AgentService(name, endpoint, null, null);
    }
}
