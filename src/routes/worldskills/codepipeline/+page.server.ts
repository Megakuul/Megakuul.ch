import { createHighlighter } from 'shiki';
import dracula from 'shiki/themes/dracula.mjs';
import groups from './codepipeline.snippets';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'always';

export const load: PageServerLoad = async () => {
  const highlighter = await createHighlighter({
    themes: [dracula],
    langs: ['json', 'yaml', 'bash', 'javascript'],
  });

  return {
    groups: groups.map(group => ({
      ...group,
      snippets: group.snippets.map(snippet => ({
        ...snippet,
        html: highlighter.codeToHtml(snippet.code, {
          lang: snippet.lang,
          theme: 'dracula',
        }),
      })),
    })),
  };
};
