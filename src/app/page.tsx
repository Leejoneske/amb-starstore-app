import type { Metadata } from 'next';
import { ArrowUpRight, BadgePercent, CalendarClock, Link2, Mail, ShieldCheck, Star, Wallet } from 'lucide-react';
import { pageMeta, jsonLd, selfUrl } from '@/lib/seo';
import { Button, Callout, FeatureRow, NextUp, Section, StarStore, StatRow, Steps } from '@/components/ui';
import { Follow } from '@/components/Follow';
import {
  ACTIVATION_STARS,
  COMMISSION_RATE,
  LEVELS,
  LIFETIME_CAP_USD,
  LINKS,
  MIN_WITHDRAWAL_USD,
  RATES,
  SELL_HOLD_DAYS,
} from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/',
  title: 'StarStore Ambassador Program',
  description:
    'The full guide to the StarStore Ambassador Program. Earn 30% of the margin on every trade your referrals make on StarStore, paid in USDT on TON at the start of each month.',
  keywords: ['how to become a StarStore ambassador', 'StarStore referral link', 'Telegram Stars commission'],
});

const RATE = Math.round(COMMISSION_RATE * 100);

const PROGRAM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'StarStore Ambassador Program',
  url: selfUrl('/'),
  description:
    'The reference guide to the StarStore Ambassador Program: what it pays, how referrals are tracked, and how monthly payouts work.',
  about: {
    '@type': 'Service',
    name: 'StarStore Ambassador Program',
    serviceType: 'Referral programme',
    provider: {
      '@type': 'Organization',
      name: 'StarStore',
      url: 'https://starstore.app',
      description:
        'A Telegram Mini App for buying, selling and trading Telegram Stars, and for buying Telegram Premium, settling in USDT on TON.',
    },
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: 'Creators, community leaders and Telegram channel owners',
    },
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

      <header className="shell border-b border-line pb-12 pt-14 sm:pb-14 sm:pt-20">
        <p className="eyebrow mb-5">Ambassador programme</p>
        <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          Share your link, and earn a share of every trade it brings in
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          This is the full guide to how the programme works. It is free to join, the rate is the
          same for everybody, and payouts run on their own at the start of each month. Nothing here
          is a projection. Every figure is what the platform actually pays.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={LINKS.apply} external>
            Apply in Telegram
          </Button>
          <Button href="/how-it-works/" variant="outline">
            Read how it works
          </Button>
        </div>
      </header>

      <Section title="What this is, in plain terms">
        <div className="max-w-prose space-y-4 leading-relaxed text-muted">
          <p>
            <StarStore /> is a Telegram Mini App where people buy and sell Telegram Stars, and buy
            Telegram Premium. Stars are the currency Telegram uses inside its own apps, for tipping
            creators, unlocking content and boosting channels. Selling them converts them to USDT on
            the TON network, and buying them works the other way round.
          </p>
          <p>
            An ambassador is somebody who brings other people to it. You get a referral link of your
            own, you post it where your audience already is, and when somebody joins through it they
            are attributed to you permanently. From then on you earn a share of what StarStore makes
            on everything they trade.
          </p>
          <p>
            That is the whole arrangement. There is nothing to buy, no stock to hold, no target to
            hit before you are paid, and no cost to taking part. What it asks of you is honest
            posting, which the{' '}
            <a href="/policies/" className="underline decoration-line underline-offset-4 hover:decoration-ink">
              policies page
            </a>{' '}
            sets out in full.
          </p>
        </div>
      </Section>

      <Section title="The figures, up front">
        <StatRow
          items={[
            {
              value: `${RATE}%`,
              label: "Of StarStore's margin",
              note: 'On every order a referred person places. The same at every level.',
            },
            {
              value: RATES[0].amount,
              label: 'Per 1,000 Stars traded',
              note: `Whether they are buying or selling. Premium pays ${RATES[1].amount}.`,
            },
            {
              value: `$${LIFETIME_CAP_USD}`,
              label: 'Cap per referred person',
              note: 'Commission accrues to that, then that referral is complete.',
            },
            {
              value: MIN_WITHDRAWAL_USD.toFixed(2),
              label: 'USDT minimum payout',
              note: 'Anything smaller carries over rather than being lost.',
            },
          ]}
        />
        <p className="mt-6 max-w-prose leading-relaxed text-muted">
          A worked example, because percentages of a margin are hard to picture. Somebody you
          referred sells 5,000 Stars and buys three months of Premium. The Stars earn you {RATES[0].amount}{' '}
          per thousand, so $4.20, and the Premium earns you {RATES[1].amount}. The Premium part is
          withdrawable immediately. The Stars part waits {SELL_HOLD_DAYS} days, because a sale can
          still be reversed inside that window. Both are paid out on the 1st.
        </p>
      </Section>

      <Section
        title="What you are actually agreeing to"
        lede="Worth reading before you apply. A few of these surprise people, and all of them are easier to know now than to discover later."
      >
        <FeatureRow
          items={[
            {
              icon: BadgePercent,
              title: 'A share of margin, not of the sale',
              body: `You earn ${RATE}% of what StarStore makes on a referred order, not ${RATE}% of what the customer paid. In practice that is ${RATES[0].amount} per 1,000 Stars and ${RATES[1].amount} per Premium subscription.`,
            },
            {
              icon: Link2,
              title: 'Attribution does not expire',
              body: 'Your link is a Telegram deep link, so somebody who joins through it stays attributed to you. There is no tracking cookie and no window they have to buy inside.',
            },
            {
              icon: Star,
              title: 'They have to trade before you earn',
              body: `Being attributed is not the same as earning. A referral sits pending until that person has traded ${ACTIVATION_STARS} Stars in total, or bought Telegram Premium.`,
            },
            {
              icon: CalendarClock,
              title: `Sell commission waits ${SELL_HOLD_DAYS} days`,
              body: 'Telegram can reclaim sold Stars within that window, so commission on a sell order is held until it closes. Buying and Premium commission is available straight away.',
            },
            {
              icon: Wallet,
              title: 'You need a wallet saved',
              body: 'Payouts go to the TON wallet on your ambassador account. If a balance is waiting and no address is saved, we remind you before the run and again on the day.',
            },
            {
              icon: ShieldCheck,
              title: 'Levels are recognition, not a better rate',
              body: `Every level earns the same ${RATE}%. What a level unlocks is free Stars and other non-cash benefits, awarded by our team rather than calculated by the platform.`,
            },
          ]}
        />
      </Section>

      <Section
        title="How it runs"
        lede="Six steps. After the third one, tracking, commission and payout all happen without you touching anything."
      >
        <Steps
          items={[
            {
              title: 'Apply',
              body: 'Open the ambassador screen in the StarStore Mini App. It asks for an email we can reach you on and a link to at least one place you post. We read every application and reply within 1 to 3 business days.',
            },
            {
              title: 'Get your link',
              body: 'Approval brings an email with a referral link of your own, an ambassador ID to quote if you ever contact us, and access to the dashboard inside the app.',
            },
            {
              title: 'Share it',
              body: 'Post it where your audience already is. A channel, a group, a video description, a thread. It opens StarStore directly in Telegram, so nobody has to install anything.',
            },
            {
              title: 'They activate',
              body: `Your commission starts once a referred person has traded ${ACTIVATION_STARS} Stars in total, or bought Telegram Premium. Before that the referral shows as pending.`,
            },
            {
              title: 'Commission builds up',
              body: `Every order they place after that adds to your balance, not just their first, up to $${LIFETIME_CAP_USD} from that one person. Then that referral is complete and the others carry on.`,
            },
            {
              title: 'You are paid',
              body: 'On the 1st, in USDT on TON, to the wallet on your account. There is no withdrawal to request and no form to submit.',
            },
          ]}
        />
      </Section>

      <Section
        title="Levels"
        lede="Measured on referrals in a month and awarded by our team. They change what you get, never what you earn."
      >
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <caption className="sr-only">
              StarStore ambassador levels, their monthly referral thresholds and their benefits
            </caption>
            <thead>
              <tr className="border-b border-line text-left">
                <th scope="col" className="px-6 py-4 font-semibold">
                  Level
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Referrals a month
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  What it unlocks
                </th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((level) => (
                <tr key={level.key} className="border-b border-line-soft align-top last:border-0">
                  <th scope="row" className="px-6 py-4 text-left font-display font-extrabold">
                    {level.name}
                  </th>
                  <td className="px-6 py-4 text-muted">
                    {level.referrals === 0 ? 'Where you start' : level.referrals}
                  </td>
                  <td className="px-6 py-4 text-muted">{level.benefits.join(', ')}</td>
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

      <Section title="Where your own figures are confirmed">
        <div className="max-w-prose">
          <Callout title="The approval email is the record">
            When an application is approved, <StarStore /> emails you the rates in writing: the{' '}
            {RATE}% share, what it works out to per 1,000 Stars and per Premium subscription, the $
            {LIFETIME_CAP_USD} lifetime cap, the {SELL_HOLD_DAYS} day hold on sell commission, and
            the {MIN_WITHDRAWAL_USD.toFixed(2)} USDT minimum. That email also carries your referral
            link and your ambassador ID. Keep it. Every number on this site is the same number that
            email sends, and if the two ever disagree, tell us and we will fix whichever one is
            wrong.
          </Callout>
          <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
            <Mail size={17} strokeWidth={1.7} className="mt-0.5 shrink-0" />
            <span>
              Lost it? Write to{' '}
              <a
                href={LINKS.support}
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {LINKS.supportAddress}
              </a>{' '}
              from the address on your account and we will send it again.
            </span>
          </p>
        </div>
      </Section>

      <Section title="Where else to look">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            {
              href: LINKS.bot,
              label: 'The StarStore Mini App',
              body: 'Where you apply, where your dashboard lives, and where you set the wallet a payout is sent to. Most of what an ambassador does happens in here.',
            },
            {
              href: LINKS.blog,
              label: 'blog.starstore.app',
              body: 'The StarStore blog. How the Stars market moves, what changes in the programme, and what is shipping in the app. This site stays the reference; the blog is where things get explained at length.',
            },
            {
              href: LINKS.app,
              label: 'starstore.app',
              body: 'The same app in a browser, for buying and selling Stars outside Telegram, and for reading the policies that cover every customer rather than only ambassadors.',
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface p-6 transition-colors hover:bg-line-soft"
            >
              <p className="flex items-center gap-1.5 font-display text-base font-extrabold tracking-tight">
                {item.label}
                <ArrowUpRight size={15} strokeWidth={2.4} className="text-muted" />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </a>
          ))}
        </div>
      </Section>

      <Follow />

      <NextUp
        links={[
          {
            href: '/earnings/',
            title: 'Earnings in full',
            body: 'The rates, the cap, the holding period and the payout schedule, with what each one is for.',
          },
          {
            href: '/policies/',
            title: 'Programme policies',
            body: 'What is expected of an ambassador, and what happens when it is not met.',
          },
          {
            href: '/apply/',
            title: 'How to apply',
            body: 'What the form asks for, and what we look at when we read it.',
          },
        ]}
      />
    </>
  );
}
