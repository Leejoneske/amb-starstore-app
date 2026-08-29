'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/program';
import { ThemeToggle } from './ThemeToggle';

const PAGES = [
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/earnings/', label: 'Earnings' },
  { href: '/levels/', label: 'Levels' },
  { href: '/policies/', label: 'Policies' },
  { href: '/faq/', label: 'FAQ' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A route change with the menu open otherwise leaves it covering the page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 font-medium">
          <Image src="/favicon.png" alt="" width={28} height={28} className="rounded-lg" priority />
          <span className="hidden sm:inline">StarStore Ambassadors</span>
          <span className="sm:hidden">Ambassadors</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {PAGES.map((page) => {
            const active = pathname === page.href;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'text-ink' : 'text-muted transition-colors hover:text-ink'}
                >
                  {page.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={LINKS.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/85 sm:inline-flex"
          >
            Apply
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? '×' : '≡'}
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <ul className="shell flex flex-col py-2">
            {PAGES.concat([{ href: '/contact/', label: 'Contact' }]).map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="block border-b border-line py-3.5 last:border-0">
                  {page.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <a
                href={LINKS.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper"
              >
                Apply to the programme
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
