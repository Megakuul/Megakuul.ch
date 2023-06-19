<script lang="ts">
	import Icon from '@iconify/svelte';
	import AnimatedLogo from '$lib/components/AnimatedLogo.svelte';

	let checked: boolean = false;

	let animatedLogo: AnimatedLogo;

	$: checked, animateLogo();

	function animateLogo() {
		if (checked && animatedLogo) {
			animatedLogo.animate();
		}
	}

	function checkNav() {
		checked = !checked;
	}
</script>

<header>
	<div class="navbar h-20">
		
		<div class="navbar-start">
			
		</div>

		<div class="navbar-center">
			<a class="btn btn-ghost text-xl" href="/">Megakuul</a>
		</div>
		<div class="navbar-end">
			<label for="main-drawer" class="btn btn-square btn-ghost drawer-button">
				<Icon icon="material-symbols:menu-rounded" height="32" width="32"/>
			</label>
		</div>
	</div>

	<div class="drawer drawer-end drawer-mobile">
		<input id="main-drawer" type="checkbox" bind:checked={checked} class="drawer-toggle"/>
		<div class="drawer-side z-30">
			<label for="main-drawer" class="drawer-overlay"></label>

			<ul class="menu w-80 p-4 text-xl bg-base-200 text-base-content rounded-bl-xl">
				
				<label for="main-drawer" class="btn btn-square drawer-button hover:scale-75 mk-close-btn" class:checked>
					<Icon icon="material-symbols:close-rounded" height="32" width="32" />
				</label>

				<li class="mk-nav-i1" class:checked><a href="/" on:click={checkNav}>Home</a></li>
				<li class="mk-nav-i2" class:checked><a href="/projects" on:click={checkNav}>Projects</a></li>
				<li class="mk-nav-i3" class:checked><a href="/about" on:click={checkNav}>About</a></li>

				<div class="self-center mt-28 mb-5"><AnimatedLogo bind:this={animatedLogo} width=200></AnimatedLogo></div>
			</ul>
		</div>
</header>

<style>

	.mk-close-btn.checked {
		animation: spinIcon 2s;
	}

	.mk-nav-i1,
	.mk-nav-i2,
	.mk-nav-i3 {
		@apply mt-2;
	}

	.mk-nav-i1.checked,
	.mk-nav-i2.checked,
	.mk-nav-i3.checked {
		animation: insertItem;
		animation-duration: 1s;
		animation-fill-mode: forwards;
		transform: translateX(50px);
		opacity: 0;
	}

	.mk-nav-i1.checked {
		animation-delay: 0s;
	}

	.mk-nav-i2.checked {
		animation-delay: .5s;
	}

	.mk-nav-i3.checked {
		animation-delay: 1s;
	}

	@keyframes insertItem {
		0%   {
			transform: translateX(50px);
			opacity: 0;
		}
		100% {
			transform: translateX(0px);
			opacity: 1;
		}
	}

	@keyframes spinIcon {
		0%   {rotate: 0deg;}
		25%  {rotate: 55deg;}
		50%  {rotate: -30deg;}
		100% {rotate: 0deg;}
	}
</style>