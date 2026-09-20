import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Database shape for the kanban app. Extend as new tables land
 * (milestone 2 adds boards/columns/cards).
 */
export interface Database {
  public: {
    Tables: {
      tracer: {
        Row: {
          id: number;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export type AppSupabaseClient = SupabaseClient<Database>;

/**
 * Create a typed Supabase client.
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from the
 * environment (see .env.example). Framework-agnostic: works in Next.js
 * server components, route handlers, or a plain Node script.
 */
export function getSupabaseClient(): AppSupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
    );
  }

  return createClient<Database>(url, anonKey);
}
