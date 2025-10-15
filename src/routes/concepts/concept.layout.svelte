<script>
  /**
	 * @type {any}
	 */
   export let title;

  /**
	 * @type {any}
	 */
   export let description;

  /**
	 * @type {any}
	 */
   export let published;

  /**
	 * @type {any}
	 */
   export let mainimage;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="{description}" />
</svelte:head>

<div class="bg-base-200 flex justify-center w-full">
  <article class="markdown max-w-5xl p-6 lg:p-10 w-full break-words">
    <div class="flex flex-col items-center w-full">
      <img alt="projectimage" src="/images/{mainimage}" class="max-w-96 max-h-96" />
    </div>
    <slot />
  </article>
</div>

<!--Important: This part is only working because of the 'tailwindcss/nesting': {}, postcss plugin
    if this fails for whatever reason, the media querys just need to be done with default css, instead
    of using the nested screen objects
-->
<style>
  .markdown :global(h1) {
    @apply text-2xl font-bold mb-8 mt-14;

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

  .markdown :global(code) {
    @apply text-xs bg-gray-800 p-1 rounded-lg;

    @screen lg {
      @apply text-xl;
    }
  }

  .markdown :global(pre > code) {
    @apply text-xs bg-gray-800 px-3 py-2.5 my-4 rounded-lg shadow-inner;

    @screen lg {
      @apply text-xl;
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