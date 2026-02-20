import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodObject } from 'zod';

export interface HttpResourceRequest<T> {
    request: Request;
    schema: ZodObject;
    readResourceCallback: (payload: T) => Promise<ReadResourceResult>;
}
