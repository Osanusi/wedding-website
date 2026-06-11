import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and restart `npm run dev`.",
    );
  }
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: { persistSession: false },
    });
  }
  return client;
}

if (!isSupabaseConfigured && typeof window !== "undefined") {
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — RSVP submissions will fail until .env.local is configured.",
  );
}

export type RsvpRow = {
  name: string;
  email: string;
  attending: "yes" | "no";
  party_size: number | null;
  meal_preference: string | null;
  dietary_restrictions: string | null;
  transport: "driving" | "need_shuttle" | "unsure" | null;
  song_request: string | null;
  user_agent: string | null;
};
