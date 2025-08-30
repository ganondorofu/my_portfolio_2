import { sitemap } from './sitemap';

export async function GET(request: Request) {
  const sitemapContent = sitemap();
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapContent.map(item => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified?.toISOString()}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `).join('')}
</urlset>`;
  
  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
