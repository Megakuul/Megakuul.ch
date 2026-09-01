<script>
  import SidebarNav from '../SidebarNav.svelte';

  let { data } = $props();

  let copiedId = $state('');
  let menuOpen = $state(false);

  // Flatten groups + snippets into the leveled list the sidebar expects.
  let items = $derived(
    data.groups.flatMap(group => [
      { id: group.id, title: group.title, level: 0 },
      ...group.snippets.map(s => ({ id: s.id, title: s.title, level: 1 })),
    ]),
  );

  /** @param {string} id @param {string} raw */
  async function copy(id, raw) {
    try {
      await navigator.clipboard.writeText(raw);
      copiedId = id;
      setTimeout(() => (copiedId === id ? (copiedId = '') : null), 1200);
    } catch {
      /* clipboard blocked, ignore */
    }
  }
</script>

<svelte:head>
  <title>Kubernetes Cheatsheet | Megakuul</title>
  <meta
    name="description"
    content="Every EKS/Kubernetes example you need to deploy an app: access, workloads, IRSA/Pod Identity, EBS/EFS volumes and Karpenter, as short comment-free YAML and CLI."
  />
  <meta property="og:title" content="Kubernetes Cheatsheet - Megakuul" />
  <meta
    property="og:description"
    content="Every EKS/Kubernetes example you need to deploy an app: access, workloads, IRSA/Pod Identity, EBS/EFS volumes and Karpenter, as short comment-free YAML and CLI."
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://megakuul.ch/favicon.png" />
  <link rel="canonical" href="https://megakuul.ch/worldskills/kubernetes" />
</svelte:head>

<div class="sticky top-0 z-30 border-b border-white/5 bg-[rgb(17,16,16)]/70 backdrop-blur-md">
  <div class="mx-auto flex max-w-350 flex-row items-center gap-3 px-4 py-3">
    <a href="/worldskills" class="shrink-0 text-sm text-slate-200/40 hover:text-slate-200/80">
      ← worldskills
    </a>
    <span class="shrink-0 text-lg font-bold">Kubernetes</span>
  </div>
</div>

<div class="mx-auto flex w-full max-w-350 flex-row gap-8 px-4">
  <SidebarNav {items} bind:menuOpen />

  <main class="min-w-0 flex-1 py-8">
    <header class="mb-10">
      <h1 class="mb-3 text-3xl font-bold sm:text-5xl">Kubernetes Cheatsheet</h1>
      <p class="max-w-2xl text-slate-200/50 sm:text-lg">
        Everything to get an app running on EKS: logging in, granting access, the workload
        templates, wiring pod IAM, attaching volumes, and provisioning nodes with Karpenter. Jump
        anywhere with the menu.
      </p>
    </header>

    {#each data.groups as group}
      <section class="mb-16">
        <div id={group.id} data-anchor class="scroll-mt-24">
          <h2 class="text-2xl font-bold sm:text-3xl">{group.title}</h2>
          <p class="mt-1 mb-6 text-slate-200/45">{group.blurb}</p>
        </div>

        <div class="flex flex-col gap-6">
          {#each group.snippets as s}
            <article id={s.id} data-anchor class="apple-glass scroll-mt-24 rounded-2xl p-4 sm:p-5">
              <div class="flex flex-row items-start justify-between gap-3">
                <h3 class="text-lg font-semibold sm:text-xl">{s.title}</h3>
                <button
                  class="apple-glass shrink-0 rounded-lg px-2.5 py-1 text-xs transition-all hover:scale-105"
                  onclick={() => copy(s.id, s.raw)}
                >
                  {copiedId === s.id ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              {#if s.note}
                <p class="mt-2 text-sm leading-relaxed text-slate-200/45">{s.note}</p>
              {/if}

              <div class="code-wrap mt-3 overflow-x-auto rounded-xl">
                {@html s.html}
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  </main>
</div>

<style>
  .code-wrap :global(pre.shiki) {
    margin: 0;
    padding: 1rem 1.15rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.8rem;
    line-height: 1.55;
    border-radius: 0.75rem;
    box-shadow:
      rgba(255, 255, 255, 0.05) 0px 6px 24px 0px,
      rgba(255, 255, 255, 0.08) 0px 0px 0px 1px;
    background-color: rgba(255, 255, 255, 0.04) !important;
  }

  @media (min-width: 640px) {
    .code-wrap :global(pre.shiki) {
      font-size: 0.875rem;
    }
  }
</style>
