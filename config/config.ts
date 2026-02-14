import { z } from 'zod';

const ConfigSchema = z.object({
    SERVER_HOST: z.coerce.string(),
    SERVER_PORT: z.coerce.number().int(),
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
