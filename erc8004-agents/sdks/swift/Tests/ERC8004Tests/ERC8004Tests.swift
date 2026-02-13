import XCTest
@testable import ERC8004

final class ERC8004Tests: XCTestCase {

    func testChainConfig() {
        let chain = Chains.get("bsc-testnet")
        XCTAssertNotNil(chain)
        XCTAssertEqual(chain?.chainId, 97)
        XCTAssertEqual(chain?.name, "BSC Testnet")
    }

    func testChainById() {
        let chain = Chains.getById(56)
        XCTAssertNotNil(chain)
        XCTAssertEqual(chain?.name, "BSC Mainnet")
    }

    func testUnknownChain() {
        let chain = Chains.get("unknown")
        XCTAssertNil(chain)
    }

    func testBuildAndParseUri() throws {
        let client = try ERC8004Client(chainName: "bsc-testnet")
        let meta = AgentMetadata(
            name: "Test Agent",
            description: "A test",
            services: [AgentService(name: "A2A", endpoint: "https://example.com")]
        )

        let uri = try client.buildAgentUri(meta)
        XCTAssertTrue(uri.hasPrefix("data:application/json;base64,"))

        let parsed = try client.parseAgentUri(uri)
        XCTAssertEqual(parsed.name, "Test Agent")
        XCTAssertEqual(parsed.services.count, 1)
        XCTAssertEqual(parsed.services[0].name, "A2A")
    }

    func testCaip10() {
        let result = ERC8004Client.caip10Address(
            chainId: 97,
            contractAddress: "0x8004A818BFB912233c491871b3d84c89A494BD9e"
        )
        XCTAssertEqual(result, "eip155:97:0x8004A818BFB912233c491871b3d84c89A494BD9e")
    }

    func testAllChainsHaveIdentity() {
        for (name, chain) in Chains.all {
            XCTAssertTrue(
                chain.identityRegistry.hasPrefix("0x8004"),
                "\(name) identity should start with 0x8004"
            )
        }
    }
}
