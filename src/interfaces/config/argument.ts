import type { ZodType } from 'zod';

export interface Argument<T> {
    key: string;
    schema: ZodType;
    defaultValue: T;
}
