package erc8004

// Chain configurations for supported EVM networks.

// ChainConfig holds configuration for a single blockchain.
type ChainConfig struct {
	Name               string
	ChainID            int64
	RPCURL             string
	Explorer           string
	CurrencyName       string
	CurrencySymbol     string
	CurrencyDecimals   int
	IdentityRegistry   string
	ReputationRegistry string
	ValidationRegistry string
}

// Deterministic CREATE2 addresses
const (
	TestnetIdentity   = "0x8004A818BFB912233c491871b3d84c89A494BD9e"
	TestnetReputation = "0x8004B663056A597Dffe9eCcC1965A193B7388713"
	TestnetValidation = "0x8004Cb1BF31DAf7788923b405b754f57acEB4272"
	MainnetIdentity   = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432"
	MainnetReputation = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63"
)

// Predefined chain configurations.
var (
	BSCTestnet = ChainConfig{
		Name:               "BSC Testnet",
		ChainID:            97,
		RPCURL:             "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
		Explorer:           "https://testnet.bscscan.com",
		CurrencyName:       "tBNB",
		CurrencySymbol:     "tBNB",
		CurrencyDecimals:   18,
		IdentityRegistry:   TestnetIdentity,
		ReputationRegistry: TestnetReputation,
		ValidationRegistry: TestnetValidation,
	}

	BSCMainnet = ChainConfig{
		Name:               "BSC Mainnet",
		ChainID:            56,
		RPCURL:             "https://bsc-dataseed.bnbchain.org",
		Explorer:           "https://bscscan.com",
		CurrencyName:       "BNB",
		CurrencySymbol:     "BNB",
		CurrencyDecimals:   18,
		IdentityRegistry:   MainnetIdentity,
		ReputationRegistry: MainnetReputation,
		ValidationRegistry: TestnetValidation,
	}

	EthereumMainnet = ChainConfig{
		Name:               "Ethereum Mainnet",
		ChainID:            1,
		RPCURL:             "https://eth.llamarpc.com",
		Explorer:           "https://etherscan.io",
		CurrencyName:       "ETH",
		CurrencySymbol:     "ETH",
		CurrencyDecimals:   18,
		IdentityRegistry:   MainnetIdentity,
		ReputationRegistry: MainnetReputation,
	}

	Sepolia = ChainConfig{
		Name:               "Ethereum Sepolia",
		ChainID:            11155111,
		RPCURL:             "https://rpc.sepolia.org",
		Explorer:           "https://sepolia.etherscan.io",
		CurrencyName:       "SepoliaETH",
		CurrencySymbol:     "ETH",
		CurrencyDecimals:   18,
		IdentityRegistry:   TestnetIdentity,
		ReputationRegistry: TestnetReputation,
	}

	// SupportedChains maps chain names to configs.
	SupportedChains = map[string]ChainConfig{
		"bsc-testnet": BSCTestnet,
		"bsc":         BSCMainnet,
		"ethereum":    EthereumMainnet,
		"sepolia":     Sepolia,
	}
)

// GetChain returns a chain config by name.
func GetChain(name string) (ChainConfig, bool) {
	c, ok := SupportedChains[name]
	return c, ok
}

// GetChainByID returns a chain config by chain ID.
func GetChainByID(chainID int64) (ChainConfig, bool) {
	for _, c := range SupportedChains {
		if c.ChainID == chainID {
			return c, true
		}
	}
	return ChainConfig{}, false
}
