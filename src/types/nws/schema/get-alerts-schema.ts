import type z from 'zod';
import { GET_ALERTS_SCHEMA } from '../../../config';

export type GetAlertsSchema = z.infer<typeof GET_ALERTS_SCHEMA>;
