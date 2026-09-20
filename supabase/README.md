# Supabase data layer

Hosted Postgres via Supabase, chosen for milestone 1 because it gives a
generated client and needs no ORM/migration step before the first query.

## Project

A free-tier Supabase project hosts the `tracer` table. The project URL and
anon key go in `.env.local` (see `.env.example`); they are read by
`lib/supabase.ts` via `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`.

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

The schema lives in `supabase/migrations/20260920000000_create_tracer.sql`
(creates the `tracer` table, seeds one row, enables RLS with an anon
read policy).

**Option A — CLI (linked project):**

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

**Option B — dashboard SQL editor:**

Paste the contents of the migration file into
Dashboard -> SQL Editor -> New query, then Run.

## Verifying

```bash
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  node -e "import('./lib/getTracerValue.ts').then(m => m.getTracerValue()).then(console.log)"
# -> "Hello from Supabase - kanban tracer is alive"
```

(Or just load the app page once the frontend lands — it renders the same value.)
