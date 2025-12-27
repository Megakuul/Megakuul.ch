<script>
  import AnimatedLogo from '$lib/components/AnimatedLogo.svelte';
  import Icon from '@iconify/svelte';

  let checked = $state(false);

  /** @type {import("$lib/components/AnimatedLogo.svelte").default} */
  let animatedLogo;

  $effect(() => {
    if (checked && animatedLogo) {
      animatedLogo.animate();
    }
  });

  function checkNav() {
    checked = !checked;
  }
</script>

<header>
  <div class="h-20 navbar">
    <div class="navbar-start"></div>

    <div class="navbar-center">
      <a class="text-xl btn btn-ghost" href="/">Megakuul</a>
    </div>
    <div class="navbar-end">
      <label for="main-drawer" class="btn btn-square btn-ghost drawer-button">
        <Icon icon="material-symbols:menu-rounded" height="32" width="32" />
      </label>
    </div>
  </div>

  <div class="drawer drawer-end drawer-mobile">
    <input id="main-drawer" type="checkbox" bind:checked class="drawer-toggle" />
    <div class="z-30 drawer-side">
      <label for="main-drawer" class="drawer-overlay"></label>

      <ul class="p-4 w-80 text-xl rounded-bl-xl menu bg-base-200">
        <label
          for="main-drawer"
          class="hover:scale-75 btn btn-square drawer-button mk-close-btn"
          class:checked
        >
          <Icon icon="material-symbols:close-rounded" height="32" width="32" />
        </label>

        <li class="mk-nav-i1" class:checked><a href="/" onclick={checkNav}>Home</a></li>
        <li class="mk-nav-i2" class:checked>
          <a href="/projects" onclick={checkNav}>Projects</a>
        </li>
        <li class="mk-nav-i3" class:checked>
          <a href="/concepts" onclick={checkNav}>Concepts</a>
        </li>
        <li class="mk-nav-i4" class:checked><a href="/about" onclick={checkNav}>About</a></li>

        <div class="self-center mt-28 mb-5">
          <AnimatedLogo bind:this={animatedLogo} width="200"></AnimatedLogo>
        </div>
      </ul>
    </div>
  </div>
</header>

<style>
  .mk-close-btn.checked {
    animation: spinIcon 2s;
  }

  .mk-nav-i1.checked,
  .mk-nav-i2.checked,
  .mk-nav-i3.checked,
  .mk-nav-i4.checked {
    animation: insertItem;
    animation-timing-function: ease-in;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    transform: translateX(50px);
    opacity: 0;
  }

  .mk-nav-i1.checked {
    animation-delay: 0s;
  }

  .mk-nav-i2.checked {
    animation-delay: 0.3s;
  }

  .mk-nav-i3.checked {
    animation-delay: 0.6s;
  }

  .mk-nav-i4.checked {
    animation-delay: 0.9s;
  }

  @keyframes insertItem {
    0% {
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  @keyframes spinIcon {
    0% {
      rotate: 0deg;
    }
    25% {
      rotate: 55deg;
    }
    50% {
      rotate: -30deg;
    }
    100% {
      rotate: 0deg;
    }
  }
</style>
