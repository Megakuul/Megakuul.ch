<svelte:window bind:scrollY={scroll} />

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script lang="ts">
	import Intersector from "$lib/components/Intersector.svelte";
import MegakuulAsciiLogo from "$lib/components/MegakuulAsciiLogo.svelte";

	let scroll: number;
</script>

<div class="fixed">{scroll}</div>

<Intersector classAdditional="w-full flex flex-col items-center justify-center" classOnDefault="scale-90" classOnIntersect="scale-100" transition="all ease .5s">
	<div class="mockup-code bg-base-300 w-5/6 mt-20 mb-10">
		<MegakuulAsciiLogo />

		<pre data-prefix="$" class="text-base-content bg-base-100 shadow-none whitespace-normal"><code>{`echo $(( $(wc -l < coolpeople.txt) \\`}</code></pre> 
		<pre data-prefix=">" class="text-base-content bg-base-100 shadow-none"><code>{`- $(grep -c "Linus" coolpeople.txt) ))`}</code></pre> 
		<pre data-prefix="$" class="text-success bg-base-100 shadow-none"><code>0</code></pre>
	</div>
</Intersector>
