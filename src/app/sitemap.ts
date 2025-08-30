'use server';

import { MetadataRoute } from 'next';
import { apps } from '@/lib/apps';

const siteUrl = 'https://komeniki.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const appRoutes = Object.values(apps)
    .filter(app => !app.externalUrl)
    .map((app) => ({
      url: `${siteUrl}/${app.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...appRoutes,
  ];
}
