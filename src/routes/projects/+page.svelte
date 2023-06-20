<script lang="ts">
    import list from "$lib/projects.list"
    import Intersector from "$lib/components/Intersector.svelte";
</script>

<div class="w-full flex flex-col items-center">
{#each list as item}
    <Intersector 
        classAdditional="hero bg-base-200 hover:bg-base-100 hover:shadow-2xl
            transition-all duration-700 
            flex flex-row justify-between 
            h-40 w-5/6 my-5 lg:my-10 p-4 
            overflow-hidden rounded-2xl"

        classOnDefault="translate-x-10 shadow-none opacity-0"
        classOnIntersect="translate-x-0 shadow-xl opacity-100"
        transition="all ease .5s"
    >
        <div class="mr-1">
            <p class="text-xs lg:text-lg py-2">{item.published}</p>
            <a href="/projects/{item.route}"><h1 class="cursor-pointer link link-hover text-sm lg:text-xl font-bold">{item.title}</h1></a>
            <p class="text-xs lg:text-lg py-2">{item.subtitle}</p>
        </div>
        <img alt="projectimage" src="/images/{item.mainimage}" class="rounded-lg h-2/4 lg:h-3/4" />
    </Intersector>
{/each}
</div>
