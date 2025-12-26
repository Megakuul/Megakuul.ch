<svelte:window bind:scrollY={scroll} />

<script>
  import "../app.css"
	import Intersector from "$lib/components/Intersector.svelte";
	import MegakuulAsciiLogo from "$lib/components/MegakuulAsciiLogo.svelte";
	import WriteOnScroll from "$lib/components/WriteOnScroll.svelte";
	import { onMount } from "svelte";
	import Citation from "$lib/components/Citation.svelte";

	let welcomeCommand = $state("");

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

	let scroll = $state(0);
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

<div class="flex flex-col justify-center items-center mt-10 w-full sm:mt-20">
	<Intersector class="py-40 px-10 mt-10 w-5/6 sm:mt-20 apple-glass glass brightness-90 hover:brightness-100" 
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		<MegakuulAsciiLogo />
	</Intersector>

  <!-- prettier-ignore -->
  <svg class="mt-8 w-24 h-24 sm:mt-64 slow-arrow text-slate-50/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12 20l6-6m-6 6l-6-6m6 6V9.5M12 4v2.5"/></svg>

	<Intersector class="my-20 w-5/6 apple-glass mockup-code bg-base-300 min-h-[640px] xl:h-[600px]" 
		classOnDefault="scale-90" 
		classOnIntersect="scale-100" 
		transition="all ease .5s"
	>
		<pre data-prefix="$" class="sm:text-sm lg:text-lg xl:text-xl text-[0.8rem]"><code>{welcomeCommand}</code></pre>
		<pre data-prefix=">" class="whitespace-normal sm:text-sm lg:text-lg xl:text-xl text-[0.8rem]">
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

	<Intersector class="mt-10 sm:mt-24 sm:text-xl lg:text-2xl xl:text-3xl text-[1.5rem]"
		classOnDefault="translate-y-full opacity-20" 
		classOnIntersect="opacity-100" 
		transition="all ease 1s"
	><a href="/projects"><h1 class="font-bold cursor-pointer link link-hover">Explore my Projects</h1></a></Intersector>

	<Intersector class="my-12 sm:my-32 sm:text-xl lg:text-2xl xl:text-3xl text-[1.5rem]"
		classOnDefault="translate-y-full opacity-20" 
		classOnIntersect="opacity-100" 
		transition="all ease 1s"
	><Citation author="Terry A. Davis" content="An idiot admires complexity, a genius admires simplicity"></Citation></Intersector>
</div>
