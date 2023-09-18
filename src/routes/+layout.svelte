<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">ぷーさ Talk</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%A0%E3%83%A9%E3%82%A4%E3%82%B9"
					target="_blank"
					rel="noreferrer"
				>
					オムライスとは
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://www.google.co.jp/search?q=emoji+kitchen"
					target="_blank"
					rel="noreferrer"
				>
					Emoji Kitchen
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
