import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {
    APP_CONFIG,
    GENERATE_GREETING_SCHEMA,
    GET_ALERTS_SCHEMA,
    GET_FORECAST_SCHEMA,
    GET_JOKE_BY_TOPIC_SCHEMA,
} from './config';
import {
    type GenerateGreetingSchema,
    type GetAlertsSchema,
    type GetForecastSchema,
    type GetJokeByTopicSchema,
} from './types';
import { callGetAlertsViaHttp, callGetForecastViaHttp } from './tools';
import { handleCallToolViaHttp, handleGetPromptViaHttp } from './utils';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MCP_SERVER_INFO } from './config/constants';
import { getJokeByTopic, getJokes } from './resources';
import { handleReadResourceViaHttp } from './utils/handle-read-resource-via-http';
import type { ZodType } from 'zod';
import { callGenerateFunnyGreetingViaHttp } from './prompts';

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
                    callToolCallback: callGetAlertsViaHttp,
                }),
        },
        '/api/nws/forecast': {
            GET: async (req: Request) =>
                await handleCallToolViaHttp<GetForecastSchema>({
                    request: req,
                    schema: GET_FORECAST_SCHEMA,
                    callToolCallback: callGetForecastViaHttp,
                }),
        },
        '/api/jokes': {
            GET: async (req: Request) =>
                handleReadResourceViaHttp<GetJokeByTopicSchema>({
                    request: req,
                    schema: GET_JOKE_BY_TOPIC_SCHEMA,
                    readResourceCallback: getJokeByTopic,
                }),
        },
        '/api/funny-greeting-prompt': {
            GET: async (req: Request) =>
                handleGetPromptViaHttp<GenerateGreetingSchema>({
                    request: req,
                    schema: GENERATE_GREETING_SCHEMA,
                    getPromptCallback: callGenerateFunnyGreetingViaHttp,
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

    console.error(
        `${MCP_SERVER_INFO.name} running on http://${APP_CONFIG.HOST}:${APP_CONFIG.PORT}/mcp`,
    );
}
