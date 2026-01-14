import { z } from 'zod';

const numberFromString = z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() !== '') {
        const n = Number(val);
        return Number.isNaN(n) ? val : n;
    }
    return val;
}, z.number().int());

const ConfigSchema = z.object({
    SERVER_HOST: z.string(),
    SERVER_PORT: numberFromString,
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
