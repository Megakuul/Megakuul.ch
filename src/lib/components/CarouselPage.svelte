<script lang="ts">
	import type list from "$lib/projects.list.js";

    export let project: typeof list[0];

    let carouselItem: HTMLDivElement;
</script>

<div bind:this={carouselItem} class="carousel-item relative w-full flex justify-center">
    <div 
        class="hero bg-slate-800 shadow-2xl transition-all duration-700
             flex flex-col justify-between h-[30rem] w-11/12 p-12 lg:p-20 overflow-hidden rounded-2xl" >

        <img alt="projectimage" src="/images/{project.mainimage}" class="rounded-lg h-2/4 lg:h-3/4" />
        <div class="mr-1">
            <p class="text-xs lg:text-lg py-2">{project.published}</p>
            <a href="/projects/{project.route}"><h1 class="cursor-pointer link link-hover text-sm lg:text-xl font-bold">{project.title}</h1></a>
            <p class="text-xs lg:text-lg py-2">{project.subtitle}</p>
        </div>        
    </div>
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button class="btn btn-circle" on:click={() => {
          const scrollLeft = carouselItem.parentElement?.scrollLeft;
          if (scrollLeft!==undefined && scrollLeft > 0) {
            carouselItem.parentElement?.scrollBy({top: 0, left: -carouselItem.parentElement.offsetWidth, behavior: "smooth"})
          } else if (scrollLeft!==undefined && scrollLeft <= 0) {
            carouselItem.parentElement?.scrollTo({left: carouselItem.parentElement.scrollWidth, behavior: "smooth"})
          }
        }}>❮</button> 

        <button class="btn btn-circle" on:click={() => {
          const scrollLeft = carouselItem.parentElement?.scrollLeft;
          const rightSide = (carouselItem.parentElement?.scrollWidth ?? Infinity) - ((carouselItem.parentElement?.clientWidth ?? Infinity) * 1.5);
          if (scrollLeft!==undefined && scrollLeft < rightSide) {
            carouselItem.parentElement?.scrollBy({top: 0, left: carouselItem.parentElement.offsetWidth, behavior: "smooth"})
          } else if (scrollLeft!==undefined && scrollLeft >= rightSide) {
            carouselItem.parentElement?.scrollTo({left: 0, behavior: "smooth"})
          }
        }}>❯</button>
    </div>
</div> 