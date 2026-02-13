/**
 * erc8004 search — Search/discover agents on-chain.
 */

import { ethers } from 'ethers';
import ora from 'ora';
import { getChain, IDENTITY_ABI } from '../utils/config';
import { header, field, printError, gold, shortAddr, createTable } from '../utils/display';

interface SearchOptions {
  service?: string;
  chain?: string;
  limit?: string;
}

export async function searchCommand(options: SearchOptions): Promise<void> {
  const chain = getChain(options.chain);
  const limit = parseInt(options.limit || '20');
  const serviceFilter = options.service?.toUpperCase();

  header('Search Agents');
  field('Chain', `${chain.name} (${chain.chainId})`);
  if (serviceFilter) {
    field('Service Filter', serviceFilter);
  }

  const spinner = ora('Scanning recent registrations...').start();

  try {
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl, {
      name: chain.name,
      chainId: chain.chainId,
    });
    const contract = new ethers.Contract(chain.contracts.identity, IDENTITY_ABI, provider);

    // Query Registered events from recent blocks
    const filter = contract.filters.Registered();
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 50000);

    spinner.text = `Scanning blocks ${fromBlock}–${currentBlock}...`;
    const events = await contract.queryFilter(filter, fromBlock, currentBlock);

    const agents: Array<{
      tokenId: string;
      name: string;
      owner: string;
      services: string[];
    }> = [];
    const seen = new Set<string>();

    for (const event of events.reverse()) {
      if (agents.length >= limit) {
        break;
      }

      const log = event as ethers.EventLog;
      if (!log.args) {
        continue;
      }

      const tokenId = log.args[0].toString();
      if (seen.has(tokenId)) {
        continue;
      }
      seen.add(tokenId);

      try {
        const owner = await contract.ownerOf(tokenId);
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

        // Apply service filter
        if (serviceFilter && !services.includes(serviceFilter)) {
          continue;
        }

        agents.push({ tokenId, name, owner, services });
      } catch {
        // Skip
      }
    }

    spinner.stop();

    if (agents.length === 0) {
      console.log(`\n  No agents found${serviceFilter ? ` with ${serviceFilter} service` : ''} on ${chain.name}\n`);
      return;
    }

    const table = createTable(['ID', 'Name', 'Owner', 'Services']);
    for (const agent of agents) {
      table.push([
        agent.tokenId,
        agent.name.length > 25 ? agent.name.slice(0, 22) + '...' : agent.name,
        shortAddr(agent.owner),
        agent.services.join(', ') || '—',
      ]);
    }
    console.log();
    console.log(table.toString());
    console.log(`\n  ${gold(`${agents.length} agent(s) found`)}\n`);
  } catch (error: any) {
    spinner.fail('Search failed');
    printError(error.message || String(error));
  }
}
