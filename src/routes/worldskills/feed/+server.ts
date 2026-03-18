import { projects } from '../worldskills.list';

export const prerender = true;

export async function GET() {
  const headers = { 'Content-Type': 'application/xml' };

  const xml = `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Worldskills | Megakuul</title>
        <description>Master more AWS services than you will ever need (preparation for the Worldskills 2026) 🇨🇭</description>
        <link>https://megakuul.ch/worldskills</link>
        <atom:link href="https://megakuul.ch/worldskills/feed" rel="self" type="application/rss+xml"/>
        ${Object.entries(projects)
          .reverse()
          .map(project => {
            // skip unfinished articles
            if (project[1].services.includes('todo')) return '';

            const [day, month, year] = project[1].published.split('.');
            const publishedIso = new Date(
              Number(year),
              Number(month) - 1,
              Number(day),
            ).toISOString();
            return `
              <item>
                <title>${project[1].title}</title>                            
                <description>${project[1].description}</description>
                <link>https://megakuul.ch/worldskills/${project[0]}</link>
                <pubDate>${publishedIso}</pubDate>
              </item>
            `;
          })
          .join('')}
      </channel>
    </rss>
  `.trim();
  return new Response(xml, { headers });
}
