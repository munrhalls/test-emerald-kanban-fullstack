import { getSupabaseClient } from "./supabase.js";

/**
 * Milestone 1 tracer bullet: fetch the seed row's message from the
 * `tracer` table. This is the live-data proof the frontend renders.
 *
 * Named getTracerValue.ts (not tracer.ts) so it merges cleanly with the
 * frontend scaffold branch's placeholder lib/tracer.ts.
 */
export async function getTracerValue(): Promise<string> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("tracer")
    .select("message")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    throw new Error(`Failed to fetch tracer value: ${error.message}`);
  }

  return data.message;
}
