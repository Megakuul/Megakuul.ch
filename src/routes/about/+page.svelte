<script lang="ts">
    import Intersector from "$lib/components/Intersector.svelte";
    import { Highlight } from "$lib/components/SyntaxHighlighter";
    import portrait from "$lib/assets/portrait.jpg";

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
  } birthday = {2006, 06, 13};
   
  CULTURE::RELIGION religion = CULTURE::RELIGION::CHURCH_OF_EMACS;

  std::vector<SKILL::SOFT> soft_skills = {
    SKILL::SOFT::PROBLEM_SOLVING,
    SKILL::SOFT::ABSTRACT_THINKING,
    SKILL::SOFT::CREATIVITY,
    SKILL::SOFT::MOTIVATION,
    SKILL::SOFT::TEAMWORK
  };

  std::vector<SKILL::HARD> hard_skills = {
    SKILL::HARD::FRONTEND_PROGRAMMING,
    SKILL::HARD::BACKEND_PROGRAMMING,
    SKILL::HARD::SYSTEM_PROGRAMMING,
    SKILL::HARD::CLOUD_COMPUTING,
    SKILL::HARD::CONTAINER_ORCHESTRATION
  };

  std::vector<TECHNOLOGY> tech_fundamentals = {
    TECHNOLOGY::GO,
    TECHNOLOGY::C,
    TECHNOLOGY::CPP,
    TECHNOLOGY::SVELTE,
    TECHNOLOGY::TYPESCRIPT,
    TECHNOLOGY::FLUTTER,
    TECHNOLOGY::BAZEL,
    TECHNOLOGY::KUBERNETES,
    TECHNOLOGY::AWS
  };

  std::vector<std::any> skill_issues = {
    SKILL::SOFT::CLIENT_COMMUNICATION,
    SKILL::SOFT::CONCENTRATION,
    BODY::HAND::EMACS_PINKY,
  };
};

`;

const syntaxMap = new Map([
   ["class", "color: rgba(43, 105, 199, 0.7);"],
   ["public", "color: rgba(43, 105, 199, 0.7);"],
   ["virtual", "color: rgba(43, 105, 199, 0.7);"],
   ["int", "color: rgba(7, 64, 148, 0.7);"],
   ["std", "color: rgba(22, 94, 8, 0.8);"],
   ["string", "color: rgba(22, 94, 8, 0.8);"],
   ["vector", "color: rgba(22, 94, 8, 0.8);"],
   ["struct", "color: rgba(27, 91, 187, 0.7);"],
   ["CULTURE", "color: rgba(22, 94, 8, 0.8);"],
   ["RELIGION", "color: rgba(22, 94, 8, 0.8);"],
   ["SKILL", "color: rgba(22, 94, 8, 0.8);"],
   ["SOFT", "color: rgba(22, 94, 8, 0.8);"],
   ["HARD", "color: rgba(22, 94, 8, 0.8);"],
   ["TECHNOLOGY", "color: rgba(22, 94, 8, 0.8);"],
   ["BODY", "color: rgba(22, 94, 8, 0.8);"],
   ["HAND", "color: rgba(22, 94, 8, 0.8);"],
   ["EARTH", "color: rgba(22, 94, 8, 0.8);"],
]);

function getAge(birthday: string) {
    const birthday_date = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthday_date.getFullYear();

    if (today.getMonth() < birthday_date.getMonth() || 
        (today.getMonth() == birthday_date.getMonth() && today.getDate() < birthday_date.getDate())) {
        age--;
    }

    return age;
}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Learn about my background, experiences and passion for technology." />
  <meta property="og:description" content="Learn about my background, experiences and passion for technology." />
  <link rel="canonical" href="https://megakuul.ch/about" />
  <meta property="og:title" content="About - Megakuul" />
  <meta property="og:type" content="website" />
	<meta property="og:image" content="https://megakuul.ch/favicon.png" />
</svelte:head>

<div class="w-full flex flex-col items-center justify-center my-10 sm:my-20">
    <Intersector classAdditional="avatar"
        classOnDefault="scale-90 opacity-60" 
		classOnIntersect="scale-100 opacity-100" 
		transition="all ease .5s"
    >
        <div class="h-40 w-72 sm:w-96 sm:h-48 xl:h-56 rounded-2xl shadow-inner brightness-50 hover:brightness-75 transition-all duration-500">
          <img alt="Portrait" src={portrait} />
        </div>
    </Intersector>
    <Intersector classAdditional="mt-10 xl:text-2xl lg:text-xl sm:text-lg text-sm text-center w-5/6"
        classOnDefault="scale-90 opacity-60" 
		classOnIntersect="scale-100 opacity-100" 
		transition="all ease .5s"
    >
      My name is Linus Ilian Moser, and I'm an enthusiastic platform engineer and devoted software developer, 
      <br>residing in Switzerland and currently {getAge("2006-02-13")} years old.
    </Intersector>
    <Intersector classAdditional="mockup-code bg-base-300 w-11/12 sm:w-5/6 mt-10 sm:mt-20" 
		classOnDefault="scale-90 opacity-60" 
		classOnIntersect="scale-100 opacity-100" 
		transition="all ease .5s"
	  >
    <pre class="bg-base-100 text-[0.7rem] sm:text-sm lg:text-lg xl:text-xl xl:pl-12 sm:pl-8 pl-2 overflow-hidden">{
        @html Highlight(code, syntaxMap)
    }</pre>
	</Intersector>
</div>
