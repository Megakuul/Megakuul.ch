import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autolink from 'rehype-autolink-headings';
import autometa from 'rehype-meta';
import autotoc from 'remark-toc';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      remarkPlugins: [autotoc],
      rehypePlugins: [autolink, autometa],
      extensions: ['.svx', '.md'],
      layout: {
        projects: `${projectRoot}/src/routes/projects/project.layout.svelte`,
        concepts: `${projectRoot}/src/routes/concepts/concept.layout.svelte`,
      },
    }),
  ],

  kit: {
    adapter: adapter({
      fallback: 'fallback.html',
      precompress: false,
      strict: true,
    }),
  },

  extensions: ['.svelte', '.svx', '.md'],
};

export default config;
