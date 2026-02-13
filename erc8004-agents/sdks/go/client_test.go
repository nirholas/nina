package erc8004

import (
	"encoding/base64"
	"encoding/json"
	"testing"
)

func TestGetChain(t *testing.T) {
	chain, ok := GetChain("bsc-testnet")
	if !ok {
		t.Fatal("expected bsc-testnet to exist")
	}
	if chain.ChainID != 97 {
		t.Errorf("expected chainID 97, got %d", chain.ChainID)
	}
	if chain.Name != "BSC Testnet" {
		t.Errorf("expected name 'BSC Testnet', got '%s'", chain.Name)
	}
}

func TestGetChainByID(t *testing.T) {
	chain, ok := GetChainByID(56)
	if !ok {
		t.Fatal("expected chain 56 to exist")
	}
	if chain.Name != "BSC Mainnet" {
		t.Errorf("expected 'BSC Mainnet', got '%s'", chain.Name)
	}
}

func TestGetChainUnknown(t *testing.T) {
	_, ok := GetChain("unknown")
	if ok {
		t.Error("expected unknown chain to return false")
	}
}

func TestBuildAgentURI(t *testing.T) {
	meta := &AgentMetadata{
		Type:        "AI Agent",
		Name:        "Test Agent",
		Description: "A test",
		Active:      true,
	}

	uri, err := BuildAgentURI(meta)
	if err != nil {
		t.Fatalf("BuildAgentURI failed: %v", err)
	}

	prefix := "data:application/json;base64,"
	if len(uri) <= len(prefix) {
		t.Fatal("URI too short")
	}

	b64 := uri[len(prefix):]
	decoded, err := base64.StdEncoding.DecodeString(b64)
	if err != nil {
		t.Fatalf("base64 decode failed: %v", err)
	}

	var parsed AgentMetadata
	if err := json.Unmarshal(decoded, &parsed); err != nil {
		t.Fatalf("JSON unmarshal failed: %v", err)
	}

	if parsed.Name != "Test Agent" {
		t.Errorf("expected 'Test Agent', got '%s'", parsed.Name)
	}
}

func TestParseAgentURI(t *testing.T) {
	original := &AgentMetadata{
		Type:        "AI Agent",
		Name:        "Roundtrip",
		Description: "Testing roundtrip",
		Active:      true,
	}

	uri, err := BuildAgentURI(original)
	if err != nil {
		t.Fatal(err)
	}

	parsed, err := ParseAgentURI(uri)
	if err != nil {
		t.Fatal(err)
	}

	if parsed.Name != "Roundtrip" {
		t.Errorf("expected 'Roundtrip', got '%s'", parsed.Name)
	}
}

func TestParseAgentURIRawJSON(t *testing.T) {
	raw := `{"type":"AI Agent","name":"Raw","description":"test","active":true}`
	parsed, err := ParseAgentURI(raw)
	if err != nil {
		t.Fatal(err)
	}
	if parsed.Name != "Raw" {
		t.Errorf("expected 'Raw', got '%s'", parsed.Name)
	}
}

func TestParseAgentURIUnsupported(t *testing.T) {
	_, err := ParseAgentURI("ipfs://QmInvalid")
	if err == nil {
		t.Error("expected error for unsupported URI")
	}
}

func TestAllChainsHaveIdentity(t *testing.T) {
	for name, chain := range SupportedChains {
		if chain.IdentityRegistry == "" {
			t.Errorf("%s missing IdentityRegistry", name)
		}
		if chain.IdentityRegistry[:6] != "0x8004" {
			t.Errorf("%s IdentityRegistry doesn't start with 0x8004", name)
		}
	}
}
