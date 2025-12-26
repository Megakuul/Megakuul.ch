<script>
	import { cn } from '$lib/utils/cn';
  import { onMount } from 'svelte';
  
  /** @type {{
    class: string
    classOnIntersect: string
    classOnDefault: string
    transition: string
    children: any
  }} */
  let {
    class: classNames,
    classOnIntersect,
    classOnDefault,
    transition,
    children
  } = $props()
  
  let element = $state();
  let classes = $derived(classOnDefault);
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          classes = classOnIntersect;
        } else {
          classes = classOnDefault;
        }
      });
    }, {
      rootMargin: "-50px"
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  });
</script>

<div bind:this={element} style="transition: {transition}" class="{cn(classes, classNames)}">
  {@render children()}
</div>


