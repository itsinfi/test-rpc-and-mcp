import { ZodType } from 'zod';

export interface ToolConfig {
    description: string;
    inputSchema: Record<string, ZodType>;
}
