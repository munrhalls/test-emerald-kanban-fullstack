"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function deleteTodo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw new Error(`deleteTodo: ${error.message}`);
  revalidatePath("/todos");
}
