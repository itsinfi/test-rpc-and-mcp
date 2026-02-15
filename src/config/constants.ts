import type { Implementation } from '@modelcontextprotocol/sdk/types.js';
import { TransportMode } from '../interfaces';

// DEFAULT CONFIG VALUES ---------------------------------------------------------------------------------------------------------------------
export const DEFAULT_SERVER_HOST = '0.0.0.0';
export const DEFAULT_SERVER_PORT = 3000;
export const DEFAULT_SERVER_MODE = TransportMode.Http;
export const DEFAULT_IDLE_TIMEOUT = 30;

// CONFIG FOR MCP SERVER ---------------------------------------------------------------------------------------------------------------------
export const MCP_SERVER_INFO = {
    name: 'nws-weather',
    version: '1.0.0',
} as const satisfies Implementation;
