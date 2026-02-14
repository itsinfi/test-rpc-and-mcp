import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodType } from 'zod';

export interface HttpToolRequest<T> {
    request: Request;
    schema: Record<string, ZodType>;
    toolCaller: (payload: T) => Promise<CallToolResult>;
}
