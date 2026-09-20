# Plan: test-emerald-kanban-fullstack

Test project. Full-stack kanban board. Not a real product.

## Stack

- **Frontend**: Next.js (App Router), latest stable, React latest.
- **Backend**: Supabase — chosen over Prisma for this project. Supabase gives a hosted Postgres DB, an auto-generated client, and no migration/ORM setup step, so a working DB-to-UI round trip needs far fewer moving parts to stand up than Prisma (which still needs its own DB, a schema file, and a generate/migrate cycle before first query). Fastest path to a running tracer.
- **Styling**: Tailwind CSS.
- **Theme**: Emerald palette, refined/minimal/"otherworldly" aesthetic, distinctive font pairing (display + body), full RWD (all breakpoints, portrait and landscape).

## Milestones

1. **Tracer bullet** — one thin slice through every layer: Next.js app renders a page that server-fetches a single row from Supabase and displays it live on localhost. Emerald theme shell (font, base colors, responsive layout) applied to that one page. Committed once green.
2. **Kanban data model** — boards/columns/cards schema in Supabase, basic CRUD via server actions.
3. **Kanban UI** — drag-and-drop board, columns, cards, styled to the Emerald theme, fully responsive.
4. **Polish pass** — animations, empty states, otherworldly visual details, landscape/mobile QA.

Milestone 1 is the current target.

## Parallel orchestration (milestone 1)

Two crewmates, strict single-responsibility split, zero shared files until integration:

- `emerald-fe-scaffold` — Next.js + Emerald theme shell + a placeholder `lib/tracer.ts` integration point.
- `emerald-supabase-setup` — Supabase project, schema, `lib/getTracerValue.ts`. No frontend files touched.

Both PRs land independently. A short integration task then wires `lib/tracer.ts` to call `getTracerValue()` — the only step with a real dependency, so it's deliberately deferred rather than blocking either crewmate.

## Milestone 2: Kanban CRUD - card tracers

Goal: create/read/update/delete for a single card, each a full-stack tracer (backend to frontend, working end to end), run in parallel rather than in waves.

**Foundation (done):** `m2-schema` - `boards`/`columns`/`cards` tables + RLS + indexes + seed data + generated types, merged.

**4 parallel card tracers (dispatched together):**
- `m2-card-create` - `lib/cards/create.ts` + create UI fragment.
- `m2-card-read` - `lib/cards/read.ts` + owns `src/app/board/page.tsx` (creates it first; other 3 append their fragment only).
- `m2-card-update` - `lib/cards/update.ts` + update UI fragment.
- `m2-card-delete` - `lib/cards/delete.ts` + delete UI fragment.

Coordination is firstmate's job, not the crewmates': each owns its own `lib/cards/*.ts` file outright; all 4 append-only to one shared page, with `m2-card-read` as first-owner and the rest appending their fragment behind a marker comment. Firstmate sequences merges (read first) and resolves any residual page-file conflict directly, same as the milestone-1 scaffold collision.

## Risks

- **Empty repo blocks worktree spawn** (hit once already) — mitigated: an initial commit now exists on `main`.
- **Supabase requires an account/API key** the crewmate may not be able to provision non-interactively — if so it stops with `needs-decision` rather than guessing; captain provides the credential.
- **Merge collision risk** — both crewmates write only to disjoint paths (`app/`+`lib/tracer.ts` vs `lib/getTracerValue.ts`+`supabase/`), so independent merges should be conflict-free by construction.
- **Theme subjectivity** — "otherworldly/refined" is a judgment call; treat milestone 1's visual result as a draft to react to, not a final sign-off.
