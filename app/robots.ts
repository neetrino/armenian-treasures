import type { MetadataRoute } from 'next';

export function robots(): MetadataRoute.Robots {
  const base = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/uploads'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

export default robots;
