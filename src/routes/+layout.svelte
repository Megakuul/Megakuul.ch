<script>
	import Header from './Header.svelte';
	import Icon from '@iconify/svelte';
	import mk_logo_black from "$lib/assets/mk_logo_white.svg";
	import mk_title from "$lib/assets/mk_title.png";
	import "$lib/tailwind.css";
</script>

<div class="app bg-slate-900">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="p-10 footer bg-neutral text-neutral-content">
		<div>
			<img alt="Megakuul Icon" src="{mk_logo_black}" width="120" height="120">
			<img alt="Megakuul Title Icon" src="{mk_title}" width="120" class="invert">
			<p>Build cool and reliable stuff</p>
		</div> 
		<div>
			<span class="footer-title">Socials</span> 
			<div class="grid grid-flow-col gap-4">
			<a href="https://github.com/Megakuul" aria-label="Megakuul's Github Account" class="btn btn-square btn-ghost">
				<Icon icon="line-md:github-loop" height="32" width="32"></Icon>
			</a>
			<a href="https://www.youtube.com/channel/UCCtqqVSCIEt50F4aNKE7KZQ" aria-label="Megakuul's Youtube Channel" class="btn btn-square btn-ghost">
				<Icon icon="mdi:youtube" height="32" width="32"></Icon>
			</a>
			<a href="https://www.linkedin.com/in/linus-moser-8897a527b" aria-label="Megakuul's LinkedIn" class="btn btn-square btn-ghost">
				<Icon icon="mdi:linkedin" height="32" width="32"></Icon>
			</a>
			</div>
			<span class="footer-title">Legal</span> 
			<a href="/impressum" class="font-bold text-center link link-hover">Impressum</a>
		</div>
	</footer>
</div>
