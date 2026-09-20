"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseClient } from "../supabase";

interface UpdateCardInput {
  id: string;
  title: string;
  description?: string | null;
}

/**
 * Milestone 2 — card UPDATE op.
 *
 * Internal helper: updates an existing card's title/description by id.
 * Only {@link updateCardAction} is exported, so this module publishes a
 * single server-action endpoint.
 * Single responsibility: this module owns card updates only; create,
 * read, and delete live in sibling modules owned by other crewmates.
 *
 * Returns the updated row count so the caller can distinguish "card not
 * found" from a successful write.
 */
async function updateCard(input: UpdateCardInput): Promise<number> {
  const title = input.title.trim();
  if (!input.id) {
    throw new Error("updateCard: card id is required");
  }
  if (!title) {
    throw new Error("updateCard: title must not be empty");
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("cards")
    .update({ title, description: input.description ?? null })
    .eq("id", input.id)
    .select("id");

  if (error) {
    throw new Error(`Failed to update card ${input.id}: ${error.message}`);
  }

  revalidatePath("/board");
  return data?.length ?? 0;
}

/**
 * Form-action adapter over {@link updateCard} for `<form action={...}>`.
 * Reads `card_id`, `title`, and `description` fields from FormData.
 */
export async function updateCardAction(formData: FormData): Promise<void> {
  await updateCard({
    id: String(formData.get("card_id") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
  });
}
