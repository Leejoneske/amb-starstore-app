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

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-surface">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 font-medium">
            <Image src="/favicon.png" alt="" width={28} height={28} className="rounded-lg" />
            StarStore Ambassadors
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Earn a share of every trade your referrals make on StarStore, paid in USDT on TON at the
            start of each month.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={LINKS.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/85"
            >
              Apply
            </a>
            <a
              href={LINKS.bot}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Open the bot
            </a>
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {column.title}
            </p>
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
      </div>

      <div className="shell flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>StarStore Ambassador Program</p>
        <div className="flex flex-wrap gap-5">
          <a href={LINKS.app} className="transition-colors hover:text-ink">
            starstore.app
          </a>
          <a href={LINKS.support} className="transition-colors hover:text-ink">
            {LINKS.supportAddress}
          </a>
        </div>
      </div>
    </footer>
  );
}
