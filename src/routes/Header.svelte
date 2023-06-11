<script lang="ts">
	import Icon from '@iconify/svelte';

	let checked: boolean = false;

	function checkNav() {
		checked = !checked;
	}
</script>

<header>
	<div class="navbar h-20">
		
		<div class="navbar-start">
			<label for="main-drawer" class="btn btn-square btn-ghost drawer-button">
				<Icon icon="material-symbols:menu-rounded" height="32" width="32"/>
			</label>
		</div>

		<div class="navbar-center">
			<a class="btn btn-ghost text-xl" href="/">Megakuul</a>
		</div>
		<div class="navbar-end">
			
		</div>
	</div>

	<div class="drawer drawer-mobile w-full h-full">
		<input id="main-drawer" type="checkbox" bind:checked={checked} class="drawer-toggle"/>
		<div class="drawer-side">
			<label for="main-drawer" class="drawer-overlay"></label>

			<ul class="menu w-80 h-full p-4 text-xl bg-base-200 text-base-content">
				
				<label for="main-drawer" class="btn btn-square drawer-button hover:scale-75" class:checked>
					<Icon icon="material-symbols:close-rounded" height="32" width="32" />
				</label>

				<li class="mt-2"><a href="/" on:click={checkNav}>Home</a></li>
				<li class="mt-2"><a href="/projects" on:click={checkNav}>Projects</a></li>
				<li class="mt-2"><a href="/about" on:click={checkNav}>About</a></li>

				<Icon icon="material-symbols:close-rounded" height="32" width="32" class="w-full"></Icon>
			</ul>
		</div>
</header>

<style>
	.checked {
		animation: spinIcon 2s;
	}
	@keyframes spinIcon {
		0%   {rotate: 0deg;}
		25%  {rotate: 55deg;}
		50%  {rotate: -30deg;}
		100% {rotate: 0deg;}
	}
</style>