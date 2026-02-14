import type { Implementation } from '@modelcontextprotocol/sdk/types.js';
import type { ToolConfig } from '../../interfaces/nws/tool-config';
import { z } from 'zod';

// CONFIG FOR MCP SERVER ---------------------------------------------------------------------------------------------------------------------
export const MCP_SERVER_INFO: Implementation = Object.freeze({
    name: 'US Weather',
    version: '1.0.0',
});

// CONFIG FOR NWS API ---------------------------------------------------------------------------------------------------------------------
export const NWS_API_BASE: string = 'https://api.weather.gov';
export const USER_AGENT: string = 'weather-app/1.0';

// CONFIG FOR COORDINATE CONSTRAINTS ---------------------------------------------------------------------------------------------------------------------
const MIN_LATITUDE = 24;
const MAX_LATITUDE = 72;
const MIN_LONGITUDE = -169;
const MAX_LONGITUDE = -66;

// CONFIG FOR ALERTS ---------------------------------------------------------------------------------------------------------------------
export const GET_ALERTS_CONFIG: ToolConfig = Object.freeze({
    description: 'Get weather alerts for a state',
    inputSchema: {
        state: z.coerce
            .string()
            .length(2)
            .describe('Two-letter state code (e.g. CA, NY)'),
    },
});

// CONFIG FOR FORECASTS ---------------------------------------------------------------------------------------------------------------------
export const GET_FORECAST_CONFIG: ToolConfig = Object.freeze({
    description: 'Get weather forecast for a location',
    inputSchema: {
        latitude: z.coerce
            .number()
            .min(MIN_LATITUDE)
            .max(MAX_LATITUDE)
            .describe('Latitude of the location'),
        longitude: z.coerce
            .number()
            .min(MIN_LONGITUDE)
            .max(MAX_LONGITUDE)
            .describe('Longitude of the location'),
    },
});
