import { type FunctionCallHandler, type Message, type ChatRequest, nanoid } from 'ai';
import type { ChatCompletionMessage } from 'openai/resources/chat';
import { getFunctionName } from './Definitions/functions';
import { handlers } from './Definitions/handlers';

export const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {
	const handler = getHandler(functionCall.name);
	return await handler(chatMessages, functionCall);
};

const getHandler: (
	functionName: string
) => (
	chatMessages: Message[],
	functionCall: ChatCompletionMessage.FunctionCall
) => Promise<ChatRequest> = (name: string) => {
	const names = getFunctionName(name);
	if (names) {
		return handlers[names];
	}
	return async (chatMessages: Message[]): Promise<ChatRequest> => {
		const functionResponse: ChatRequest = {
			messages: [
				...chatMessages,
				{
					id: nanoid(),
					role: 'system' as const,
					content: `Function ${name} not found`
				}
			]
		};
		return functionResponse;
	};
};
