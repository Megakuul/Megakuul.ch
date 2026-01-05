<script>
  import Icon from '@iconify/svelte';
  import list from './worldskills.list';
  import { page } from '$app/state';
  import ServiceIcon from '$lib/components/ServiceIcon.svelte';

  let { children } = $props();

  let key = $derived(page.route.id?.slice(page.route.id.lastIndexOf('/') + 1) || '');

  let title = $derived(list[key].title);
  let description = $derived(list[key].description);
  let published = $derived(list[key].published);
  let services = $derived(list[key].services);
  const publishedIso = $derived.by(() => {
    const [day, month, year] = published.split('.');
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <link rel="canonical" href="https://megakuul.ch/worldskills/{key}" />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://megakuul.ch/favicon.png" />
  <meta property="article:published_time" content={publishedIso} />
</svelte:head>

<div class="flex flex-col gap-4 items-center mt-20 w-full sm:mt-40 min-h-dvh">
  <h1 class="mb-5 text-2xl font-bold text-center sm:text-5xl">{title}</h1>
  <p class="text-lg text-center sm:text-2xl">{description}</p>
  <div class="flex flex-wrap gap-2 justify-center items-center mt-1">
    {#each services as service}
      <div class="flex flex-row gap-2 py-2 px-3 rounded-xl select-none apple-glass">
        <ServiceIcon {service} class="w-6 h-6 rounded-sm" />
        <span>{service}</span>
      </div>
    {/each}
  </div>
  <p class="text-xl text-slate-200/40">~{published}~</p>

  <article class="p-2 max-w-5xl sm:p-10 markdown">
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

  .markdown :global(:is(h1, h2, h3, h4, h5, h6)) :global(span):before {
    content: '#';
    margin-right: 1px;
    opacity: 0.4;
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
