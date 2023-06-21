<script>
    import { page } from '$app/stores';
</script>

{#if $page.status = 500}
<div class="w-full h-screen bg-blue-500 flex items-center justify-center">
    <div class="flex items-start justify-center flex-col p-4">
        <h1 class="text-9xl mb-8">:&#40;</h1>
        <h1 class="text-2xl mt-8">{$page.status} {$page.error?.message}</h1>
        <p class="text-xl my-8">It seems that this page is hosted on a Windows Server</p>
        <div class="w-full flex flex-row max-w-xl">
            <img alt="Error QR Code" src="/errorqrcode.svg" class="h-32 w-32 mr-3">
            <p>For more information about this issue and possible fixes, visit the support page at the QR Code</p>
        </div>
    </div>
</div>    
{:else}
    <div class="w-full h-screen flex items-center justify-center flex-col">
        <h1 class="font-extrabold text-transparent text-9xl bg-clip-text bg-gradient-to-tr from-slate-50 to-slate-400 animate-pulse">{$page.status}</h1>
        <h3 class="text-2xl my-8">{$page.error?.message}</h3>
        <a href="/" class="btn btn-ghost">Take me Home</a>
    </div>
{/if}