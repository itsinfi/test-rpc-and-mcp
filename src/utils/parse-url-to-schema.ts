import type { ZodObject } from 'zod';

export function parseUrlToSchema(urlString: string, schema: ZodObject) {
    const url = new URL(urlString);

    const params: Record<string, string> = Object.fromEntries(
        url.searchParams.entries(),
    );

    return schema.safeParse(params);
}
