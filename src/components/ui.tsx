import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * The site's whole component vocabulary.
 *
 * Small on purpose. The site this replaced carried forty-odd generated
 * primitives and used six of them, which made every page look like a
 * different product.
 */

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
    <header className="shell pb-2 pt-16 sm:pb-4 sm:pt-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lede}</p>
    </header>
  );
}

export function Section({
  title,
  id,
  children,
  lede,
}: {
  title?: string;
  id?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="shell scroll-mt-24 py-12 sm:py-16">
      {title ? (
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{title}</h2>
      ) : null}
      {lede ? <p className="mt-4 max-w-prose text-muted">{lede}</p> : null}
      <div className={title ? 'mt-8' : undefined}>{children}</div>
    </section>
  );
}

/** Body copy at a readable measure. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose max-w-prose prose-headings:font-display prose-headings:tracking-tight prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-strong:text-ink prose-a:text-accent prose-a:underline-offset-4">
      {children}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}

/** A headline number, for the figures a reader came to find. */
export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <p className="font-display text-3xl tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-sm leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-clay/60 bg-clay/10 p-6">
      <p className="font-display text-lg tracking-tight">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function Button({
  href,
  children,
  variant = 'solid',
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors';
  const styles =
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-ink/85'
      : 'border border-line text-ink hover:border-accent hover:text-accent';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** A numbered walkthrough. */
export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-5 bg-surface p-6 sm:gap-7 sm:p-7">
          <span className="font-display text-2xl leading-none text-clay" aria-hidden>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * A question and its answer, open in the markup.
 *
 * `<details>` rather than a JavaScript accordion, so the answer is in the HTML
 * a crawler receives and is findable by the browser's own page search.
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

/** A definition row, for policy pages. */
export function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <p className="font-medium">{term}</p>
      <div className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** Where a page sends the reader next. */
export function NextUp({ links }: { links: { href: string; title: string; body: string }[] }) {
  return (
    <section className="shell py-12 sm:py-16">
      <div className="rule mb-10" />
      <h2 className="font-display text-2xl tracking-tight">Keep reading</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent"
          >
            <p className="font-medium group-hover:text-accent">{link.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{link.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
