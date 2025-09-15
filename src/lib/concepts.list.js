/**
 * This list is representation for the Concept List in the Concept Routes
 * 
 * 
 * To add a new Concept add a folder to the `routes/concepts` folder.
 * Add a `+page.md` file to add content to it and to prerender it a `+page.ts` file,
 * containing the `export const prerender = true;` option.
 * 
 * Finally you can add a global entry to this object that will represent the Concept in the Concepts Route.
 */
export default [
    {
        title: "Cooking Lock",
        subtitle: "Simple, unfair and time-released locking mechanism that requires only an atomic set-and-get",
        route: "cooking-lock",
        published: "01.05.2025",
        mainimage: "cooking-lock.webp"
    },
    {
        title: "Auth Standard Matrjoschka",
        subtitle: "Some auth implementation patterns to use on top of OpenID Connect",
        route: "auth-standard-matrjoschka",
        published: "15.09.2025",
        mainimage: "auth-standard-matrjoschka.svg"
    }
]