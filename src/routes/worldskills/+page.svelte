<script>
  import list from './worldskills.list';
  import Intersector from '$lib/components/Intersector.svelte';
  import ServiceIcon from '$lib/components/ServiceIcon.svelte';

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

  let search = $state('');
  /** @type {Object.<string, boolean>} */
  let searchServices = $state({});

  let searchedList = $derived.by(() => {
    let filtered = Object.entries(list);
    if (Object.keys(searchServices).length > 0) {
      filtered = filtered.filter(([_, value]) => {
        for (const service of value.services) {
          if (searchServices[service]) return true;
        }
        return false;
      });
    }
    if (search.length > 0) {
      const searchStr = search.toLowerCase();
      filtered = filtered.filter(([key, value]) => {
        if (key.toLowerCase().includes(searchStr)) {
          return true;
        } else if (JSON.stringify(value).toLowerCase().includes(searchStr)) {
          return true;
        }
        return false;
      });
    }
    return filtered;
  });
</script>

<svelte:head>
  <title>Worldskills | Megakuul</title>
  <meta
    name="description"
    content="Master more AWS services than you will ever need (preparation for the Worldskills 2026) 🇨🇭"
  />
  <meta
    property="og:description"
    content="Master more AWS services than you will ever need (preparation for the Worldskills 2026) 🇨🇭"
  />
  <link rel="canonical" href="https://megakuul.ch/worldskills" />
  <meta property="og:title" content="Worldskills - Megakuul" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="flex flex-col gap-8 items-center my-10">
  <h1 class="text-3xl lg:text-5xl 2xl:text-7xl">Worldskills</h1>
  <p class="text-sm text-center lg:text-xl 2xl:text-3xl text-slate-100/40 max-w-10/12">
    Master more AWS services than you will ever need (preparation for the
    <a
      class="underline"
      href="https://www.ict-berufsbildung.ch/fuenf-schweizer-informatik-talente-an-den-worldskills-2026"
    >
      Worldskills 2026
    </a>
    ) 🇨🇭
  </p>
</div>

<div class="flex flex-col gap-4 items-center my-10">
  <input
    bind:value={search}
    placeholder="Search..."
    class="p-3 w-11/12 text-lg rounded-2xl outline-none sm:p-4 sm:text-xl apple-glass max-w-[1400px]"
  />
  <div class="flex flex-wrap gap-2 justify-start items-start w-11/12 max-w-[1400px] min-h-12">
    {#each Object.entries(searchServices) as [service, active] (service)}
      {#if active}
        <button
          onclick={e => {
            e.stopPropagation();
            if (searchServices[service]) {
              delete searchServices[service];
              searchServices = searchServices;
            } else searchServices[service] = true;
            changePage(0);
          }}
          class="flex flex-row gap-2 py-2 px-3 rounded-xl transition-all cursor-pointer hover:scale-105 apple-glass"
        >
          <ServiceIcon {service} class="w-6 h-6 rounded-sm" />
          <span>{service}</span>
        </button>
      {/if}
    {/each}
  </div>
</div>

<div class="flex flex-col gap-4 items-center w-full min-h-dvh">
  {#each searchedList as [key, project], i (key)}
    {#if i >= currentPage * itemsPerPage && i < (currentPage + 1) * itemsPerPage}
      <Intersector
        class="w-11/12 max-w-[1400px]"
        classOnDefault="translate-x-10 shadow-none opacity-0"
        classOnIntersect="translate-x-0 shadow-xl opacity-100"
        transition="all ease .5s"
      >
        <a
          href="/worldskills/{key}"
          class="flex flex-col gap-2 p-4 w-full rounded-2xl transition-all apple-glass"
        >
          <h1 class="text-lg font-bold cursor-pointer lg:text-xl hover:underline">
            {project.title}
          </h1>

          <p class="flex flex-wrap gap-1 justify-start text-sm sm:text-lg">
            <span class="text-slate-200/40">{project.published}</span>
            <span>| {project.description}</span>
          </p>

          <div class="flex flex-wrap gap-2 items-start mt-1">
            {#each project.services as service}
              <button
                onclick={e => {
                  e.preventDefault();
                  if (searchServices[service]) {
                    delete searchServices[service];
                    searchServices = searchServices;
                  } else searchServices[service] = true;
                  changePage(0);
                }}
                class="flex flex-row gap-2 py-2 px-3 rounded-xl transition-all cursor-pointer hover:scale-105 apple-glass"
              >
                <ServiceIcon {service} class="w-6 h-6 rounded-sm" />
                <span>{service}</span>
              </button>
            {/each}
          </div>
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
