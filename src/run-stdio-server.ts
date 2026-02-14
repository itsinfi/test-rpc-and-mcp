import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { MCP_SERVER_INFO } from './config/constants';

export async function runStdioServer(server: McpServer) {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${MCP_SERVER_INFO.name} running on stdio`);
}
