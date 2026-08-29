import type { Metadata } from 'next';
import { pageMeta, jsonLd, breadcrumbs } from '@/lib/seo';
import { Button, Callout, Card, NextUp, PageHeader, Section, Term } from '@/components/ui';
import { LINKS } from '@/lib/program';

export const metadata: Metadata = pageMeta({
  path: '/opt-out',
  title: 'Opting out and back in',
  description:
    'How to leave the StarStore Ambassador Program, what happens to your referral link and balance, and how to rejoin later.',
});

export default function OptOutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Opting out and back in', path: '/opt-out' },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Opting out"
        title="Leaving, and coming back."
        lede="Taking part is voluntary and stays that way. You never have to give a reason, and what you have already earned is still yours."
      />

      <Section title="Two ways to leave">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-display text-lg tracking-tight">In the Telegram bot</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Send <code className="rounded bg-clay/25 px-1.5 py-0.5 font-medium text-ink">/opt_out</code> to the
              StarStore bot and confirm when it asks. This is the faster route and the one we
              recommend.
            </p>
            <div className="mt-6">
              <Button href={LINKS.bot} variant="outline" external>
                Open the bot
              </Button>
            </div>
          </Card>
          <Card>
            <p className="font-display text-lg tracking-tight">By email</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Write to {LINKS.supportAddress} with the subject &quot;Ambassador Opt-Out
              Request&quot;. Include the email on your account and your ambassador ID. We process it
              within 3 to 5 business days and confirm by email.
            </p>
            <div className="mt-6">
              <Button href={LINKS.support} variant="outline" external>
                Email us
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="What happens next">
        <div className="max-w-prose">
          <Term term="Your referral link stops working">
            No new referrals are tracked or credited from the moment the request is processed.
          </Term>
          <Term term="Your balance is paid out">
            Anything you have already earned from genuine referrals is settled on the next payout
            run, to the wallet on your account. Make sure the address is right before you leave.
          </Term>
          <Term term="Your level resets">
            If you rejoin later you start at Standard, unless we agree otherwise.
          </Term>
          <Term term="Your StarStore account is untouched">
            Leaving the ambassador programme does not close your StarStore account. You can carry on
            buying and selling exactly as before. Deleting the account itself is a separate request.
          </Term>
        </div>
      </Section>

      <Section title="When it takes longer">
        <p className="max-w-prose leading-relaxed text-muted">
          We honour every request. Two situations delay the money rather than the departure.
        </p>
        <div className="mt-6 max-w-prose">
          <Term term="A payout run is already under way">
            If you ask during a run, that run finishes first and the opt-out completes straight
            after. You are not skipped.
          </Term>
          <Term term="Your account is under review">
            If we are looking into referrals that appear manipulated, your link is deactivated
            immediately but the balance waits for that review to finish. This keeps the opt-out route
            from being a way to collect on fraud and walk away.
          </Term>
        </div>
      </Section>

      <Section title="Coming back">
        <div className="max-w-prose">
          <Term term="Within 30 days">
            Email {LINKS.supportAddress} and ask to be reinstated. Your history is usually still
            there, and we can often restore the level you held.
          </Term>
          <Term term="After 30 days">
            Apply again through the normal form. It is a fresh start at Standard.
          </Term>
          <Term term="If your place was ended for cause">
            Write to us and say what has changed. We read it, and a return is possible, but it is
            our decision rather than an automatic one.
          </Term>
        </div>

        <div className="mt-8 max-w-prose">
          <Callout title="Changed your mind straight away?">
            An email request can be cancelled within 48 hours by replying to the confirmation with
            &quot;CANCEL OPT-OUT&quot;. A bot opt-out takes effect on confirmation and has no such
            window, so be sure before you confirm there.
          </Callout>
        </div>
      </Section>

      <NextUp
        links={[
          {
            href: '/policies/',
            title: 'Policies',
            body: 'Inactivity, termination and what happens to a balance in each case.',
          },
          {
            href: '/contact/',
            title: 'Contact us',
            body: 'If none of the above matches your situation.',
          },
          {
            href: '/faq/',
            title: 'FAQ',
            body: 'Shorter answers to the questions we are asked most.',
          },
        ]}
      />
    </>
  );
}
