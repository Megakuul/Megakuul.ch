<script>
  let { type = 'info', children } = $props();
</script>

<div class="flex flex-row gap-2 justify-center">
  {#if type === 'info'}
    <div class="p-2 w-full text-blue-600 rounded-2xl border-2 border-blue-800 bg-blue-300/5">
      {@render children()}
    </div>
  {:else if type === 'protip'}
    <div class="p-2 w-full text-indigo-600 rounded-2xl border-2 border-indigo-800 bg-blue-300/5">
      {@render children()}
    </div>
  {:else if type === 'caution'}
    <div class="p-2 w-full text-orange-600 rounded-2xl border-2 border-orange-800 bg-orange-300/5">
      {@render children()}
    </div>
  {/if}
</div>
