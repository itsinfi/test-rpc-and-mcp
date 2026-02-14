import z from 'zod';

export enum ServerMode {
    Http = 'http',
    Stdio = 'stdio',
}

export const ServerModeSchema = z.enum(Object.values(ServerMode));
