import buildLog from "@/data/build-log.json";

const TYPE_STYLES: Record<string, string> = {
  blocker: "border-red-500/40 bg-red-500/10 text-red-200",
  "failed-command": "border-orange-500/40 bg-orange-500/10 text-orange-200",
  "excessive-command": "border-gild/40 bg-gild/10 text-gild",
  "wasted-reasoning": "border-mist/40 bg-mist/10 text-mist",
};

export default function BuildLogPage() {
  const { summary, events } = buildLog;

  return (
    <main className="min-h-screen bg-abyss px-6 py-16 text-mist sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-emerald/70">
          Diagnostics
        </p>
        <h1 className="mt-2 font-display text-4xl text-emerald sm:text-5xl">
          Build Log
        </h1>
        <p className="mt-4 max-w-xl font-body text-mist/80">
          {summary.scope}
        </p>
        <p className="mt-1 font-body text-sm text-mist/50">{summary.note}</p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-panel px-4 py-1.5 font-body text-sm text-emerald">
          {summary.totalWasteEvents} logged events
        </div>

        <ol className="mt-10 flex flex-col gap-4">
          {events.map((event) => (
            <li
              key={event.id}
              className={`rounded-box border p-4 font-body ${
                TYPE_STYLES[event.type] ?? "border-panel bg-panel text-mist"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs uppercase tracking-wide opacity-70">
                  {event.phase} &middot; {event.type}
                </span>
                <span className="text-xs opacity-60">#{event.id}</span>
              </div>
              <h2 className="mt-1 font-display text-lg text-emerald">
                {event.title}
              </h2>
              <p className="mt-2 text-sm opacity-90">{event.detail}</p>
              <dl className="mt-3 grid gap-2 text-xs opacity-80 sm:grid-cols-3">
                <div>
                  <dt className="font-semibold uppercase tracking-wide">Cost</dt>
                  <dd>{event.cost}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wide">
                    Root cause
                  </dt>
                  <dd>{event.rootCause}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wide">Fix</dt>
                  <dd>{event.fix}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
