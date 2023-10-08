import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

interface ChatRequest {
	messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
	functions: OpenAI.Chat.Completions.ChatCompletionCreateParams.Function[] | undefined;
	function_call:
		| 'none'
		| 'auto'
		| OpenAI.Chat.Completions.ChatCompletionCreateParams.FunctionCallOption
		| undefined;
}

export async function POST({ request }) {
	const { messages, functions, function_call } = await request.json<ChatRequest>();

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages,
		functions,
		function_call
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
