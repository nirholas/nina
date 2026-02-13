/** Filter agents by chain, service, reputation, etc. */

import type { AgentRecord } from "../storage/database.js";

export interface FilterOptions {
  chain?: number;
  service?: string;
  minReputation?: number;
  owner?: string;
  active?: boolean;
}

/**
 * Apply filters to a list of agents.
 */
export function filterAgents(
  agents: AgentRecord[],
  filters: FilterOptions
): AgentRecord[] {
  return agents.filter((agent) => {
    if (filters.chain !== undefined && agent.chainId !== filters.chain) {
      return false;
    }

    if (filters.service) {
      try {
        const services = JSON.parse(agent.services);
        const hasService = services.some(
          (s: any) =>
            s.name?.toLowerCase() === filters.service!.toLowerCase()
        );
        if (!hasService) return false;
      } catch {
        return false;
      }
    }

    if (filters.minReputation !== undefined && agent.reputationScore < filters.minReputation) {
      return false;
    }

    if (filters.owner && agent.owner.toLowerCase() !== filters.owner.toLowerCase()) {
      return false;
    }

    if (filters.active !== undefined && agent.active !== filters.active) {
      return false;
    }

    return true;
  });
}
