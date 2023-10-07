<script lang="ts">
	import { useChat } from 'ai/svelte';
	import MessageCard from '$lib/components/MessageCard.svelte';
	import MessagePrompt from '$lib/components/MessagePrompt.svelte';
	import { InitPrompt, WelcomePrompt } from '$lib/prompt/init';
	import { functionCallHandler } from '$lib/functions/functionCallHandler';
	import { functions } from '$lib/functions/functionDefinitions';

	const { input, handleSubmit, messages } = useChat({
		initialMessages: [
			{
				id: '',
				role: 'system',
				content: InitPrompt
			},
			{
				id: '',
				role: 'assistant',
				content: WelcomePrompt
			}
		],
		experimental_onFunctionCall: functionCallHandler,
		body: { functions }
	});

	const now = new Date();
	let elemChat: HTMLElement;
</script>

<section class="container mx-auto">
	<div class="flex justify-center">
		<div class="card w-full lg:w-1/2 p-4 rounded shadow-lg m-3">
			<!-- Chat -->
			<div class="w-full">
				<!-- Conversation -->
				<section bind:this={elemChat} class="max-h-[500px] p-4 overflow-y-auto space-y-4">
					{#each $messages as bubble}
						<MessageCard {bubble} startDate={now} />
					{/each}
				</section>
				<!-- Prompt -->
				<MessagePrompt {input} onSubmit={handleSubmit} />
			</div>
		</div>
	</div>
</section>
