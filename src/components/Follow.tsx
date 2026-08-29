import { MessagesSquare, Megaphone } from 'lucide-react';
import { LINKS } from '@/lib/program';

/**
 * How to hear about a change, without giving anybody an email address.
 *
 * This replaced an email signup that wrote to a Supabase table. Everyone this
 * page is for is already in Telegram, the announcements they want are posted
 * there first, and the app itself checks membership of the channel, so asking
 * for an address as well was asking twice for something we could already
 * reach them at.
 */
export function Follow() {
  const cards = [
    {
      href: LINKS.channel,
      icon: Megaphone,
      title: 'The announcements channel',
      handle: '@StarStore_app',
      body: 'Rate changes, new levels, and anything that affects what you are paid gets posted here first. Low volume, and worth turning notifications on for.',
    },
    {
      href: LINKS.chat,
      icon: MessagesSquare,
      title: 'The community chat',
      handle: '@StarStore_Chat',
      body: 'Where questions get asked and answered by people using the app, ambassadors among them. Faster than email for anything that is not about your own account.',
    },
  ];

  return (
    <section className="shell py-12 sm:py-14">
      <div className="rounded-2xl border border-line p-6 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
            Keep up with what changes
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            No mailing list. Everything worth telling you is posted in Telegram, which is where you
            already are.
          </p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface p-6 transition-colors hover:bg-line-soft"
            >
              <card.icon size={20} strokeWidth={1.7} />
              <p className="mt-4 font-display text-base font-extrabold tracking-tight">
                {card.title}
              </p>
              <p className="mt-1 text-sm font-medium text-muted">{card.handle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
