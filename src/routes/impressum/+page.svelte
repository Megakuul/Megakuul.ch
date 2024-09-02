<script lang="ts">
    import Intersector from "$lib/components/Intersector.svelte";
</script>

<div class="w-full flex flex-col items-center justify-center my-10 sm:my-20">
    <h1 class=" xl:text-7xl lg:text-5xl sm:text-4xl text-2xl">
        Impressum
    </h1>

    <h2 class="xl:text-5xl lg:text-4xl sm:text-3xl text-xl my-8">
        Betreiber der Website
    </h2>

    <p class="xl:text-2xl lg:text-xl sm:text-lg text-sm">Linus Moser</p>
    <p class="xl:text-2xl lg:text-xl sm:text-lg text-sm">Schweiz, Thun BE</p>
    <p class="xl:text-2xl lg:text-xl sm:text-lg text-sm">E-Mail: linus.moser@megakuul.ch</p>

    <h2 class="xl:text-4xl lg:text-3xl sm:text-2xl text-xl my-8">
        Urheberrechtshinweise
    </h2>

    <p class="xl:text-2xl lg:text-xl sm:text-lg text-sm">
        Sämtliche auf dieser Website verwendeten Bilder sind Eigentum von Linus Moser,
        sofern nicht anders angegeben. Ausgenommen hiervon sind spezielle Icons, GIFs oder Verlinkungen,
        deren Urheberrecht bei den jeweiligen Rechteinhabern liegt. 
        Die Verwendung dieser Inhalte ist gestattet, solange der Eigentümer durch einen Link angegeben wird.
    </p>

    <h2 class="xl:text-3xl lg:text-2xl sm:text-xl text-xl my-8">
        Haftungsausschluss
    </h2>

    <p class="xl:text-2xl lg:text-xl sm:text-lg text-sm">
        Obwohl ich mich bemühe, die Richtigkeit und Aktualität der auf dieser Website bereitgestellten Informationen sicherzustellen,
        übernehme ich keine Haftung für die Inhalte externer Links.
        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
    </p>
</div>

<style>
    h1 {
        @apply font-bold text-center mb-10 w-4/6;
    }
    h2 {
        @apply font-semibold my-10 text-center w-4/6;
    }
    p {
        @apply text-center my-2 w-4/6;
    }
</style>