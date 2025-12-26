<script>
	import { page } from "$app/state";
</script>

{#if page.status == 500}
<div class="flex justify-center items-center w-full h-screen bg-blue-500">
    <div class="flex flex-col justify-center items-start p-4">
        <h1 class="mb-8 text-9xl">:&#40;</h1>
        <h1 class="mt-8 text-2xl">{page.status} {page.error?.message}</h1>
        <p class="my-8 text-xl">It seems that this page is hosted on a Windows Server</p>
        <div class="flex flex-row w-full max-w-xl">
            <img alt="Error QR Code" src="/errorqrcode.svg" class="mr-3 w-32 h-32">
            <p>For more information about this issue and possible fixes, visit the support page at the QR Code</p>
        </div>
    </div>
</div>    
{:else}
    <div class="flex flex-col justify-center items-center w-full h-screen">
        <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr animate-pulse from-slate-50 to-slate-400">{$page.status}</h1>
        <h3 class="my-8 text-2xl">{page.error?.message}</h3>
        <a href="/" class="btn btn-ghost">Take me Home</a>
    </div>
{/if}
