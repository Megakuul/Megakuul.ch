<script>
  import Icon from '@iconify/svelte';

  let { title, subtitle, techstack, mainimage, published, githublnk, children } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={subtitle} />
</svelte:head>

<div class="hero">
  <div class="flex-col-reverse w-full lg:flex-row hero-content">
    <div class="w-full lg:w-56">
      <p><b>Techstack</b></p>
      <br />
      <ul>
        {#each techstack as technologie}
          <li class="flex flex-row items-center">
            <div class="w-1/6">
              <p class="overflow-hidden"><Icon icon={technologie.icon}></Icon></p>
            </div>
            <div class="w-5/6">
              <p>{technologie.name}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <img
      alt="projectimage"
      src="/images/{mainimage}"
      class="w-full max-w-xs rounded-lg shadow-2xl"
    />
    <div>
      <p>{published}</p>
      <div class="flex flex-row items-center">
        <h1 class="text-4xl font-bold lg:text-5xl">{title}</h1>
        {#if githublnk}
          <a href={githublnk} class="ml-2 btn btn-ghost"
            ><Icon icon="mingcute:link-line" width="32" height="32"></Icon></a
          >
        {/if}
      </div>
      <p class="py-6">{subtitle}</p>
    </div>
  </div>
</div>

<div class="flex justify-center w-full min-h-[80dvh]">
  <article class="p-6 max-w-5xl lg:p-10 markdown">
    {@render children()}
  </article>
</div>

<style>
  .markdown :global(h1) {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: bold;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  .markdown :global(h2) {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .markdown :global(h3) {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: bold;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  .markdown :global(h4) {
    font-size: 1.25rem;
    line-height: 1.5;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .markdown :global(p) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  .markdown :global(ul),
  .markdown :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .markdown :global(li) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    opacity: 0.8;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }
  .markdown :global(li):before {
    content: '- ';
  }
</style>
