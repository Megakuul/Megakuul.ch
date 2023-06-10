<svelte:window bind:scrollY={scroll} />

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script lang="ts">
	let scroll: number;
</script>

<section>
	<div class="fixed">{scroll}</div>
	<div class="h-screen"></div>
</section>
