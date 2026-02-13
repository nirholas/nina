/**
 * CLI configuration management.
 * Stores config at ~/.erc8004/config.json
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.erc8004');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export interface CliConfig {
  defaultChain: string;
  privateKey?: string;
  customRpcUrls: Record<string, string>;
}

const DEFAULT_CONFIG: CliConfig = {
  defaultChain: 'bsc-testnet',
  customRpcUrls: {},
};

/**
 * Load config from disk.
 */
export function loadConfig(): CliConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // Fall through to default
  }
  return { ...DEFAULT_CONFIG };
}

/**
 * Save config to disk.
 */
export function saveConfig(config: CliConfig): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  // Restrict permissions on config file (contains private key)
  fs.chmodSync(CONFIG_FILE, 0o600);
}

/**
 * Update a single config field.
 */
export function updateConfig(updates: Partial<CliConfig>): CliConfig {
  const config = loadConfig();
  Object.assign(config, updates);
  saveConfig(config);
  return config;
}

/**
 * Chain configurations — shared with the extension.
 */
export interface ChainConfig {
  key: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorer: string;
  currency: string;
  isTestnet: boolean;
  contracts: {
    identity: string;
    reputation: string;
    validation: string;
  };
  agentRegistry: string;
}

export const CHAINS: Record<string, ChainConfig> = {
  'bsc-testnet': {
    key: 'bsc-testnet',
    name: 'BSC Testnet',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    explorer: 'https://testnet.bscscan.com',
    currency: 'tBNB',
    isTestnet: true,
    contracts: {
      identity: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
      reputation: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
      validation: '0x8004Cb1BF31DAf7788923b405b754f57acEB4272',
    },
    agentRegistry: 'eip155:97:0x8004A818BFB912233c491871b3d84c89A494BD9e',
  },
  'bsc-mainnet': {
    key: 'bsc-mainnet',
    name: 'BSC Mainnet',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.bnbchain.org',
    explorer: 'https://bscscan.com',
    currency: 'BNB',
    isTestnet: false,
    contracts: {
      identity: '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432',
      reputation: '0x8004BAa17C55a88189AE136b182e5fdA19dE9b63',
      validation: '0x8004Cb1BF31DAf7788923b405b754f57acEB4272',
    },
    agentRegistry: 'eip155:56:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432',
  },
  'eth-sepolia': {
    key: 'eth-sepolia',
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
    currency: 'ETH',
    isTestnet: true,
    contracts: {
      identity: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
      reputation: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
      validation: '0x8004Cb1BF31DAf7788923b405b754f57acEB4272',
    },
    agentRegistry: 'eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e',
  },
  'eth-mainnet': {
    key: 'eth-mainnet',
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
    currency: 'ETH',
    isTestnet: false,
    contracts: {
      identity: '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432',
      reputation: '0x8004BAa17C55a88189AE136b182e5fdA19dE9b63',
      validation: '0x8004Cb1BF31DAf7788923b405b754f57acEB4272',
    },
    agentRegistry: 'eip155:1:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432',
  },
};

/** Identity Registry ABI */
export const IDENTITY_ABI = [
  'function register() external returns (uint256 agentId)',
  'function register(string agentURI) external returns (uint256 agentId)',
  'function register(string agentURI, tuple(string metadataKey, bytes metadataValue)[] metadata) external returns (uint256 agentId)',
  'function setAgentURI(uint256 agentId, string newURI) external',
  'function setMetadata(uint256 agentId, string metadataKey, bytes metadataValue) external',
  'function getMetadata(uint256 agentId, string metadataKey) external view returns (bytes)',
  'function getAgentWallet(uint256 agentId) external view returns (address)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function getVersion() external pure returns (string)',
  'function name() external view returns (string)',
  'function symbol() external view returns (string)',
  'event Registered(uint256 indexed agentId, string agentURI, address indexed owner)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
];

/** Reputation Registry ABI */
export const REPUTATION_ABI = [
  'function submitFeedback(uint256 agentId, uint8 rating, string comment) external',
  'function getFeedbackCount(uint256 agentId) external view returns (uint256)',
  'function getAverageRating(uint256 agentId) external view returns (uint256)',
  'function getFeedback(uint256 agentId, uint256 index) external view returns (address reviewer, uint8 rating, string comment, uint256 timestamp)',
];

/**
 * Get a chain config, falling back to config default.
 */
export function getChain(chainKey?: string): ChainConfig {
  const key = chainKey || loadConfig().defaultChain;
  const chain = CHAINS[key];
  if (!chain) {
    throw new Error(`Unknown chain: ${key}. Use 'erc8004 chains' to list available chains.`);
  }
  return chain;
}
