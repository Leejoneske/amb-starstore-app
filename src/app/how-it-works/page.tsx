import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs, selfUrl } from '@/lib/seo';
import { Callout, NextUp, PageHeader, Section, Steps, Term } from '@/components/ui';
import { ACTIVATION_STARS, COMMISSION_RATE, LIFETIME_CAP_USD, MIN_WITHDRAWAL_USD } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/how-it-works',
  title: 'How it works',
  description:
    'From application to first payout: how StarStore ambassador referrals are tracked, when commission starts, and how monthly USDT payouts are sent.',
});

const RATE = Math.round(COMMISSION_RATE * 100);

const STEPS = [
  {
    title: 'Apply',
    body: 'Open the ambassador page in the StarStore app or the Telegram bot. The form asks for an email we can reach you on and a link to at least one place you post. We read every application and reply by email within 1 to 3 business days.',
  },
  {
    title: 'Get approved',
    body: 'Approval brings an email with your referral link, your ambassador ID, and access to the ambassador dashboard inside the app. That dashboard is where your referrals, balance, level and payout history live.',
  },
  {
    title: 'Share your link',
    body: 'Post it wherever your audience already is: a Telegram channel or group, a video description, a thread, a blog post. It is an ordinary Telegram link and opens StarStore directly.',
  },
  {
    title: 'Your referrals trade',
    body: `A referred person activates your commission once they have traded ${ACTIVATION_STARS} Stars in total, or bought Telegram Premium. Before that the referral sits pending and pays nothing.`,
  },
  {
    title: 'Commission accrues',
    body: `From activation onward you earn ${RATE}% of StarStore's margin on every order that person places, up to $${LIFETIME_CAP_USD} from them in total. Buying and Premium credit immediately; selling waits out a 21 day window.`,
  },
  {
    title: 'You are paid',
    body: `On the 1st of each month a payout run settles the month that just ended and sends your balance in USDT on TON to the wallet on your account. Nothing to request. The minimum is ${MIN_WITHDRAWAL_USD.toFixed(2)} USDT and anything below it carries over.`,
  },
];

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to earn as a StarStore ambassador',
  description: 'The StarStore Ambassador Program from application to first monthly payout.',
  url: selfUrl('/how-it-works'),
  totalTime: 'P3D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: STEPS.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.body,
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(HOWTO_SCHEMA)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'How it works', path: '/how-it-works' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="How it works"
        title="One link, and then it runs on its own."
        lede="The whole programme is six steps, and after the third one it is automatic. Here is what happens at each, and what has to be true before money moves."
      />

      <Section>
        <Steps items={STEPS} />
      </Section>

      <Section title="How referrals are tracked">
        <div className="max-w-prose">
          <Term term="A Telegram deep link, not a browser cookie">
            Your link opens the StarStore bot with your ambassador code attached. Telegram passes
            that code through on the first open, so attribution does not depend on the browser the
            person used, whether they cleared their cookies, or how long they took to decide.
          </Term>
          <Term term="Permanent, not a 30 day window">
            Once somebody is attributed to you, they stay attributed. There is no window in which
            they have to buy for you to be credited.
          </Term>
          <Term term="Pending until they trade">
            Being attributed is not the same as earning. The referral shows in your dashboard as
            pending, and turns active once they cross {ACTIVATION_STARS} Stars or buy Premium.
          </Term>
        </div>
      </Section>

      <Section title="What we expect of the content">
        <div className="max-w-prose">
          <Term term="Say what StarStore actually does">
            No exaggerated claims about earnings, prices or what the platform can do. If a post would
            make somebody feel misled once they arrive, it is the wrong post.
          </Term>
          <Term term="Disclose that you earn from it">
            Where the law or the platform requires it, say plainly that you are a StarStore
            ambassador and earn commission on referrals.
          </Term>
          <Term term="No spam, and no referring yourself">
            Unsolicited messages and self-referrals through second accounts both end a place in the
            programme, and the commission from them is reversed.
          </Term>
        </div>

        <div className="mt-8 max-w-prose">
          <Callout title="There is no posting quota">
            Nothing in the platform counts your posts or checks a schedule. Levels are measured on
            referrals in a month, and that is the only number that moves you.
          </Callout>
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/earnings/',
            title: 'Earnings',
            body: 'The rates, the lifetime cap, the holding period and the payout schedule.',
          },
          {
            href: '/apply/',
            title: 'How to apply',
            body: 'What the form asks for and what we look at when we read it.',
          },
          {
            href: '/faq/',
            title: 'FAQ',
            body: 'Approval times, wallets, missed payouts and leaving the programme.',
          },
        ]}
      />
    </>
  );
}
