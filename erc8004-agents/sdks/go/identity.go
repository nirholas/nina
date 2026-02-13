package erc8004

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

// Identity provides methods for the IdentityRegistry contract.
type Identity struct {
	client *Client
}

// NewIdentity creates an Identity helper bound to a client.
func NewIdentity(client *Client) *Identity {
	return &Identity{client: client}
}

// OwnerOf returns the owner address of an agent token.
func (id *Identity) OwnerOf(ctx context.Context, agentID int64) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "ownerOf", big.NewInt(agentID))
	if err != nil {
		return "", fmt.Errorf("ownerOf failed: %w", err)
	}
	return result[0].(common.Address).Hex(), nil
}

// TokenURI returns the metadata URI for an agent.
func (id *Identity) TokenURI(ctx context.Context, agentID int64) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "tokenURI", big.NewInt(agentID))
	if err != nil {
		return "", fmt.Errorf("tokenURI failed: %w", err)
	}
	return result[0].(string), nil
}

// BalanceOf returns the number of agents owned by an address.
func (id *Identity) BalanceOf(ctx context.Context, address string) (int64, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return 0, err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "balanceOf", common.HexToAddress(address))
	if err != nil {
		return 0, fmt.Errorf("balanceOf failed: %w", err)
	}
	return result[0].(*big.Int).Int64(), nil
}

// GetAgentWallet returns the wallet address bound to an agent.
func (id *Identity) GetAgentWallet(ctx context.Context, agentID int64) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "getAgentWallet", big.NewInt(agentID))
	if err != nil {
		return "", fmt.Errorf("getAgentWallet failed: %w", err)
	}
	return result[0].(common.Address).Hex(), nil
}

// Name returns the token collection name.
func (id *Identity) Name(ctx context.Context) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "name")
	if err != nil {
		return "", err
	}
	return result[0].(string), nil
}

// Symbol returns the token symbol.
func (id *Identity) Symbol(ctx context.Context) (string, error) {
	parsedABI, err := abi.JSON(strings.NewReader(IdentityRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(id.client.chain.IdentityRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, id.client.ethClient, id.client.ethClient, id.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "symbol")
	if err != nil {
		return "", err
	}
	return result[0].(string), nil
}
