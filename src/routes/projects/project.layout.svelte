<script>
  /**
	 * @type {any}
	 */
   export let title;

  /**
	 * @type {any}
	 */
   export let subtitle;

  /**
	 * @type {any}
	 */
   export let published;

  /**
	 * @type {any}
	 */
   export let mainimage;
</script>
  
<div class="hero">
  <div class="hero-content flex-col lg:flex-row w-full">
    <img src="/images/{mainimage}" class="max-w-xs rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-4xl lg:text-5xl font-bold">{title}</h1>
      <p class="py-6 ">{subtitle}</p>
    </div>
  </div>
</div>

<article class="bg-base-200">
  <slot />
</article>