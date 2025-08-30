import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://komeniki.net';

  // For now, only the home page is available.
  // In the future, if you add pages like /projects/[id],
  // you can dynamically generate those URLs here.
  const routes = ['/'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
