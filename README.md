# StarStore Ambassador Program

The public guide to the StarStore Ambassador Program, at
[amb.starstore.app](https://amb.starstore.app). It is the site the StarStore
app links to from its own ambassador screen, so it has to explain the whole
programme to somebody who has never heard of it, and it has to be findable by
somebody searching for it.

## Why this is Next.js

It replaced a Vite single-page app. That app rendered in the browser and its
host rewrote every path to one `index.html`, so a crawler asking for
`/levels/` was handed an empty shell and a script bundle. Nothing below the
homepage could be indexed, and the homepage itself was indexed on markup that
did not contain any of its own words.

This is a Next.js static export. Every route is a real HTML file with its own
title, description, canonical, Open Graph tags and structured data, and all of
the prose is in the markup before any JavaScript runs.

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run typecheck
```

`out/` is the whole site. Any static host serves it; there is no server.

## Structure

```
src/
  app/                 one directory per route, each with its own metadata
    layout.tsx         chrome, fonts, theme, site-wide structured data
    sitemap.ts         the route list, by hand
    robots.ts
  components/
    ui.tsx             the site's entire component vocabulary
    Nav, Footer, ThemeToggle
    Newsletter, ContactForm    the two Supabase-backed forms
  lib/
    program.ts         every published figure, in one place
    seo.ts             pageMeta, canonicals, JSON-LD helpers
    supabase.ts
```

### `lib/program.ts` is the only place a rate is written

The site this replaced kept its numbers in prose, and most of them had drifted
away from what StarStore actually pays. It advertised a 10% to 20% share of
transaction value against a system paying 30% of margin, described a 30 day
tracking cookie against a system that attributes by Telegram deep link
permanently, and promised automatic level promotion that nothing performs.

A published rate is a promise somebody has already been sent by email, so every
figure now lives in `lib/program.ts` and each one names the file in the
[StarStore repository](https://github.com/Leejoneske/Tg-Star-Store) it comes
from:

| Figure | Source |
| --- | --- |
| 30% of margin, $50 lifetime cap, 21 day sell hold | `services/referrals/commission.js` |
| 200 Stars to activate a referral | `services/referrals/activation.js` |
| Payout on the 1st, 0.50 USDT minimum | `services/ambassador-payouts/` |
| Level thresholds and benefits | `services/email-service.js`, the approval email |

When one changes there, change it here and nowhere else.

One trap for anyone reading the StarStore source alongside this:
`services/ambassador-payouts/earnings.js` holds a tiered table of per-referral
rates. That is the **previous** programme, frozen, and kept only to settle
balances carried over from it. It is not what a referral pays today and must
not be published here.

## Writing for this site

- No em dashes in anything a reader sees. A hyphen, a comma or a full stop says
  the same thing.
- Say "we", never "the admin" or "the team will". Which internal role acted is
  not information an ambassador can use.
- A figure about money belongs in `lib/program.ts`, not in a sentence.
- Write like a person explaining the thing, not like a landing page selling it.
  This site is the reference an ambassador comes back to, so a sentence earns
  its place by being informative rather than persuasive.
- No testimonials, no invented customer quotes, no numbers presented as social
  proof. If a claim is not in the StarStore source or something we have already
  emailed an ambassador, it does not go on the page.

## SEO

The work here has no visual output, which is what makes it worth doing:

- a real HTML file per route, with title, description and canonical
- `trailingSlash`, so canonicals and sitemap entries name the address that
  actually answers rather than one that redirects
- JSON-LD: `Organization` and `WebSite` site-wide, plus `Service` on the home
  page, `HowTo` on how it works, `FAQPage` on the FAQ, and `BreadcrumbList` on
  every inner page
- `sitemap.xml` and `robots.txt` generated at build time from `src/app/`
- one Open Graph card, because these links are posted into Telegram chats where
  the card is cropped to a thumbnail

## Backend

Supabase, unchanged by the rewrite.

- **Newsletter**: `check_newsletter_email` RPC for the duplicate check, since
  the table has no public read, then an insert into `newsletter_subscribers`.
- **Contact**: the `send-contact-email` edge function, which relays through
  Resend. Its source is in `supabase/functions/`.

The URL and publishable key have deployed fallbacks in `lib/supabase.ts` so the
site boots without environment variables. Both are public values; what protects
the tables is row level security, not the secrecy of the key. Override with
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Brand

`public/favicon.png` is the app mark, a black star outline on a clay circle.
It is the only mark this site uses, in the header and the footer. Do not draw
a new one.

The palette is read out of `app-web/src/app/globals.css` in the StarStore app
rather than picked to match it.

Buttons are the app's `--bg`, the warm light grey `#F1EEEA` the app itself sits
on, with ink written on top. The app presses ink, and `Button.module.css` there
says so, but the same button behaves differently in the two places: in the app
it lands on grey and is the one thing a screen has to do, while here it lands
on a white reference page and reads as a black slab dropped into a document.
So this site takes the app's ground rather than its action.

Dark cannot use `--bg` for both, or the button becomes the page. It takes the
app's `--panel` (`#272320`) instead, which is the raised slab that token exists
for. `--accent-hover` is one step along in each theme, because a soft fill
cannot fade on hover the way a dark one can: it would disappear into the page.

Clay `#DCC3AD` is the mark beside a section heading, never something to press.
Gold belongs to the Telegram star glyph alone.

The ground is pure white. The warm off-white this site used to carry made its
pages look tinted next to the app, which is white.

Icons are [lucide-react](https://lucide.dev), the set the site already
depended on. Use one from there rather than drawing a new glyph.
