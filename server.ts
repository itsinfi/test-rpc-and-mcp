import {
    APP_CONFIG,
    GENERATE_FUNNY_GREETING_PROMPT_CONFIG,
    GET_ALERTS_CONFIG,
    GET_FORECAST_CONFIG,
    JOKE_CONFIG,
} from './src/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { callGetAlertsViaMcp, callGetForecastViaMcp } from './src/tools';
import { MCP_SERVER_INFO, MCP_SERVER_OPTIONS } from './src/config/constants';
import { TransportMode } from './src/types';
import { runHttpServer, runStdioServer } from './src';
import { getJokeByTopic, getJokes } from './src/resources';
import { callGenerateFunnyGreetingViaMcp } from './src/prompts/generate-funny-greeting';
import { JOKE_RESOURCES } from './data/joke-resources';

// MCP SERVER SETUP ---------------------------------------------------------------------------------------------------------------------------
const server = new McpServer(MCP_SERVER_INFO, MCP_SERVER_OPTIONS);

// tools
server.registerTool('get_alerts_tool', GET_ALERTS_CONFIG, callGetAlertsViaMcp);
server.registerTool(
    'get_forecast_tool',
    GET_FORECAST_CONFIG,
    callGetForecastViaMcp,
);

//prompts
server.registerPrompt(
    'generate_funny_greeting_prompt',
    GENERATE_FUNNY_GREETING_PROMPT_CONFIG,
    callGenerateFunnyGreetingViaMcp,
);

// resources
// server.registerResource(
//     'jokes',
//     'jokes://list-of-jokes',
//     JOKE_CONFIG.metadata,
//     getJokes,
// );

Object.keys(JOKE_RESOURCES).forEach((topic) =>
    server.registerResource(
        `joke_related_to_${topic}_topic`,
        `jokes://${topic}`,
        JOKE_CONFIG.metadata,
        () => getJokeByTopic({ topic }),
    ),
);

// TRANSPORT PROTOCOL SETUP ---------------------------------------------------------------------------------------------------------------------------
switch (APP_CONFIG.TRANSPORT_MODE) {
    case TransportMode.Http:
        await runHttpServer(server);
        break;

    case TransportMode.Stdio:
        await runStdioServer(server).catch((err) => {
            console.error(err);
            process.exit(1);
        });
        break;
}
