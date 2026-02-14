import { APP_CONFIG, GET_ALERTS_CONFIG, GET_FORECAST_CONFIG } from './config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
    callGetAlertsViaMcp,
    callGetForecastViaMcp,
    callGetAlertsViaHttp,
    callGetForecastViaHttp,
} from './tools';
import { MCP_SERVER_INFO } from './config/nws/constants';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { handleToolRequestViaHttp } from './utils';
import type { GetAlertsSchema, GetForecastSchema } from './interfaces';

// MCP SERVER SETUP ---------------------------------------------------------------------------------------------------------------------------
const server = new McpServer(MCP_SERVER_INFO);

server.registerTool('get_alerts', GET_ALERTS_CONFIG, callGetAlertsViaMcp);
server.registerTool('get_forecast', GET_FORECAST_CONFIG, callGetForecastViaMcp);

const transport = new WebStandardStreamableHTTPServerTransport();

await server.connect(transport);

// HTTP SERVER SETUP ---------------------------------------------------------------------------------------------------------------------------
const apiRoutes = {
    '/api/health': new Response('OK'),
    '/api/test': {
        GET: async (req: Request) => new Response(await req.text()),
        POST: async (req: Request) => new Response(await req.text()),
    },
    '/api/alerts': {
        GET: async (req: Request) =>
            await handleToolRequestViaHttp<GetAlertsSchema>({
                request: req,
                schema: GET_ALERTS_CONFIG.inputSchema,
                toolCaller: callGetAlertsViaHttp,
            }),
    },
    '/api/forecasts': {
        GET: async (req: Request) =>
            await handleToolRequestViaHttp<GetForecastSchema>({
                request: req,
                schema: GET_FORECAST_CONFIG.inputSchema,
                toolCaller: callGetForecastViaHttp,
            }),
    },
};

Bun.serve({
    port: APP_CONFIG.SERVER_PORT,
    hostname: APP_CONFIG.SERVER_HOST,
    routes: {
        ...apiRoutes,
        '/mcp': async (req: Request) => await transport.handleRequest(req),
    },
    error(error) {
        new Response(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    },
});

console.log(
    `mcp http server listening on http://${APP_CONFIG.SERVER_HOST}:${APP_CONFIG.SERVER_PORT}/mcp`,
);
