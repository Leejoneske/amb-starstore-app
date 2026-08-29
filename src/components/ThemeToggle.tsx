'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Light and dark, remembered.
 *
 * The stored choice is applied by an inline script in the document head, before
 * the first paint, so a reader who chose dark never sees a white flash. This
 * component only reads back what that script decided and lets it be changed.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attribute = document.documentElement.dataset.theme as Theme | undefined;
    if (attribute) return setTheme(attribute);
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  const swap = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    // A browser with site data blocked throws on write rather than no-opping.
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* the choice lasts for this page view only */
    }
  };

  return (
    <button
      type="button"
      onClick={swap}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
