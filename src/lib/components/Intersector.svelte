<script lang="ts">
  import { onMount } from 'svelte';
  
  export let classOnIntersect: any;
  export let classOnDefault: any;
  export let transition: any;
  export let classAdditional: any;

  let element: any;
  let css_class = classOnDefault;
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            css_class = classOnIntersect;
        } else {
            css_class = classOnDefault;
        }
      });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  });
</script>

<div bind:this="{element}" style="transition: {transition}" class="{css_class} {classAdditional}">
    <slot></slot>
</div>