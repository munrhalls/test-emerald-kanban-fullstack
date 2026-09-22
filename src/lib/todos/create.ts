"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function createTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const { count } = await supabase
    .from("todos")
    .select("id", { count: "exact", head: true });

  const { error } = await supabase
    .from("todos")
    .insert({ title, position: count ?? 0 });

  if (error) throw new Error(`createTodo: ${error.message}`);
  revalidatePath("/todos");
}
