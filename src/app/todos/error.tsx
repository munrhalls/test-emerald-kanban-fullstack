"use client";

export default function TodosError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-14 text-center sm:px-6">
      <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-emerald sm:text-xs">
        Emerald&nbsp;Todos
      </p>
      <div className="edge-glow w-full rounded-xl bg-panel/40 px-4 py-6 font-body text-sm text-mist-dim">
        Something went wrong: {error.message}
      </div>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-lg bg-emerald px-4 py-2 font-body text-sm font-medium text-abyss transition hover:bg-emerald-hi"
      >
        Try again
      </button>
    </div>
  );
}
