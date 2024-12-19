/**
 * This list is representation for the Project List in the Project Routes
 * 
 * 
 * To add a new Project add a folder to the `routes/projects` folder.
 * Add a `+page.md` file to add content to it and to prerender it a `+page.ts` file,
 * containing the `export const prerender = true;` option.
 * 
 * Finally you can add a global entry to this object that will represent the Project in the Projects Route.
 */
export default [
    {
        title: "Opensail",
        subtitle: "Sophisticated Regatta Rating System",
        route: "opensail",
        published: "18.12.2024",
        mainimage: "opensail.png"
    }, {
        title: "Battleshiper",
        subtitle: "Serverless SvelteKit deployment platform backed by AWS",
        route: "battleshiper",
        published: "04.10.2024",
        mainimage: "battleshiper.svg"
    }, {
        title: "ADB-Proxy",
        subtitle: "Minimalistic central-managed android adb proxy",
        route: "adb-proxy",
        published: "17.08.2024",
        mainimage: "adb-proxy.png"
    }, {
        title: "Leaderboard",
        subtitle: "Simple leaderboard system constructed on lowcost aws serverless infrastructure",
        route: "leaderboard",
        published: "29.07.2024",
        mainimage: "leaderboard.svg"
    }, {
        title: "Screensaver",
        subtitle: "Windows screensaver application based on gdi32",
        route: "screensaver",
        published: "11.05.2024",
        mainimage: "screensaver.png"
    }, {
        title: "SimpleHTTP",
        subtitle: "A minimalistic HTTP server library, complying with basic HTTP/1.1 standards",
        route: "simplehttp",
        published: "28.04.2024",
        mainimage: "simplehttp.svg"
    }, {
        title: "JuPa Website",
        subtitle: "Full rebuild of jupa-thun website with sveltekit and svelte-parallax",
        route: "jupa",
        published: "19.04.2024",
        mainimage: "jupa.svg"
    }, {
        title: "Gitbackup as a Service",
        subtitle: "Service construct to backup github-repositories to AWS S3 bucket at a low cost",
        route: "gbaas",
        published: "30.12.2023",
        mainimage: "gbaas.svg"
    }, {
        title: "Orbstrike",
        subtitle: "Simple game using a stateful auto-scaler infrastructure",
        route: "orbstrike",
        published: "11.11.2023",
        mainimage: "orbstrike.png"
    }, {
        title: "Backup Analyzer",
        subtitle: "Backup strategy and retention analysis tool",
        route: "backup-analyzer",
        published: "26.09.2023",
        mainimage: "backup-analyzer.svg"
    }, {
        title: "Kerberos Simulator",
        subtitle: "Kerberos simulator on steroids",
        route: "kerberos-sim",
        published: "13.09.2023",
        mainimage: "kerberos-sim.svg"
    }, {
        title: "Megakuul Commander",
        subtitle: "Convenient, dashing two-column file manager for Linux",
        route: "mkc",
        published: "17.07.2023",
        mainimage: "mkc.png"
    }, {
        title: "Megakuul.ch",
        subtitle: "The Website your currently looking at",
        route: "megakuul",
        published: "17.07.2023",
        mainimage: "megakuul.svg"
    }, {
        title: "XMemo",
        subtitle: "An interactive platform to play memory against other players",
        route: "xmemo",
        published: "17.06.2023",
        mainimage: "xmemo.svg"
    }, {
        title: "Gorbit",
        subtitle: "A blazingly fast and easy to use TCP Network Loadbalancer",
        route: "gorbit",
        published: "28.05.2023",
        mainimage: "gorbit.svg"
    }, {
        title: "GradeManager",
        subtitle: "Modern Cross-Plattform Grade-Manager",
        route: "grademanager",
        published: "18.05.2023",
        mainimage: "grademanager.png"
    }, {
        title: "Linosteffen.ch",
        subtitle: "Website for Lino Steffen",
        route: "linosteffen",
        published: "15.05.2023",
        mainimage: "linosteffen.png"
    }, {
        title: "Gehege",
        subtitle: "Example Application to host on Docker",
        route: "gehege",
        published: "19.03.2023",
        mainimage: "gehege.png"
    }, {
        title: "Chatapp",
        subtitle: "Super simple Chatapp, example to host on AWS",
        route: "chatapp",
        published: "27.01.2023",
        mainimage: "noimage.svg"
    }, {
        title: "Statistic Calculator",
        subtitle: "Simple statistics calculator to display some statistical relationships in bulk",
        route: "statisticcalc",
        published: "25.11.2022",
        mainimage: "statisticcalc.png"
    }, {
        title: "Dinosaur API",
        subtitle: "Example API meant to be hosted on Googles Cloud Platform",
        route: "dinosaurapi",
        published: "03.12.2022",
        mainimage: "noimage.svg"
    }, {
        title: "Password Generator",
        subtitle: "The only Password Generator that actually looks good",
        route: "passwordgenerator",
        published: "05.09.2022",
        mainimage: "generator.png"
    }, {
        title: "Wizard Game",
        subtitle: "Simple single player python game",
        route: "wizard-game",
        published: "01.06.2022",
        mainimage: "wizard-game.png"
    }
]