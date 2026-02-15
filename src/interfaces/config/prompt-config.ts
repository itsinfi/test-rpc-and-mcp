import type { ZodType } from 'zod';

export interface PromptConfig {
    title: string;
    description: string;
    argsSchema: Record<string, ZodType>;
}
