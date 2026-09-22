"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseClient } from "../../../lib/supabase";

export async function createTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const supabase = getSupabaseClient();

  const { data: last, error: maxError } = await supabase
    .from("todos")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxError) throw new Error(`createTodo: ${maxError.message}`);

  const { error } = await supabase
    .from("todos")
    .insert({ title, position: (last?.position ?? -1) + 1 });

  if (error) throw new Error(`createTodo: ${error.message}`);
  revalidatePath("/todos");
}
