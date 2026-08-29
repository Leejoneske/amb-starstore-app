import type { Config } from 'tailwindcss';

/**
 * Two families, both distinct from the app's own UI face on purpose: this is
 * a document to read, not a screen to operate. Archivo carries the headings,
 * Public Sans the running text.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        'line-soft': 'rgb(var(--line-soft) / <alpha-value>)',
        clay: 'rgb(var(--clay) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--accent-hover) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        shell: '1200px',
      },
      borderRadius: {
        pill: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
