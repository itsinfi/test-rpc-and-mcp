import z from 'zod';
import type { HttpResourceRequest } from '../types';

export async function handleReadResourceViaHttp<T>({
    request,
    schema,
    resourceReader,
}: HttpResourceRequest<T>): Promise<Response> {
    const url = new URL(request.url);

    const params: Record<string, string> = Object.fromEntries(
        url.searchParams.entries(),
    );

    const parsed = schema.safeParse(params);

    if (!parsed.success) {
        return Response.json(
            { message: 'Invalid format', issues: parsed.error.issues },
            { status: 400 },
        );
    }

    const result = await resourceReader(parsed.data as T);

    return Response.json(result, { status: 200 });
}
