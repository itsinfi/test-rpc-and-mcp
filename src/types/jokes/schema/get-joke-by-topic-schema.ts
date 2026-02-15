import z, { ZodType } from 'zod';
import { GET_JOKE_BY_TOPIC_SCHEMA } from '../../../config';

const test = z.object({
    topic: z.string(),
});

interface Bla {
    test: Record<string, ZodType>;
}

const bla: Bla = { test: test as unknown as Record<string, ZodType> };

export type GetJokeByTopicSchema = z.infer<typeof test>;
