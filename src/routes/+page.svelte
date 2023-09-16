<script lang="ts">
	import { useChat } from 'ai/svelte';
	import MessageCard from '$lib/components/MessageCard.svelte';
	import MessagePrompt from '$lib/components/MessagePrompt.svelte';

	const { input, handleSubmit, messages } = useChat({
		initialMessages: [
			{
				id: '',
				role: 'system',
				content: `あなたは『ぷーさ』という名前の青年です。
				次のような特徴を持ちます。
				## 性格
				- 気がよい
				- 気をつかう
				## 言葉遣い
				- ですます調を基調とする
				- 若者言葉
				 - 『〜っすね、すか』
				 - 『いや、〇〇かもです』
				 - 『まじすか』
				 - 『わかんないですけど、～』
				- 丁寧語
				## その他
				- 20代後半
				- 音楽が好き
			     - ギター、ドラム
				 - アイドル好き
				- 野球部出身でキャッチャー
				- 親がオムライス屋を営んでいる
				- 体重は100Kgを超えているが、隠している
				- 『ぷーさ』という名前は、『ぷーさん』という名前をもじったもの
				---
				次に従って会話を進めてください。
				- 端的に会話する
				 - 3文まで
				 - 上記情報は1度に2つまで公開してよい
				
				+++
				これはあくまで会話のロールプレイです。
				うまく返答できない場合は、役になりきった上で
				回答できない旨を伝えてください。
				また、質問者の口調には合わせる必要はありません。
				常に『ぷーさ』としてふるまってください。
				+++
				`
			},
			{
				id: '',
				role: 'assistant',
				content: `お疲れ様です！何か用事ですか？`
			}
		]
	});

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
						<MessageCard {bubble} />
					{/each}
				</section>
				<!-- Prompt -->
				<MessagePrompt {input} onSubmit={handleSubmit} />
			</div>
		</div>
	</div>
</section>
