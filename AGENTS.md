# Project context

Read before implementing:

- `docs/product/contexto-general.md` — product goals, modules, phases.
- `docs/architecture/folder-structure.md` — folder layout, layers, and conventions.

## Summary

- Platform for managing convenios, beneficios, aliados, asociados, and bonos.
- Two surfaces: **public portal** (asociados) and **admin panel** (internal users).
- Stack: Next.js App Router, tRPC, TanStack Query, Drizzle + MySQL, shadcn/ui.
- Build in phases; **MVP first**: auth, public portal basics, CRUD for convenios/aliados/categorías, bonos with PDF, minimal RBAC.
- **Folder layout**: `app/` (thin pages), `server/` (tRPC, services, db, auth), `components/` (ui + portal/admin), `lib/` (client utils).
- Business logic lives in `server/services/`, not in components or tRPC routers.
- Integrations (PDF, email, Excel, file storage) go in `server/integrations/`, decoupled from business logic.
- Before implementing a feature, clarify entities, business rules, permissions, validations, side effects, and audit needs.

## UI

- **Light mode only** — no dark mode, no `prefers-color-scheme: dark`, no theme toggle. Do not add `dark:` Tailwind variants or dark shadcn themes.

# Package manager

Always use **pnpm** for this repo. Do not use npm or yarn.

- Install dependencies: `pnpm install`
- Add a dependency: `pnpm add <package>`
- Add a dev dependency: `pnpm add -D <package>`
- Run scripts: `pnpm run <script>` or `pnpm <script>`
- Execute a binary: `pnpm exec <command>`

Lockfile is `pnpm-lock.yaml`. Commit it; do not create `package-lock.json` or `yarn.lock`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
