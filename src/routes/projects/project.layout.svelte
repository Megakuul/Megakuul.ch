<script>
	import Icon from "@iconify/svelte";

  /**
	 * @type {any}
	 */
   export let title;

  /**
	 * @type {any}
	 */
   export let subtitle;

  /**
	 * @type {any}
	 */
   export let githublnk;

  /**
	 * @type {any}
	 */
   export let published;

  /**
	 * @type {any}
	 */
   export let mainimage;

  /**
	 * @type {any}
	 */
   export let techstack;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" 
	content="{subtitle}" />
</svelte:head>
  
<div class="hero">
  <div class="flex-col-reverse w-full lg:flex-row hero-content">
    <div class="w-full lg:w-56">
      <p><b>Techstack</b></p>
      <br>
      <ul>
        {#each techstack as technologie}
        <li class="flex flex-row items-center">
          <div class="w-1/6">
            <p class="overflow-hidden"><Icon icon="{technologie.icon}"></Icon></p>
          </div>
          <div class="w-5/6">
            <p>{technologie.name}</p>
          </div>
        </li>
        {/each}
      </ul>
    </div>
    <img alt="projectimage" src="/images/{mainimage}" class="w-full max-w-xs rounded-lg shadow-2xl" />
    <div>
      <p>{published}</p>
      <div class="flex flex-row items-center">
        <h1 class="text-4xl font-bold lg:text-5xl">{title}</h1>
        {#if githublnk}
        <a href="{githublnk}" class="ml-2 btn btn-ghost"><Icon icon="mingcute:link-line" width=32 height=32></Icon></a>
        {/if}
      </div>
      <p class="py-6">{subtitle}</p>
    </div>
  </div>
</div>

<div class="flex justify-center w-full bg-base-200">
  <article class="p-6 max-w-5xl lg:p-10 markdown">
    <slot />
  </article>
</div>

<!--Important: This part is only working because of the 'tailwindcss/nesting': {}, postcss plugin
    if this fails for whatever reason, the media querys just need to be done with default css, instead
    of using the nested screen objects
-->
<style>
  .markdown :global(h1) {
    @apply text-3xl font-bold mb-8 mt-14;

    @screen lg {
      @apply text-5xl;
    }
  }

  .markdown :global(h2) {
    @apply text-2xl font-bold mb-7 mt-12;

    @screen lg {
      @apply text-4xl;
    }
  }

  .markdown :global(h3) {
    @apply text-xl font-bold mb-5 mt-10;

    @screen lg {
      @apply text-3xl;
    }
  }

  .markdown :global(h4) {
    @apply text-sm font-bold mb-4 mt-8;

    @screen lg {
      @apply text-2xl;
    }
  }

  .markdown :global(p) {
    @apply text-xs my-4;

    @screen lg {
      @apply text-xl;
    }
  }

  .markdown :global(ul) {
    @apply list-disc list-inside my-3;
  }

  .markdown :global(li) {
    @apply text-xs my-1 font-semibold;

    @screen lg {
      @apply text-xl;
    }
  }
</style>
