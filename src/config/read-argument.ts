import { z } from 'zod';
import type { Argument } from '../interfaces';

const args = Bun.argv;

export function readArgument<T>({ key, schema, defaultValue }: Argument<T>): T {
    const index = args.indexOf(`-${key}`);

    let value;

    if (index === -1) {
        console.log(`Defaulting argument -${key} to ${defaultValue}`);
        value = defaultValue;
    } else {
        value = args[index + 1];
    }

    const parsed = z.safeParse(schema, value);

    if (!parsed.success) {
        console.error('invalid argument provided:');

        for (const issue of parsed.error.issues) {
            console.error(
                `-    ${issue.path.join('.') || '(root)'}: ${issue.message}`,
            );
        }

        process.exit(1);
    }

    return parsed.data as unknown as T;
}
