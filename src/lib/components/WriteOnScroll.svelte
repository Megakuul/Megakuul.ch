<script lang="ts">
	import { onMount } from "svelte";

    export let text: string;

    export let scrollY: number;

    export let offset: number;

    export let blinkingIntervall: number;

    let cursorOpacity: number;

    let absoluteOffset: number;

    let textElement: HTMLElement;

    onMount(() => {
        // This will get the absolute position of the element
        const position = textElement.getBoundingClientRect().top + window.scrollY;
        // This will subtract the windows height and the offset,
        // so that the absolute offset is shown if the element gets displayed + offset
        absoluteOffset = position - window.innerHeight - offset;

        blinkCursor(blinkingIntervall);
    });

    function blinkCursor(intervall: number) {
        let isVisible = true;
        setInterval(() => {  
            if (isVisible) {
                isVisible = false;
                cursorOpacity = 0;
            } else {
                isVisible = true;
                cursorOpacity = 1;
            }
        }, intervall)
    }
</script>

<!-- This Element contains the actual content, 
    because the content is very buggy if the cursor is appended as span element,
    it uses the css after element for the cursor, the after element is control through a css variable.
    This is not a best practise, but in this case the only way I made it work clean and without problems.
-->
<code bind:this={textElement} class="textElement transition-opacity" style="--opacity: {cursorOpacity};">
    {@html text.slice(0, Math.max(scrollY-absoluteOffset, 0))}
</code>

<style>

    .textElement::after {
        content: "_";
        opacity: var(--opacity);
        @apply transition-opacity;
    }
</style>

