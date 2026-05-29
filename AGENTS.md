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
