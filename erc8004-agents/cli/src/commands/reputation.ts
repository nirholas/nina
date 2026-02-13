/**
 * erc8004 reputation <tokenId> — Show reputation details.
 */

import { ethers } from 'ethers';
import ora from 'ora';
import { getChain, IDENTITY_ABI, REPUTATION_ABI } from '../utils/config';
import { header, field, section, printError, gold, shortAddr, stars, createTable } from '../utils/display';

interface RepOptions {
  chain?: string;
}

export async function reputationCommand(tokenId: string, options: RepOptions): Promise<void> {
  const chain = getChain(options.chain);

  header(`Reputation: Agent #${tokenId}`);
  field('Chain', `${chain.name} (${chain.chainId})`);

  const spinner = ora('Loading reputation data...').start();

  try {
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl, {
      name: chain.name,
      chainId: chain.chainId,
    });

    // Get agent name
    const idContract = new ethers.Contract(chain.contracts.identity, IDENTITY_ABI, provider);
    let agentName = `Agent #${tokenId}`;
    try {
      const uri = await idContract.tokenURI(tokenId);
      if (uri.startsWith('data:application/json;base64,')) {
        const json = JSON.parse(
          Buffer.from(uri.replace('data:application/json;base64,', ''), 'base64').toString('utf-8')
        );
        agentName = json.name || agentName;
      }
    } catch {
      // No URI
    }

    // Get reputation data
    const repContract = new ethers.Contract(chain.contracts.reputation, REPUTATION_ABI, provider);

    let feedbackCount = 0;
    let averageRating = 0;

    try {
      feedbackCount = Number(await repContract.getFeedbackCount(tokenId));
      if (feedbackCount > 0) {
        averageRating = Number(await repContract.getAverageRating(tokenId));
      }
    } catch {
      // Reputation contract may not be deployed or available
    }

    spinner.stop();

    field('Agent', agentName);
    console.log();

    // Stats
    section('📊 Overview');
    field('Rating', `${stars(Math.round(averageRating))} (${averageRating > 0 ? averageRating.toFixed(1) : '—'}/5)`);
    field('Total Reviews', feedbackCount.toString());

    // Load recent feedbacks
    if (feedbackCount > 0) {
      section('💬 Recent Feedback');

      const table = createTable(['Reviewer', 'Rating', 'Comment', 'Date']);
      const start = Math.max(0, feedbackCount - 10);

      for (let i = feedbackCount - 1; i >= start; i--) {
        try {
          const fb = await repContract.getFeedback(tokenId, i);
          const reviewer = shortAddr(fb[0]);
          const rating = Number(fb[1]);
          const comment = fb[2] || '—';
          const date = new Date(Number(fb[3]) * 1000).toLocaleDateString();
          table.push([reviewer, stars(rating), comment.slice(0, 40), date]);
        } catch {
          break;
        }
      }

      console.log(table.toString());
    } else {
      console.log('\n  No feedback submitted yet.\n');
    }

    console.log();
  } catch (error: any) {
    spinner.fail('Failed to load reputation');
    printError(error.message || String(error));
  }
}
