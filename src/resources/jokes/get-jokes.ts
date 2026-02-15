import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { JOKE_CONFIG } from '../../config';
import { createReadResourceResult } from '../../utils';
import type {
    ReadResourceResult,
    ServerNotification,
    ServerRequest,
} from '@modelcontextprotocol/sdk/types.js';

export async function getJokes(
    uri: URL,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
): Promise<ReadResourceResult> {
    return createReadResourceResult(JOKE_CONFIG.resources);
}
