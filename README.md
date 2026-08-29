# StarStore Ambassador Program

The public guide to the StarStore Ambassador Program, at
[amb.starstore.app](https://amb.starstore.app). It is the site the StarStore
app links to from its own ambassador screen, so it has to explain the whole
programme to somebody who has never heard of it, and it has to be findable by
somebody searching for it.

Everything it publishes about money is taken from the
[StarStore source](https://github.com/Leejoneske/Tg-Star-Store) rather than
written from memory: 30% of the margin on a referred trade, $0.84 per 1,000
Stars, $0.30 per Telegram Premium subscription, a $50 lifetime cap per referral,
200 Stars to activate one, a 21 day hold on sell commission, and a 0.50 USDT
minimum payout on the 1st of each month.

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
npm run lint
```

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
    Follow             the Telegram channel and chat
    ContactForm        the one Supabase-backed form
  lib/
    program.ts         every published figure, and every link out
    seo.ts             pageMeta, canonicals, JSON-LD helpers
    supabase.ts
```

## Contributing

Read [DEVELOPER.md](DEVELOPER.md) before changing anything. It covers where the
figures come from and why they must not be edited in place, how to write for
this site, the design decisions and the palette, what the SEO setup relies on,
where the links point and why, and which of the two deployment paths does what.
