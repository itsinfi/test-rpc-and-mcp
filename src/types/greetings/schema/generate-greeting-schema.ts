import type z from 'zod';
import type { GENERATE_GREETING_SCHEMA } from '../../../config';

export type GenerateGreetingSchema = z.infer<typeof GENERATE_GREETING_SCHEMA>;
