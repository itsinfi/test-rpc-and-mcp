import type { ZodType } from 'zod';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export interface HttpToolRequest<T> {
    request: Request;
    schema: Record<string, ZodType>;
    toolCaller: (payload: T) => Promise<CallToolResult>;
}
