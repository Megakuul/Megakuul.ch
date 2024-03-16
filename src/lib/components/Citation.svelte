<script lang="ts">
    export let content: string;
    export let author: string;
</script>

<div class="flex items-center justify-around my-28">
    <blockquote class="relative w-7/12 animate-pulse">
        <p class="bg-gradient-to-tr from-slate-500 to-slate-200 bg-clip-text text-transparent sm:text-4xl text-xl">{content}</p>
        
        <footer class="relative sm:text-lg text-sm mt-4 ml-2">{author}</footer>
    </blockquote>
</div>

<style>
    /* This is the Blockquote in front of the textblock */
    blockquote p:first-of-type:before {
        color: white;
        -webkit-text-fill-color: white;

        font-family: 'EB Garamond', serif;
        font-size: 4em;
        opacity: 0.4;
        content: '\201c';

        position: absolute;
        top: 0;
        left: -.5em;
    }

    blockquote footer:before {
        content: '-';
        position: absolute;
        left: -.6em;
    }
</style>