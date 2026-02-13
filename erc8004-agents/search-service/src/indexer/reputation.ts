/** Reputation indexer — fetch and store reputation scores. */

import { ethers } from "ethers";
import type { ChainConfig } from "../utils/chains.js";
import type { AgentDatabase } from "../storage/database.js";

const REPUTATION_ABI = [
  "function getAggregateScore(uint256 agentId) view returns (uint256 score, uint256 totalReviews)",
  "event ScoreSubmitted(uint256 indexed agentId, string domain, uint256 score, address indexed reviewer)",
];

/**
 * Fetch and update reputation scores for agents on a chain.
 */
export async function updateReputationScores(
  db: AgentDatabase,
  chain: ChainConfig,
  agentIds: number[]
): Promise<void> {
  if (!chain.reputationRegistry || agentIds.length === 0) return;

  try {
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
    const contract = new ethers.Contract(
      chain.reputationRegistry,
      REPUTATION_ABI,
      provider
    );

    for (const tokenId of agentIds) {
      try {
        const [score, count] = await contract.getAggregateScore(tokenId);
        const agent = db.getAgent(chain.chainId, tokenId);
        if (agent) {
          agent.reputationScore = Number(score);
          agent.reputationCount = Number(count);
          agent.updatedAt = new Date().toISOString();
          db.upsertAgent(agent);
        }
      } catch {
        // Agent may not have reputation data yet
      }
    }
  } catch (err) {
    console.error(`[reputation] Error updating scores on ${chain.name}:`, err);
  }
}
