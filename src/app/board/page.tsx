import { getSupabaseClient } from "../../../lib/supabase";
import { updateCardAction } from "../../../lib/cards/update";

/**
 * Milestone 2 — /board
 *
 * This page is assembled from per-op fragments owned by different
 * crewmates. m2-card-update owns the edit fragment below; the marker
 * comment reserves the spot where m2-card-read renders the card list.
 *
 * The edit fragment is a tracer: it binds to the first demo card so the
 * update op is drivable end to end before the read list lands.
 */
export default async function BoardPage() {
  // ── m2-card-update fragment: fetch one card to edit ─────────────
  const supabase = getSupabaseClient();
  const { data: card, error } = await supabase
    .from("cards")
    .select("id, title, description")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <div className="flex flex-1 flex-col">
      <header className="edge-glow sticky top-0 z-10 bg-abyss/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <span
            aria-hidden
            className="inline-block size-2.5 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]"
          />
          <span className="font-display text-lg font-semibold tracking-wide text-mist sm:text-xl">
            Emerald&nbsp;Kanban
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* ── m2-card-update fragment: edit card form ─────────────── */}
        <section
          aria-labelledby="edit-card-heading"
          className="edge-glow rounded-2xl bg-panel/70 p-5 backdrop-blur-sm sm:p-8"
        >
          <h2
            id="edit-card-heading"
            className="font-display text-xl font-medium text-mist sm:text-2xl"
          >
            Edit card
          </h2>
          {error ? (
            <p className="mt-3 font-body text-sm text-mist-dim">
              Could not load cards: {error.message}
            </p>
          ) : !card ? (
            <p className="mt-3 font-body text-sm text-mist-dim">
              No card available to edit yet.
            </p>
          ) : (
            <form
              action={updateCardAction}
              className="mt-4 flex flex-col gap-4"
            >
              <input type="hidden" name="card_id" value={card.id} />
              <label className="flex flex-col gap-1.5">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-gild sm:text-xs">
                  Title
                </span>
                <input
                  required
                  pattern="\s*\S+.*"
                  title="Title must contain at least one non-space character"
                  name="title"
                  defaultValue={card.title}
                  className="rounded-lg border border-panel-edge bg-abyss px-3 py-2 font-body text-sm text-mist outline-none focus:border-emerald"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-gild sm:text-xs">
                  Description
                </span>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={card.description ?? ""}
                  className="rounded-lg border border-panel-edge bg-abyss px-3 py-2 font-body text-sm text-mist outline-none focus:border-emerald"
                />
              </label>
              <div>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald px-4 py-2 font-body text-sm font-medium text-abyss transition-colors hover:bg-emerald-hi"
                >
                  Save card
                </button>
              </div>
            </form>
          )}
        </section>

        {/* m2-card-read owns the list render below */}
      </main>
    </div>
  );
}
