/**
 * erc8004 view <tokenId> — Display agent details.
 */

import { ethers } from 'ethers';
import ora from 'ora';
import { getChain, IDENTITY_ABI } from '../utils/config';
import { header, field, section, printError, gold, link, shortAddr, prettyJson } from '../utils/display';

interface ViewOptions {
  chain?: string;
}

export async function viewCommand(tokenId: string, options: ViewOptions): Promise<void> {
  header(`Agent #${tokenId}`);

  const chain = getChain(options.chain);
  const spinner = ora(`Loading agent #${tokenId} on ${chain.name}...`).start();

  try {
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl, {
      name: chain.name,
      chainId: chain.chainId,
    });
    const contract = new ethers.Contract(chain.contracts.identity, IDENTITY_ABI, provider);

    // Fetch data
    const owner = await contract.ownerOf(tokenId);
    spinner.text = 'Fetching URI...';

    let uri = '';
    let metadata: Record<string, unknown> = {};
    try {
      uri = await contract.tokenURI(tokenId);
      if (uri.startsWith('data:application/json;base64,')) {
        const base64 = uri.replace('data:application/json;base64,', '');
        metadata = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
      }
    } catch {
      // No URI set
    }

    let agentWallet = '';
    try {
      const w = await contract.getAgentWallet(tokenId);
      if (w !== ethers.ZeroAddress) {
        agentWallet = w;
      }
    } catch {
      // No wallet
    }

    spinner.stop();

    // Display
    field('Token ID', tokenId);
    field('Chain', `${chain.name} (${chain.chainId})`);
    field('Owner', owner);
    field('Contract', link(`${chain.explorer}/address/${chain.contracts.identity}`));

    if (metadata.name) {
      section('📋 Identity');
      field('Name', metadata.name as string);
      if (metadata.description) {
        field('Description', metadata.description as string);
      }
      if (metadata.image) {
        field('Image', metadata.image as string);
      }
    }

    if (agentWallet) {
      field('Agent Wallet', agentWallet);
    }

    const services = metadata.services as Array<{ name: string; endpoint: string; version?: string }>;
    if (services && services.length > 0) {
      section('🔌 Services');
      for (const svc of services) {
        field(svc.name, `${svc.endpoint}${svc.version ? ` (v${svc.version})` : ''}`);
      }
    }

    const trust = metadata.supportedTrust as string[];
    if (trust && trust.length > 0) {
      section('🛡️ Trust');
      field('Mechanisms', trust.join(', '));
    }

    if (metadata.x402Support !== undefined) {
      field('x402 Payments', metadata.x402Support ? 'Enabled' : 'Disabled');
    }

    const registrations = metadata.registrations as Array<{ agentId: number; agentRegistry: string }>;
    if (registrations && registrations.length > 0) {
      section('📡 Registrations');
      for (const reg of registrations) {
        field(`Agent ${reg.agentId}`, reg.agentRegistry);
      }
    }

    if (uri) {
      section('📄 Raw URI');
      if (uri.length > 200) {
        console.log(`  ${uri.slice(0, 100)}...`);
        console.log(`  (${uri.length} characters)`);
      } else {
        console.log(`  ${uri}`);
      }
    }

    console.log();
  } catch (error: any) {
    spinner.fail('Failed to load agent');
    if (error.message?.includes('ERC721')) {
      printError(`Agent #${tokenId} does not exist on ${chain.name}`);
    } else {
      printError(error.message || String(error));
    }
  }
}
