import { initTRPC } from '@trpc/server';

import { Context } from './context.js';

const {
	mergeRouters,
	middleware,
	procedure: publicProcedure,
	router,
} = initTRPC.context<Context>().create();

export {
	mergeRouters,
	middleware,
	publicProcedure,
	router,
};
