import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import { inferAsyncReturnType } from '@trpc/server';

export function createContext(
	this: FastifyInstance,
	{
		req,
		res,
	}: CreateFastifyContextOptions,
) {
	return {
		app: this,
		req,
		res,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
