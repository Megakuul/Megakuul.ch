<script>
  import { Highlight } from '$lib/components/SyntaxHighlighter';
  import portrait from '$lib/assets/portrait.jpg';

  const code = `
class Linus : public Earth::Human {
public:
  Linus() = default;
  ~virtual Linus();

  std::string first_name = "Linus";
  std::string middle_name = "Ilian";
  std::string last_name = "Moser";
  std::string email_addr = "linus.moser@megakuul.ch";
  struct Date {
    int year;
    int month;
    int day;
  } birthday = {2006, 02, 12};
   
  WORKSPACE::EDITOR editor = WORKSPACE::EDITOR::NVIM;
  WORKSPACE::OS os = WORKSPACE::OS::NIXOS; // also referred to as goat

  std::vector<SKILL::SOFT> soft_skills = {
    SKILL::SOFT::PROBLEM_SOLVING,
    SKILL::SOFT::ABSTRACT_THINKING,
    SKILL::SOFT::CREATIVITY,
    SKILL::SOFT::MOTIVATION,
    SKILL::SOFT::TEAMWORK
  };

  std::vector<SKILL::HARD> hard_skills = {
    SKILL::HARD::FULLSTACK_DEVELOPMENT,
    SKILL::HARD::SYSTEM_PROGRAMMING,
    SKILL::HARD::VIRTUALIZATION,
    SKILL::HARD::CLOUD_COMPUTING,
    SKILL::HARD::CONTAINER_ORCHESTRATION,
    SKILL::HARD::VECTOR_GRAPHICS
  };

  std::vector<TECHNOLOGY> tech_fundamentals = {
    TECHNOLOGY::GO,
    TECHNOLOGY::C,
    TECHNOLOGY::CPP,
    TECHNOLOGY::SVELTE,
    TECHNOLOGY::FLUTTER,
    TECHNOLOGY::OPENID,
    TECHNOLOGY::TAILWINDCSS_WITHOUT_EVER_CAUSING_ANY_OVERFLOW,
    TECHNOLOGY::KUBERNETES,
    TECHNOLOGY::AWS
  };

  std::vector<std::any> skill_issues = {
    SKILL::SOFT::CONCENTRATION,
    TECHNOLOGY::AWS::VENDORLOCK,
    BODY::HAND::EMACS_PINKY,
  };
};
`;

  const syntaxMap = new Map([
    ['class', 'color: rgba(43, 105, 199, 0.7);'],
    ['public', 'color: rgba(43, 105, 199, 0.7);'],
    ['virtual', 'color: rgba(43, 105, 199, 0.7);'],
    ['int', 'color: rgba(7, 64, 148, 0.7);'],
    ['std', 'color: rgba(22, 94, 8, 0.8);'],
    ['string', 'color: rgba(22, 94, 8, 0.8);'],
    ['vector', 'color: rgba(22, 94, 8, 0.8);'],
    ['struct', 'color: rgba(27, 91, 187, 0.7);'],
    ['CULTURE', 'color: rgba(22, 94, 8, 0.8);'],
    ['RELIGION', 'color: rgba(22, 94, 8, 0.8);'],
    ['SKILL', 'color: rgba(22, 94, 8, 0.8);'],
    ['SOFT', 'color: rgba(22, 94, 8, 0.8);'],
    ['HARD', 'color: rgba(22, 94, 8, 0.8);'],
    ['TECHNOLOGY', 'color: rgba(22, 94, 8, 0.8);'],
    ['WORKSPACE', 'color: rgba(22, 94, 8, 0.8);'],
    ['EDITOR', 'color: rgba(22, 94, 8, 0.8);'],
    ['OS', 'color: rgba(22, 94, 8, 0.8);'],
    ['BODY', 'color: rgba(22, 94, 8, 0.8);'],
    ['HAND', 'color: rgba(22, 94, 8, 0.8);'],
    ['EARTH', 'color: rgba(22, 94, 8, 0.8);'],
  ]);

  /** @param {string} birthday @returns {number}  */
  function getAge(birthday) {
    const birthday_date = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthday_date.getFullYear();

    if (
      today.getMonth() < birthday_date.getMonth() ||
      (today.getMonth() == birthday_date.getMonth() && today.getDate() < birthday_date.getDate())
    ) {
      age--;
    }

    return age;
  }
</script>

<svelte:head>
  <title>About</title>
  <meta
    name="description"
    content="Learn about my background, experiences and passion for technology."
  />
  <meta
    property="og:description"
    content="Learn about my background, experiences and passion for technology."
  />
  <link rel="canonical" href="https://megakuul.ch/about" />
  <meta property="og:title" content="About - Megakuul" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="flex flex-col justify-center items-center my-10 w-full sm:my-20">
  <div
    class="2xl:fixed 2xl:left-1/8 2xl:top-1/2 2xl:translate-y-[-50%] flex flex-col items-center 2xl:items-start"
  >
    <div class="w-10/12 sm:w-8/12 2xl:w-1/3 hover-3d">
      <div class="p-4 rounded-2xl">
        <figure>
          <img class="rounded-xl opacity-80" alt="Portrait" src={portrait} />
        </figure>

        <p class="text-xs text-center sm:text-lg lg:text-xl">
          My name is Linus Ilian Moser, and I'm an enthusiastic platform engineer and devoted
          software developer.
          <br />Residing in Switzerland and currently {getAge('2006-02-13')} years old.
        </p>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="mt-20 w-11/12 2xl:mr-6 2xl:ml-auto 2xl:w-1/2 mockup-code apple-glass">
    <pre
      class="overflow-hidden pl-2 sm:pl-8 sm:text-sm lg:text-lg xl:pl-12 xl:text-xl text-[0.7rem]">{@html Highlight(
        code,
        syntaxMap,
      )}</pre>
  </div>
</div>
