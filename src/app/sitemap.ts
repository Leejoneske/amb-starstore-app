import type { MetadataRoute } from 'next';

// Required by `output: 'export'`: these are generated at build time, not per request.
export const dynamic = 'force-static';
import { selfUrl } from '@/lib/seo';

/**
 * Every route, with the trailing slash the export actually serves.
 *
 * Listed by hand rather than discovered, so adding a page is a deliberate act
 * that includes deciding it should be indexed.
 */
const ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/how-it-works', priority: 0.9 },
  { path: '/earnings', priority: 0.9 },
  { path: '/levels', priority: 0.8 },
  { path: '/apply', priority: 0.8 },
  { path: '/faq', priority: 0.7 },
  { path: '/policies', priority: 0.6 },
  { path: '/opt-out', priority: 0.5 },
  { path: '/contact', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: selfUrl(route.path),
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
