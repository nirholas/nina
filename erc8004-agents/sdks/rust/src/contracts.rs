//! Contract ABI definitions for ERC-8004 registries.

/// IdentityRegistry ABI as a JSON string.
pub const IDENTITY_REGISTRY_ABI: &str = r#"[
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
]"#;

/// ReputationRegistry ABI as a JSON string.
pub const REPUTATION_REGISTRY_ABI: &str = r#"[
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
]"#;

/// ValidationRegistry ABI as a JSON string.
pub const VALIDATION_REGISTRY_ABI: &str = r#"[
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
]"#;
