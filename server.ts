import { APP_CONFIG, GET_ALERTS_CONFIG, GET_FORECAST_CONFIG } from './config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { callGetAlerts, callGetForecast } from './tools';
import { MCP_SERVER_INFO } from './config/nws/constants';

console.error(APP_CONFIG); // console.log may not be used because it writes to stdout https://modelcontextprotocol.io/docs/develop/build-server#logging-in-mcp-servers-2

const server = new McpServer(MCP_SERVER_INFO);

server.registerTool('get_alerts', GET_ALERTS_CONFIG, callGetAlerts);
server.registerTool('get_forecast', GET_FORECAST_CONFIG, callGetForecast);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Weather MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Error in main():', error);
    process.exit(1);
});
