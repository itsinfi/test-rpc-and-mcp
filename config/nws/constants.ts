import type { Implementation } from '@modelcontextprotocol/sdk/types.js';
import type { ToolConfig } from '../../interfaces/nws/tool-config';
import { z } from 'zod';

export const MCP_SERVER_INFO: Implementation = Object.freeze({
    name: 'Weather',
    version: '1.0.0',
});

export const NWS_API_BASE: string = 'https://api.weather.gov';

export const USER_AGENT: string = 'weather-app/1.0';

export const GET_ALERTS_CONFIG: ToolConfig = Object.freeze({
    description: 'Get weather alerts for a state',
    inputSchema: {
        state: z
            .string()
            .length(2)
            .describe('Two-letter state code (e.g. CA, NY)'),
    },
});

export const GET_FORECAST_CONFIG: ToolConfig = Object.freeze({
    description: 'Get weather forecast for a location',
    inputSchema: {
        latitude: z
            .number()
            .min(-90)
            .max(90)
            .describe('Latitude of the location'),
        longitude: z
            .number()
            .min(-180)
            .max(180)
            .describe('Longitude of the location'),
    },
});
