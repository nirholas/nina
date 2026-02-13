/**
 * erc8004 list — List agents for an address.
 */

import { ethers } from 'ethers';
import ora from 'ora';
import { getChain, loadConfig, IDENTITY_ABI } from '../utils/config';
import { header, field, printError, gold, shortAddr, createTable, link } from '../utils/display';

interface ListOptions {
  owner?: string;
  chain?: string;
}

export async function listCommand(options: ListOptions): Promise<void> {
  const chain = getChain(options.chain);
  const ownerAddress = options.owner;

  if (!ownerAddress) {
    printError('Owner address is required. Use --owner <address>');
    return;
  }

  if (!ethers.isAddress(ownerAddress)) {
    printError('Invalid address format');
    return;
  }

  header(`Agents for ${shortAddr(ownerAddress)}`);
  field('Chain', `${chain.name} (${chain.chainId})`);

  const spinner = ora('Scanning Transfer events...').start();

  try {
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl, {
      name: chain.name,
      chainId: chain.chainId,
    });
    const contract = new ethers.Contract(chain.contracts.identity, IDENTITY_ABI, provider);

    // Query Transfer events to this address
    const filter = contract.filters.Transfer(null, ownerAddress);
    const events = await contract.queryFilter(filter);

    const agents: Array<{ tokenId: string; name: string; services: string[] }> = [];
    const seen = new Set<string>();

    for (const event of events) {
      const log = event as ethers.EventLog;
      if (log.args) {
        const tokenId = log.args[2].toString();
        if (seen.has(tokenId)) {
          continue;
        }
        seen.add(tokenId);

        try {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() !== ownerAddress.toLowerCase()) {
            continue;
          }

          let name = `Agent #${tokenId}`;
          let services: string[] = [];

          try {
            const uri = await contract.tokenURI(tokenId);
            if (uri.startsWith('data:application/json;base64,')) {
              const json = JSON.parse(
                Buffer.from(uri.replace('data:application/json;base64,', ''), 'base64').toString('utf-8')
              );
              name = json.name || name;
              services = (json.services || []).map((s: any) => s.name);
            }
          } catch {
            // No URI
          }

          agents.push({ tokenId, name, services });
        } catch {
          // Token doesn't exist or other error
        }
      }
    }

    spinner.stop();

    if (agents.length === 0) {
      console.log(`\n  No agents found for ${shortAddr(ownerAddress)} on ${chain.name}\n`);
      return;
    }

    const table = createTable(['ID', 'Name', 'Services']);
    for (const agent of agents) {
      table.push([agent.tokenId, agent.name, agent.services.join(', ') || '—']);
    }
    console.log();
    console.log(table.toString());
    console.log(`\n  ${gold(`${agents.length} agent(s) found`)}\n`);
  } catch (error: any) {
    spinner.fail('Failed to list agents');
    printError(error.message || String(error));
  }
}
