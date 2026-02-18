import "@nomicfoundation/hardhat-ethers";

import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || process.env.BSCSCAN_API_KEY || "",
    }
  },
  chainDescriptors: {
    1: {
      name: "Ethereum Mainnet",
      blockExplorers: {
        etherscan: {
          url: "https://etherscan.io",
          apiUrl: "https://api.etherscan.io/v2/api",
        }
      }
    },
    11155111: {
      name: "Sepolia",
      blockExplorers: {
        etherscan: {
          url: "https://sepolia.etherscan.io",
          apiUrl: "https://api.etherscan.io/v2/api",
        }
      }
    },
    84532: {
      name: "Base Sepolia",
      blockExplorers: {
        etherscan: {
          url: "https://sepolia.basescan.org",
          apiUrl: "https://api.etherscan.io/v2/api",
        }
      }
    },
    56: {
      name: "BSC Mainnet",
      blockExplorers: {
        etherscan: {
          url: "https://bscscan.com",
          apiUrl: "https://api.bscscan.com/api",
        }
      }
    },
    97: {
      name: "BSC Testnet",
      blockExplorers: {
        etherscan: {
          url: "https://testnet.bscscan.com",
          apiUrl: "https://api-testnet.bscscan.com/api",
        }
      }
    },
    204: {
      name: "opBNB Mainnet",
      blockExplorers: {
        etherscan: {
          url: "https://opbnb.bscscan.com",
          apiUrl: "https://api-opbnb.bscscan.com/api",
        }
      }
    },
    5611: {
      name: "opBNB Testnet",
      blockExplorers: {
        etherscan: {
          url: "https://opbnb-testnet.bscscan.com",
          apiUrl: "https://api-opbnb-testnet.bscscan.com/api",
        }
      }
    }
  },
  solidity: {
    profiles: {
      default: {
        version: "0.8.24",
        settings: {
          evmVersion: "shanghai",
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,

        },
      },
      production: {
        version: "0.8.24",
        settings: {
          evmVersion: "shanghai",
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.SEPOLIA_PRIVATE_KEY] : [],
    },
    mainnet: {
      type: "http",
      chainType: "l1",
      url: process.env.MAINNET_RPC_URL || "",
      accounts: process.env.MAINNET_PRIVATE_KEY ? [process.env.MAINNET_PRIVATE_KEY] : [],
    },
    baseSepolia: {
      type: "http",
      chainType: "op",
      url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      accounts: process.env.BASE_SEPOLIA_PRIVATE_KEY ? [process.env.BASE_SEPOLIA_PRIVATE_KEY] : [],
    },
    // BSC Mainnet
    bsc: {
      type: "http",
      chainType: "l1",
      url: process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org",
      accounts: process.env.BSC_PRIVATE_KEY ? [process.env.BSC_PRIVATE_KEY] : [],
    },
    // BSC Testnet
    bscTestnet: {
      type: "http",
      chainType: "l1",
      url: process.env.BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: process.env.BSC_TESTNET_PRIVATE_KEY ? [process.env.BSC_TESTNET_PRIVATE_KEY] : [],
    },
    // opBNB Mainnet (OP Stack)
    opbnb: {
      type: "http",
      chainType: "op",
      url: process.env.OPBNB_RPC_URL || "https://opbnb-mainnet-rpc.bnbchain.org",
      accounts: process.env.OPBNB_PRIVATE_KEY ? [process.env.OPBNB_PRIVATE_KEY] : [],
    },
    // opBNB Testnet (OP Stack)
    opbnbTestnet: {
      type: "http",
      chainType: "op",
      url: process.env.OPBNB_TESTNET_RPC_URL || "https://opbnb-testnet-rpc.bnbchain.org",
      accounts: process.env.OPBNB_TESTNET_PRIVATE_KEY ? [process.env.OPBNB_TESTNET_PRIVATE_KEY] : [],
    },
  },
};

export default config;
