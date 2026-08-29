import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '@/lib/program';

/**
 * The site's whole component vocabulary. Small on purpose: the version this
 * replaced carried forty generated primitives and used six of them.
 */

/** Icons come from lucide-react, the set the site already depended on. */
type Icon = ComponentType<{ size?: number | string; strokeWidth?: number; className?: string }>;

/**
 * The product name, in running text, linked to the Mini App.
 *
 * Used at the first mention in a section rather than at every occurrence. A
 * paragraph where the same word is a link four times is harder to read than
 * one where it is a link once, and a search engine reads repeated identical
 * anchors as noise rather than as emphasis.
 */
export function StarStore({ children = 'StarStore' }: { children?: ReactNode }) {
  return (
    <a
      href={LINKS.bot}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
    >
      {children}
    </a>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="shell border-b border-line pb-10 pt-14 sm:pb-14 sm:pt-20">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
    </header>
  );
}

export function Section({
  title,
  id,
  lede,
  children,
}: {
  title?: string;
  id?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="shell scroll-mt-24 py-12 sm:py-14">
      {title ? (
        <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
      ) : null}
      {lede ? <p className="mt-3 max-w-prose leading-relaxed text-muted">{lede}</p> : null}
      <div className={title ? 'mt-7' : undefined}>{children}</div>
    </section>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-6 ${className}`}>{children}</div>
  );
}

/** A headline figure. Only ever rendered by StatRow. */
function Stat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="bg-surface p-6">
      <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm font-semibold">{label}</p>
      {note ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}

/** A row of figures, hairline separated, on one card. */
export function StatRow({ items }: { items: { value: string; label: string; note?: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Stat key={item.label} {...item} />
      ))}
    </div>
  );
}

/**
 * The action colour is ink, taken from the StarStore app. It has no second
 * accent, so a secondary action is an outline rather than another fill.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  external?: boolean;
}) {
  const base =
    'inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-[15px] font-bold tracking-[-0.2px] transition-colors active:scale-[0.975]';
  const styles =
    variant === 'primary'
      ? 'bg-accent text-on-accent hover:bg-accent-hover'
      : 'border border-line text-ink hover:border-ink';

  const body = (
    <>
      {children}
      {external ? <ArrowUpRight size={16} strokeWidth={2.4} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {body}
    </Link>
  );
}

/**
 * A note that matters more than the paragraph around it. Clay rather than a
 * fill you could mistake for a button: ink is the only thing here you press.
 */
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-[inset_3px_0_0_0_rgb(var(--clay))]">
      <p className="font-display text-base font-extrabold tracking-tight">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** A numbered walkthrough. */
export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className="bg-surface p-6">
          <span className="font-display text-xs font-extrabold tracking-[0.1em] text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="mt-3 font-display text-lg font-extrabold tracking-tight">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** A short feature with its icon. Only ever rendered by FeatureRow. */
function Feature({ icon: Glyph, title, body }: { icon: Icon; title: string; body: string }) {
  return (
    <div className="bg-surface p-6">
      <Glyph size={22} strokeWidth={1.6} className="text-ink" />
      <p className="mt-4 font-display text-base font-extrabold tracking-tight">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function FeatureRow({ items }: { items: { icon: Icon; title: string; body: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Feature key={item.title} {...item} />
      ))}
    </div>
  );
}

/**
 * A question and its answer, open in the markup.
 *
 * `<details>` rather than a JavaScript accordion, so the answer is in the HTML
 * a crawler receives and the browser's own page search can find it.
 */
export function Question({ q, a }: { q: string; a: ReactNode }) {
  return (
    <details className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium">
        {q}
        <span
          className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      <div className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{a}</div>
    </details>
  );
}

/** A definition row. Most of the reference pages are made of these. */
export function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-t border-line py-5 last:border-b">
      <p className="font-display text-base font-extrabold tracking-tight">{term}</p>
      <div className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** Where a page sends the reader next. */
export function NextUp({ links }: { links: { href: string; title: string; body: string }[] }) {
  return (
    <section className="shell py-12 sm:py-14">
      <div className="mb-8 h-px w-full bg-line" />
      <h2 className="font-display text-xl font-extrabold tracking-tight">Keep reading</h2>
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group bg-surface p-6 transition-colors hover:bg-line-soft"
          >
            <p className="flex items-center gap-1.5 font-display text-base font-extrabold tracking-tight">
              {link.title}
              <ArrowUpRight
                size={15}
                strokeWidth={2.4}
                className="text-muted transition-transform group-hover:-translate-y-0.5"
              />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{link.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
