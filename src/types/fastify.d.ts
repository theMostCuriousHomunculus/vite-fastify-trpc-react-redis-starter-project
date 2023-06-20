import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from 'fastify';

import { EnvironmentVariables } from '../server/constants/fastify-env-options';

declare module 'fastify' {
	interface FastifyInstance {
		config: EnvironmentVariables;
		vite: { ready(): Promise<void> };
	}

	interface FastifyReply {
		html(): void;
	}

	interface FastifyRequest {
		requestReceived?: bigint;
	}
}
