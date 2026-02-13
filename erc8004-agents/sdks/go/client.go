package erc8004

import (
	"context"
	"crypto/ecdsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

// Client is a high-level client for interacting with ERC-8004 registries.
type Client struct {
	chain      ChainConfig
	ethClient  *ethclient.Client
	auth       *bind.TransactOpts
	privateKey *ecdsa.PrivateKey
}

// NewClient creates a new ERC-8004 client.
func NewClient(chainName string, privateKeyHex string) (*Client, error) {
	chain, ok := GetChain(chainName)
	if !ok {
		return nil, fmt.Errorf("unsupported chain: %s", chainName)
	}
	return NewClientWithConfig(chain, privateKeyHex)
}

// NewClientWithConfig creates a client with a custom chain config.
func NewClientWithConfig(chain ChainConfig, privateKeyHex string) (*Client, error) {
	ethClient, err := ethclient.Dial(chain.RPCURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to %s: %w", chain.RPCURL, err)
	}

	c := &Client{
		chain:     chain,
		ethClient: ethClient,
	}

	if privateKeyHex != "" {
		key := strings.TrimPrefix(privateKeyHex, "0x")
		pk, err := crypto.HexToECDSA(key)
		if err != nil {
			return nil, fmt.Errorf("invalid private key: %w", err)
		}
		c.privateKey = pk

		chainID := big.NewInt(chain.ChainID)
		auth, err := bind.NewKeyedTransactorWithChainID(pk, chainID)
		if err != nil {
			return nil, fmt.Errorf("failed to create transactor: %w", err)
		}
		c.auth = auth
	}

	return c, nil
}

// NewReadOnlyClient creates a read-only client (no signing capability).
func NewReadOnlyClient(chainName string) (*Client, error) {
	return NewClient(chainName, "")
}

// Chain returns the chain configuration.
func (c *Client) Chain() ChainConfig {
	return c.chain
}

// EthClient returns the underlying go-ethereum client.
func (c *Client) EthClient() *ethclient.Client {
	return c.ethClient
}

// Close closes the underlying connection.
func (c *Client) Close() {
	c.ethClient.Close()
}

// Register registers a new agent with the given options.
func (c *Client) Register(ctx context.Context, opts RegisterOptions) (int64, error) {
	if c.auth == nil {
		return 0, fmt.Errorf("private key required for write operations")
	}

	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return 0, fmt.Errorf("failed to parse ABI: %w", err)
	}

	contractAddr := common.HexToAddress(c.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, c.ethClient, c.ethClient, c.ethClient)

	// Build metadata JSON
	meta := AgentMetadata{
		Type:        "AI Agent",
		Name:        opts.Name,
		Description: opts.Description,
		Image:       opts.Image,
		Services:    opts.Services,
		Active:      true,
	}

	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return 0, fmt.Errorf("failed to marshal metadata: %w", err)
	}

	agentURI := "data:application/json;base64," + base64.StdEncoding.EncodeToString(jsonBytes)

	var tx *bind.TransactOpts
	tx = c.auth
	tx.Context = ctx

	// Call register(string)
	txResult, err := contract.Transact(tx, "register0", agentURI)
	if err != nil {
		return 0, fmt.Errorf("registration failed: %w", err)
	}

	receipt, err := bind.WaitMined(ctx, c.ethClient, txResult)
	if err != nil {
		return 0, fmt.Errorf("waiting for tx failed: %w", err)
	}

	if receipt.Status == 0 {
		return 0, fmt.Errorf("transaction reverted: %s", txResult.Hash().Hex())
	}

	// Parse agent ID from Registered event
	for _, log := range receipt.Logs {
		event, err := parsedABI.EventByID(log.Topics[0])
		if err != nil {
			continue
		}
		if event.Name == "Registered" {
			agentID := new(big.Int).SetBytes(log.Topics[1].Bytes())
			return agentID.Int64(), nil
		}
		if event.Name == "Transfer" {
			// Mint from zero address
			from := common.BytesToAddress(log.Topics[1].Bytes())
			if from == (common.Address{}) {
				tokenID := new(big.Int).SetBytes(log.Topics[3].Bytes())
				return tokenID.Int64(), nil
			}
		}
	}

	return 0, fmt.Errorf("could not parse agent ID from receipt")
}

// GetAgent fetches an agent's details by token ID.
func (c *Client) GetAgent(ctx context.Context, agentID int64) (*RegisteredAgent, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return nil, fmt.Errorf("failed to parse ABI: %w", err)
	}

	contractAddr := common.HexToAddress(c.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, c.ethClient, c.ethClient, c.ethClient)

	callOpts := &bind.CallOpts{Context: ctx}

	// Get owner
	var ownerResult []interface{}
	err = contract.Call(callOpts, &ownerResult, "ownerOf", big.NewInt(agentID))
	if err != nil {
		return nil, fmt.Errorf("ownerOf failed: %w", err)
	}
	owner := ownerResult[0].(common.Address).Hex()

	// Get tokenURI
	var uriResult []interface{}
	err = contract.Call(callOpts, &uriResult, "tokenURI", big.NewInt(agentID))
	if err != nil {
		return nil, fmt.Errorf("tokenURI failed: %w", err)
	}
	uri := uriResult[0].(string)

	agent := &RegisteredAgent{
		AgentID:  agentID,
		Owner:    owner,
		ChainID:  c.chain.ChainID,
		AgentURI: uri,
	}

	// Try to parse metadata
	meta, err := ParseAgentURI(uri)
	if err == nil {
		agent.Metadata = meta
	}

	return agent, nil
}

// GetVersion returns the IdentityRegistry contract version.
func (c *Client) GetVersion(ctx context.Context) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", fmt.Errorf("failed to parse ABI: %w", err)
	}

	contractAddr := common.HexToAddress(c.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, c.ethClient, c.ethClient, c.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "getVersion")
	if err != nil {
		return "", fmt.Errorf("getVersion failed: %w", err)
	}

	return result[0].(string), nil
}

// ParseAgentURI decodes an agent metadata URI.
func ParseAgentURI(uri string) (*AgentMetadata, error) {
	var jsonStr string

	if strings.HasPrefix(uri, "data:application/json;base64,") {
		b64 := strings.TrimPrefix(uri, "data:application/json;base64,")
		decoded, err := base64.StdEncoding.DecodeString(b64)
		if err != nil {
			return nil, fmt.Errorf("base64 decode failed: %w", err)
		}
		jsonStr = string(decoded)
	} else if strings.HasPrefix(uri, "{") {
		jsonStr = uri
	} else {
		return nil, fmt.Errorf("unsupported URI format: %.80s", uri)
	}

	var meta AgentMetadata
	if err := json.Unmarshal([]byte(jsonStr), &meta); err != nil {
		return nil, fmt.Errorf("JSON unmarshal failed: %w", err)
	}

	return &meta, nil
}

// BuildAgentURI encodes metadata as a data URI.
func BuildAgentURI(meta *AgentMetadata) (string, error) {
	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return "", fmt.Errorf("failed to marshal: %w", err)
	}
	return "data:application/json;base64," + base64.StdEncoding.EncodeToString(jsonBytes), nil
}
