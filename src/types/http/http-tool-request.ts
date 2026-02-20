import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodObject } from 'zod';

export interface HttpToolRequest<T> {
    request: Request;
    schema: ZodObject;
    callToolCallback: (payload: T) => Promise<CallToolResult>;
}
