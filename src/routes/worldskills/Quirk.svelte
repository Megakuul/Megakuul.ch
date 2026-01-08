<script>
  import WTFScore from '$lib/components/WTFScore.svelte';

  let { score, children } = $props();
</script>

<div class="flex flex-row gap-2 justify-center">
  <div class="p-2 w-full text-emerald-600 rounded-2xl border-2 border-emerald-800 bg-emerald-400/5">
    {@render children()}
  </div>
  <WTFScore {score} />
</div>
