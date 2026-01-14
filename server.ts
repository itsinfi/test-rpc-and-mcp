import { APP_CONFIG, GET_ALERTS_CONFIG, GET_FORECAST_CONFIG } from './config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { callGetAlerts, callGetForecast } from './tools';
import { MCP_SERVER_INFO } from './config/nws/constants';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';

const server = new McpServer(MCP_SERVER_INFO);

server.registerTool('get_alerts', GET_ALERTS_CONFIG, callGetAlerts);
server.registerTool('get_forecast', GET_FORECAST_CONFIG, callGetForecast);

const transport = new WebStandardStreamableHTTPServerTransport();

await server.connect(transport);

Bun.serve({
    port: APP_CONFIG.SERVER_PORT,
    hostname: APP_CONFIG.SERVER_HOST,
    routes: {
        '/health': new Response('OK'),
        '/mcp': async (req) => await transport.handleRequest(req),
    },
});

console.log(
    `mcp http server listening on http://${APP_CONFIG.SERVER_HOST}:${APP_CONFIG.SERVER_PORT}/mcp`,
);
