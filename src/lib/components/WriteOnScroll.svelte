<script lang="ts">
	import { onMount } from "svelte";

    export let text: string;

    export let scrollY: number;

    export let offset: number;

    export let blinkingIntervall: number;

    let absoluteOffset: number;

    let textElement: HTMLElement;

    let cursorElement: HTMLElement;

    onMount(() => {
        // This will get the absolute position of the element
        const position = textElement.getBoundingClientRect().top + window.scrollY;
        // This will subtract the windows height and the offset,
        // so that the absolute offset is shown if the element gets displayed + offset
        absoluteOffset = position - window.innerHeight - offset;

        blinkCursor(blinkingIntervall, cursorElement);
    });

    function blinkCursor(intervall: number, cursorElement: HTMLElement) {
        let isVisible = true;
        setInterval(() => {  
            if (isVisible) {
                isVisible = false;
                cursorElement.style.opacity = "0";
            } else {
                isVisible = true;
                cursorElement.style.opacity = "1";
            }
        }, intervall)
    }
</script>

<code bind:this={textElement}>
    {@html text.slice(0, Math.max(scrollY-absoluteOffset, 0))}
</code>
<span bind:this={cursorElement} class="transition-opacity"><b>_</b></span>