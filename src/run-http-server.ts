import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { APP_CONFIG, GET_ALERTS_CONFIG, GET_FORECAST_CONFIG } from './config';
import type { GetAlertsSchema, GetForecastSchema } from './interfaces';
import { callGetAlertsViaHttp, callGetForecastViaHttp } from './tools';
import { handleToolRequestViaHttp } from './utils';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MCP_SERVER_INFO } from './config/constants';

export async function runHttpServer(server: McpServer) {
    const transport = new WebStandardStreamableHTTPServerTransport();
    await server.connect(transport);

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
        '/api/forecast': {
            GET: async (req: Request) =>
                await handleToolRequestViaHttp<GetForecastSchema>({
                    request: req,
                    schema: GET_FORECAST_CONFIG.inputSchema,
                    toolCaller: callGetForecastViaHttp,
                }),
        },
    };

    Bun.serve({
        port: APP_CONFIG.PORT,
        hostname: APP_CONFIG.HOST,
        idleTimeout: APP_CONFIG.IDLE_TIMEOUT,
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
        `${MCP_SERVER_INFO.name} running on http://${APP_CONFIG.HOST}:${APP_CONFIG.PORT}/mcp`,
    );
}
