import { nanoid, type ChatRequest, type Message } from 'ai';
import type { ChatCompletionMessage } from 'openai/resources/chat';
import type { FunctionName } from './functions';

export const handlers: {
	[key in FunctionName]: (
		chatMessages: Message[],
		functionCall: ChatCompletionMessage.FunctionCall
	) => Promise<ChatRequest>;
} = {
	get_restaurant_suggestions: async (
		chatMessages: Message[],
		functionCall: ChatCompletionMessage.FunctionCall
	): Promise<ChatRequest> => {
		try {
			const parsedFunctionCallArguments: { keyword: string } = JSON.parse(functionCall.arguments);

			// fetch hotpepper api
			const response = await fetch('/api/hotpepper', {
				method: 'POST',
				body: JSON.stringify({
					keyword: parsedFunctionCallArguments.keyword
				})
			});

			const json = await response.json();

			const functionResponse: ChatRequest = {
				messages: [
					...chatMessages,
					{
						id: nanoid(),
						name: 'get_restaurant_suggestions',
						role: 'function' as const,
						content: JSON.stringify({
							suggestion: json,
							info: 'Here are some restaurant suggestions'
						})
					}
				]
			};

			return functionResponse;
		} catch (e) {
			console.log(e);
		}
		throw new Error('Function failed');
	},
	get_current_time: async (chatMessages: Message[]): Promise<ChatRequest> => {
		const time = new Date().toLocaleTimeString();
		const functionResponse: ChatRequest = {
			messages: [
				...chatMessages,
				{
					id: nanoid(),
					name: 'get_current_time',
					role: 'function' as const,
					content: JSON.stringify({ time })
				}
			]
			// You can also (optionally) return a list of functions here that the model can call next
			// functions
		};

		return functionResponse;
	},
	get_current_items: async (chatMessages: Message[]): Promise<ChatRequest> => {
		const response = await fetch('/api/d1/items', {
			method: 'GET'
		});
		const json = await response.json();
		const functionResponse: ChatRequest = {
			messages: [
				...chatMessages,
				{
					id: nanoid(),
					name: 'get_current_items',
					role: 'function' as const,
					content: JSON.stringify({
						items: json
					})
				}
			]
		};

		return functionResponse;
	},
	add_item: async (
		chatMessages: Message[],
		functionCall: ChatCompletionMessage.FunctionCall
	): Promise<ChatRequest> => {
		const parsedFunctionCallArguments: { item: string } = JSON.parse(functionCall.arguments);
		const response = await fetch('/api/d1/items', {
			method: 'POST',
			body: JSON.stringify({
				item: parsedFunctionCallArguments.item
			})
		});
		const result: { item: string; states: string } = await response.json();
		const functionResponse: ChatRequest = {
			messages: [
				...chatMessages,
				{
					id: nanoid(),
					name: 'add_item',
					role: 'function' as const,
					content: JSON.stringify(result)
				}
			]
		};

		return functionResponse;
	}
};
