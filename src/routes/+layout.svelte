<script>
	import Header from './Header.svelte';
	import Icon from '@iconify/svelte';
	import mk_logo_black from "$lib/assets/mk_logo_white.svg";
	import mk_title from "$lib/assets/mk_title.png";
	import './styles.css';
	import "$lib/tailwind.css";
</script>

<div class="app bg-slate-900">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="footer p-10 bg-neutral text-neutral-content">
		<div>
			<img alt="Megakuul Icon" src="{mk_logo_black}" width="120" height="120">
			<img alt="Megakuul Title Icon" src="{mk_title}" width="120" class="invert">
			<p>Build cool and reliable stuff</p>
		</div> 
		<div>
			<span class="footer-title">Socials</span> 
			<div class="grid grid-flow-col gap-4">
			<a href="https://github.com/Megakuul" class="btn btn-square btn-ghost"><Icon icon="line-md:github-loop" height="32" width="32"></Icon></a>
			</div>
		</div>
	</footer>
</div>