import type { FunctionCallHandler } from 'ai';
import { getHandler } from './getHandler';

export const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {
	const handler = getHandler(functionCall.name);

	return await handler(
		chatMessages,
		functionCall.arguments ? JSON.parse(functionCall.arguments) : undefined
	);
};
