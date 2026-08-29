'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const SUBJECTS = [
  'General Inquiry',
  'Application Status',
  'Payout Question',
  'Level or Benefits',
  'Opt-Out Request',
  'Report a Problem',
];

const EMPTY = { name: '', email: '', subject: SUBJECTS[0], message: '' };

/** Posts to the send-contact-email edge function, which relays through Resend. */
export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const field = (key: keyof typeof EMPTY) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setError('');
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError('');

    try {
      const { error: sendError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
        },
      });
      if (sendError) throw sendError;
      setSent(true);
    } catch {
      setError('We could not send that. Please try again, or email us directly.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 shadow-[inset_3px_0_0_0_rgb(var(--clay))]">
        <p className="font-display text-xl tracking-tight">Message sent</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We reply to everything, usually within two business days.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
          className="mt-6 rounded-full border border-line px-5 py-2 text-sm font-semibold transition-colors hover:border-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink disabled:opacity-60';
  const label = 'mb-2 block text-sm font-medium';

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={field('name')}
            disabled={sending}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={field('email')}
            disabled={sending}
            className={input}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={label}>
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={field('subject')}
          disabled={sending}
          className={input}
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={field('message')}
          disabled={sending}
          className={`${input} resize-y`}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm font-medium text-ink">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 h-12 rounded-pill bg-accent px-7 text-[15px] font-bold tracking-[-0.2px] text-on-accent transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {sending ? 'Sending' : 'Send message'}
      </button>
    </form>
  );
}
