import type { HttpPromptRequest, HttpToolRequest } from '../types';
import { parseUrlToSchema } from './parse-url-to-schema';

export async function handleGetPromptViaHttp<T>({
    request,
    schema,
    getPromptCallback,
}: HttpPromptRequest<T>): Promise<Response> {
    const parsed = parseUrlToSchema(request.url, schema);

    if (!parsed.success) {
        return Response.json(
            { message: 'Invalid format', issues: parsed.error.issues },
            { status: 400 },
        );
    }

    const result = getPromptCallback(parsed.data as T);

    return Response.json(result, { status: 200 });
}
