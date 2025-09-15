<svelte:window bind:scrollY={scroll} />

<script lang="ts">
	import Intersector from "$lib/components/Intersector.svelte";
	import MegakuulAsciiLogo from "$lib/components/MegakuulAsciiLogo.svelte";
	import WriteOnScroll from "$lib/components/WriteOnScroll.svelte";
	import { onMount } from "svelte";
	import list from "$lib/projects.list.js";
	import CarouselPage from "$lib/components/CarouselPage.svelte";
	import Citation from "$lib/components/Citation.svelte";

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
		
		projectList = shuffleList(list, 10);
	});

	function shuffleList(array: object[], count: number) {
		let tempList: object[] = JSON.parse(JSON.stringify(array));
		for (let i = tempList.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[tempList[i], tempList[j]] = [tempList[j], tempList[i]];
		}
		return tempList.splice(0, count);
	}

	let scroll: number;
	let projectList: any[] = [];
</script>

<svelte:head>
	<title>Home | Megakuul</title>
	<meta name="description" content="My name is Linus Moser, I'm a passionate DevOps platform architect and software developer from Switzerland." />
	<meta property="og:description" content="My name is Linus Moser, I'm a passionate DevOps platform architect and software developer from Switzerland." />
	<link rel="canonical" href="https://megakuul.ch" />
	<meta property="og:title" content="Home - Megakuul" />
  	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="w-full flex flex-col items-center justify-center mt-10 sm:mt-20">
	<Intersector classAdditional="mockup-code bg-base-300 w-5/6 mt-10 sm:mt-20" 
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		<MegakuulAsciiLogo classes="bg-base-100" />
	</Intersector>

	<Intersector classAdditional="mockup-code bg-base-300 w-5/6 my-20 min-h-[640px] xl:h-[600px]" 
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
					My name is Linus, I'm a software developer at Informaticon AG.
					<br><br>
					During my free time, I love diving into various technologies and crafting cool stuff.
					I'm trying to build the software and systems <b>reliable</b> and obviously <b>super mega blazingly</b> fast. 
					<br><br>
					On this portfolio, I try show you some insights of my most intriguing projects.
					Besides, everything I do is also publicly available on my Github repository.
					<br><br>
					Feel free to explore my work and reach out if you have any inquiries or questions about a project.
					<br><br>
					Yours Linus
				" />
			</div>
		</pre>
	</Intersector>

	<Intersector classAdditional="text-[1.5rem] sm:text-xl lg:text-2xl xl:text-3xl mt-10 sm:mt-24"
		classOnDefault="translate-y-full opacity-20" 
		classOnIntersect="opacity-100" 
		transition="all ease 1s"
	><a href="/projects"><h1 class="cursor-pointer link link-hover font-bold">Explore my Projects</h1></a></Intersector>

	<Intersector classAdditional="carousel w-5/6 xl:w-4/6 my-16"
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		{#each projectList as project, index}
			<CarouselPage project={project} />
		{/each}
		
	</Intersector>

	<Intersector classAdditional="text-[1.5rem] sm:text-xl lg:text-2xl xl:text-3xl my-12 sm:my-32"
		classOnDefault="translate-y-full opacity-20" 
		classOnIntersect="opacity-100" 
		transition="all ease 1s"
	><Citation author="Terry A. Davis" content="An idiot admires complexity, a genius admires simplicity"></Citation></Intersector>
</div>

<style>
	pre {
		@apply shadow-none bg-transparent text-base-content overflow-hidden;
	}
</style>

