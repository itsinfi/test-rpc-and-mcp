import z from 'zod';
import { JOKE_RESOURCES } from '../../../data/joke-resources';
import type { ResourceConfig } from '../../types';

const MIME_TYPE = 'text/plain';

export const JOKE_CONFIG = {
    metadata: {
        title: 'Joke Collection',
        description: 'Collection of different jokes for different topics',
        mimeType: MIME_TYPE,
    },
    resources: [
        {
            uri: 'jokes://spongebob',
            text: JOKE_RESOURCES['spongebob'],
            mimeType: MIME_TYPE,
        },
        {
            uri: 'jokes://computer-science',
            text: JOKE_RESOURCES['computer-science'],
            mimeType: MIME_TYPE,
        },
        {
            uri: 'jokes://dad-joke',
            text: JOKE_RESOURCES['dad-joke'],
            mimeType: MIME_TYPE,
        },
    ],
} as const satisfies ResourceConfig;

export const GET_JOKE_BY_TOPIC_SCHEMA = z.object({
    topic: z.string(),
});
