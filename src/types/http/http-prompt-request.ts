import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodObject } from 'zod';

export interface HttpPromptRequest<T> {
    request: Request;
    schema: ZodObject;
    getPromptCallback: (payload: T) => GetPromptResult;
}
