<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { filter } from '@skeletonlabs/skeleton';
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card p-4">
		<form on:submit={handleSubmit}>
			<input bind:value={$input} />
			<button type="submit">Send</button>
		</form>
		<ul>
			{#each $messages as message}
				<li>{message.role}: {message.content}</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
