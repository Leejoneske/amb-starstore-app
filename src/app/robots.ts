import type { MetadataRoute } from 'next';

// Required by `output: 'export'`: these are generated at build time, not per request.
export const dynamic = 'force-static';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
    // No `host`: a Yandex-only directive Yandex itself has retired. The
    // canonical tags already say which host is the site.
  };
}
