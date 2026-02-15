import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';
import type { ZodType } from 'zod';

export interface ToolConfig {
    title: string;
    description: string;
    inputSchema: Record<string, ZodType>;
    outputSchema?: Record<string, ZodType>;
    annotations?: ToolAnnotations;
    _meta?: Record<string, unknown>;
}
