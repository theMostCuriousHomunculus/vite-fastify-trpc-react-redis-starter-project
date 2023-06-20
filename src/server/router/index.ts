// import { z } from 'zod';

import {
	// procedure,
	router,
} from '../constants/trpc.js';

export const appRouter = router({
	// postLocation: procedure
	// 	.input(
	// 		z.object({
	// 			latitude: z.number(),
	// 			longitude: z.number(),
	// 		}),
	// 	)
	// 	.mutation(
	// 		({
	// 			ctx: {
	// 				app: {
	// 					io,
	// 					redis,
	// 				},
	// 			},
	// 			input: {
	// 				latitude,
	// 				longitude,
	// 			},
	// 		}) => {
	// 			redis.geoadd(...);
	// 			io.to(...)
	// 			console.log(
	// 				latitude,
	// 				longitude,
	// 			);
	// 		},
	// 	),
});

export type AppRouter = typeof router;
