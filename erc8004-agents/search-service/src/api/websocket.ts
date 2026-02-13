/** WebSocket real-time feed for agent events. */

import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import type { AgentDatabase } from "../storage/database.js";

interface FeedMessage {
  type: "agent_registered" | "agent_updated" | "reputation_updated" | "ping";
  data: Record<string, unknown>;
  timestamp: string;
}

export class AgentFeed {
  private wss: WebSocketServer | null = null;
  private clients = new Set<WebSocket>();
  private heartbeat: ReturnType<typeof setInterval> | null = null;

  constructor(private db: AgentDatabase) {}

  /** Attach WebSocket server to an HTTP server. */
  attach(server: Server, path = "/api/feed"): void {
    this.wss = new WebSocketServer({ server, path });

    this.wss.on("connection", (ws) => {
      this.clients.add(ws);

      ws.on("close", () => {
        this.clients.delete(ws);
      });

      ws.on("error", () => {
        this.clients.delete(ws);
      });

      // Send welcome message with current stats
      const stats = this.db.getStats();
      const welcome: FeedMessage = {
        type: "ping",
        data: {
          message: "Connected to ERC-8004 Agent Feed",
          totalAgents: stats.total,
        },
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(welcome));
    });

    // Heartbeat every 30s to keep connections alive
    this.heartbeat = setInterval(() => {
      const msg: FeedMessage = {
        type: "ping",
        data: { clients: this.clients.size },
        timestamp: new Date().toISOString(),
      };
      this.broadcast(msg);
    }, 30_000);
  }

  /** Broadcast an event to all connected clients. */
  broadcast(message: FeedMessage): void {
    const payload = JSON.stringify(message);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }

  /** Notify about new agent registration. */
  notifyRegistration(
    chainId: number,
    tokenId: number,
    owner: string,
    agentName?: string
  ): void {
    this.broadcast({
      type: "agent_registered",
      data: { chainId, tokenId, owner, name: agentName },
      timestamp: new Date().toISOString(),
    });
  }

  /** Notify about agent metadata update. */
  notifyUpdate(chainId: number, tokenId: number, field: string): void {
    this.broadcast({
      type: "agent_updated",
      data: { chainId, tokenId, field },
      timestamp: new Date().toISOString(),
    });
  }

  /** Notify about reputation score change. */
  notifyReputationUpdate(
    chainId: number,
    tokenId: number,
    newScore: number
  ): void {
    this.broadcast({
      type: "reputation_updated",
      data: { chainId, tokenId, reputationScore: newScore },
      timestamp: new Date().toISOString(),
    });
  }

  /** Number of connected clients. */
  get clientCount(): number {
    return this.clients.size;
  }

  /** Shut down the WebSocket server. */
  close(): void {
    if (this.heartbeat) clearInterval(this.heartbeat);
    if (this.wss) this.wss.close();
    this.clients.clear();
  }
}
