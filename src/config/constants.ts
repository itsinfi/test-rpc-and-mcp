import type { Implementation } from '@modelcontextprotocol/sdk/types.js';
import { ServerMode } from '../interfaces';

// DEFAULT CONFIG VALUES ---------------------------------------------------------------------------------------------------------------------
export const DEFAULT_SERVER_HOST = '0.0.0.0';
export const DEFAULT_SERVER_PORT = 3000;
export const DEFAULT_SERVER_MODE = ServerMode.Http;

// CONFIG FOR MCP SERVER ---------------------------------------------------------------------------------------------------------------------
export const MCP_SERVER_INFO: Implementation = Object.freeze({
    name: 'US Weather',
    version: '1.0.0',
});
