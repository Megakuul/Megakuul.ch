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

  <article class="p-2 max-w-5xl sm:p-10 prose-sm sm:prose lg:prose-lg xl:prose-xl">
    {@render children()}
  </article>
</div>
