/**
 * Every figure this site publishes about money, in one place.
 *
 * The site it replaced kept its numbers in prose, and most of them had drifted
 * away from what StarStore actually pays. It advertised "10% to 20% of the
 * transaction value" against a system that pays 30% of margin; it described a
 * 30-day tracking cookie against a system that attributes by Telegram deep
 * link, permanently; and it promised automatic level promotion that nothing in
 * the platform performs.
 *
 * A published rate is a promise somebody has already been sent by email, so
 * each constant below names the file in the StarStore repository it is taken
 * from. When one changes there, change it here and nowhere else.
 *
 *   services/referrals/commission.js   the rates, the cap, the holds
 *   services/referrals/activation.js   when a referral starts earning
 *   services/ambassador-payouts/       when the money is sent
 *   services/email-service.js          the approval email, which is the
 *                                      version every ambassador has read
 *
 * Note for anyone reading the StarStore source alongside this file:
 * `services/ambassador-payouts/earnings.js` holds a tiered table of per
 * referral rates. That is the *previous* programme, frozen, and kept only to
 * settle balances carried over from it. It is not what a referral pays today
 * and must not be published here.
 */

/** Share of StarStore's margin paid to the referrer. The same for everyone. */
export const COMMISSION_RATE = 0.3;

/**
 * What the commission works out to, per unit a reader can picture.
 *
 * Derived in StarStore from a margin of $0.0028 per star and $1.00 per Premium
 * subscription, times the 30% share. Quoted rather than recomputed, because
 * these are the two figures the approval email puts in front of an ambassador.
 */
export const RATES = [
  { activity: 'Per 1,000 Stars bought or sold', amount: '$0.84' },
  { activity: 'Per Telegram Premium subscription', amount: '$0.30' },
] as const;

/** Most one referred person can ever earn you, after which they stop accruing. */
export const LIFETIME_CAP_USD = 50;

/** Smallest balance a payout run will send. */
export const MIN_WITHDRAWAL_USD = 0.5;

/** Stars a referred user must buy or sell before your commission starts. */
export const ACTIVATION_STARS = 200;

/** Days a sell order's commission is held, matching the Stars clawback window. */
export const SELL_HOLD_DAYS = 21;

/** Order types whose commission is withdrawable straight away. */
export const INSTANT_ORDER_TYPES = ['Buying Stars', 'Telegram Premium'] as const;

/**
 * The levels, and what each one unlocks.
 *
 * Thresholds are referrals in a month. The benefits are awarded by our team
 * rather than computed by the platform, which is why none of them is a rate:
 * a level is recognition, and every ambassador earns the same 30%.
 */
export interface Level {
  key: string;
  name: string;
  referrals: number;
  stars: number;
  benefits: string[];
}

export const LEVELS: Level[] = [
  {
    key: 'standard',
    name: 'Standard',
    referrals: 0,
    stars: 0,
    benefits: ['Your referral link', 'The ambassador dashboard in the app'],
  },
  {
    key: 'explorer',
    name: 'Explorer',
    referrals: 30,
    stars: 50,
    benefits: ['50 free Stars monthly', 'Recognition badge'],
  },
  {
    key: 'connector',
    name: 'Connector',
    referrals: 50,
    stars: 100,
    benefits: ['100 free Stars monthly', 'VIP status', 'Exclusive perks'],
  },
  {
    key: 'pioneer',
    name: 'Pioneer',
    referrals: 70,
    stars: 150,
    benefits: ['150 free Stars monthly', 'Collectible NFT', 'Priority support'],
  },
  {
    key: 'elite',
    name: 'Elite',
    referrals: 100,
    stars: 200,
    benefits: ['200 free Stars monthly', 'Collectible NFT', 'Co-marketing opportunities'],
  },
];

/** Where somebody applies. Both are the same application. */
export const LINKS = {
  apply: 'https://starstore.app/ambassador/',
  bot: 'https://t.me/TgStarStore_bot',
  app: 'https://starstore.app/',
  support: 'mailto:support@starstore.app',
  supportAddress: 'support@starstore.app',
} as const;

export const SITE = 'https://amb.starstore.app';
