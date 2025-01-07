<script lang="ts">
  import list from "$lib/concepts.list"
  import Intersector from "$lib/components/Intersector.svelte";

  const slicedList: typeof list[] = splitList(list, 5);
  let currentPage: number = 0;

  function splitList(fullList: typeof list, sliceSize: number): typeof list[] {
    let slices: typeof list[] = [];

    for (let i = 0; i < fullList.length; i+=sliceSize) {
      slices.push(fullList.slice(i, i+sliceSize));
    }

    return slices;
  }

  function changePage(newPage: number) {
    currentPage = newPage;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<svelte:head>
	<title>Concepts | Megakuul</title>
  <meta name="description" content="Read about some random concepts I made up while working on my projects." />
  <meta property="og:description" content="Read about some random concepts I made up while working on my projects." />
  <link rel="canonical" href="https://megakuul.ch/concepts" />
  <meta property="og:title" content="Concepts - Megakuul" />
  <meta property="og:type" content="website" />
	<meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="w-full flex flex-col items-center">
  {#each slicedList[currentPage] as item}
    <Intersector 
      classAdditional="hero bg-base-200 hover:bg-base-100 hover:shadow-2xl
        transition-all duration-700 
        flex flex-row justify-between 
        h-40 w-5/6 my-5 lg:my-10 p-4 
        overflow-hidden rounded-2xl"
      classOnDefault="translate-x-10 shadow-none opacity-0"
      classOnIntersect="translate-x-0 shadow-xl opacity-100"
      transition="all ease .5s">
      <div class="mr-1">
        <p class="text-xs lg:text-lg py-2">{item.published}</p>
        <a href="/concepts/{item.route}"><h1 class="cursor-pointer link link-hover text-sm lg:text-xl font-bold">{item.title}</h1></a>
        <p class="text-xs lg:text-lg py-2">{item.subtitle}</p>
      </div>
      <img alt="projectimage" src="/images/{item.mainimage}" class="rounded-lg h-2/4 lg:h-3/4" />
    </Intersector>
  {/each}
  <div class="join my-12">
    {#each slicedList as _, index}
      <button class="join-item btn active" class:btn-active={currentPage===index} on:click={() => changePage(index)}>
        {(index+1).toString()}
      </button>
    {/each}
  </div>
</div>

