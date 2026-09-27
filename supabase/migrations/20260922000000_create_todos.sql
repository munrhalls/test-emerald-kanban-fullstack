-- Todos experiment: a single flat task list, independent of the kanban
-- boards/columns/cards schema. `position` orders items in the list.

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  done boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists todos_position_idx
  on public.todos (position);

-- Row Level Security: this app has no auth, so the anon key gets a
-- full-access policy, matching the same accepted pattern already in use for
-- the kanban tables (boards/columns/cards) in this repo. Tighten when auth
-- lands.
alter table public.todos enable row level security;

drop policy if exists "todos are fully accessible by anon" on public.todos;
create policy "todos are fully accessible by anon"
  on public.todos
  for all
  to anon
  using (true)
  with check (true);
