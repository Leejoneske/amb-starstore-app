import type { Metadata } from 'next';
import { KEYWORDS, SITE } from './program';

export { SITE };

/**
 * The picture a shared link renders with. One card for the whole site: these
 * links are posted in Telegram chats, where the card is cropped to a thumbnail.
 */
export const OG_IMAGE = {
  url: `${SITE}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'StarStore Ambassador Program',
};

interface PageMetaInput {
  /** Route path within this site, e.g. '/levels'. */
  path: string;
  title: string;
  description: string;
  /** Terms specific to this page, added to the site-wide set. */
  keywords?: string[];
}

/**
 * The address this route is actually served at, trailing slash included.
 *
 * The slash is load bearing. `trailingSlash` in next.config.ts makes the export
 * write levels/index.html, so a canonical without the slash names an address
 * that answers with a redirect rather than a page.
 */
export function selfUrl(path: string): string {
  return `${SITE}${path === '/' ? '/' : `${path}/`}`;
}

/** Title as it appears in a search result, rather than in the page. */
function fullTitle(title: string, path: string): string {
  return path === '/' ? title : `${title} | StarStore Ambassador Program`;
}

export function pageMeta({ path, title, description, keywords = [] }: PageMetaInput): Metadata {
  const canonical = selfUrl(path);
  const rendered = fullTitle(title, path);

  return {
    title: rendered,
    description,
    keywords: [...KEYWORDS, ...keywords],
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      siteName: 'StarStore Ambassador Program',
      title: rendered,
      description,
      url: canonical,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: rendered,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * A JSON-LD block.
 *
 * Structured data is the half of SEO with no visual output, which is the half
 * worth spending effort on: it changes what a crawler understands and moves
 * nothing on the screen.
 */
export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

/** The trail a search result prints above the title. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: selfUrl(step.path),
    })),
  };
}
