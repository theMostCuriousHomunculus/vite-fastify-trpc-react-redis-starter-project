import {
	Configuration,
	OpenAIApi,
} from 'openai';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import fastifyRedis from '@fastify/redis';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastifyVite from '@fastify/vite';
import { join } from 'path';
import socketioServer from 'fastify-socket.io';

import { appRouter } from './router/index.js';
import { createContext } from './constants/context.js';
import fastifyEnvOptions from './constants/fastify-env-options.js';

const server = fastify({
	logger: process.argv.includes('--dev')
		? {
			hooks: {
				// i don't want to log the auto generated info messages but i want to be able to explicitly call server.log.info
				logMethod(args, method, level) {
					if (
						level === 30
						&& args[1] === 'incoming request'
					) {
						return;
					}
					return method.apply(
						this,
						args,
					);
				},
			},
			level: 'info',
			timestamp: false,
			transport: {
				options: {
					colorize: true,
					customColors: 'error:red,info:blue',
					ignore: 'hostname,pid',
					messageFormat: '[starter-app]: {msg}',
				},
				target: 'pino-pretty',
			},
		}
		: false,
	maxParamLength: 5_000,
});

await server.register(
	fastifyEnv,
	fastifyEnvOptions,
);

await server.register(fastifyCors);

await server.register(
	fastifyRedis,
	{
		closeClient: true,
		host: 'redis',
		port: server.config.REDIS_PORT,
	},
);

await server.register(socketioServer);

server.decorate(
	'openai',
	new OpenAIApi(new Configuration({ apiKey: server.config.OPENAI_API_KEY })),
);

await server.register(
	fastifyTRPCPlugin,
	{
		prefix: '/trpc',
		trpcOptions: {
			createContext: createContext.bind(server),
			router: appRouter,
		},
	},
);

await server.register(
	fastifyVite,
	{
		dev: process.argv.includes('--dev'),
		root: join(
			import.meta.url,
			'..',
			'..',
			'..',
		),
		spa: true,
	},
);

if (process.argv.includes('--dev')) {
	server.addHook(
		'onRequest',
		async (request, _reply) => {
			if (request.url.startsWith('/trpc')) {
				request.requestReceived = process.hrtime.bigint();
			}
		},
	);
	
	server.addHook(
		'onResponse',
		(request, _reply) => {
			if (request.url.startsWith('/trpc')) {
				if (request.requestReceived) {
					server.log.info(`${request.url} resolved in ${Math.round(Number(process.hrtime.bigint() - request.requestReceived) / 1e6)} ms`);
				}
			}
		},
	);
}

server.get(
	'*',
	(_req, reply) => reply.html(),
);

await server.vite.ready();

await server.listen({
	host: '0.0.0.0',
	port: server.config.APP_PORT,
});
