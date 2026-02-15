import type z from 'zod';
import type { GET_FORECAST_SCHEMA } from '../../../config';

export type GetForecastSchema = z.infer<typeof GET_FORECAST_SCHEMA>;
