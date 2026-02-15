import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Resource } from '../interfaces';

export function createReadResourceResult(
    resource: Resource,
): ReadResourceResult {
    console.error(
        [
            'output:',
            `-  uri: ${resource.uri}`,
            `-  mime type: ${resource.mimeType}`,
            `-  text: ${resource.text}`,
        ].join('\n'),
    );

    return { contents: [resource] };
}
