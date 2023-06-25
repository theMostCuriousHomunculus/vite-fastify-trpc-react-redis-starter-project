import { z } from 'zod';

import {
	publicProcedure,
	router,
} from '../constants/trpc.js';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
	postLocation: publicProcedure
		.input(
			z.object({
				latitude: z.number(),
				longitude: z.number(),
			}),
		)
		.mutation(
			({
				ctx: {
					app: {
						io,
						log,
						redis,
					},
					res,
				},
				input: {
					latitude,
					longitude,
				},
			}) => {
				// redis.geoadd(...);
				// io.to(...);
				log.info(`Lat: ${latitude}, Lon: ${longitude}`);
				res.status(200);
				// res.send();
				return null;
			},
		),
	prompt: publicProcedure
		.input(z.object({ query: z.string() }))
		.mutation(
			async ({
				ctx: {
					app: {
						log,
						openai,
					},
				},
				input: { query },
			}) => {
				const response = await openai.createChatCompletion({
					messages: [
						{
							content: 'You are a zoo tour guide for elementary school children.  Politely decline to respond prompts unrelated to zoology.  Otherwise, respond in the same language as the user\'s prompt.',
							role: 'system',
						},
						{
							content: query,
							role: 'user',
						},
					],
					model: 'gpt-3.5-turbo',
				});

				if (response.data.choices[0].message) {
					log.info(`openai tokens used: ${response.data.usage?.total_tokens}`);
					return response.data.choices[0].message.content;
				}

				throw new TRPCError({
					code: 'UNPROCESSABLE_CONTENT',
					message: 'Bad client!  Bad!',
				});
			},
		),
});

export type AppRouter = typeof appRouter;
