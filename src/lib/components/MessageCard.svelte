<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Message } from 'ai';
	import psato from '$lib/assets/psato.png';
	import you from '$lib/assets/you.png';
	export let bubble: Message;
	export let startDate: Date;
</script>

{#if bubble.role == 'assistant'}
	<div class={`grid grid-cols-[auto_1fr] gap-2`}>
		<Avatar src={psato} width="w-12" />
		<div class={`card p-4 variant-soft rounded-tl-none space-y-2`}>
			<header class="flex justify-between items-center">
				<p class="font-bold whitespace-nowrap">ぷーさ</p>
				<small class="opacity-50">{(bubble.createdAt ?? startDate).toLocaleString()}</small>
			</header>
			<p>{bubble.content}</p>
		</div>
	</div>
{:else if bubble.role == 'user'}
	<div class={`grid grid-cols-[1fr_auto] gap-2`}>
		<div class={`card p-4 rounded-tr-none space-y-2 variant-soft-primary`}>
			<header class="flex justify-between items-center">
				<p class="font-bold whitespace-nowrap">You</p>
				<small class="opacity-50">{bubble.createdAt?.toLocaleString()}</small>
			</header>
			<p>{bubble.content}</p>
		</div>
		<Avatar src={you} width="w-12" />
	</div>
{/if}
