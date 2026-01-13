import type { AlertFeature } from '../../interfaces';

export function formatAlert(feature: AlertFeature): string {
    const { properties } = feature;
    return [
        `event: ${properties.event || 'unknown'}`,
        `area: ${properties.areaDesc || 'unknown'}`,
        `severity: ${properties.severity || 'unknown'}`,
        `status: ${properties.status || 'unknown'}`,
        `headline: ${properties.headline || 'unknown'}`,
        '---',
    ].join('\n');
}
