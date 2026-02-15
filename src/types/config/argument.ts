import type { ZodType } from 'zod';

export interface Argument<T> {
    key: string;
    name: string;
    description: string;
    schema: ZodType;
    defaultValue: T;
}
