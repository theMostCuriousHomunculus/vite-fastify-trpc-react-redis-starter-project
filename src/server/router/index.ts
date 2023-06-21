import { z } from 'zod';

import {
	publicProcedure,
	router,
} from '../constants/trpc.js';

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
});

export type AppRouter = typeof appRouter;
