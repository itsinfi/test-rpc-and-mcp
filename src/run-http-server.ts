import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {
    APP_CONFIG,
    GET_ALERTS_SCHEMA,
    GET_FORECAST_SCHEMA,
    GET_JOKE_BY_TOPIC_SCHEMA,
} from './config';
import type {
    GetAlertsSchema,
    GetForecastSchema,
    GetJokeByTopicSchema,
} from './types';
import { callGetAlertsViaHttp, callGetForecastViaHttp } from './tools';
import { handleCallToolViaHttp } from './utils';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MCP_SERVER_INFO } from './config/constants';
import { getJokeByTopic, getJokes } from './resources';
import { handleReadResourceViaHttp } from './utils/handle-read-resource-via-http';
import type { ZodType } from 'zod';

export async function runHttpServer(server: McpServer) {
    const transport = new WebStandardStreamableHTTPServerTransport();
    await server.connect(transport);

    const apiRoutes = {
        '/api/test': new Response('OK'),
        '/api/nws/alerts': {
            GET: async (req: Request) =>
                await handleCallToolViaHttp<GetAlertsSchema>({
                    request: req,
                    schema: GET_ALERTS_SCHEMA,
                    toolCaller: callGetAlertsViaHttp,
                }),
        },
        '/api/nws/forecast': {
            GET: async (req: Request) =>
                await handleCallToolViaHttp<GetForecastSchema>({
                    request: req,
                    schema: GET_FORECAST_SCHEMA,
                    toolCaller: callGetForecastViaHttp,
                }),
        },
        '/api/jokes': {
            GET: async (req: Request) =>
                handleReadResourceViaHttp<GetJokeByTopicSchema>({
                    request: req,
                    schema: GET_JOKE_BY_TOPIC_SCHEMA,
                    resourceReader: getJokeByTopic,
                }),
            //GET: Response.json(getJokes()),
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

    console.error(
        `${MCP_SERVER_INFO.name} running on http://${APP_CONFIG.HOST}:${APP_CONFIG.PORT}/mcp`,
    );
}
