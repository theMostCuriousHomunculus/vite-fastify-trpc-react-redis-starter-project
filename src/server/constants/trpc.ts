import { initTRPC } from '@trpc/server';

import { Context } from './context.js';

export const {
	mergeRouters,
	middleware,
	procedure,
	router,
} = initTRPC.context<Context>().create();
