import type { ChatCompletionCreateParams } from 'openai/resources/chat';

const functionDefinitions = [
	{
		name: 'get_restaurant_suggestions',
		description: 'Get restaurant suggestions',
		parameters: {
			type: 'object',
			properties: {
				keyword: {
					type: 'string',
					description:
						'Keyword to search for.Do not contain the word "restaurant" or "レストラン".words is separated by space.only 3 words can be specified.'
				}
			},
			required: ['keyword']
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