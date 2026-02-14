import { z } from 'zod';
import type { Argument } from '../interfaces';

const args = Bun.argv;

export function readArgument<T>({
    key,
    name,
    description,
    schema,
    defaultValue,
}: Argument<T>): T {
    console.log(''.padEnd(50, '*'));

    const index = args.indexOf(`-${key}`);

    let value;

    if (index === -1) {
        console.log(
            `${name}:\nDefaulting argument -${key} to ${defaultValue} (${description})`,
        );
        value = defaultValue;
    } else {
        value = args[index + 1];
        console.log(`${name}:\nSet to ${defaultValue}`);
    }

    const parsed = z.safeParse(schema, value);

    if (!parsed.success) {
        console.error('invalid argument provided:');

        for (const issue of parsed.error.issues) {
            console.error(
                `-    ${issue.path.join('.') || '(root)'}: ${issue.message}\n`,
            );
        }

        process.exit(1);
    }

    return parsed.data as unknown as T;
}
