<script>
  import list from './worldskills.list';
  import Intersector from '$lib/components/Intersector.svelte';

  const itemsPerPage = 7;

  let search = $state('');

  let pagedList = $derived.by(() => {
    let slice = undefined;
    if (search.length > 0) {
      const searchStr = search.toLowerCase();
      slice = Object.entries(list).find(([key, value]) => {
        if (key.toLowerCase().includes(searchStr)) {
          return true;
        } else if (JSON.stringify(value).toLowerCase().includes(searchStr)) {
          return true;
        }
        return false;
      });
    } else slice = Object.entries(list);
    if (!slice) return [];
    let slices = [];
    for (let i = 0; i < slice.length; i += itemsPerPage) {
      slices.push(slice.slice(i, i + itemsPerPage));
    }
    return slices;
  });
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
    Master more AWS services than you will ever need (preparation for the Worldskills 2025) 🇨🇭
  </p>
</div>

<div class="flex flex-col gap-4 items-center w-full min-h-dvh">
  {#each pagedList[currentPage] as item}
    <Intersector
      class="flex overflow-hidden flex-row gap-1 justify-between p-6 w-5/6 h-40 rounded-2xl transition-all duration-700 apple-glass hero"
      classOnDefault="translate-x-10 shadow-none opacity-0"
      classOnIntersect="translate-x-0 shadow-xl opacity-100"
      transition="all ease .5s"
    >
      <div class="mr-1">
        <p class="py-2 text-xs lg:text-lg">{item.published}</p>
        <a href="/worldskills/{item}"
          ><h1 class="text-sm font-bold cursor-pointer lg:text-xl link link-hover">
            {item.title}
          </h1></a
        >
        <p class="hidden py-2 text-xs sm:block lg:text-lg">{item.subtitle}</p>
      </div>
    </Intersector>
  {/each}
  <div class="my-12 mt-auto join">
    {#each pagedList as _, index}
      <button
        class="join-item btn apple-glass active"
        class:btn-active={currentPage === index}
        class:dense-apple-glass={currentPage === index}
        onclick={() => changePage(index)}
      >
        {(index + 1).toString()}
      </button>
    {/each}
  </div>
</div>
