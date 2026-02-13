package agency.erc8004;

import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class ERC8004ClientTest {

    @Test
    void testChainConfig() {
        var chain = Chains.getChain("bsc-testnet");
        assertTrue(chain.isPresent());
        assertEquals(97L, chain.get().chainId());
        assertEquals("BSC Testnet", chain.get().name());
    }

    @Test
    void testChainById() {
        var chain = Chains.getChainById(56L);
        assertTrue(chain.isPresent());
        assertEquals("BSC Mainnet", chain.get().name());
    }

    @Test
    void testUnknownChain() {
        var chain = Chains.getChain("unknown");
        assertTrue(chain.isEmpty());
    }

    @Test
    void testBuildAndParseUri() {
        var client = new ERC8004Client("bsc-testnet");
        var meta = AgentMetadata.of("Test Agent", "A test",
            List.of(AgentService.of("A2A", "https://example.com")));

        String uri = client.buildAgentUri(meta);
        assertTrue(uri.startsWith("data:application/json;base64,"));

        var parsed = client.parseAgentUri(uri);
        assertEquals("Test Agent", parsed.name());
        assertEquals(1, parsed.services().size());
        assertEquals("A2A", parsed.services().get(0).name());

        client.close();
    }

    @Test
    void testParseRawJson() {
        var client = new ERC8004Client("bsc-testnet");
        var parsed = client.parseAgentUri("{\"type\":\"AI Agent\",\"name\":\"Raw\",\"description\":\"test\",\"active\":true}");
        assertEquals("Raw", parsed.name());
        client.close();
    }

    @Test
    void testCaip10() {
        var chain = Chains.BSC_TESTNET;
        assertEquals("eip155:97:0x8004A818BFB912233c491871b3d84c89A494BD9e", chain.caip10());
    }

    @Test
    void testAllChainsHaveIdentity() {
        for (var name : List.of("bsc-testnet", "bsc", "ethereum", "sepolia")) {
            var chain = Chains.getChain(name);
            assertTrue(chain.isPresent(), name + " should exist");
            assertTrue(chain.get().identityRegistry().startsWith("0x8004"),
                name + " identity should start with 0x8004");
        }
    }
}
