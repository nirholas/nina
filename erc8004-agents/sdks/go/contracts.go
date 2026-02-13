package erc8004

// Contract ABIs for ERC-8004 registries.
// Generated from the Solidity contracts — use with abigen or abi.JSON().

// IdentityRegistryABI is the ABI for the IdentityRegistry contract.
const IdentityRegistryABI = `[
	{
		"name": "register",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [],
		"outputs": [{"name": "agentId", "type": "uint256"}]
	},
	{
		"name": "register",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [{"name": "agentURI", "type": "string"}],
		"outputs": [{"name": "agentId", "type": "uint256"}]
	},
	{
		"name": "register",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [
			{"name": "agentURI", "type": "string"},
			{
				"name": "metadata",
				"type": "tuple[]",
				"components": [
					{"name": "metadataKey", "type": "string"},
					{"name": "metadataValue", "type": "bytes"}
				]
			}
		],
		"outputs": [{"name": "agentId", "type": "uint256"}]
	},
	{
		"name": "setAgentURI",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "newURI", "type": "string"}
		],
		"outputs": []
	},
	{
		"name": "setMetadata",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "metadataKey", "type": "string"},
			{"name": "metadataValue", "type": "bytes"}
		],
		"outputs": []
	},
	{
		"name": "getMetadata",
		"type": "function",
		"stateMutability": "view",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "metadataKey", "type": "string"}
		],
		"outputs": [{"name": "", "type": "bytes"}]
	},
	{
		"name": "getAgentWallet",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "agentId", "type": "uint256"}],
		"outputs": [{"name": "", "type": "address"}]
	},
	{
		"name": "tokenURI",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "tokenId", "type": "uint256"}],
		"outputs": [{"name": "", "type": "string"}]
	},
	{
		"name": "ownerOf",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "tokenId", "type": "uint256"}],
		"outputs": [{"name": "", "type": "address"}]
	},
	{
		"name": "balanceOf",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "owner", "type": "address"}],
		"outputs": [{"name": "", "type": "uint256"}]
	},
	{
		"name": "getVersion",
		"type": "function",
		"stateMutability": "pure",
		"inputs": [],
		"outputs": [{"name": "", "type": "string"}]
	},
	{
		"name": "name",
		"type": "function",
		"stateMutability": "view",
		"inputs": [],
		"outputs": [{"name": "", "type": "string"}]
	},
	{
		"name": "symbol",
		"type": "function",
		"stateMutability": "view",
		"inputs": [],
		"outputs": [{"name": "", "type": "string"}]
	},
	{
		"name": "Registered",
		"type": "event",
		"inputs": [
			{"name": "agentId", "type": "uint256", "indexed": true},
			{"name": "agentURI", "type": "string", "indexed": false},
			{"name": "owner", "type": "address", "indexed": true}
		]
	},
	{
		"name": "Transfer",
		"type": "event",
		"inputs": [
			{"name": "from", "type": "address", "indexed": true},
			{"name": "to", "type": "address", "indexed": true},
			{"name": "tokenId", "type": "uint256", "indexed": true}
		]
	}
]`

// ReputationRegistryABI is the ABI for the ReputationRegistry contract.
const ReputationRegistryABI = `[
	{
		"name": "submitScore",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "domain", "type": "string"},
			{"name": "score", "type": "uint256"},
			{"name": "evidence", "type": "string"}
		],
		"outputs": []
	},
	{
		"name": "getScore",
		"type": "function",
		"stateMutability": "view",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "domain", "type": "string"}
		],
		"outputs": [
			{"name": "score", "type": "uint256"},
			{"name": "count", "type": "uint256"}
		]
	},
	{
		"name": "getAggregateScore",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "agentId", "type": "uint256"}],
		"outputs": [
			{"name": "score", "type": "uint256"},
			{"name": "totalReviews", "type": "uint256"}
		]
	},
	{
		"name": "getVersion",
		"type": "function",
		"stateMutability": "pure",
		"inputs": [],
		"outputs": [{"name": "", "type": "string"}]
	}
]`

// ValidationRegistryABI is the ABI for the ValidationRegistry contract.
const ValidationRegistryABI = `[
	{
		"name": "validate",
		"type": "function",
		"stateMutability": "nonpayable",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "validationType", "type": "string"},
			{"name": "evidence", "type": "bytes"}
		],
		"outputs": [{"name": "validationId", "type": "uint256"}]
	},
	{
		"name": "isValid",
		"type": "function",
		"stateMutability": "view",
		"inputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "validationType", "type": "string"}
		],
		"outputs": [{"name": "", "type": "bool"}]
	},
	{
		"name": "getValidation",
		"type": "function",
		"stateMutability": "view",
		"inputs": [{"name": "validationId", "type": "uint256"}],
		"outputs": [
			{"name": "agentId", "type": "uint256"},
			{"name": "validationType", "type": "string"},
			{"name": "validator", "type": "address"},
			{"name": "timestamp", "type": "uint256"}
		]
	},
	{
		"name": "getVersion",
		"type": "function",
		"stateMutability": "pure",
		"inputs": [],
		"outputs": [{"name": "", "type": "string"}]
	}
]`
