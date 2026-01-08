<script>
  import Gauge from 'svelte-gauge';
  let { score } = $props();

  const color = $derived.by(() => {
    if (score < 3) return '#777d0f';
    else if (score < 5) return '#965108';
    else if (score < 7) return '#8f2e0b';
    else if (score < 10) return '#820101';
    else return '#ff11004f';
  });
</script>

<div class="inline-flex relative flex-col items-center max-h-26">
  <Gauge
    value={score * 10}
    start={0}
    stop={110}
    stroke={7}
    {color}
    width={100}
    labels={[' ']}
    displayValue={v => v.formattedValue + '%'}
    labelsCentered={true}
    startAngle={45}
    stopAngle={360 - 45}
    class="bottom-4 font-bold {score > 10 ? 'jitter text-red-800 brightness-200' : ''}"
  />
  <p class="absolute -bottom-3 text-lg font-bold">wtf score™</p>
</div>

<style>
  :global(.jitter) :global(text) {
    animation: jitter-flame 0.1s linear infinite;
  }

  @keyframes jitter-flame {
    0%,
    50%,
    100% {
      rotate: 0deg;
    }
    25% {
      rotate: -1deg;
    }
    75% {
      rotate: 1deg;
    }
  }
</style>
