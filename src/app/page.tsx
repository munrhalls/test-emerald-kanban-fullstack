import { getTracerValue } from "@/lib/tracer";

export default async function Home() {
  const tracerValue = await getTracerValue();

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Shell header ─────────────────────────────────────────── */}
      <header className="edge-glow sticky top-0 z-10 border-x-0 border-t-0 bg-abyss/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]"
            />
            <span className="font-display text-lg font-semibold tracking-wide text-mist sm:text-xl">
              Emerald&nbsp;Kanban
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/todos"
              className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-emerald hover:text-emerald-hi sm:text-xs"
            >
              Todos
            </a>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-mist-dim sm:text-xs">
              Milestone&nbsp;1 · Tracer
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-8 px-4 py-10 sm:px-6 sm:gap-10 sm:py-14 lg:px-8 landscape:py-6 landscape:lg:py-10">
        <section className="flex flex-col gap-4 sm:gap-5">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-emerald sm:text-xs">
            A signal through the deep
          </p>
          <h1 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.02] font-semibold text-mist">
            The board wakes
            <br />
            <span className="text-emerald-hi italic">in emerald.</span>
          </h1>
          <p className="max-w-prose font-body text-sm leading-relaxed text-mist-dim sm:text-base">
            One page, one query, one unbroken line of light from the database
            to this panel. Everything else is atmosphere.
          </p>
        </section>

        {/* ── Tracer panel — the Supabase crewmate wires lib/tracer.ts ── */}
        <section
          aria-live="polite"
          className="edge-glow relative overflow-hidden rounded-2xl bg-panel/70 p-5 backdrop-blur-sm sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-emerald/10 blur-3xl"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-gild sm:text-xs">
                Live conduit
              </span>
              <span className="font-display text-xl font-medium text-mist sm:text-2xl">
                {tracerValue}
              </span>
              <span className="font-body text-xs text-mist-dim sm:text-sm">
                Loading tracer data… resolved via{" "}
                <code className="rounded bg-abyss px-1.5 py-0.5 font-body text-[0.85em] text-emerald-hi">
                  getTracerValue()
                </code>{" "}
                in{" "}
                <code className="rounded bg-abyss px-1.5 py-0.5 font-body text-[0.85em] text-emerald-hi">
                  src/lib/tracer.ts
                </code>
              </span>
            </div>
            <span
              aria-hidden
              className="hidden shrink-0 font-display text-6xl text-emerald/20 sm:block"
            >
              ◆
            </span>
          </div>
        </section>

        {/* ── Placeholder column hints ───────────────────────────── */}
        <section className="grid grid-cols-1 gap-3 portrait:sm:grid-cols-3 landscape:grid-cols-3 sm:gap-4">
          {["Gathering", "In motion", "Settled"].map((label) => (
            <div
              key={label}
              className="edge-glow rounded-xl bg-panel/40 px-4 py-3 sm:py-4"
            >
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-mist-dim sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
        <p className="font-body text-[0.65rem] tracking-[0.2em] text-mist-dim/70 uppercase">
          Emerald Kanban — tracer bullet
        </p>
      </footer>
    </div>
  );
}
