/**
 * @author nich
 * @website x.com/nichxbt
 * @github github.com/nirholas
 * @license Apache-2.0
 */
import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { registerEventsTools } from "./tools.js"
import { registerEventsPrompts } from "./prompts.js"

export function registerEvents(server: McpServer) {
  registerEventsTools(server)
  registerEventsPrompts(server)
}
