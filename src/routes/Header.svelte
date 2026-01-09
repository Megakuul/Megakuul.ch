<script>
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';

  let open = $state(false);
</script>

<button
  class="flex fixed right-5 bottom-5 z-50 justify-center items-center rounded-2xl cursor-pointer apple-glass"
  onclick={() => (open = !open)}
>
  {#if open}
    <Icon class="w-16 h-16 sm:w-20 sm:h-20" icon="line-md:menu-to-close-transition" />
  {:else}
    <Icon class="w-16 h-16 sm:w-20 sm:h-20" icon="line-md:close-to-menu-transition" />
  {/if}
</button>

{#if open}
  <nav
    transition:fade
    class="flex fixed top-0 left-0 z-40 justify-center items-center w-full h-full dense-apple-glass"
  >
    <ul class="flex flex-col gap-2 text-3xl font-bold sm:text-6xl 2xl:text-8xl">
      <li>
        <a class="hover:underline" href="/" onclick={() => (open = false)}>Home</a>
      </li>
      <li>
        <a class="hover:underline" href="/projects" onclick={() => (open = false)}> Projects </a>
      </li>
      <li>
        <a class="hover:underline" href="/concepts" onclick={() => (open = false)}> Concepts </a>
      </li>
      <li>
        <a class="hover:underline" href="/worldskills" onclick={() => (open = false)}>
          Worldskills
        </a>
      </li>
      <li>
        <a class="hover:underline" href="/about" onclick={() => (open = false)}>About</a>
      </li>
    </ul>
  </nav>
{/if}
