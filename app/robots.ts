import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://emmy-catering.vercel.app/sitemap.xml',
    host: 'https://emmy-catering.vercel.app',
  };
}
