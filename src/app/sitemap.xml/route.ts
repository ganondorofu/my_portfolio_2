import { MetadataRoute } from 'next';
import sitemap from '../sitemap';

export function GET() {
  const sitemapContent = sitemap()
    .map((route) => {
      return `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
        </url>
      `;
    })
    .join('');

  return new Response(`
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapContent}
    </urlset>
  `.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
