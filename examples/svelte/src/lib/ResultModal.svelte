<script lang="ts">
	import { BarLoader } from "svelte-loading-spinners";

	export let message: Promise<string | null>;

	let api_result: string | null | undefined;
	message.then((json) => {
		api_result = json;
	});

	let textArea: HTMLTextAreaElement;
</script>

<div class="container">
	{#if typeof api_result !== "undefined"}
		{#if api_result === null}
			<div class="error-message">Could not find QR Code</div>
		{:else if api_result}
			<div class="resultBox">
				<div class="header">Result:</div>
				<div class="contents">{api_result}</div>
				
			</div>

		{/if}
	{:else}
		<!-- Still Loading -->
		<div class="loading-wrapper">
			<BarLoader color="#5dbb65" duration="1.1s" />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.resultBox {
			width: 80%;
			word-wrap: break-word;
			resize: vertical;
			overflow: hidden;
			overflow-y: auto;
			.header {
				font-size: 1.5em;
				font-weight: bold;
			}
			.contents {
				font-size: 0.95em;
				background: #efefef;
				color: #121212;
				font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;

			}
		}
		.error-message {
			padding: 1rem;
		}

		.loading-wrapper {
			margin: 2rem 1rem;
		}
	}
</style>
