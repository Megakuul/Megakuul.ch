<svelte:window bind:scrollY={scroll} />

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script lang="ts">
	import Intersector from "$lib/components/Intersector.svelte";
	import MegakuulAsciiLogo from "$lib/components/MegakuulAsciiLogo.svelte";
	import WriteOnScroll from "$lib/components/WriteOnScroll.svelte";
	import { onMount } from "svelte";

	let welcomeCommand: string;

    onMount(() => {
		let userAgent = navigator.userAgent;
		if (userAgent.search("Windows")!==-1) {
            welcomeCommand = "Get-Content welcome.txt | Select-String welcome"
		} else if (userAgent.search("Mac")!==-1) {
            welcomeCommand = "more welcome.txt | grep welcome"
		} else {
			welcomeCommand = "cat welcome.txt | grep welcome"
		}
	});

	let scroll: number;
</script>

<div class="w-full flex flex-col items-center justify-center mt-20">
	<Intersector classAdditional="mockup-code bg-base-300 w-5/6 mt-20" 
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		<MegakuulAsciiLogo classes="bg-base-100" />
	</Intersector>

	<Intersector classAdditional="mockup-code bg-base-300 w-5/6 mt-20 mb-10 h-[630px]" 
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		<pre data-prefix="$" class="text-[0.8rem] sm:text-sm lg:text-lg xl:text-xl"><code>{welcomeCommand}</code></pre>
		<pre data-prefix=">" class="whitespace-normal text-[0.8rem] sm:text-sm lg:text-lg xl:text-xl">
			<br>
			<div class="pl-6">
				<WriteOnScroll scrollY={scroll} offset={-20} blinkingIntervall={400} text = "
					<br>
					<b>Welcome to Megakuul.ch</b>
					<br><br><br>
					My name is Linus,
					and I am currently pursuing an apprenticeship as a Platform Engineer at Informaticon AG.
					<br><br>
					During my free time, I love diving into various technologies and crafting cool stuff.
					I'm trying to build the software and systems <b>reliable</b> and obviously <b>super mega blazingly</b> fast. 
					<br><br>
					On this portfolio, I try show you some insights of my most intriguing projects.
					Besides, everything I do is also publicly available on my Github repository.
					<br><br>
					Feel free to explore my work and reach out if you have any inquiries or questions about a project.
					<br><br>
					Your Linus
				" />
			</div>
		</pre>
	</Intersector>
</div>

<style>
	pre {
		@apply shadow-none bg-transparent text-base-content overflow-hidden;
	}
</style>

