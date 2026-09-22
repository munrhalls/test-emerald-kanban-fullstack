import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client. RLS gates access, so this is safe to use from both
 * server actions and client components; there is no server-only secret here.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
