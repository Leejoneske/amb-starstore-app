import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { PageHeader, Section } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';
import { LINKS } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/contact',
  title: 'Contact us',
  description:
    'Reach the StarStore ambassador team about an application, a payout, your level, or leaving the programme.',
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Contact us', path: '/contact' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Contact"
        title="Talk to the team."
        lede="Applications, payouts, levels, or anything the other pages did not answer. A person reads every message."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                By email
              </p>
              <a
                href={LINKS.support}
                className="mt-3 block font-medium underline underline-offset-4 hover:text-muted"
              >
                {LINKS.supportAddress}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                On Telegram
              </p>
              <a
                href={LINKS.bot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-medium underline underline-offset-4 hover:text-muted"
              >
                The StarStore bot
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fastest for anything about your own account, since it already knows who you are.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Response time
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Usually within two business days. Application decisions take 1 to 3.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
