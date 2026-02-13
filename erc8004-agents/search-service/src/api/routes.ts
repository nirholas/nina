/** REST API routes for the search service. */

import { Hono } from "hono";
import { z } from "zod";
import type { AgentDatabase } from "../storage/database.js";
import type { Cache } from "../storage/cache.js";
import type { SearchEngine } from "../search/engine.js";
import { filterAgents, type FilterOptions } from "../search/filters.js";
import { rankResults } from "../search/ranking.js";
import { getChain, getAllChains } from "../utils/chains.js";

export function createRoutes(
  db: AgentDatabase,
  search: SearchEngine,
  cache: Cache
): Hono {
  const app = new Hono();

  // ── Search Agents ───────────────────────────────────────────────────

  app.get("/api/agents", (c) => {
    const q = c.req.query("q") || "";
    const chain = c.req.query("chain");
    const service = c.req.query("service");
    const minRep = c.req.query("minReputation");
    const owner = c.req.query("owner");
    const limit = Math.min(parseInt(c.req.query("limit") || "50"), 200);
    const offset = parseInt(c.req.query("offset") || "0");

    const cacheKey = `search:${q}:${chain}:${service}:${minRep}:${owner}:${limit}:${offset}`;
    const cached = cache.get(cacheKey);
    if (cached) return c.json(cached);

    // Full-text search
    let results = search.search(q, 500);

    // Apply filters
    const filters: FilterOptions = {};
    if (chain) {
      const chainConfig = getChain(chain);
      if (chainConfig) filters.chain = chainConfig.chainId;
      else {
        const chainId = parseInt(chain);
        if (!isNaN(chainId)) filters.chain = chainId;
      }
    }
    if (service) filters.service = service;
    if (minRep) filters.minReputation = parseInt(minRep);
    if (owner) filters.owner = owner;

    const filtered = filterAgents(
      results.map((r) => r.agent),
      filters
    ).map((agent) => ({
      agent,
      score: results.find((r) => r.agent.id === agent.id)?.score || 0,
    }));

    // Rank results
    const ranked = rankResults(filtered);

    // Paginate
    const paginated = ranked.slice(offset, offset + limit);

    const response = {
      results: paginated.map((r) => ({
        ...r.agent,
        services: JSON.parse(r.agent.services),
        relevanceScore: Math.round(r.score * 1000) / 1000,
      })),
      total: ranked.length,
      limit,
      offset,
      query: q || undefined,
      filters: {
        chain: chain || undefined,
        service: service || undefined,
        minReputation: minRep ? parseInt(minRep) : undefined,
      },
    };

    cache.set(cacheKey, response, 30_000);
    return c.json(response);
  });

  // ── Get Agent by ID ─────────────────────────────────────────────────

  app.get("/api/agents/:chainId/:tokenId", (c) => {
    const chainId = parseInt(c.req.param("chainId"));
    const tokenId = parseInt(c.req.param("tokenId"));

    if (isNaN(chainId) || isNaN(tokenId)) {
      return c.json({ error: "Invalid chainId or tokenId" }, 400);
    }

    const cacheKey = `agent:${chainId}:${tokenId}`;
    const cached = cache.get(cacheKey);
    if (cached) return c.json(cached);

    const agent = db.getAgent(chainId, tokenId);
    if (!agent) {
      return c.json({ error: "Agent not found" }, 404);
    }

    const response = {
      ...agent,
      services: JSON.parse(agent.services),
    };

    cache.set(cacheKey, response, 60_000);
    return c.json(response);
  });

  // ── Get Agents by Owner ─────────────────────────────────────────────

  app.get("/api/agents/owner/:address", (c) => {
    const address = c.req.param("address");
    if (!address || !address.startsWith("0x")) {
      return c.json({ error: "Invalid address" }, 400);
    }

    const agents = db.getAgentsByOwner(address);
    return c.json({
      agents: agents.map((a) => ({
        ...a,
        services: JSON.parse(a.services),
      })),
      total: agents.length,
      owner: address,
    });
  });

  // ── Global Stats ────────────────────────────────────────────────────

  app.get("/api/stats", (c) => {
    const cacheKey = "stats";
    const cached = cache.get(cacheKey);
    if (cached) return c.json(cached);

    const stats = db.getStats();
    const chains = getAllChains();

    const response = {
      totalAgents: stats.total,
      byChain: Object.entries(stats.byChain).map(([chainId, count]) => {
        const chain = getChain(parseInt(chainId));
        return {
          chainId: parseInt(chainId),
          name: chain?.name || `Chain ${chainId}`,
          count,
        };
      }),
      byService: Object.entries(stats.byService)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
      supportedChains: chains.map((c) => ({
        chainId: c.chainId,
        name: c.name,
        explorer: c.explorer,
      })),
      indexedAt: new Date().toISOString(),
    };

    cache.set(cacheKey, response, 120_000);
    return c.json(response);
  });

  // ── Reputation ──────────────────────────────────────────────────────

  app.get("/api/reputation/:chainId/:tokenId", (c) => {
    const chainId = parseInt(c.req.param("chainId"));
    const tokenId = parseInt(c.req.param("tokenId"));

    if (isNaN(chainId) || isNaN(tokenId)) {
      return c.json({ error: "Invalid parameters" }, 400);
    }

    const agent = db.getAgent(chainId, tokenId);
    if (!agent) {
      return c.json({ error: "Agent not found" }, 404);
    }

    return c.json({
      chainId,
      tokenId,
      agentName: agent.name,
      reputationScore: agent.reputationScore,
      reputationCount: agent.reputationCount,
    });
  });

  // ── Health Check ────────────────────────────────────────────────────

  app.get("/api/health", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      indexSize: search.size,
      cacheSize: cache.size,
    });
  });

  return app;
}
