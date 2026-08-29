'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type State = 'idle' | 'sending' | 'done';

/**
 * The subscribe form, kept exactly as it worked before: an RPC that answers
 * whether an address is already on the list, then an insert. The table has no
 * public read, so the duplicate check has to go through the function.
 */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const address = email.toLowerCase().trim();
    if (!address) return;

    setState('sending');
    setError('');

    try {
      const { data: already, error: rpcError } = await supabase.rpc('check_newsletter_email', {
        p_email: address,
      });
      if (rpcError) throw rpcError;

      if (already) {
        setError('That address is already subscribed.');
        setState('idle');
        return;
      }

      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: address });
      if (insertError) throw insertError;

      setEmail('');
      setState('done');
    } catch {
      setError('Something went wrong. Please try again.');
      setState('idle');
    }
  };

  return (
    <section className="shell py-12 sm:py-16">
      <div className="rounded-3xl border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
            Programme updates, by email
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Rate changes, new levels and anything that affects what you are paid. Nothing else.
          </p>

          {state === 'done' ? (
            <p className="mt-8 rounded-xl border border-line bg-surface px-5 py-4 text-sm shadow-[inset_3px_0_0_0_rgb(var(--clay))]">
              You are subscribed. Check your inbox.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
                disabled={state === 'sending'}
                className="h-12 flex-1 rounded-full border border-line bg-paper px-5 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="h-12 rounded-pill bg-accent px-7 text-[15px] font-bold tracking-[-0.2px] text-on-accent transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {state === 'sending' ? 'Subscribing' : 'Subscribe'}
              </button>
            </form>
          )}

          {error ? (
            <p role="alert" className="mt-3 text-sm font-medium text-ink">
              {error}
            </p>
          ) : null}
          <p className="mt-4 text-xs text-muted">Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
