'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/* The app mark, as it already ships in public/. */}
          <Image src="/favicon.png" alt="" width={26} height={26} className="rounded-lg" priority />
          <span className="font-display text-[15px] font-extrabold tracking-tight">StarStore</span>
          <span className="hidden text-[15px] text-muted sm:inline">Ambassadors</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {PAGES.map((page) => {
            const active = pathname === page.href;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'font-medium text-ink' : 'text-muted transition-colors hover:text-ink'}
                >
                  {page.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={LINKS.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={LINKS.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-pill bg-accent px-5 text-sm font-bold tracking-[-0.2px] text-on-accent transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Apply
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-pill border border-line lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.9} /> : <Menu size={18} strokeWidth={1.9} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <ul className="shell flex flex-col py-1">
            {PAGES.concat([{ href: '/contact/', label: 'Contact' }]).map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="block border-b border-line-soft py-3.5">
                  {page.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-line-soft py-3.5"
              >
                Blog
              </a>
            </li>
            <li className="py-4">
              <a
                href={LINKS.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-pill bg-accent px-6 text-sm font-bold tracking-[-0.2px] text-on-accent"
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
