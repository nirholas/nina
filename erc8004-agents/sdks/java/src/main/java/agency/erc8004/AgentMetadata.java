package agency.erc8004;

import java.util.List;

/**
 * Agent metadata for ERC-8004 registration.
 */
public record AgentMetadata(
    String type,
    String name,
    String description,
    String image,
    List<AgentService> services,
    boolean active
) {
    /**
     * Create minimal agent metadata.
     */
    public static AgentMetadata of(String name, String description) {
        return new AgentMetadata("AI Agent", name, description, null, List.of(), true);
    }

    /**
     * Create agent metadata with services.
     */
    public static AgentMetadata of(String name, String description, List<AgentService> services) {
        return new AgentMetadata("AI Agent", name, description, null, services, true);
    }
}
