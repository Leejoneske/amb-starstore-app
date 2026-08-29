'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

/**
 * Light and dark, remembered.
 *
 * The stored choice is applied by an inline script in the document head, before
 * the first paint, so somebody who chose dark never sees a white flash. This
 * only reads back what that script decided and lets it be changed.
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
      className="flex h-10 w-10 items-center justify-center rounded-pill border border-line text-muted transition-colors hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun size={16} strokeWidth={1.9} /> : <Moon size={16} strokeWidth={1.9} />}
    </button>
  );
}
