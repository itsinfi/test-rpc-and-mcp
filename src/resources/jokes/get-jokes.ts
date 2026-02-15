import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { JOKE_CONFIG } from '../../config';
import { createReadResourceResult } from '../../utils';
import type {
    ReadResourceResult,
    ServerNotification,
    ServerRequest,
} from '@modelcontextprotocol/sdk/types.js';
import { JOKE_RESOURCES } from '../../../data/joke-resources';

export async function getJokes(
    uri: URL,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
): Promise<ReadResourceResult> {
    const topic = uri.hostname;

    const joke =
        JOKE_RESOURCES[
            topic.trim().toUpperCase() as keyof typeof JOKE_RESOURCES
        ];

    if (!joke) {
        return createReadResourceResult({
            uri: uri.toString(),
            text: [
                `Unknown joke topic: ${topic}`,
                'Valid topics are:',
                ...Object.keys(JOKE_RESOURCES).map(
                    (key) => `-  ${key.toLocaleLowerCase()}`,
                ),
            ].join('\n'),
            mimeType: 'text/plain',
        });
    }

    return createReadResourceResult({
        uri: uri.toString(),
        text: joke,
        mimeType: 'text/plain',
    });
}
