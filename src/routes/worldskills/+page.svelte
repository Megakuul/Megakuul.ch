<script>
  import list from './worldskills.list';
  import Intersector from '$lib/components/Intersector.svelte';

  let search = $state('');

  let searchedList = $derived.by(() => {
    if (search.length > 0) {
      const searchStr = search.toLowerCase();
      const result = Object.entries(list).find(([key, value]) => {
        if (key.toLowerCase().includes(searchStr)) {
          return true;
        } else if (JSON.stringify(value).toLowerCase().includes(searchStr)) {
          return true;
        }
        return false;
      });
      if (result) result;
      else [];
    } else return Object.entries(list);
  });

  const itemsPerPage = 7;
  let currentPage = $state(0);

  /** @param {number} newPage */
  function changePage(newPage) {
    currentPage = newPage;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
</script>

<svelte:head>
  <title>Worldskills | Megakuul</title>
  <meta
    name="description"
    content="Master more AWS services than you will ever need (preparation for the Worldskills 2025) 🇨🇭"
  />
  <meta
    property="og:description"
    content="Master more AWS services than you will ever need (preparation for the Worldskills 2025) 🇨🇭"
  />
  <link rel="canonical" href="https://megakuul.ch/worldskills" />
  <meta property="og:title" content="Worldskills - Megakuul" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="flex flex-col gap-8 items-center my-20">
  <h1 class="text-3xl lg:text-5xl 2xl:text-7xl">Worldskills</h1>
  <p class="text-sm text-center lg:text-xl 2xl:text-3xl text-slate-100/40 max-w-10/12">
    Master more AWS services than you will ever need (preparation for the
    <a
      class="underline"
      href="https://www.ict-berufsbildung.ch/fuenf-schweizer-informatik-talente-an-den-worldskills-2026"
    >
      Worldskills 2025
    </a>
    ) 🇨🇭
  </p>
</div>

<div class="flex flex-col gap-4 items-center w-full min-h-dvh">
  {#each searchedList as [key, project], i}
    {#if i >= currentPage && i < currentPage + 1 * itemsPerPage}
      <Intersector
        class="w-11/12 max-w-[1400px]"
        classOnDefault="translate-x-10 shadow-none opacity-0"
        classOnIntersect="translate-x-0 shadow-xl opacity-100"
        transition="all ease .5s"
      >
        <a
          href="/worldskills/{key}"
          class="flex flex-col p-4 w-full rounded-2xl transition-all hover:scale-105 apple-glass"
        >
          <h1 class="text-sm font-bold cursor-pointer lg:text-xl">
            {project.title}
          </h1>
        </a>
      </Intersector>
    {/if}
  {/each}
  <div class="my-12 mt-auto join">
    {#if searchedList}
      {#each Array(Math.ceil(searchedList.length / itemsPerPage)) as _, index}
        <button
          class="join-item btn apple-glass active"
          class:btn-active={currentPage === index}
          class:dense-apple-glass={currentPage === index}
          onclick={() => changePage(index)}
        >
          {(index + 1).toString()}
        </button>
      {/each}
    {/if}
  </div>
</div>
