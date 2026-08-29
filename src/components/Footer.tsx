import Link from 'next/link';
import Image from 'next/image';
import { LINKS } from '@/lib/program';

const COLUMNS = [
  {
    title: 'The programme',
    links: [
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/earnings/', label: 'Earnings' },
      { href: '/levels/', label: 'Levels' },
      { href: '/apply/', label: 'How to apply' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/policies/', label: 'Programme policies' },
      { href: '/opt-out/', label: 'Opting out and back in' },
      { href: '/faq/', label: 'Frequently asked questions' },
      { href: '/contact/', label: 'Contact us' },
    ],
  },
];

const OUTBOUND = [
  { href: LINKS.app, label: 'starstore.app', note: 'The app itself' },
  { href: LINKS.blog, label: 'blog.starstore.app', note: 'Longer writing' },
  { href: LINKS.bot, label: 'The Telegram bot', note: 'Where you apply' },
  { href: LINKS.support, label: LINKS.supportAddress, note: 'A person reads it' },
];

export function Footer() {
  return (
    <footer className="mt-4 border-t border-line">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/favicon.png" alt="" width={26} height={26} className="rounded-lg" />
            <span className="font-display text-[15px] font-extrabold tracking-tight">StarStore</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            The ambassador programme, written out in full. Every figure here is the one the platform
            pays.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Elsewhere">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Elsewhere</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {OUTBOUND.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell border-t border-line-soft py-6 text-sm text-muted">
        StarStore Ambassador Program
      </div>
    </footer>
  );
}
