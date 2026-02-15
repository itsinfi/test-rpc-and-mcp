import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

export function createGetPromptResult(prompt: string): GetPromptResult {
    return {
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: prompt,
                },
            },
        ],
    };
}
