-- Milestone 2 wave 1: kanban schema.
-- boards -> columns -> cards, cascade deletes downward so removing a
-- board removes its whole tree. `position` orders columns within a board
-- and cards within a column.

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.columns (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  name text not null,
  position integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  column_id uuid not null references public.columns (id) on delete cascade,
  title text not null,
  description text,
  position integer not null,
  created_at timestamptz not null default now()
);

-- Indexes on the FK + ordering paths every board view hits.
create index if not exists columns_board_id_position_idx
  on public.columns (board_id, position);

create index if not exists cards_column_id_position_idx
  on public.cards (column_id, position);

-- Row Level Security: this demo app has no auth, so the anon key gets a
-- full-access policy on all three tables (the milestone-1 tracer table
-- stays read-only). Tighten when auth lands.
alter table public.boards enable row level security;
alter table public.columns enable row level security;
alter table public.cards enable row level security;

create policy "boards are fully accessible by anon"
  on public.boards
  for all
  to anon
  using (true)
  with check (true);

create policy "columns are fully accessible by anon"
  on public.columns
  for all
  to anon
  using (true)
  with check (true);

create policy "cards are fully accessible by anon"
  on public.cards
  for all
  to anon
  using (true)
  with check (true);
