<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Writable } from 'svelte/store';

	export let onSubmit: ((this: Window, ev: SubmitEvent) => any) | null;
	export let input: Writable<string>;

	const onPromptKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (onSubmit) {
				const submitEvent = new SubmitEvent('submit');
				onSubmit.call(window, submitEvent);
			}
		}
	};
</script>

<section class="border-t border-surface-500/30 p-4">
	<form on:submit={onSubmit}>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
			<button class="input-group-shim">+</button>
			<textarea
				bind:value={$input}
				class="bg-transparent border-0 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="1"
				on:keydown={onPromptKeydown}
			/>
			<button type="submit" class={$input ? 'variant-filled-primary' : 'input-group-shim'}>
				<Icon icon="fa-paper-plane" />
			</button>
		</div>
	</form>
</section>
