import Image from 'next/image';
import type { Metadata } from 'next';
import { pageMeta, jsonLd, selfUrl } from '@/lib/seo';
import { Button, Card, NextUp, Section, Stat } from '@/components/ui';
import { Newsletter } from '@/components/Newsletter';
import { COMMISSION_RATE, LEVELS, LINKS, MIN_WITHDRAWAL_USD, RATES } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/',
  title: 'StarStore Ambassador Program',
  description:
    'Earn 30% of the margin on every trade your referrals make on StarStore. Paid in USDT on TON at the start of each month, with no minimum beyond 0.50 USDT.',
});

/**
 * The programme, described once, for somebody who has not heard of it.
 *
 * Structured data for the offer itself, so a search result can carry what it
 * pays rather than only what it is called.
 */
const PROGRAM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'StarStore Ambassador Program',
  url: selfUrl('/'),
  description:
    'A referral programme for creators and community leaders promoting Telegram Stars and Premium subscriptions on StarStore.',
  primaryImageOfPage: { '@type': 'ImageObject', url: `${selfUrl('/')}og-image.png` },
  about: {
    '@type': 'Service',
    name: 'StarStore Ambassador Program',
    serviceType: 'Referral programme',
    provider: { '@type': 'Organization', name: 'StarStore', url: 'https://starstore.app' },
    areaServed: 'Worldwide',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to join. Ambassadors earn 30% of StarStore margin on referred trades.',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(PROGRAM_SCHEMA)} />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgb(var(--clay)/0.28),transparent)]"
        />
        <div className="shell relative pb-16 pt-20 sm:pb-24 sm:pt-28">
          <Image
            src="/favicon.png"
            alt=""
            width={64}
            height={64}
            className="mb-8 rounded-2xl"
            priority
          />
          <h1 className="max-w-4xl font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Get paid for the people you bring to StarStore.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Share one link. Earn {Math.round(COMMISSION_RATE * 100)}% of what StarStore makes on
            every trade your referrals place, for as long as they keep trading. Paid in USDT on TON,
            automatically, on the 1st of each month.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={LINKS.apply} external>
              Apply to the programme
            </Button>
            <Button href="/how-it-works/" variant="outline">
              See how it works
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Free to join. No upfront cost, no inventory, no quota to hit before you are paid.
          </p>
        </div>
      </section>

      <Section title="What it pays">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            value={`${Math.round(COMMISSION_RATE * 100)}%`}
            label="Of StarStore's margin"
            note="The same rate for every ambassador. Levels do not change it."
          />
          <Stat
            value={RATES[0].amount}
            label="Per 1,000 Stars traded"
            note="Whether your referral is buying or selling."
          />
          <Stat
            value={RATES[1].amount}
            label="Per Premium subscription"
            note="Credited as soon as the order settles."
          />
        </div>
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted">
          Commission accrues for the lifetime of each referral rather than once at signup, and the
          minimum payout is {MIN_WITHDRAWAL_USD.toFixed(2)} USDT.{' '}
          <a href="/earnings/" className="text-accent underline underline-offset-4">
            The full earnings breakdown
          </a>{' '}
          covers the cap, the holding period and how a referral starts counting.
        </p>
      </Section>

      <Section title="How it works" lede="Five steps, and only the third one is work.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Apply',
              body: 'Give us an email and a link to somewhere you post. We read every application and reply within 1 to 3 business days.',
            },
            {
              title: 'Get your link',
              body: 'Approval brings a referral link of your own. Anyone who joins StarStore through it is attributed to you permanently.',
            },
            {
              title: 'Share it',
              body: 'Post it wherever your audience already is. A channel, a video description, a group, a thread.',
            },
            {
              title: 'They trade',
              body: 'Your commission starts once a referred person has traded 200 Stars or bought Premium.',
            },
            {
              title: 'You earn',
              body: 'Every order they place after that adds to your balance, up to $50 from any one person.',
            },
            {
              title: 'You get paid',
              body: 'On the 1st, in USDT on TON, to the wallet on your ambassador account. No request needed.',
            },
          ].map((step, index) => (
            <Card key={step.title}>
              <span className="font-display text-2xl text-clay" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 font-medium">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Levels"
        lede="Five of them, measured on referrals in a month. A level is recognition and non-cash benefits. It never changes your rate."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-3 pr-4 font-medium">Level</th>
                <th className="py-3 pr-4 font-medium">Referrals a month</th>
                <th className="py-3 font-medium">What it unlocks</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((level) => (
                <tr key={level.key} className="border-b border-line align-top">
                  <td className="py-4 pr-4 font-medium">{level.name}</td>
                  <td className="py-4 pr-4 text-muted">
                    {level.referrals === 0 ? 'Where you start' : level.referrals}
                  </td>
                  <td className="py-4 text-muted">{level.benefits.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Button href="/levels/" variant="outline">
            More about levels
          </Button>
        </div>
      </Section>

      <Section title="Who this is for">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Creators',
              body: 'On YouTube, TikTok, Instagram or X, whose audience already spends inside Telegram.',
            },
            {
              title: 'Community leaders',
              body: 'Running a Telegram channel or group where Stars and Premium come up on their own.',
            },
            {
              title: 'Everyday users',
              body: 'Who use StarStore already and get asked how it works. Follower count is not the bar.',
            },
          ].map((who) => (
            <Card key={who.title}>
              <p className="font-medium">{who.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{who.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Newsletter />

      <NextUp
        links={[
          {
            href: '/earnings/',
            title: 'Earnings in full',
            body: 'The rates, the lifetime cap, the 21 day hold on sell orders and the payout schedule.',
          },
          {
            href: '/policies/',
            title: 'Programme policies',
            body: 'What is expected of an ambassador, and what happens when it is not met.',
          },
          {
            href: '/apply/',
            title: 'How to apply',
            body: 'What the application asks for and what we look at when we read it.',
          },
        ]}
      />
    </>
  );
}
