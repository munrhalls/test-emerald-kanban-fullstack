"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseClient } from "../../../lib/supabase";

export async function toggleTodo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const done = formData.get("done") === "true";
  if (!id) return;

  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("todos")
    .update({ done: !done })
    .eq("id", id);

  if (error) throw new Error(`toggleTodo: ${error.message}`);
  revalidatePath("/todos");
}
