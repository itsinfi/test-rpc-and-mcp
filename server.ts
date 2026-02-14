import {
    APP_CONFIG,
    GET_ALERTS_CONFIG,
    GET_FORECAST_CONFIG,
    readArgument,
} from './src/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { callGetAlertsViaMcp, callGetForecastViaMcp } from './src/tools';
import { MCP_SERVER_INFO } from './src/config/constants';
import { TransportMode } from './src/interfaces';
import { runHttpServer, runStdioServer } from './src';

// MCP SERVER SETUP ---------------------------------------------------------------------------------------------------------------------------
const server = new McpServer(MCP_SERVER_INFO);

server.registerTool('get_alerts', GET_ALERTS_CONFIG, callGetAlertsViaMcp);
server.registerTool('get_forecast', GET_FORECAST_CONFIG, callGetForecastViaMcp);

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
