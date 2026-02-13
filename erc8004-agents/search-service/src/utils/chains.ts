/** Chain configurations for the search service indexer. */

export interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorer: string;
  identityRegistry: string;
  reputationRegistry?: string;
  validationRegistry?: string;
  startBlock?: number;
  /** Polling interval in ms */
  pollInterval?: number;
}

// Deterministic CREATE2 addresses
const TESTNET_IDENTITY = "0x8004A818BFB912233c491871b3d84c89A494BD9e";
const TESTNET_REPUTATION = "0x8004B663056A597Dffe9eCcC1965A193B7388713";
const TESTNET_VALIDATION = "0x8004Cb1BF31DAf7788923b405b754f57acEB4272";
const MAINNET_IDENTITY = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";
const MAINNET_REPUTATION = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63";

export const CHAINS: Record<string, ChainConfig> = {
  "bsc-testnet": {
    name: "BSC Testnet",
    chainId: 97,
    rpcUrl: process.env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    explorer: "https://testnet.bscscan.com",
    identityRegistry: TESTNET_IDENTITY,
    reputationRegistry: TESTNET_REPUTATION,
    validationRegistry: TESTNET_VALIDATION,
    pollInterval: 5000,
  },
  bsc: {
    name: "BSC Mainnet",
    chainId: 56,
    rpcUrl: process.env.BSC_RPC || "https://bsc-dataseed.bnbchain.org",
    explorer: "https://bscscan.com",
    identityRegistry: MAINNET_IDENTITY,
    reputationRegistry: MAINNET_REPUTATION,
    validationRegistry: TESTNET_VALIDATION,
    pollInterval: 3000,
  },
  ethereum: {
    name: "Ethereum Mainnet",
    chainId: 1,
    rpcUrl: process.env.ETH_RPC || "https://eth.llamarpc.com",
    explorer: "https://etherscan.io",
    identityRegistry: MAINNET_IDENTITY,
    reputationRegistry: MAINNET_REPUTATION,
    pollInterval: 12000,
  },
  sepolia: {
    name: "Ethereum Sepolia",
    chainId: 11155111,
    rpcUrl: process.env.SEPOLIA_RPC || "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io",
    identityRegistry: TESTNET_IDENTITY,
    reputationRegistry: TESTNET_REPUTATION,
    pollInterval: 12000,
  },
};

export function getChain(nameOrId: string | number): ChainConfig | undefined {
  if (typeof nameOrId === "string") {
    return CHAINS[nameOrId];
  }
  return Object.values(CHAINS).find((c) => c.chainId === nameOrId);
}

export function getAllChains(): ChainConfig[] {
  return Object.values(CHAINS);
}
