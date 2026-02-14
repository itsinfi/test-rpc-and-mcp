import type { ForecastPeriod } from './forecast-period';

export interface ForecastResponse {
    properties: {
        periods: ForecastPeriod[];
    };
}
