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

// Reputation provides methods for the ReputationRegistry contract.
type Reputation struct {
	client *Client
}

// NewReputation creates a Reputation helper bound to a client.
func NewReputation(client *Client) *Reputation {
	return &Reputation{client: client}
}

// GetScore returns an agent's reputation score for a specific domain.
func (r *Reputation) GetScore(ctx context.Context, agentID int64, domain string) (*ReputationScore, error) {
	if r.client.chain.ReputationRegistry == "" {
		return nil, fmt.Errorf("no ReputationRegistry on %s", r.client.chain.Name)
	}

	parsedABI, err := abi.JSON(strings.NewReader(ReputationRegistryABI))
	if err != nil {
		return nil, err
	}
	contractAddr := common.HexToAddress(r.client.chain.ReputationRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, r.client.ethClient, r.client.ethClient, r.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "getScore", big.NewInt(agentID), domain)
	if err != nil {
		return nil, fmt.Errorf("getScore failed: %w", err)
	}

	return &ReputationScore{
		Score: result[0].(*big.Int).Int64(),
		Count: result[1].(*big.Int).Int64(),
	}, nil
}

// GetAggregateScore returns an agent's aggregate reputation score.
func (r *Reputation) GetAggregateScore(ctx context.Context, agentID int64) (*ReputationScore, error) {
	if r.client.chain.ReputationRegistry == "" {
		return nil, fmt.Errorf("no ReputationRegistry on %s", r.client.chain.Name)
	}

	parsedABI, err := abi.JSON(strings.NewReader(ReputationRegistryABI))
	if err != nil {
		return nil, err
	}
	contractAddr := common.HexToAddress(r.client.chain.ReputationRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, r.client.ethClient, r.client.ethClient, r.client.ethClient)

	var result []interface{}
	err = contract.Call(&bind.CallOpts{Context: ctx}, &result, "getAggregateScore", big.NewInt(agentID))
	if err != nil {
		return nil, fmt.Errorf("getAggregateScore failed: %w", err)
	}

	return &ReputationScore{
		Score: result[0].(*big.Int).Int64(),
		Count: result[1].(*big.Int).Int64(),
	}, nil
}

// SubmitScore submits a reputation score for an agent.
func (r *Reputation) SubmitScore(ctx context.Context, agentID int64, domain string, score int64, evidence string) (string, error) {
	if r.client.auth == nil {
		return "", fmt.Errorf("private key required for write operations")
	}
	if r.client.chain.ReputationRegistry == "" {
		return "", fmt.Errorf("no ReputationRegistry on %s", r.client.chain.Name)
	}
	if score < 0 || score > 100 {
		return "", fmt.Errorf("score must be 0-100, got %d", score)
	}

	parsedABI, err := abi.JSON(strings.NewReader(ReputationRegistryABI))
	if err != nil {
		return "", err
	}
	contractAddr := common.HexToAddress(r.client.chain.ReputationRegistry)
	contract := bind.NewBoundContract(contractAddr, parsedABI, r.client.ethClient, r.client.ethClient, r.client.ethClient)

	r.client.auth.Context = ctx
	tx, err := contract.Transact(r.client.auth, "submitScore", big.NewInt(agentID), domain, big.NewInt(score), evidence)
	if err != nil {
		return "", fmt.Errorf("submitScore failed: %w", err)
	}

	receipt, err := bind.WaitMined(ctx, r.client.ethClient, tx)
	if err != nil {
		return "", fmt.Errorf("waiting for tx failed: %w", err)
	}

	if receipt.Status == 0 {
		return "", fmt.Errorf("transaction reverted")
	}

	return tx.Hash().Hex(), nil
}
