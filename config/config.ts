import { z } from 'zod';

export const EnvEnum = z.enum(['LOCAL', 'DOCKER']);

const numberFromString = z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() !== '') {
        const n = Number(val);
        return Number.isNaN(n) ? val : n;
    }
    return val;
}, z.number().int());

const ConfigSchema = z.object({
    ENV: EnvEnum,
    SERVER_URL: z.string(),
    SERVER_PORT: numberFromString,
    CLIENT_URL: z.string(),
    CLIENT_PORT: numberFromString,
});

const parsed = ConfigSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('invalid env config:');

    for (const issue of parsed.error.issues) {
        console.error(
            `-    ${issue.path.join('.') || '(root)'}: ${issue.message}`,
        );
    }

    process.exit(1);
}

export const APP_CONFIG = Object.freeze(parsed.data);
export type AppConfig = z.infer<typeof ConfigSchema>;
