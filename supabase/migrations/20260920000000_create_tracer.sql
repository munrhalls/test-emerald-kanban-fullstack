-- Milestone 1 "tracer bullet": minimal table proving a live
-- DB -> app round trip. One table, one seed row.

create table if not exists public.tracer (
  id bigint generated always as identity primary key,
  message text not null,
  created_at timestamptz not null default now()
);

-- Seed row read by lib/getTracerValue.ts
insert into public.tracer (message)
values ('Hello from Supabase - kanban tracer is alive');

-- Row Level Security: enabled, with a read-only policy for the anon key
-- so the browser/server client can SELECT but not mutate.
alter table public.tracer enable row level security;

create policy "tracer is readable by anon"
  on public.tracer
  for select
  to anon
  using (true);
