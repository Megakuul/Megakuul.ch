<script>
	import Header from './Header.svelte';
	import './styles.css';
	import "$lib/tailwind.css";
</script>

<div class="app bg-slate-900">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>