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
	},
	{
		name: 'get_current_items',
		description: 'Get the current items pu-sa has.',
		parameters: {
			type: 'object',
			properties: {},
			required: []
		}
	},
	{
		name: 'add_item',
		description: 'Add item to pu-sa. pu-sa always receives the item.',
		parameters: {
			type: 'object',
			properties: {
				item: {
					type: 'string',
					description: 'Item to add.'
				}
			},
			required: ['item']
		}
	}
] as const;

export type FunctionName = (typeof functionDefinitions)[number]['name'];

export const functions: ChatCompletionCreateParams.Function[] = [...functionDefinitions];

export const getFunctionName = (name: string): FunctionName | null =>
	isFunctionName(name) ? name : null;

const isFunctionName = (name: string): name is FunctionName =>
	functionDefinitions.some((def) => def.name === name);
