# Supabase data layer

Hosted Postgres via Supabase, chosen for milestone 1 because it gives a
generated client and needs no ORM/migration step before the first query.

## Project

A free-tier Supabase project hosts the `tracer` table plus the
milestone-2 kanban tables (`boards`, `columns`, `cards`).

- **Project**: `emerald-kanban` (org `emerald-kanban`, region `eu-west-1`)
- **Project ref**: `rgkrnztyzqvnrsgjzjjg`
- **Project URL**: `https://rgkrnztyzqvnrsgjzjjg.supabase.co`
- **Publishable key**: `sb_publishable_ckU5i3q4B2lkbMyT68Y1bQ_hDirbsRy`

The project URL and anon/publishable key go in `.env.local` (see
`.env.example`); they are read by `lib/supabase.ts` via
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Both values are safe to expose client-side (RLS gates access) — the
service_role / `sb_secret_` keys are NOT and must never be committed.

## Getting credentials

1. Sign in at https://supabase.com/dashboard
2. Open the project (or create one: New project -> free tier -> pick a region)
3. Project Settings -> API:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Via CLI (after `supabase login` or with `SUPABASE_ACCESS_TOKEN` set):

```bash
supabase projects create <name> --org-id <org> --db-password <pw> --region <region>
supabase projects api-keys --project-ref <ref>   # shows the anon key
```

## Applying the migration

The schema lives in `supabase/migrations/`:

- `20260920000000_create_tracer.sql` — `tracer` table, seed row, RLS
  anon-read policy (milestone 1).
- `20260920120000_create_kanban_tables.sql` — `boards`, `columns`,
  `cards` tables with cascade-delete FKs, ordering indexes, and RLS
  full-access anon policies (milestone 2; no auth yet).
- `20260920120100_seed_demo_board.sql` — one demo board ('Emerald Demo
  Board') with 3 columns and 5 cards, idempotent.

Generated TypeScript types for all public tables live in
`lib/database.types.ts` (regenerate with
`supabase gen types typescript --project-id rgkrnztyzqvnrsgjzjjg --schema public > lib/database.types.ts`).

**Option A — CLI (linked project):**

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

**Option B — dashboard SQL editor:**

Paste the contents of each migration file (in filename order) into
Dashboard -> SQL Editor -> New query, then Run.

## Verifying

```bash
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  node -e "import('./lib/getTracerValue.ts').then(m => m.getTracerValue()).then(console.log)"
# -> "Hello from Supabase - kanban tracer is alive"
```

(Or just load the app page once the frontend lands — it renders the same value.)
