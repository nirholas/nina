package main

import (
	"context"
	"fmt"
	"log"
	"os"

	erc8004 "github.com/nirholas/erc8004-agent-creator/sdks/go"
)

func main() {
	privateKey := os.Getenv("PRIVATE_KEY")
	ctx := context.Background()

	// Read-only client
	client, err := erc8004.NewReadOnlyClient("bsc-testnet")
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	fmt.Printf("Connected to %s\n", client.Chain().Name)
	fmt.Printf("IdentityRegistry: %s\n", client.Chain().IdentityRegistry)

	// Get contract version
	version, err := client.GetVersion(ctx)
	if err != nil {
		log.Printf("GetVersion failed: %v", err)
	} else {
		fmt.Printf("Version: %s\n", version)
	}

	// Query an agent
	agent, err := client.GetAgent(ctx, 1)
	if err != nil {
		log.Printf("GetAgent(1) failed: %v", err)
	} else {
		fmt.Printf("\nAgent #%d:\n", agent.AgentID)
		fmt.Printf("  Owner: %s\n", agent.Owner)
		if agent.Metadata != nil {
			fmt.Printf("  Name: %s\n", agent.Metadata.Name)
			fmt.Printf("  Description: %s\n", agent.Metadata.Description)
			for _, svc := range agent.Metadata.Services {
				fmt.Printf("  Service: %s → %s\n", svc.Name, svc.Endpoint)
			}
		}
	}

	// Register an agent (requires private key)
	if privateKey != "" {
		writeClient, err := erc8004.NewClient("bsc-testnet", privateKey)
		if err != nil {
			log.Fatalf("Failed to create write client: %v", err)
		}
		defer writeClient.Close()

		agentID, err := writeClient.Register(ctx, erc8004.RegisterOptions{
			Name:        "My Go Agent",
			Description: "An AI agent registered via the Go SDK",
			Services: []erc8004.AgentService{
				{Name: "A2A", Endpoint: "https://my-agent.example.com/a2a"},
				{Name: "MCP", Endpoint: "https://my-agent.example.com/mcp"},
			},
		})
		if err != nil {
			log.Fatalf("Register failed: %v", err)
		}
		fmt.Printf("\nAgent #%d registered!\n", agentID)
	} else {
		fmt.Println("\nSet PRIVATE_KEY to register agents")
	}
}
