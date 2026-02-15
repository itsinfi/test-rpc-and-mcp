import { z } from 'zod';
import type { ReadResourceCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import type {
    ServerNotification,
    ServerRequest,
} from '@modelcontextprotocol/sdk/types.js';
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';

export async function handleReadResourceViaHttp({
    request,
    resourceReader,
}: {
    request: Request;
    resourceReader: ReadResourceCallback;
}): Promise<Response> {
    const url = new URL(request.url);

    const uri = new URL(url.searchParams.get('uri') ?? '');

    const params: Record<string, string> = Object.fromEntries(
        url.searchParams.entries(),
    );

    const extra = params as unknown as RequestHandlerExtra<
        ServerRequest,
        ServerNotification
    >;

    const result = await resourceReader(uri, extra);

    return Response.json(result, { status: 200 });
}
