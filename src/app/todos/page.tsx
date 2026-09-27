import Link from "next/link";
import { listTodos, type Todo } from "@/lib/todos/read";
import { createTodo } from "@/lib/todos/create";
import { toggleTodo } from "@/lib/todos/update";
import { deleteTodo } from "@/lib/todos/delete";

export default async function TodosPage() {
  let todos: Todo[] = [];
  let loadError: string | null = null;
  try {
    todos = await listTodos();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load todos.";
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="edge-glow sticky top-0 z-10 border-x-0 border-t-0 bg-abyss/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]"
            />
            <span className="font-display text-lg font-semibold tracking-wide text-mist sm:text-xl">
              Emerald&nbsp;Todos
            </span>
          </div>
          <Link
            href="/"
            className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-mist-dim hover:text-emerald sm:text-xs"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
        <section className="flex flex-col gap-2">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-emerald sm:text-xs">
            A list through the deep
          </p>
          <h1 className="font-display text-[clamp(1.75rem,6vw,3rem)] leading-[1.05] font-semibold text-mist">
            Todos
          </h1>
        </section>

        <form
          action={createTodo}
          className="edge-glow flex gap-2 rounded-2xl bg-panel/70 p-3 backdrop-blur-sm"
        >
          <input
            name="title"
            type="text"
            required
            placeholder="Add a todo…"
            className="flex-1 rounded-lg border border-panel-edge bg-abyss/60 px-3 py-2 font-body text-sm text-mist placeholder:text-mist-dim/70 focus:border-emerald focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald px-4 py-2 font-body text-sm font-medium text-abyss transition hover:bg-emerald-hi"
          >
            Add
          </button>
        </form>

        <ul className="flex flex-col gap-2">
          {loadError ? (
            <li className="edge-glow rounded-xl bg-panel/40 px-4 py-6 text-center font-body text-sm text-mist-dim">
              Couldn&apos;t load todos: {loadError}
            </li>
          ) : todos.length === 0 ? (
            <li className="edge-glow rounded-xl bg-panel/40 px-4 py-6 text-center font-body text-sm text-mist-dim">
              Nothing here yet — add your first todo above.
            </li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="edge-glow flex items-center gap-3 rounded-xl bg-panel/60 px-4 py-3"
              >
                <form action={toggleTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <input type="hidden" name="done" value={String(todo.done)} />
                  <button
                    type="submit"
                    aria-label={todo.done ? "Mark as not done" : "Mark as done"}
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition ${
                      todo.done
                        ? "border-emerald bg-emerald text-abyss"
                        : "border-panel-edge text-transparent hover:border-emerald"
                    }`}
                  >
                    ✓
                  </button>
                </form>

                <span
                  className={`flex-1 font-body text-sm break-words ${
                    todo.done ? "text-mist-dim line-through" : "text-mist"
                  }`}
                >
                  {todo.title}
                </span>

                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button
                    type="submit"
                    aria-label="Delete todo"
                    className="font-body text-xs text-mist-dim/70 hover:text-red-400"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))
          )}
        </ul>
      </main>

      <footer className="mx-auto w-full max-w-2xl px-4 pb-6 sm:px-6">
        <p className="font-body text-[0.65rem] tracking-[0.2em] text-mist-dim/70 uppercase">
          Emerald Todos — full CRUD tracer
        </p>
      </footer>
    </div>
  );
}
