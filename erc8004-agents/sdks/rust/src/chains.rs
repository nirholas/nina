//! Chain configurations for supported EVM networks.

/// Supported chain names.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ChainName {
    BscTestnet,
    Bsc,
    Ethereum,
    Sepolia,
}

impl ChainName {
    /// Get the chain name as a string.
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::BscTestnet => "bsc-testnet",
            Self::Bsc => "bsc",
            Self::Ethereum => "ethereum",
            Self::Sepolia => "sepolia",
        }
    }
}

impl std::fmt::Display for ChainName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.as_str())
    }
}

impl std::str::FromStr for ChainName {
    type Err = crate::Error;

    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        match s {
            "bsc-testnet" => Ok(Self::BscTestnet),
            "bsc" => Ok(Self::Bsc),
            "ethereum" => Ok(Self::Ethereum),
            "sepolia" => Ok(Self::Sepolia),
            _ => Err(crate::Error::UnsupportedChain(s.to_string())),
        }
    }
}

/// Configuration for a supported blockchain.
#[derive(Debug, Clone)]
pub struct ChainConfig {
    pub name: &'static str,
    pub chain_id: u64,
    pub rpc_url: &'static str,
    pub explorer: &'static str,
    pub currency_name: &'static str,
    pub currency_symbol: &'static str,
    pub identity_registry: &'static str,
    pub reputation_registry: Option<&'static str>,
    pub validation_registry: Option<&'static str>,
}

// Deterministic CREATE2 addresses
const TESTNET_IDENTITY: &str = "0x8004A818BFB912233c491871b3d84c89A494BD9e";
const TESTNET_REPUTATION: &str = "0x8004B663056A597Dffe9eCcC1965A193B7388713";
const TESTNET_VALIDATION: &str = "0x8004Cb1BF31DAf7788923b405b754f57acEB4272";
const MAINNET_IDENTITY: &str = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";
const MAINNET_REPUTATION: &str = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63";

/// Get chain configuration by name.
pub fn get_chain(chain: ChainName) -> ChainConfig {
    match chain {
        ChainName::BscTestnet => ChainConfig {
            name: "BSC Testnet",
            chain_id: 97,
            rpc_url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
            explorer: "https://testnet.bscscan.com",
            currency_name: "tBNB",
            currency_symbol: "tBNB",
            identity_registry: TESTNET_IDENTITY,
            reputation_registry: Some(TESTNET_REPUTATION),
            validation_registry: Some(TESTNET_VALIDATION),
        },
        ChainName::Bsc => ChainConfig {
            name: "BSC Mainnet",
            chain_id: 56,
            rpc_url: "https://bsc-dataseed.bnbchain.org",
            explorer: "https://bscscan.com",
            currency_name: "BNB",
            currency_symbol: "BNB",
            identity_registry: MAINNET_IDENTITY,
            reputation_registry: Some(MAINNET_REPUTATION),
            validation_registry: Some(TESTNET_VALIDATION),
        },
        ChainName::Ethereum => ChainConfig {
            name: "Ethereum Mainnet",
            chain_id: 1,
            rpc_url: "https://eth.llamarpc.com",
            explorer: "https://etherscan.io",
            currency_name: "ETH",
            currency_symbol: "ETH",
            identity_registry: MAINNET_IDENTITY,
            reputation_registry: Some(MAINNET_REPUTATION),
            validation_registry: None,
        },
        ChainName::Sepolia => ChainConfig {
            name: "Ethereum Sepolia",
            chain_id: 11155111,
            rpc_url: "https://rpc.sepolia.org",
            explorer: "https://sepolia.etherscan.io",
            currency_name: "SepoliaETH",
            currency_symbol: "ETH",
            identity_registry: TESTNET_IDENTITY,
            reputation_registry: Some(TESTNET_REPUTATION),
            validation_registry: None,
        },
    }
}
