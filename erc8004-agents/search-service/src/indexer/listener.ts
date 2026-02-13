/** Event listener — index AgentRegistered events across chains. */

import { ethers } from "ethers";
import type { ChainConfig } from "../utils/chains.js";
import type { AgentDatabase, AgentRecord } from "../storage/database.js";
import { fetchAgentMetadata, metadataToFields } from "./metadata.js";
import { updateReputationScores } from "./reputation.js";

const IDENTITY_ABI = [
  "event Registered(uint256 indexed agentId, string agentURI, address indexed owner)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
];

export type OnAgentRegistered = (agent: AgentRecord) => void;

/**
 * Listen for new agent registrations on a specific chain.
 */
export class ChainListener {
  private chain: ChainConfig;
  private db: AgentDatabase;
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private running = false;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private onRegistered?: OnAgentRegistered;

  constructor(chain: ChainConfig, db: AgentDatabase, onRegistered?: OnAgentRegistered) {
    this.chain = chain;
    this.db = db;
    this.onRegistered = onRegistered;
    this.provider = new ethers.JsonRpcProvider(chain.rpcUrl);
    this.contract = new ethers.Contract(
      chain.identityRegistry,
      IDENTITY_ABI,
      this.provider
    );
  }

  /** Start listening for events. */
  async start(): Promise<void> {
    this.running = true;
    console.log(`[indexer] Starting listener for ${this.chain.name} (chain ${this.chain.chainId})`);

    // Index historical events first
    await this.indexHistorical();

    // Then poll for new events
    const interval = this.chain.pollInterval || 5000;
    this.pollTimer = setInterval(() => this.pollNewEvents(), interval);
  }

  /** Stop listening. */
  stop(): void {
    this.running = false;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
    console.log(`[indexer] Stopped listener for ${this.chain.name}`);
  }

  /** Index historical Registered events from last known block. */
  private async indexHistorical(): Promise<void> {
    try {
      const lastBlock = this.db.getLastBlock(this.chain.chainId);
      const currentBlock = await this.provider.getBlockNumber();

      if (lastBlock >= currentBlock) return;

      const startBlock = lastBlock > 0 ? lastBlock + 1 : Math.max(0, currentBlock - 100_000);
      const batchSize = 5000;

      console.log(`[indexer] ${this.chain.name}: Scanning blocks ${startBlock} → ${currentBlock}`);

      for (let from = startBlock; from <= currentBlock; from += batchSize) {
        if (!this.running) break;
        const to = Math.min(from + batchSize - 1, currentBlock);

        try {
          const filter = this.contract.filters.Registered();
          const events = await this.contract.queryFilter(filter, from, to);

          for (const event of events) {
            await this.processRegisteredEvent(event as ethers.EventLog);
          }

          this.db.setLastBlock(this.chain.chainId, to);
        } catch (err) {
          console.error(`[indexer] ${this.chain.name}: Error scanning ${from}-${to}:`, err);
          break;
        }
      }

      console.log(`[indexer] ${this.chain.name}: Historical scan complete`);
    } catch (err) {
      console.error(`[indexer] ${this.chain.name}: Error during historical indexing:`, err);
    }
  }

  /** Poll for new events since last known block. */
  private async pollNewEvents(): Promise<void> {
    if (!this.running) return;

    try {
      const lastBlock = this.db.getLastBlock(this.chain.chainId);
      const currentBlock = await this.provider.getBlockNumber();

      if (lastBlock >= currentBlock) return;

      const from = lastBlock + 1;
      const filter = this.contract.filters.Registered();
      const events = await this.contract.queryFilter(filter, from, currentBlock);

      const newAgentIds: number[] = [];

      for (const event of events) {
        const agent = await this.processRegisteredEvent(event as ethers.EventLog);
        if (agent) {
          newAgentIds.push(agent.tokenId);
        }
      }

      this.db.setLastBlock(this.chain.chainId, currentBlock);

      // Update reputation scores for newly found agents
      if (newAgentIds.length > 0) {
        await updateReputationScores(this.db, this.chain, newAgentIds);
      }
    } catch (err) {
      // Network errors are expected — log and retry on next poll
      console.error(`[indexer] ${this.chain.name}: Poll error:`, err);
    }
  }

  /** Process a single Registered event. */
  private async processRegisteredEvent(event: ethers.EventLog): Promise<AgentRecord | null> {
    try {
      const agentId = Number(event.args[0]);
      const agentURI = event.args[1] as string;
      const owner = event.args[2] as string;

      const record: AgentRecord = {
        id: `${this.chain.chainId}:${agentId}`,
        chainId: this.chain.chainId,
        tokenId: agentId,
        owner,
        name: "",
        description: "",
        agentUri: agentURI,
        services: "[]",
        image: null,
        active: true,
        reputationScore: 0,
        reputationCount: 0,
        txHash: event.transactionHash,
        blockNumber: event.blockNumber,
        registeredAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Fetch and parse metadata
      const meta = await fetchAgentMetadata(agentURI);
      if (meta) {
        const fields = metadataToFields(meta);
        Object.assign(record, fields);
      }

      this.db.upsertAgent(record);

      if (this.onRegistered) {
        this.onRegistered(record);
      }

      console.log(`[indexer] ${this.chain.name}: Indexed agent #${agentId} — ${record.name || "(unnamed)"}`);
      return record;
    } catch (err) {
      console.error(`[indexer] Error processing event:`, err);
      return null;
    }
  }
}
