<script>
  import Icon from '@iconify/svelte';
  import list from './worldskills.list';

  /** @type {{
    title: string,
    children: any
  }} */
  let { title, children } = $props();

  let description = $derived(list[title].description);
  let published = $derived(list[title].published);
  let services = $derived(list[title].services);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <!-- niemand hat die Absicht gute SEO Werte zu erreichen vor der Weltmeisterschaft -->
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="hero"></div>

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
