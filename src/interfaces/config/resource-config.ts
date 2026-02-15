import type { ResourceMetadata } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Resource } from './resource';

export interface ResourceConfig {
    metadata: ResourceMetadata;
    resources: Resource[];
}
