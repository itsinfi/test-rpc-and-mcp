import z, { ZodType } from 'zod';
import type { PromptConfig } from '../../types';

export const GENERATE_GREETING_SCHEMA = z.object({
    name: z.string().describe('Name to include in the greeting'),
});

export const GENERATE_FUNNY_GREETING_PROMPT_CONFIG = {
    title: 'Greeting Template for funny greetings',
    description: 'A useful template for greeting someone in a funny way',
    argsSchema: GENERATE_GREETING_SCHEMA as unknown as Record<string, ZodType>,
} as const satisfies PromptConfig;
