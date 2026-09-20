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

## Milestone 2: Kanban CRUD (boards, columns, cards)

Goal: create/read/update/delete for boards, columns, and cards, navigable end to end, SRP/SOLID on the backend, simple and frictionless on the UI. Broken into 3 small waves so no crewmate runs long without a checkpoint, and each task is independently mergeable.

**Wave 1 — schema (1 task, foundational, blocks wave 2):**
- `m2-schema` — Supabase migration: `boards`, `columns`, `cards` tables with FKs and ordering columns; seed one demo board/column/card so the app has something to render immediately.

**Wave 2 — data layer, parallel by entity (3 tasks, disjoint files, depends only on wave 1's schema):**
- `m2-boards-data` — `lib/boards.ts`: create/list/rename/delete a board.
- `m2-columns-data` — `lib/columns.ts`: create/list/rename/reorder/delete a column.
- `m2-cards-data` — `lib/cards.ts`: create/list/edit/move/delete a card.
Each is a single file, single entity, single responsibility - genuinely independent, safe to run together.

**Wave 3 — UI, parallel by page (not by entity, to avoid the milestone-1 shared-file collision), 2 tasks, depends on wave 2:**
- `m2-boards-ui` — board list page: navigate between boards, create/rename/delete a board. Owns its own route only.
- `m2-board-detail-ui` — single board view: columns and cards together (they share one page, so one owner - splitting this further caused the milestone-1 merge conflict and won't be repeated). Create/rename/delete columns, create/edit/move/delete cards, all styled to the Emerald theme, fully responsive.

Total: 6 small tasks across 3 waves instead of 1-2 large ones, so status updates land every few minutes instead of one long silent run, and each wave's max task size stays small enough that no crewmate is ever the sole long pole.

## Risks

- **Empty repo blocks worktree spawn** (hit once already) — mitigated: an initial commit now exists on `main`.
- **Supabase requires an account/API key** the crewmate may not be able to provision non-interactively — if so it stops with `needs-decision` rather than guessing; captain provides the credential.
- **Merge collision risk** — both crewmates write only to disjoint paths (`app/`+`lib/tracer.ts` vs `lib/getTracerValue.ts`+`supabase/`), so independent merges should be conflict-free by construction.
- **Theme subjectivity** — "otherworldly/refined" is a judgment call; treat milestone 1's visual result as a draft to react to, not a final sign-off.
