import z from 'zod';

export enum TransportMode {
    Http = 'http',
    Stdio = 'stdio',
}

export const ServerModeSchema = z.enum(Object.values(TransportMode));
