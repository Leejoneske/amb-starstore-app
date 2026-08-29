import { createClient } from '@supabase/supabase-js';

/**
 * The publishable key, with the deployed values as a fallback so the site
 * boots on any host without environment variables configured. Both are public
 * values, safe in a browser bundle: what protects the tables is row level
 * security in Supabase, not the secrecy of this key.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://jrtqbntwwkqxpexpplly.supabase.co';
const KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydHFibnR3d2txeHBleHBwbGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4OTQ5NzEsImV4cCI6MjA3NTQ3MDk3MX0.eVCHDu9w_mOxE0PH_yb0lH1WpmZkmz6AKLC5XBbLeUE';

export const supabase = createClient(URL, KEY);
