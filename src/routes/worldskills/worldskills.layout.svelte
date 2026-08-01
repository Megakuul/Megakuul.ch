<script>
  import list from './worldskills.list';
  import { page } from '$app/state';
  import { tick } from 'svelte';
  import ServiceIcon from '$lib/components/ServiceIcon.svelte';
  import SidebarNav from './SidebarNav.svelte';

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

  /** @type {HTMLElement | undefined} */
  let articleEl = $state();
  /** @type {{ id: string; title: string; level: number }[]} */
  let items = $state([]);
  let menuOpen = $state(false);

  // Build the sidebar from the article's own headings (the table of contents you write).
  $effect(() => {
    void key; // re-scan when navigating to another article
    if (!articleEl) return;
    let cancelled = false;
    tick().then(() => {
      if (cancelled || !articleEl) return;
      const heads = /** @type {HTMLElement[]} */ ([...articleEl.querySelectorAll('h2, h3')]);
      items = heads
        .filter(
          h => h.id && !/^(table of contents|references)$/i.test((h.textContent ?? '').trim()),
        )
        .map(h => ({
          id: h.id,
          title: (h.textContent ?? '').replace(/[#¶]/g, '').trim(),
          level: h.tagName === 'H3' ? 1 : 0,
        }));
    });
    return () => (cancelled = true);
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

<!-- sticky top bar -->
<div class="sticky top-0 z-30 border-b border-white/5 bg-[rgb(17,16,16)]/70 backdrop-blur-md">
  <div class="mx-auto flex max-w-[96rem] flex-row items-center gap-3 px-4 py-3">
    <a href="/worldskills" class="shrink-0 text-sm text-slate-200/40 hover:text-slate-200/80">
      ← worldskills
    </a>
    <span class="truncate text-lg font-bold">{title}</span>
    <div class="flex-1"></div>
    {#if items.length > 1}
      <button
        class="apple-glass rounded-lg px-3 py-1.5 text-sm lg:hidden"
        onclick={() => (menuOpen = !menuOpen)}
      >
        {menuOpen ? 'Close' : 'Contents'}
      </button>
    {/if}
  </div>
</div>

<div class="mx-auto mt-8 flex min-h-dvh w-full max-w-[96rem] flex-row justify-center gap-6 px-2">
  {#if items.length > 1}
    <SidebarNav {items} bind:menuOpen />
  {/if}

  <div class="flex min-w-0 flex-1 flex-col items-center gap-4 pt-6 sm:pt-10">
    <h1 class="mb-5 text-center text-2xl font-bold sm:text-5xl">{title}</h1>
    <p class="max-w-5xl text-center text-lg sm:text-2xl">{description}</p>
    <div class="mt-1 flex max-w-5xl flex-wrap items-center justify-center gap-2">
      {#each services as service}
        <div class="apple-glass flex flex-row gap-2 rounded-xl px-3 py-2 select-none">
          <ServiceIcon {service} class="h-6 w-6 rounded-sm" />
          <span>{service}</span>
        </div>
      {/each}
    </div>
    <a
      class="text-xl text-slate-200/40"
      href="https://github.com/megakuul/megakuul.ch/tree/main/src/routes/worldskills/{key}"
    >
      ~{published}~
    </a>

    <article
      bind:this={articleEl}
      class="prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full max-w-7xl p-2 sm:p-10"
    >
      {@render children()}
    </article>
  </div>
</div>

<style>
  :global(article) :global(pre) {
    width: 90vw;
    max-width: 100%;
    overflow-x: scroll;

    box-shadow:
      rgba(255, 255, 255, 0.05) 0px 6px 24px 0px,
      rgba(255, 255, 255, 0.08) 0px 0px 0px 1px;
    background-color: rgba(255, 255, 255, 0.01) !important;
    backdrop-filter: blur(2px);
  }

  :global(article) :global(table) {
    width: 100%;
    table-layout: auto;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.875em;
    line-height: 1.7142857;
  }

  /* keep anchored headings clear of the sticky top bar */
  :global(article) :global(:is(h1, h2, h3, h4)) {
    scroll-margin-top: 5rem;
  }
</style>
