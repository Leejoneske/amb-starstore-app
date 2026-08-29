import type { NextConfig } from 'next';

/**
 * A static export, for the same reason the StarStore app is one.
 *
 * Every route becomes a real HTML file with its own title, description and
 * canonical in the markup, so a crawler is served the page rather than an
 * empty shell it has to run JavaScript to fill. The site this replaced was a
 * Vite single-page app: one index.html rewritten over every path, which is
 * why nothing below the homepage was indexable.
 *
 * `trailingSlash` makes the export write levels/index.html rather than
 * levels.html, which is what lets a plain static host serve /levels/ without
 * a rewrite rule. It is also why every canonical and every sitemap entry
 * here ends in a slash: the slashless form is a redirect, not a page.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // No image optimiser exists in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
