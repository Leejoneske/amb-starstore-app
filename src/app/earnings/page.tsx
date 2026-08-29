import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { Callout, NextUp, PageHeader, Section, Stat, Term } from '@/components/ui';
import {
  ACTIVATION_STARS,
  COMMISSION_RATE,
  INSTANT_ORDER_TYPES,
  LIFETIME_CAP_USD,
  MIN_WITHDRAWAL_USD,
  RATES,
  SELL_HOLD_DAYS,
} from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/earnings',
  title: 'Earnings',
  description:
    'What a StarStore ambassador earns: 30% of margin on every referred trade, $0.84 per 1,000 Stars, $0.30 per Premium subscription, up to $50 per referral, paid monthly in USDT on TON.',
});

const RATE = Math.round(COMMISSION_RATE * 100);

export default function EarningsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Earnings', path: '/earnings' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Earnings"
        title="What you earn, and when it reaches you."
        lede={`Every ambassador earns the same ${RATE}% of the margin StarStore makes on a referred trade. There is no tier multiplier on money, and no rate to negotiate.`}
      />

      <Section title="The rate">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value={`${RATE}%`} label="Of StarStore's margin" note="On every referred order." />
          <Stat value={RATES[0].amount} label="Per 1,000 Stars" note="Bought or sold." />
          <Stat value={RATES[1].amount} label="Per Premium subscription" note="Any length." />
        </div>
        <p className="mt-6 max-w-prose leading-relaxed text-muted">
          The two figures on the right are the {RATE}% share worked out against what StarStore
          actually makes on those orders. They are what the approval email quotes, and they are what
          the platform pays.
        </p>
      </Section>

      <Section title="How a referral starts earning">
        <div className="max-w-prose">
          <Term term={`${ACTIVATION_STARS} Stars, or one Premium subscription`}>
            A referred person has to trade {ACTIVATION_STARS} Stars in total, buying or selling, or
            buy Telegram Premium. Until then the referral is pending and pays nothing. After that,
            every order they place earns you commission.
          </Term>
          <Term term="Attribution is permanent">
            Your link is a Telegram deep link. Anyone who joins StarStore through it is attributed to
            you for good, not for a window of days. There is no cookie to expire and nothing for the
            reader to keep.
          </Term>
          <Term term={`Up to $${LIFETIME_CAP_USD} from any one person`}>
            Commission accrues for the lifetime of a referral until it reaches ${LIFETIME_CAP_USD},
            at which point that referral is complete and stops accruing. Your other referrals are
            unaffected.
          </Term>
        </div>
      </Section>

      <Section title="When it becomes withdrawable">
        <div className="max-w-prose">
          <Term term={`${INSTANT_ORDER_TYPES.join(' and ')}: straight away`}>
            These orders settle immediately, so their commission is available as soon as it is
            credited.
          </Term>
          <Term term={`Selling Stars: held for ${SELL_HOLD_DAYS} days`}>
            Telegram can reclaim sold Stars for {SELL_HOLD_DAYS} days, which is the same window
            StarStore holds a seller&apos;s own payout for. Commission on a sell order waits out that
            window. If the order reverses in the meantime the commission is cancelled, because it was
            money StarStore never received.
          </Term>
        </div>
      </Section>

      <Section title="Getting paid">
        <div className="max-w-prose">
          <Term term="On the 1st of each month">
            A payout run settles the month that has just ended. You do not request it and there is
            nothing to claim.
          </Term>
          <Term term="To your TON wallet, in USDT">
            Set the address on your ambassador account in the app. We send a reminder on the last day
            of the month if you have a balance and no wallet saved, and again on the 1st, because we
            cannot pay you without one.
          </Term>
          <Term term={`Minimum ${MIN_WITHDRAWAL_USD.toFixed(2)} USDT`}>
            A balance below that carries over to the next run rather than being lost.
          </Term>
          <Term term="USDT on TON is free">
            No fee and no deduction. Other payout methods may be arranged, but their processing fees
            come out of your earnings, so we recommend USDT on TON.
          </Term>
        </div>

        <div className="mt-8 max-w-prose">
          <Callout title="Levels do not change this">
            All five levels earn the same {RATE}%. What a level unlocks is recognition and non-cash
            benefits, free Stars among them, awarded by our team.
          </Callout>
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/levels/',
            title: 'Levels',
            body: 'The five levels, their thresholds, and what each one actually unlocks.',
          },
          {
            href: '/how-it-works/',
            title: 'How it works',
            body: 'From application to first payout, with what happens at each step.',
          },
          {
            href: '/policies/',
            title: 'Policies',
            body: 'Qualifying transactions, clawbacks, inactivity and termination.',
          },
        ]}
      />
    </>
  );
}
