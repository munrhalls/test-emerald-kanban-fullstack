Emerald Kanban - a Next.js (App Router) + React 19 + Tailwind CSS v4 app.

Milestone 1 (the tracer bullet) renders live data end to end on the home page, styled with an Emerald theme (Fraunces + Space Grotesk fonts). Milestone 2 adds the kanban card operations at `/board`, starting with card update.

## Getting Started

The `/board` page talks to Supabase, so copy `.env.example` to `.env.local` and
fill in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` first —
see `supabase/README.md` for where those values come from and how to apply the
schema. (The home page renders without them.)

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the tracer page, or
[http://localhost:3000/board](http://localhost:3000/board) to edit a card.

See `AGENTS.md` for project architecture notes and the Emerald theme's token locations.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
