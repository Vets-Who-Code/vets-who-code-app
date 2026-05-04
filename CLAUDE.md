# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common commands

```bash
npm run dev            # Next.js dev server (Pages Router, port 3000)
npm run dev:setup      # Prisma generate + db push (run once after fresh clone)
npm run build          # Production build
npm run vercel-build   # Prisma migrate deploy + generate + next build (deploy target)
npm run typecheck      # tsc -p tsconfig.json (no emit)
npm run lint           # biome lint
npm run lint:fix       # typecheck then biome check --write
npm run format         # biome format --write
npm run check          # biome ci (use this in CI / pre-flight)
npm run test           # vitest run
npx vitest run path/to/file.test.ts            # single test file
npx vitest run -t "test name substring"        # filter by name
```

Static-data generators write JSON into `src/data/` and run via `tsx`. They are one-shot — run when the underlying source (Lightcast, BLS, curated lists) changes, then commit the JSON output:

```bash
npm run generate:tech-pathways          # 4,201 MOS → tech-roles taxonomy
npm run generate:career-pathways
npm run generate:training-pipeline
npm run generate:cert-equivalencies
npm run generate:cognitive-skills
npm run generate:military-systems
npm run generate:job-codes
npm run generate:blog-image <slug>
npm run generate:blog-audio
npm run generate:blog-media
```

## Architecture

### Framework + routing

Next.js 15 **Pages Router** (not App Router). Pages live in `src/pages/` and use the `Page.Layout = Layout01` static-property pattern — `_app.tsx` reads `Component.Layout` and wraps the page. Use `Layout01` from `@layout/layout-01` (header + footer + scroll-to-top) for standard pages. `[slug].tsx` patterns under `src/pages/programs/`, `src/pages/blogs/`, etc. read MDX from `src/data/<area>/` via `getAllMediaPosts` in `src/lib/mdx-pages.ts`.

Path aliases (from `tsconfig.json`):
`@assets/*` `@components/*` `@containers/*` `@contexts/*` `@data/*` `@hooks/*` `@layout/*` `@lib/*` `@ui/*` `@utils/*`

### Containers vs components

- `src/containers/<feature>/<section>/index.tsx` — page sections with co-located `*.module.css`. Pages compose containers; containers render UI.
- `src/components/ui/*` — primitive UI (button, input, modal, section-title, etc.). Use these instead of inlining markup.
- `src/components/forms/*` — react-hook-form forms wired to API routes.

### Auth-aware navigation

`src/data/menu.ts` declares the nav tree with `requiresAuth?` and `hideWhenAuth?` flags. `filterMenuByAuth(menu, isAuthed)` filters items, recurses into submenus, and drops parents whose submenu becomes empty after filtering. The header (`src/layouts/headers/header.tsx`) calls this with the NextAuth `useSession()` status.

### J0dI3 AI backend

VWC's AI features (challenges, coding, learning, jobs, troops, mentorship) are proxied to an external **J0dI3** Cloud Run service. The pattern:

- `src/pages/api/j0di3/<area>/<endpoint>.ts` is a thin handler calling `j0di3Proxy(method, path)` from `src/lib/j0di3-proxy.ts`.
- `j0di3Proxy` requires auth (`requireAuth` from `@/lib/rbac`), injects `troop_id` from the session into request body/params, forwards to the J0dI3 client, and translates AxiosErrors into JSON responses.
- Do **not** call J0dI3 directly from the client — always go through `/api/j0di3/*`.

### Contact / form pattern

Forms POST to `src/pages/api/contact.ts`, which validates required params, runs Gemini spam classification (fail-open via `classifyContact`), then forwards to a Slack webhook. Reuse this endpoint for new contact-style forms by passing `{ name, email, subject, message }`.

### Static data layout

`src/data/` mixes:
- **Hand-edited TS modules** (e.g. `software-factory.ts`, `menu.ts`, `sitemap-links.ts`) — copy and config, imported directly.
- **MDX content folders** (`programs/`, `blogs/`, `subjects/`, `events/`, `media/`) — read at build time by `[slug].tsx` routes.
- **Generated JSON maps** (`tech-pathways-map.json`, `career-pathways-map.json`, `mos-to-soc-map.json`, etc.) — produced by `scripts/generate-*.ts`. Treat these as build artifacts; never hand-edit. Re-run the generator and commit the diff.
- **Career-guide enrichment** comes from `src/lib/labor-market.ts` (Lightcast → Census fallback), `src/lib/lightcast-client.ts`, and `src/lib/census-client.ts`.

### Brand tokens and styling

Tailwind uses the `tw-` prefix (`tailwind.config.js`). Class-based dark mode (`darkMode: "class"`). Brand tokens are pre-baked into the theme — prefer `tw-bg-navy`, `tw-text-primary`, `tw-text-gold`, `tw-bg-cream`, `tw-text-ink` over hex literals. Mono labels use `var(--font-mono)`, headlines use `var(--font-headline)` (GothamPro). The full type scale, color tokens, and section-padding rules live in `docs/DESIGN_DOC.md` and `docs/brand-style-guide.md` — read these before describing or critiquing the visual design.

CSS modules co-located with containers (`*.module.css`) handle anything Tailwind can't express cleanly (keyframes, complex grid templates, hover pseudo-elements). Wrap motion in `@media (prefers-reduced-motion: reduce)` no-ops.

### Testing

Vitest + Testing Library + happy-dom. Tests live in `__tests__/` (mirroring source structure) and `src/**/__tests__/`. Playwright e2e specs are under `__tests__/e2e/` and use `@playwright/test`. Mock J0dI3 by stubbing `@/lib/j0di3-client` — see `__tests__/lib/j0di3/j0di3-proxy.test.ts`.

## Conventions

- **Branch every feature.** Never commit to `master` directly.
- **Conventional Commits, sentence-case subject, ≤72 chars.** Husky `commit-msg` enforces commitlint. Type must be one of: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert. The subject after the type must start uppercase ("Add foo" not "add foo").
- **Biome is the formatter and linter.** Run `npm run lint:fix` before committing.
- **No AI attribution in artifacts.** No "Co-Authored-By", no "Generated with Claude Code" — not in commits, PRs, issues, or any artifact.
- **Don't soften CTAs.** "Donate" stays "Donate." "Apply" stays "Apply." Diagnostic-CTA reframes from B2B SaaS sites do not apply.
- **VWC is a software engineering accelerator, not a bootcamp.** Graduates are software engineers, not web developers.

## Key references

- `docs/DESIGN_DOC.md` — canonical visual + interaction spec
- `docs/brand-style-guide.md` — color, type, spacing tokens
- `docs/DEPLOYMENT.md` — Vercel deploy notes
- `docs/DATABASE_GUIDE.md` — Prisma + Neon Postgres
- `docs/EMAIL_SETUP.md` — Resend + react-email templates
- `design_handoff_*/` — gitignored design source bundles for in-flight pages
