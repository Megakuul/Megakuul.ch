# Megakuul.ch Official Page

This is my personal portfolio/blog page.

### Important 

#### Deployment

This app is designed to run on Vercel, the whole app is using prerendered pages because there is no dynamic data.

There is an automatic CI/CD Pipeline to Vercel, pushes to the `main` branch will trigger the deployment.

It is using the Vercel Adapter for SvelteKit.

#### Blogposts

Blogposts are written in the Markdown format, and contained inside their folder in the `routes/projects` directory.

The Layout for the Blogposts is contained in the `routes/projects/project.layout.svelte` file.

#### Design

Styling of the pages is handled with tailwindcss (+daisyUI).

The styling for the markdown blogposts is handled in the mdsvex template (`project.layout.svelte`)