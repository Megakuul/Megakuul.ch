import { createHighlighter } from 'shiki';
import dracula from 'shiki/themes/dracula.mjs';
import groups from './lambda.snippets';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'always';

/** Highlight every snippet once at build time, so shiki never ships to the client. */
export const load: PageServerLoad = async () => {
  const highlighter = await createHighlighter({
    themes: [dracula],
    langs: ['javascript', 'python', 'json'],
  });

  const render = (code: string, lang: string) =>
    highlighter.codeToHtml(code, { lang, theme: 'dracula' });

  const rendered = groups.map(group => ({
    id: group.id,
    title: group.title,
    blurb: group.blurb,
    snippets: group.snippets.map(s => ({
      id: s.id,
      title: s.title,
      note: s.note ?? null,
      jsRaw: s.js,
      pyRaw: s.py,
      jsHtml: render(s.js, s.lang ?? 'javascript'),
      pyHtml: render(s.py, s.lang ?? 'python'),
    })),
  }));

  return { groups: rendered };
};
