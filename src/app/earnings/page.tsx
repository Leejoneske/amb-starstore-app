import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { Callout, NextUp, PageHeader, Section, StatRow, Term } from '@/components/ui';
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

/** Where commission goes between an order and your wallet. */
const TIMELINE = [
  {
    when: 'Day 0',
    title: 'They place an order',
    body: 'Somebody who joined through your link buys Stars, sells Stars, or buys Telegram Premium.',
    live: true,
  },
  {
    when: 'Day 0',
    title: 'Buying and Premium credit',
    body: 'These orders settle immediately, so their commission is withdrawable as soon as it is credited to you.',
    live: true,
  },
  {
    when: `Day ${SELL_HOLD_DAYS}`,
    title: 'Selling releases',
    body: `Telegram can reclaim sold Stars for ${SELL_HOLD_DAYS} days. If the order reverses inside that window the commission is cancelled, because it was money we never received.`,
    live: false,
  },
  {
    when: 'The 1st',
    title: 'You are paid',
    body: 'A payout run settles the month that has just ended and sends your balance to your TON wallet. There is nothing to request.',
    live: false,
  },
];

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
        title="What you earn, and when it reaches you"
        lede={`Every ambassador earns the same ${RATE}% of the margin StarStore makes on a referred trade. There is no tier multiplier on money and no rate to negotiate, so this page is the whole picture.`}
      />

      <Section title="The rate">
        <StatRow
          items={[
            {
              value: `${RATE}%`,
              label: "Of StarStore's margin",
              note: 'Not of what the customer paid. This is the share of what we make on the order.',
            },
            {
              value: RATES[0].amount,
              label: 'Per 1,000 Stars',
              note: 'Bought or sold, either way.',
            },
            {
              value: RATES[1].amount,
              label: 'Per Premium subscription',
              note: 'Any length of subscription.',
            },
            {
              value: `$${LIFETIME_CAP_USD}`,
              label: 'Cap per referred person',
              note: 'Then that referral is complete and stops accruing.',
            },
          ]}
        />
        <p className="mt-6 max-w-prose leading-relaxed text-muted">
          The two middle figures are that {RATE}% worked out against what StarStore actually makes on
          those orders. They are the numbers quoted in the approval email, so if you have already
          been approved you have seen them before.
        </p>
      </Section>

      <Section
        title="From their order to your wallet"
        lede="Two paths, depending on what the referred person did. Both finish at the same monthly payout run."
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((step) => (
            <li key={step.title} className="bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full ${step.live ? 'bg-ink' : 'bg-line'}`}
                />
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.1em] text-muted">
                  {step.when}
                </span>
              </div>
              <p className="mt-4 font-display text-base font-extrabold tracking-tight">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="How a referral starts earning">
        <div className="max-w-prose">
          <Term term={`${ACTIVATION_STARS} Stars, or one Premium subscription`}>
            A referred person has to trade {ACTIVATION_STARS} Stars in total, buying or selling, or
            buy Telegram Premium. Until then the referral sits pending in your dashboard and pays
            nothing. After that, every order they place earns you commission.
          </Term>
          <Term term="Attribution is permanent">
            Your link is a Telegram deep link, so anyone who joins StarStore through it is attributed
            to you for good. There is no cookie to expire, no 30 day window, and nothing the person
            has to keep hold of.
          </Term>
          <Term term="It accrues for the life of the referral">
            Not once at signup. Every order that person places afterwards adds to your balance, until
            the total from them reaches ${LIFETIME_CAP_USD}. Your other referrals carry on untouched.
          </Term>
          <Term term="Qualifying orders only">
            A refunded, reversed or fraudulent order earns nothing, and commission already credited
            for one is reversed.
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
            This is the same window we hold a seller&apos;s own payout for, and for the same reason.
            Telegram can reclaim sold Stars during it. Paying commission on a sale that later
            reverses would mean paying out money StarStore never received.
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
            Set the address on your ambassador account in the app. If a balance is waiting and no
            wallet is saved, we send a reminder on the last day of the month and again on the 1st,
            because we cannot pay you without one.
          </Term>
          <Term term="The address can be corrected">
            Change it in the app at any time before a run. Payouts go to whatever address is on the
            account when the run happens.
          </Term>
          <Term term={`Minimum ${MIN_WITHDRAWAL_USD.toFixed(2)} USDT`}>
            A balance below that carries over to the next run rather than being lost.
          </Term>
          <Term term="USDT on TON costs nothing">
            No fee and no deduction. Other payout methods can sometimes be arranged, but their
            processing fees come out of your earnings, so we recommend staying with USDT on TON.
          </Term>
        </div>

        <div className="mt-8 max-w-prose">
          <Callout title="Levels do not change any of this">
            All five levels earn the same {RATE}%. What a level unlocks is recognition and non-cash
            benefits, free Stars among them, awarded by our team. If anything anywhere suggests a
            level pays a better rate, this page is the one that is right.
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
