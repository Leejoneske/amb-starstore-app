import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SITE, jsonLd, OG_IMAGE } from '@/lib/seo';
import { LINKS } from '@/lib/program';
import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'StarStore Ambassador Program',
    template: '%s',
  },
  description:
    'Earn 30% of the margin on every trade your referrals make on StarStore, paid in USDT on TON at the start of each month.',
  applicationName: 'StarStore Ambassador Program',
  authors: [{ name: 'StarStore', url: 'https://starstore.app' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: { siteName: 'StarStore Ambassador Program', images: [OG_IMAGE] },
  alternates: {
    canonical: SITE,
    types: { 'application/atom+xml': '/feed.atom' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F4' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0A09' },
  ],
};

/**
 * Applied before the first paint, so a reader who chose dark never sees a
 * white flash on navigation. It sets nothing when no choice is stored, which
 * leaves the media query in globals.css to follow the system.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;

const ORGANISATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StarStore',
  url: 'https://starstore.app',
  logo: `${SITE}/favicon.png`,
  email: LINKS.supportAddress,
  sameAs: [LINKS.bot, 'https://starstore.app'],
};

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'StarStore Ambassador Program',
  url: SITE,
  publisher: { '@type': 'Organization', name: 'StarStore' },
  inLanguage: 'en',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ORGANISATION)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(WEBSITE)} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
