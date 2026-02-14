import { z } from 'zod';
import { readArgument } from './read-argument';
import { ServerMode, ServerModeSchema } from '../interfaces';
import {
    DEFAULT_SERVER_HOST,
    DEFAULT_SERVER_MODE,
    DEFAULT_SERVER_PORT,
} from './constants';

const args = {
    SERVER_HOST: readArgument<string>({
        key: 'h',
        schema: z.coerce.string(),
        defaultValue: DEFAULT_SERVER_HOST,
    }),
    SERVER_PORT: readArgument<number>({
        key: 'p',
        schema: z.coerce.number().int(),
        defaultValue: DEFAULT_SERVER_PORT,
    }),
    SERVER_MODE: readArgument<ServerMode>({
        key: 'm',
        schema: ServerModeSchema,
        defaultValue: DEFAULT_SERVER_MODE,
    }),
};

export const APP_CONFIG = Object.freeze({ ...args });
