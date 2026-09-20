<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Emerald Kanban — milestone 1 tracer bullet. Next.js 16 (App Router) + React 19 + Tailwind CSS v4.
- Theme tokens live in `src/app/globals.css` under `@theme inline` (abyss/panel/emerald/gild/mist palette, `font-display`/`font-body`).
- Font pairing: Fraunces (display) + Space Grotesk (body) via `next/font/google` in `src/app/layout.tsx`.
- Data integration point: `getTracerValue()` in `src/lib/tracer.ts` — a follow-up task wires it to Supabase; keep the signature stable.
- Run: `npm run dev` → http://localhost:3000

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
