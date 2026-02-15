import { createReadResourceResult } from '../../utils';
import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { JOKE_RESOURCES } from '../../../data/joke-resources';
import type { GetJokeByTopicSchema } from '../../types';

export async function getJokeByTopic({
    topic,
}: GetJokeByTopicSchema): Promise<ReadResourceResult> {
    console.error('topic', topic);

    const joke =
        JOKE_RESOURCES[
            topic.trim().toLowerCase() as keyof typeof JOKE_RESOURCES
        ];

    if (!joke) {
        return createReadResourceResult([
            {
                uri: `jokes://${topic}`,
                text: [
                    `Unknown joke topic: ${topic}`,
                    'Valid topics are:',
                    ...Object.keys(JOKE_RESOURCES).map((key) => `-  ${key}`),
                ].join('\n'),
                mimeType: 'text/plain',
            },
        ]);
    }

    return createReadResourceResult([
        {
            uri: `jokes://${topic}`,
            text: joke,
            mimeType: 'text/plain',
        },
    ]);
}
