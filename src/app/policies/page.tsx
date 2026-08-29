import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { NextUp, PageHeader, Section, Term } from '@/components/ui';
import { COMMISSION_RATE, LIFETIME_CAP_USD, LINKS, SELL_HOLD_DAYS } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/policies',
  title: 'Programme policies',
  description:
    'The rules of the StarStore Ambassador Program: code of conduct, qualifying commission, payouts, inactivity, termination and data handling.',
});

const RATE = Math.round(COMMISSION_RATE * 100);

export default function PoliciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Programme policies', path: '/policies' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Policies"
        title="The rules, in the order they are likely to matter."
        lede="Taking part means agreeing to these. Most of them exist to protect the people who arrive through your link, which is the same thing as protecting your standing with them."
      />

      <Section title="Code of conduct" id="conduct">
        <div className="max-w-prose">
          <Term term="Be accurate">
            Never overstate what StarStore does, what it costs, or what somebody can earn. Do not
            present a projection as a promise.
          </Term>
          <Term term="Disclose the relationship">
            Where the law or a platform&apos;s rules require it, say that you are a StarStore
            ambassador and earn commission on referrals.
          </Term>
          <Term term="Respect your audience">
            No unsolicited messages, no misleading thumbnails or headlines, no pressure. A referral
            that arrives annoyed is worth less to you than no referral.
          </Term>
          <Term term="No self-referrals">
            Referring yourself through a second account, or coordinating accounts to inflate a count,
            ends your place in the programme and reverses the commission.
          </Term>
          <Term term="Use the official brand assets">
            Our logo and marketing material only, and nothing designed to look like an official
            StarStore announcement when it is not.
          </Term>
        </div>
      </Section>

      <Section title="Commission" id="commission">
        <div className="max-w-prose">
          <Term term="Qualifying orders only">
            Commission is earned on completed orders placed by genuine referred users. A refunded,
            reversed or fraudulent order earns nothing, and commission already credited for one is
            reversed.
          </Term>
          <Term term={`${RATE}% of margin, the same for everyone`}>
            There is no negotiated rate and no tier multiplier. If a rate ever changes we will tell
            ambassadors by email before it takes effect, and anything already earned is honoured at
            the rate it was earned under.
          </Term>
          <Term term={`A $${LIFETIME_CAP_USD} lifetime cap per referral`}>
            Once one referred person has earned you ${LIFETIME_CAP_USD} in total, that referral is
            complete and stops accruing.
          </Term>
          <Term term={`Sell commission is held ${SELL_HOLD_DAYS} days`}>
            Matching the window in which sold Stars can be reclaimed. Commission on an order that
            reverses inside that window is cancelled.
          </Term>
        </div>
      </Section>

      <Section title="Payouts" id="payouts">
        <div className="max-w-prose">
          <Term term="Automatic, on the 1st">
            Every payout run settles the month that has just ended. Ambassadors do not submit
            withdrawal requests.
          </Term>
          <Term term="You must have a wallet saved">
            We cannot send a payout without a TON wallet address on your account. We remind you on
            the last day of the month and again on the 1st if you have a balance and no address.
          </Term>
          <Term term="A wallet address can be corrected">
            Change it in the app at any time before a run. Payouts go to whatever address is on the
            account when the run happens.
          </Term>
          <Term term="Alternative methods carry their own fees">
            USDT on TON is free. If we arrange another method for you, its processing costs come out
            of your earnings.
          </Term>
        </div>
      </Section>

      <Section title="Inactivity" id="inactivity">
        <div className="max-w-prose">
          <Term term="An account goes quiet after 60 days">
            No new referrals, no posting and no sign-in for 60 consecutive days marks an account
            inactive, and we email you about it.
          </Term>
          <Term term="Suspension comes after a warning">
            If nothing changes within 30 days of that email, the account may be suspended. A
            suspended account keeps its earned balance.
          </Term>
          <Term term="Coming back">
            Write to us at {LINKS.supportAddress} and we will reinstate the account. Depending on how
            long it has been, you may resume at Standard.
          </Term>
        </div>
      </Section>

      <Section title="Ending a place in the programme" id="termination">
        <div className="max-w-prose">
          <Term term="What ends it">
            Breaking the code of conduct, manipulating the referral system, using StarStore for
            anything illegal, or conduct that damages the StarStore name.
          </Term>
          <Term term="What happens to the balance">
            Commission earned from genuine referrals is still paid. Commission traced to fraudulent
            or manipulated activity is reversed and not paid.
          </Term>
          <Term term="If we end it without cause">
            Everything outstanding is paid within 30 days.
          </Term>
          <Term term="Disagreeing with a decision">
            Reply to the email you received, or write to {LINKS.supportAddress}. A person reads it.
          </Term>
        </div>
      </Section>

      <Section title="Your data" id="data">
        <div className="max-w-prose">
          <Term term="What we hold">
            Your email, the social links you gave us, your referral statistics and your payout
            details. That is what the programme needs to run.
          </Term>
          <Term term="What we do not do">
            We do not sell it. Referral data is used to calculate commission and review levels, and
            for nothing else.
          </Term>
          <Term term="Getting it out, or deleted">
            Ask at {LINKS.supportAddress} and we will export or delete it, subject to the records we
            are required to keep for accounting.
          </Term>
        </div>
      </Section>

      <Section title="Changes to these policies" id="changes">
        <div className="max-w-prose">
          <Term term="Notice before they take effect">
            Anything material, including a change to rates or thresholds, is emailed to ambassadors
            at least 14 days beforehand.
          </Term>
          <Term term="If you disagree">
            You can leave at any time and keep what you have earned. The opt-out guide explains how.
          </Term>
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/opt-out/',
            title: 'Opting out',
            body: 'How to leave, what happens to your balance, and how to come back.',
          },
          {
            href: '/earnings/',
            title: 'Earnings',
            body: 'The rates and the payout schedule these policies refer to.',
          },
          {
            href: '/contact/',
            title: 'Contact us',
            body: 'Anything here that does not answer your situation.',
          },
        ]}
      />
    </>
  );
}
