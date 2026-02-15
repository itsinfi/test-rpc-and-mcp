import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export function createCallToolResult(text: string): CallToolResult {
    console.error('output:', text);

    return { content: [{ type: 'text', text }] };
}
