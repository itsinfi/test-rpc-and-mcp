import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { NWS_API_BASE } from '../../config';
import type { AlertsResponse, GetAlertsSchema } from '../../interfaces';
import {
    createCallToolTextResult,
    formatAlert,
    makeNWSRequest,
} from '../../utils';
import type { ShapeOutput } from '@modelcontextprotocol/sdk/server/zod-compat.js';
import type { ZodType } from 'zod';
import type { $ZodTypeInternals } from 'zod/v4/core';

async function getAlerts({ state }: GetAlertsSchema): Promise<CallToolResult> {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

    if (!alertsData) {
        return createCallToolTextResult('Failed to retrieve alerts data');
    }

    const features = alertsData.features || [];
    if (features.length === 0) {
        return createCallToolTextResult(`No active alerts for ${stateCode}`);
    }

    const formattedAlerts = features.map(formatAlert);
    const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join('\n')}`;

    return createCallToolTextResult(alertsText);
}

export const callGetAlerts = async (
    args: ShapeOutput<
        Record<
            string,
            ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>
        >
    >,
) => await getAlerts(args as unknown as GetAlertsSchema);
