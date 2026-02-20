import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import { createGetPromptResult } from '../utils';
import type { GenerateGreetingSchema } from '../types';
import type { ShapeOutput } from '@modelcontextprotocol/sdk/server/zod-compat.js';
import type { ZodType } from 'zod';
import type { $ZodTypeInternals } from 'zod/v4/core';

function generateFunnyGreeting({
    name,
}: GenerateGreetingSchema): GetPromptResult {
    const prompt = `Greet ${name} in a funny manner and tell a joke that only a software developer could understand.`;

    return createGetPromptResult(prompt);
}

export const callGenerateFunnyGreetingViaMcp = (
    args: ShapeOutput<
        Record<
            string,
            ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>
        >
    >,
) => generateFunnyGreeting(args as unknown as GenerateGreetingSchema);

export const callGenerateFunnyGreetingViaHttp = (
    payload: GenerateGreetingSchema,
) => generateFunnyGreeting(payload);
