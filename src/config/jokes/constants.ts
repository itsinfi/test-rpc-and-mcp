import { JOKE_RESOURCES } from '../../../data/joke-resources';
import type { ResourceConfig } from '../../interfaces';

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
            text: JOKE_RESOURCES.SPONGEBOB,
            mimeType: MIME_TYPE,
        },
        {
            uri: 'jokes://computer-science',
            text: JOKE_RESOURCES.COMPUTER_SCIENCE,
            mimeType: MIME_TYPE,
        },
        {
            uri: 'jokes://dad-joke',
            text: JOKE_RESOURCES.DAD_JOKE,
            mimeType: MIME_TYPE,
        },
    ],
} as const satisfies ResourceConfig;
