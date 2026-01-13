import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export function createCallToolTextResult(text: string): CallToolResult {
    return { content: [{ type: 'text', text }] };
}
