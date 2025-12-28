<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="flex justify-center my-10 min-h-[80dvh]">
  <section class="p-4 rounded-2xl sm:p-10 apple-glass max-w-9/12" lang="en">
    <h1>Imprint</h1>

    <h2>Controller</h2>
    <p>
      <strong>Name:</strong> Linus Moser<br />
      <strong>Email:</strong>
      <a class="underline" href="mailto:linus.moser@megakuul.ch">linus.moser@megakuul.ch</a><br />
      <strong>Public profile:</strong>
      <a class="underline" href="https://github.com/megakuul" rel="noopener noreferrer">
        github.com/Megakuul
      </a>
    </p>

    <h2>Disclaimer</h2>
    <p>
      The author assumes no liability for the correctness, accuracy, timeliness, reliability, and
      completeness of the information. Liability claims regarding damage caused by the use of any
      information provided, including any kind of information which is incomplete or incorrect, will
      therefore be rejected.
    </p>
  </section>
</div>

<style>
  h1 {
    font-size: 50px;
    text-decoration: underline;
  }
  h2 {
    margin-left: 5px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.8);
  }
  p {
    margin-left: 15px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 15px;
    }
    p {
      font-size: 10px;
    }
  }
</style>
