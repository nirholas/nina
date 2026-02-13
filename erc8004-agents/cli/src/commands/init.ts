/**
 * erc8004 init — Scaffold .well-known/agent-card.json in current directory.
 */

import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import { getChain, CHAINS } from '../utils/config';
import { header, field, printSuccess, printError, gold } from '../utils/display';

interface InitOptions {
  name?: string;
  chain?: string;
}

export async function initCommand(options: InitOptions): Promise<void> {
  header('Initialize Agent Config');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Agent name:',
      default: options.name || path.basename(process.cwd()),
      validate: (v: string) => v.trim().length > 0 || 'Required',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: 'An ERC-8004 registered AI agent',
    },
    {
      type: 'list',
      name: 'chain',
      message: 'Target chain:',
      choices: Object.values(CHAINS).map((c) => ({
        name: `${c.name} (${c.chainId})${c.isTestnet ? ' [testnet]' : ''}`,
        value: c.key,
      })),
      default: options.chain || 'bsc-testnet',
    },
    {
      type: 'checkbox',
      name: 'services',
      message: 'Service protocols:',
      choices: ['A2A', 'MCP', 'OASF'],
      default: ['A2A'],
    },
    {
      type: 'input',
      name: 'endpoint',
      message: 'Primary endpoint URL:',
      default: 'https://api.example.com',
    },
    {
      type: 'checkbox',
      name: 'files',
      message: 'Files to generate:',
      choices: [
        { name: 'agent-card.json', value: 'agent-card', checked: true },
        { name: 'ai-plugin.json', value: 'ai-plugin', checked: false },
      ],
    },
  ]);

  const chain = getChain(answers.chain);
  const wellKnownDir = path.join(process.cwd(), '.well-known');

  // Create .well-known directory
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }

  // Generate agent-card.json
  if (answers.files.includes('agent-card')) {
    const agentCard = {
      type: 'https://eips.ethereum.org/EIPS/eip-8004#registration-v1',
      name: answers.name,
      description: answers.description,
      services: answers.services.map((svc: string) => ({
        name: svc,
        endpoint: `${answers.endpoint}/${svc.toLowerCase()}`,
        version: svc === 'A2A' ? '0.3.0' : svc === 'MCP' ? '2025-06-18' : '1.0.0',
      })),
      x402Support: false,
      active: true,
      registrations: [
        {
          agentId: 0,
          agentRegistry: chain.agentRegistry,
        },
      ],
      supportedTrust: ['reputation'],
    };

    const filePath = path.join(wellKnownDir, 'agent-card.json');
    fs.writeFileSync(filePath, JSON.stringify(agentCard, null, 2) + '\n');
    field('Created', filePath);
  }

  // Generate ai-plugin.json
  if (answers.files.includes('ai-plugin')) {
    const aiPlugin = {
      schema_version: 'v1',
      name_for_human: answers.name,
      name_for_model: answers.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      description_for_human: answers.description,
      description_for_model: answers.description,
      auth: { type: 'none' },
      api: {
        type: 'openapi',
        url: `${answers.endpoint}/openapi.json`,
        is_user_authenticated: false,
      },
      logo_url: '',
      contact_email: '',
      legal_info_url: '',
      erc8004: {
        chain: chain.name,
        chainId: chain.chainId,
        identityRegistry: chain.contracts.identity,
        reputationRegistry: chain.contracts.reputation,
      },
    };

    const filePath = path.join(wellKnownDir, 'ai-plugin.json');
    fs.writeFileSync(filePath, JSON.stringify(aiPlugin, null, 2) + '\n');
    field('Created', filePath);
  }

  printSuccess('Agent config scaffolded!');
  console.log(`  ${gold('Next steps:')}`);
  console.log('  1. Edit .well-known/agent-card.json with your actual endpoints');
  console.log('  2. Deploy your agent service');
  console.log(`  3. Run ${gold('erc8004 register')} to register on-chain`);
  console.log();
}
