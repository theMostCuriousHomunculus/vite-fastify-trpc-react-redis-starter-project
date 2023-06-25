import { FastifyEnvOptions } from '@fastify/env';
import { JSONSchemaType } from 'env-schema';
import { join } from 'path';

export interface EnvironmentVariables {
	APP_NAME: string;
	APP_PORT: number;
	OPENAI_API_KEY: string;
	REDIS_HOST: string;
	REDIS_PORT: number;
}

const fastifyEnvOptions: Omit<
	FastifyEnvOptions,
	'schema'
> & {
	schema: JSONSchemaType<EnvironmentVariables>;
} = {
	dotenv: {
		path: `${join(
			import.meta.url,
			'..',
			'..',
			'..',
		)}.env.${process.argv.includes('--dev')
			? 'development'
			: 'production'}`,
	},
	schema: {
		properties: {
			APP_NAME: {
				default: 'starter-app',
				type: 'string',
			},
			APP_PORT: {
				default: 3333,
				type: 'number',
			},
			OPENAI_API_KEY: { type: 'string' },
			REDIS_HOST: {
				default: '127.0.0.1',
				type: 'string',
			},
			REDIS_PORT: {
				default: 6379,
				type: 'number',
			},
		},
		required: [
			'APP_PORT',
			'APP_NAME',
			'OPENAI_API_KEY',
			'REDIS_HOST',
			'REDIS_PORT',
		],
		type: 'object',
	},
};

export default fastifyEnvOptions;
