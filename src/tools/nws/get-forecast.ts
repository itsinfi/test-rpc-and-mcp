import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import {
    type ForecastResponse,
    type PointsResponse,
    type ForecastPeriod,
    type GetForecastSchema,
} from '../../types';
import { NWS_API_BASE } from '../../config';
import { createCallToolResult, makeNWSRequest } from '../../utils';
import type { $ZodTypeInternals } from 'zod/v4/core';
import type { ZodType } from 'zod';
import type { ShapeOutput } from '@modelcontextprotocol/sdk/server/zod-compat.js';

async function getForecast({
    latitude,
    longitude,
}: GetForecastSchema): Promise<CallToolResult> {
    console.error(
        [
            ''.padEnd(50, '*'),
            'GET_FORECAST',
            'input: ',
            `-    latitude: ${latitude}`,
            `-    longitude: ${latitude}`,
        ].join('\n'),
    );

    // get grid point data
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

    if (!pointsData) {
        const text =
            `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}.` +
            'This location may not be supported by the NWS API (only US locations are supported).';

        return createCallToolResult(text);
    }

    const forecastUrl = pointsData.properties?.forecast;

    if (!forecastUrl) {
        return createCallToolResult(
            'Failed to get forecast URL from grid point data',
        );
    }

    // get forecast data
    const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
    if (!forecastData) {
        return createCallToolResult('Failed to retrieve forecast data');
    }

    const periods = forecastData.properties?.periods || [];
    if (periods.length === 0) {
        return createCallToolResult('No forecast periods available');
    }

    // format forecast periods
    const formattedForecast = periods.map((period: ForecastPeriod) =>
        [
            `${period.name || 'unknown'}:`,
            `temperature: ${period.temperature || 'unknown'}°${period.temperatureUnit || 'F'}`,
            `wind: ${period.windSpeed || 'unknown'} ${period.windDirection || ''}`,
            `${period.shortForecast || 'no forecast available'}`,
            '---',
        ].join('\n'),
    );

    const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join('\n')}`;

    return createCallToolResult(forecastText);
}

export const callGetForecastViaMcp = async (
    args: ShapeOutput<
        Record<
            string,
            ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>
        >
    >,
) => await getForecast(args as unknown as GetForecastSchema);

export const callGetForecastViaHttp = async (payload: GetForecastSchema) =>
    await getForecast(payload);
