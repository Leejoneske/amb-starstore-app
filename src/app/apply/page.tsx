import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { Button, Card, NextUp, PageHeader, Section, Steps, Term } from '@/components/ui';
import { LINKS } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/apply',
  title: 'How to apply',
  description:
    'Applying to the StarStore Ambassador Program: what the form asks for, what we look at, and how long a decision takes.',
});

export default function ApplyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'How to apply', path: '/apply' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Apply"
        title="An email, and somewhere you post."
        lede="The application is short on purpose. It is free to apply, and being turned down once does not stop you applying again."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-display text-lg tracking-tight">In the StarStore app</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Open the ambassador screen. It explains the programme and carries the form at the
              bottom.
            </p>
            <div className="mt-6">
              <Button href={LINKS.apply} external>
                Open the application
              </Button>
            </div>
          </Card>
          <Card>
            <p className="font-display text-lg tracking-tight">In the Telegram bot</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The same form, reached through the bot. Either route creates the same application.
            </p>
            <div className="mt-6">
              <Button href={LINKS.bot} variant="outline" external>
                Open the bot
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="What it asks for">
        <div className="max-w-prose">
          <Term term="An email we can reach you on">
            Every decision goes out by email, and so does your referral link if you are approved. Use
            an address you actually read.
          </Term>
          <Term term="A link to at least one place you post">
            Telegram, X, YouTube or Instagram. One is enough, and more is better. Paste the address
            of the profile or channel rather than your username, because a reviewer opens each one.
          </Term>
        </div>
      </Section>

      <Section title="What we look at">
        <div className="max-w-prose">
          <Term term="Whether your audience is a fit">
            People who already use Telegram, and who might plausibly want Stars or Premium.
          </Term>
          <Term term="Whether the engagement is real">
            A small audience that talks back is worth more here than a large one that does not.
          </Term>
          <Term term="How you write about things">
            Ambassadors speak for StarStore in public. We look for somebody who would explain it
            honestly, including the parts that are not exciting.
          </Term>
        </div>
      </Section>

      <Section title="After you send it">
        <Steps
          items={[
            {
              title: 'We confirm it arrived',
              body: 'An email lands straight away so you know the application is in the queue.',
            },
            {
              title: 'A person reads it',
              body: 'Usually within 1 to 3 business days, and up to about 5 when it is busy. Every application is read by a human.',
            },
            {
              title: 'We reply either way',
              body: 'Approval brings your referral link, your ambassador ID and the dashboard. A decline is not permanent, and you are welcome to apply again.',
            },
          ]}
        />
      </Section>

      <NextUp
        links={[
          {
            href: '/how-it-works/',
            title: 'How it works',
            body: 'What happens between approval and your first payout.',
          },
          {
            href: '/earnings/',
            title: 'Earnings',
            body: 'What the programme pays before you decide to apply.',
          },
          {
            href: '/faq/',
            title: 'FAQ',
            body: 'Approval times, following size and the questions around them.',
          },
        ]}
      />
    </>
  );
}
