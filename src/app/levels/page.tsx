import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { Callout, Card, NextUp, PageHeader, Section, Term } from '@/components/ui';
import { COMMISSION_RATE, LEVELS } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/levels',
  title: 'Levels',
  description:
    'The five StarStore ambassador levels: Standard, Explorer, Connector, Pioneer and Elite. What each threshold is, and what it unlocks.',
});

const RATE = Math.round(COMMISSION_RATE * 100);

export default function LevelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Levels', path: '/levels' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Levels"
        title="Recognition, not a rate."
        lede={`Five levels, measured on referrals in a month. Every one of them earns the same ${RATE}%. What a level changes is what we give you on top of the money.`}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((level) => (
            <Card key={level.key}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-xl tracking-tight">{level.name}</p>
                <p className="text-sm text-muted">
                  {level.referrals === 0 ? 'Start' : `${level.referrals} a month`}
                </p>
              </div>
              <div className="my-5 h-px w-full bg-line" />
              <ul className="space-y-2.5 text-sm text-muted">
                {level.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2.5">
                    <span aria-hidden className="text-clay">
                      &bull;
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="How levels actually work">
        <div className="max-w-prose">
          <Term term="Measured on referrals in a month">
            The threshold is the number of people you referred who became active that month. Nothing
            counts posts, transaction sizes, or community events.
          </Term>
          <Term term="Awarded by us, not computed by the platform">
            A level and its benefits are reviewed and granted by our team. The app shows the level
            you currently hold; it does not promote you on its own the moment you cross a number, so
            a change is not instant.
          </Term>
          <Term term="A quiet month does not demote you">
            Falling short once does not move you down. If it becomes the pattern over consecutive
            months we may match your level to your activity, and we will tell you before we do.
          </Term>
          <Term term="Free Stars are monthly">
            The Star allowance at each level is granted per month while you hold that level.
          </Term>
        </div>

        <div className="mt-8 max-w-prose">
          <Callout title="Your rate never changes">
            A Standard ambassador and an Elite ambassador earn exactly the same {RATE}% on the same
            trade. If anything anywhere suggests a level pays a better rate, this page is correct and
            that is not.
          </Callout>
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/earnings/',
            title: 'Earnings',
            body: 'What the rate works out to, and when the money becomes withdrawable.',
          },
          {
            href: '/policies/',
            title: 'Policies',
            body: 'Inactivity, termination and what happens to a balance in either case.',
          },
          {
            href: '/contact/',
            title: 'Contact us',
            body: 'Questions about your level or benefits go straight to the team.',
          },
        ]}
      />
    </>
  );
}
