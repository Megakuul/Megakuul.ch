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
  std::string email_addr = "megakuulr@gmail.com";
  struct Date {
    int year;
    int month;
    int day;
  } birthday = {2006, 06, 13};

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
    SKILL::HARD::CONTAINER_ORCHESTRATION,
    SKILL::HARD::BASIC_NETWORKING
  };

  std::vector<TECHNOLOGY> tech_fundamentals = {
    TECHNOLOGY::SVELTE,
    TECHNOLOGY::TYPESCRIPT,
    TECHNOLOGY::NODEJS,
    TECHNOLOGY::CSHARP,
    TECHNOLOGY::C,
    TECHNOLOGY::CPP,
    TECHNOLOGY::GO,
    TECHNOLOGY::FLUTTER,
    TECHNOLOGY::KUBERNETES,
    TECHNOLOGY::AWS
  };

  std::vector<std::any> weaknesses = {
    SKILL::SOFT::PUBLIC_SPEAKING,
    SKILL::SOFT::CLIENT_COMMUNICATION,
    TECHNOLOGY::THINKING_TO_ACTUALLY_KNOW_CPP
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
   ["SKILL", "color: rgba(22, 94, 8, 0.8);"],
   ["SOFT", "color: rgba(22, 94, 8, 0.8);"],
   ["HARD", "color: rgba(22, 94, 8, 0.8);"],
   ["TECHNOLOGY", "color: rgba(22, 94, 8, 0.8);"],
   ["EARTH", "color: rgba(22, 94, 8, 0.8);"],
]);

function getAge(birthday: string) {
    const birthday_date = new Date(birthday);
    const now_date = new Date();

    let age = now_date.getFullYear() - birthday_date.getFullYear();
    let monthDiff = now_date.getMonth() - birthday_date.getMonth();

    if (monthDiff<=0) {
        age--;
    }

    return age;
}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" 
	content="Learn about my background, experiences and passion for technology" />
</svelte:head>

<div class="w-full flex flex-col items-center justify-center my-10 sm:my-20">
    <Intersector classAdditional="avatar"
        classOnDefault="scale-90 opacity-60" 
		classOnIntersect="scale-100 opacity-100" 
		transition="all ease .5s"
    >
        <div class="w-40 sm:w-48 xl:w-56 mask mask-squircle">
          <img alt="Portrait" src={portrait} />
        </div>
    </Intersector>
    <Intersector classAdditional="mt-10 xl:text-2xl lg:text-xl sm:text-lg text-sm text-center w-5/6"
        classOnDefault="scale-90 opacity-60" 
		classOnIntersect="scale-100 opacity-100" 
		transition="all ease .5s"
    >
        My name is Linus, and I'm an enthusiastic Platform Engineer and devoted Software Developer.
        <br>Residing in Switzerland and currently {getAge("2006-02-13")} years old.
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
