import type { ToolConfig } from '../../types';
import { z, ZodType } from 'zod';

// CONFIG FOR NWS API ---------------------------------------------------------------------------------------------------------------------
export const NWS_API_BASE: string = 'https://api.weather.gov';
export const USER_AGENT: string = 'weather-app/1.0';

// CONFIG FOR COORDINATE CONSTRAINTS ---------------------------------------------------------------------------------------------------------------------
const MIN_LATITUDE = 24;
const MAX_LATITUDE = 72;
const MIN_LONGITUDE = -169;
const MAX_LONGITUDE = -66;

// CONFIG FOR ALERTS ---------------------------------------------------------------------------------------------------------------------
export const GET_ALERTS_SCHEMA = z.object({
    state: z.coerce
        .string()
        .length(2)
        .describe('Two-letter state code (e.g. CA, NY)'),
});

export const GET_ALERTS_CONFIG = {
    title: 'US Weather Alerts',
    description: 'Get weather alerts for a US state',
    inputSchema: GET_ALERTS_SCHEMA as unknown as Record<string, ZodType>,
} as const satisfies ToolConfig;

// CONFIG FOR FORECASTS ---------------------------------------------------------------------------------------------------------------------
export const GET_FORECAST_SCHEMA = z.object({
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
});

export const GET_FORECAST_CONFIG = {
    title: 'US Weather Forecast',
    description:
        'Get weather forecast for a location in the USA that must be provided as coordinates',
    inputSchema: GET_FORECAST_SCHEMA as unknown as Record<string, ZodType>,
} as const satisfies ToolConfig;
