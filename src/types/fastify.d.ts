import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from 'fastify';

import type { EnvironmentVariables } from '../server/constants/fastify-env-options';
import { OpenAIApi } from 'openai';

declare module 'fastify' {
	interface FastifyInstance {
		config: EnvironmentVariables;
		openai: OpenAIApi;
		vite: { ready(): Promise<void> };
	}

	interface FastifyReply {
		html(): void;
	}

	interface FastifyRequest {
		requestReceived?: bigint;
	}
}
