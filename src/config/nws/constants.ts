import type { ToolConfig } from '../../interfaces';
import { z } from 'zod';

// CONFIG FOR NWS API ---------------------------------------------------------------------------------------------------------------------
export const NWS_API_BASE: string = 'https://api.weather.gov';
export const USER_AGENT: string = 'weather-app/1.0';

// CONFIG FOR COORDINATE CONSTRAINTS ---------------------------------------------------------------------------------------------------------------------
const MIN_LATITUDE = 24;
const MAX_LATITUDE = 72;
const MIN_LONGITUDE = -169;
const MAX_LONGITUDE = -66;

// CONFIG FOR ALERTS ---------------------------------------------------------------------------------------------------------------------
export const GET_ALERTS_CONFIG = {
    // TODO:
    title: 'US Weather Alerts',
    description: 'Get weather alerts for a US state',
    inputSchema: {
        state: z.coerce
            .string()
            .length(2)
            .describe('Two-letter state code (e.g. CA, NY)'),
    },
    outputSchema: {},
    annotations: {},
    _meta: {},
} as const satisfies ToolConfig;

// CONFIG FOR FORECASTS ---------------------------------------------------------------------------------------------------------------------
export const GET_FORECAST_CONFIG = {
    title: 'US Weather Forecast',
    description:
        'Get weather forecast for a location in the USA that must be provided as coordinates',
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
} as const satisfies ToolConfig;
