import { z } from 'zod';
import { readArgument } from './read-argument';
import { TransportMode as TransportMode, ServerModeSchema } from '../types';
import {
    DEFAULT_SERVER_HOST as DEFAULT_HOST,
    DEFAULT_SERVER_MODE as DEFAULT_TRANSPORT_MODE,
    DEFAULT_SERVER_PORT as DEFAULT_PORT,
    DEFAULT_IDLE_TIMEOUT,
} from './constants';

const args = {
    TRANSPORT_MODE: readArgument<TransportMode>({
        key: 'm',
        name: 'TRANSPORT MODE',
        description: "either 'http' or 'stdio'",
        schema: ServerModeSchema,
        defaultValue: DEFAULT_TRANSPORT_MODE,
    }),
    HOST: readArgument<string>({
        key: 'h',
        name: 'HOST',
        description: 'hostname used for the server (if transport mode is http)',
        schema: z.coerce.string(),
        defaultValue: DEFAULT_HOST,
    }),
    PORT: readArgument<number>({
        key: 'p',
        name: 'PORT',
        description: 'port used for the server (if transport mode is http)',
        schema: z.coerce.number().int(),
        defaultValue: DEFAULT_PORT,
    }),
    IDLE_TIMEOUT: readArgument<number>({
        key: 't',
        name: 'IDLE TIMEOUT',
        description: 'session timeout (if transport mode is http)',
        schema: z.coerce.number().int(),
        defaultValue: DEFAULT_IDLE_TIMEOUT,
    }),
};

console.error(''.padEnd(50, '*'));

export const APP_CONFIG = Object.freeze({ ...args });
