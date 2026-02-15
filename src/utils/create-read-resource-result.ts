import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Resource } from '../types';

export function createReadResourceResult(
    resources: Resource[],
): ReadResourceResult {
    console.error(
        [
            'output:',
            ...resources.map((resource) =>
                [
                    `-  uri: ${resource.uri}`,
                    `   -   mime type: ${resource.mimeType}`,
                    `   -   text: ${resource.text}`,
                ].join('\n'),
            ),
        ].join('\n'),
    );

    console.error('resources', resources);

    return { contents: resources };
}
