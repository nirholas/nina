/**
 * Extension integration tests.
 */

import * as assert from 'assert';
import { CHAINS, getChain, getChainById, getChainKeys } from '../utils/chains';
import { CONTRACT_ADDRESSES, getContracts } from '../utils/contracts';

suite('ERC-8004 Extension Tests', () => {
  suite('Chains', () => {
    test('should have all expected chains', () => {
      const keys = getChainKeys();
      assert.ok(keys.includes('bsc-testnet'));
      assert.ok(keys.includes('bsc-mainnet'));
      assert.ok(keys.includes('eth-sepolia'));
      assert.ok(keys.includes('eth-mainnet'));
    });

    test('should return correct chain by key', () => {
      const chain = getChain('bsc-testnet');
      assert.strictEqual(chain.chainId, 97);
      assert.strictEqual(chain.name, 'BSC Testnet');
      assert.strictEqual(chain.isTestnet, true);
    });

    test('should return chain by ID', () => {
      const chain = getChainById(56);
      assert.ok(chain);
      assert.strictEqual(chain.key, 'bsc-mainnet');
    });

    test('should throw for unknown chain', () => {
      assert.throws(() => getChain('unknown-chain'));
    });

    test('should return undefined for unknown chain ID', () => {
      const chain = getChainById(99999);
      assert.strictEqual(chain, undefined);
    });

    test('testnets should have faucet URLs', () => {
      const testnet = getChain('bsc-testnet');
      assert.ok(testnet.faucetUrl);
      const sepolia = getChain('eth-sepolia');
      assert.ok(sepolia.faucetUrl);
    });

    test('mainnets should not have faucet URLs', () => {
      const mainnet = getChain('bsc-mainnet');
      assert.strictEqual(mainnet.faucetUrl, undefined);
    });
  });

  suite('Contracts', () => {
    test('should have contracts for all chains', () => {
      const chainKeys = getChainKeys();
      for (const key of chainKeys) {
        const contracts = getContracts(key);
        assert.ok(contracts.identity);
        assert.ok(contracts.reputation);
        assert.ok(contracts.validation);
      }
    });

    test('contract addresses should start with 0x8004', () => {
      for (const [, contracts] of Object.entries(CONTRACT_ADDRESSES)) {
        assert.ok(contracts.identity.startsWith('0x8004'));
        assert.ok(contracts.reputation.startsWith('0x8004'));
        assert.ok(contracts.validation.startsWith('0x8004'));
      }
    });

    test('testnet addresses should match across testnets', () => {
      const bscTestnet = getContracts('bsc-testnet');
      const ethSepolia = getContracts('eth-sepolia');
      assert.strictEqual(bscTestnet.identity, ethSepolia.identity);
      assert.strictEqual(bscTestnet.reputation, ethSepolia.reputation);
    });

    test('mainnet addresses should match across mainnets', () => {
      const bscMainnet = getContracts('bsc-mainnet');
      const ethMainnet = getContracts('eth-mainnet');
      assert.strictEqual(bscMainnet.identity, ethMainnet.identity);
      assert.strictEqual(bscMainnet.reputation, ethMainnet.reputation);
    });

    test('should throw for unknown chain', () => {
      assert.throws(() => getContracts('unknown'));
    });
  });

  suite('Agent Card Schema', () => {
    test('should validate agent card structure', () => {
      const agentCard = {
        type: 'https://eips.ethereum.org/EIPS/eip-8004#registration-v1',
        name: 'Test Agent',
        description: 'A test agent',
        services: [
          { name: 'A2A', endpoint: 'https://example.com/a2a', version: '0.3.0' },
        ],
        x402Support: false,
        active: true,
        supportedTrust: ['reputation'],
      };

      assert.strictEqual(agentCard.type, 'https://eips.ethereum.org/EIPS/eip-8004#registration-v1');
      assert.strictEqual(agentCard.name, 'Test Agent');
      assert.ok(Array.isArray(agentCard.services));
      assert.ok(Array.isArray(agentCard.supportedTrust));
    });

    test('should encode/decode data URI correctly', () => {
      const metadata = { name: 'Test', description: 'Test agent' };
      const encoded = Buffer.from(JSON.stringify(metadata)).toString('base64');
      const dataUri = `data:application/json;base64,${encoded}`;

      const decoded = JSON.parse(
        Buffer.from(dataUri.replace('data:application/json;base64,', ''), 'base64').toString('utf-8')
      );
      assert.deepStrictEqual(decoded, metadata);
    });
  });
});
