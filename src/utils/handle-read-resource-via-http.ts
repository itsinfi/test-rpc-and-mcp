import z from 'zod';
import type { HttpResourceRequest } from '../types';
import { parseUrlToSchema } from './parse-url-to-schema';

export async function handleReadResourceViaHttp<T>({
    request,
    schema,
    readResourceCallback,
}: HttpResourceRequest<T>): Promise<Response> {
    const parsed = parseUrlToSchema(request.url, schema);

    if (!parsed.success) {
        return Response.json(
            { message: 'Invalid format', issues: parsed.error.issues },
            { status: 400 },
        );
    }

    const result = await readResourceCallback(parsed.data as T);

    return Response.json(result, { status: 200 });
}
