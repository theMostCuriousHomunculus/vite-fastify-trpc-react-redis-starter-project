import { FastifyEnvOptions } from '@fastify/env';
import { JSONSchemaType } from 'env-schema';
import { join } from 'path';

export interface EnvironmentVariables {
	APP_NAME: string;
	APP_PORT: number;
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
				default: 'clm',
				type: 'string',
			},
			APP_PORT: {
				default: 3333,
				type: 'number',
			},
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
			'REDIS_HOST',
			'REDIS_PORT',
		],
		type: 'object',
	},
};

export default fastifyEnvOptions;
