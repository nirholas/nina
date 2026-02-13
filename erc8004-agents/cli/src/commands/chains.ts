/**
 * erc8004 chains — List all supported chains with status.
 */

import { ethers } from 'ethers';
import ora from 'ora';
import { CHAINS, loadConfig } from '../utils/config';
import { header, gold, createTable, printError } from '../utils/display';

export async function chainsCommand(): Promise<void> {
  header('Supported Chains');

  const config = loadConfig();
  const table = createTable(['Chain', 'ID', 'Currency', 'Type', 'Status', 'Default']);

  const spinner = ora('Checking chain connectivity...').start();

  for (const [key, chain] of Object.entries(CHAINS)) {
    let status = '⏳';
    try {
      const provider = new ethers.JsonRpcProvider(chain.rpcUrl, {
        name: chain.name,
        chainId: chain.chainId,
      });
      // Quick connectivity check with timeout
      const blockPromise = provider.getBlockNumber();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 5000)
      );
      const blockNumber = await Promise.race([blockPromise, timeoutPromise]);
      status = `✅ Block ${blockNumber}`;
    } catch {
      status = '❌ Unreachable';
    }

    const isDefault = key === config.defaultChain;
    table.push([
      chain.name,
      chain.chainId.toString(),
      chain.currency,
      chain.isTestnet ? gold('testnet') : 'mainnet',
      status,
      isDefault ? gold('✓') : '',
    ]);
  }

  spinner.stop();
  console.log(table.toString());

  console.log();
  console.log(`  Default chain: ${gold(config.defaultChain)}`);
  console.log();
  console.log('  Contract addresses (shared via CREATE2):');
  console.log(`  Identity:   ${CHAINS['bsc-testnet'].contracts.identity}`);
  console.log(`  Reputation: ${CHAINS['bsc-testnet'].contracts.reputation}`);
  console.log(`  Validation: ${CHAINS['bsc-testnet'].contracts.validation}`);
  console.log();
}
