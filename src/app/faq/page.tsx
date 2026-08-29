import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { NextUp, PageHeader, Question, Section } from '@/components/ui';
import {
  ACTIVATION_STARS,
  COMMISSION_RATE,
  LIFETIME_CAP_USD,
  LINKS,
  MIN_WITHDRAWAL_USD,
  SELL_HOLD_DAYS,
} from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/faq',
  title: 'Frequently asked questions',
  description:
    'Answers about StarStore ambassador approval times, commission rates, when referrals start earning, monthly USDT payouts, levels and leaving the programme.',
});

const RATE = Math.round(COMMISSION_RATE * 100);

/**
 * Plain strings, so the same words go into the page and into the FAQPage
 * structured data. Writing them twice is how the two drift apart.
 */
const FAQS = [
  {
    q: 'How long does approval take?',
    a: 'Most applications are read within 1 to 3 business days. Busy periods can stretch that to about 5. You get an email either way.',
  },
  {
    q: 'Do I need a large following?',
    a: 'No. We look at whether your audience is engaged and whether the fit is real, not at the follower count. Plenty of ambassadors started with a few hundred followers.',
  },
  {
    q: 'What does it actually pay?',
    a: `${RATE}% of the margin StarStore makes on every trade your referrals place. That works out to about $0.84 per 1,000 Stars they buy or sell, and $0.30 per Telegram Premium subscription.`,
  },
  {
    q: 'Does a higher level pay a better rate?',
    a: 'No. Every ambassador earns the same 30%, at every level. A level unlocks recognition and non-cash benefits such as free Stars, awarded by our team.',
  },
  {
    q: 'When does a referral start earning me anything?',
    a: `Once that person has traded ${ACTIVATION_STARS} Stars in total, buying or selling, or bought Telegram Premium. Until then the referral is pending and pays nothing.`,
  },
  {
    q: 'How long does attribution last?',
    a: 'Permanently. Your link is a Telegram deep link, so somebody who joins through it stays attributed to you. There is no cookie and no expiry window.',
  },
  {
    q: 'Is there a limit on what one referral can earn me?',
    a: `Yes. Commission from any one person accrues up to $${LIFETIME_CAP_USD}, at which point that referral is complete. Your other referrals carry on unaffected.`,
  },
  {
    q: 'Why is some of my balance not withdrawable yet?',
    a: `Commission on a sell order is held for ${SELL_HOLD_DAYS} days, because Telegram can reclaim sold Stars within that window. Buying and Premium commission is available immediately.`,
  },
  {
    q: 'How and when am I paid?',
    a: `Automatically, on the 1st of each month, in USDT on the TON network, to the wallet address on your ambassador account. You do not request it. The minimum is ${MIN_WITHDRAWAL_USD.toFixed(2)} USDT and a smaller balance carries over.`,
  },
  {
    q: 'What if I have no wallet address saved?',
    a: 'We cannot pay you, so we send a reminder on the last day of the month and again on the 1st. Add the address and you are included in that run or the next one. Nothing is lost in the meantime.',
  },
  {
    q: 'Are there fees on the payout?',
    a: 'Not on USDT over TON, which is the default and what we recommend. Any other method we arrange carries its own processing fees, deducted from your earnings.',
  },
  {
    q: 'What if I have a quiet month?',
    a: 'Nothing happens. One month below your level threshold does not demote you. A sustained drop may bring your level in line with your activity, and we tell you before it does.',
  },
  {
    q: 'Can I refer myself?',
    a: 'No. Self-referrals through a second account end your place in the programme and the commission is reversed.',
  },
  {
    q: 'How do I leave?',
    a: `Send /opt_out to the StarStore bot, or email ${LINKS.supportAddress} with the subject "Ambassador Opt-Out Request". What you have earned from genuine referrals is still paid.`,
  },
  {
    q: 'Does leaving close my StarStore account?',
    a: 'No. You keep the account and can carry on buying and selling as an ordinary customer.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(FAQ_SCHEMA)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Frequently asked questions', path: '/faq' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="FAQ"
        title="Questions we are asked most."
        lede="If yours is not here, the contact form reaches the team directly."
      />

      <Section>
        <div className="max-w-3xl">
          {FAQS.map((item) => (
            <Question key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/earnings/',
            title: 'Earnings',
            body: 'The same answers about money, in full and in order.',
          },
          {
            href: '/policies/',
            title: 'Policies',
            body: 'Conduct, clawbacks, inactivity and termination.',
          },
          {
            href: '/contact/',
            title: 'Contact us',
            body: 'For anything specific to your account.',
          },
        ]}
      />
    </>
  );
}
