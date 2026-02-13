/** Ranking algorithm for search results. */

import type { AgentRecord } from "../storage/database.js";
import type { SearchResult } from "./engine.js";

interface RankingWeights {
  /** Text relevance weight (from search engine) */
  relevance: number;
  /** Reputation score weight */
  reputation: number;
  /** Recency weight (newer = better) */
  recency: number;
  /** Service count weight (more services = better) */
  serviceCount: number;
}

const DEFAULT_WEIGHTS: RankingWeights = {
  relevance: 0.4,
  reputation: 0.3,
  recency: 0.15,
  serviceCount: 0.15,
};

/**
 * Re-rank search results using a weighted scoring algorithm.
 */
export function rankResults(
  results: SearchResult[],
  weights: Partial<RankingWeights> = {}
): SearchResult[] {
  const w = { ...DEFAULT_WEIGHTS, ...weights };

  if (results.length === 0) return [];

  // Normalize factors
  const maxRelevance = Math.max(...results.map((r) => r.score), 1);
  const maxReputation = Math.max(
    ...results.map((r) => r.agent.reputationScore),
    1
  );

  const now = Date.now();
  const maxAge = Math.max(
    ...results.map((r) => now - new Date(r.agent.registeredAt).getTime()),
    1
  );

  const maxServices = Math.max(
    ...results.map((r) => countServices(r.agent)),
    1
  );

  return results
    .map((result) => {
      const relevanceScore = result.score / maxRelevance;
      const reputationScore = result.agent.reputationScore / maxReputation;
      const age = now - new Date(result.agent.registeredAt).getTime();
      const recencyScore = 1 - age / maxAge;
      const serviceScore = countServices(result.agent) / maxServices;

      const finalScore =
        w.relevance * relevanceScore +
        w.reputation * reputationScore +
        w.recency * recencyScore +
        w.serviceCount * serviceScore;

      return { agent: result.agent, score: finalScore };
    })
    .sort((a, b) => b.score - a.score);
}

function countServices(agent: AgentRecord): number {
  try {
    return JSON.parse(agent.services).length;
  } catch {
    return 0;
  }
}
