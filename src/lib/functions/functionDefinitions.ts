import type { ChatCompletionCreateParams } from 'openai/resources/chat';

const functionDefinitions = [
	{
		name: 'get_current_weather',
		description: 'Get the current weather',
		parameters: {
			type: 'object',
			properties: {
				location: {
					type: 'string',
					description: 'The city and state, e.g. San Francisco, CA'
				},
				format: {
					type: 'string',
					enum: ['celsius', 'fahrenheit'],
					description: 'The temperature unit to use. Infer this from the users location.'
				}
			},
			required: ['location', 'format']
		}
	},
	{
		name: 'get_current_time',
		description: 'Get the current time',
		parameters: {
			type: 'object',
			properties: {},
			required: []
		}
	}
] as const;

export type FunctionName = (typeof functionDefinitions)[number]['name'];

export const functions: ChatCompletionCreateParams.Function[] = [...functionDefinitions];

export const getFunctionName = (name: string): FunctionName | null => {
	if (isFunctionName(name)) {
		return name;
	}
	return null;
};

const isFunctionName = (name: string): name is FunctionName => {
	return functionDefinitions.some((def) => def.name === name);
};
