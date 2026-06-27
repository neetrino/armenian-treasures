import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/uploads', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

export default robots;
