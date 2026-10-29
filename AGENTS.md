<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project guide

This repository is a small computer-engineering learning app built with Next.js 16.4.3, React, TypeScript, and the App Router.

### App structure

- `src/app/page.tsx` sends the home route to `/cache` (FIFO).
- Cache lesson routes are `/cache` (FIFO), `/cache/lru`, `/cache/min`, and `/cache/lfu`.
- Bit lesson routes are `/bits` (SUM), `/bits/subtract`, `/bits/shl`, `/bits/shr`, and `/bits/convert`.
- `src/app/cache/cache-lesson.tsx` and `src/app/bits/bit-lesson.tsx` contain the independent interactive lesson UIs.
- `src/app/bits/number-converter.tsx` converts unsigned 8-bit values between decimal, hexadecimal, and binary.
- The left lesson sidebar has one entry per lesson route; keep its links and active-page state synchronized with the route.
- `src/app/components/lesson-layout.tsx` contains the shared lesson shell and sidebar expansion state.
- `src/app/components/site-sidebar.tsx` contains the lesson sidebar and its collapse control. Keep route selection and `aria-current` in sync with the active lesson.
- `src/app/components/theme-provider.tsx` manages the saved light/dark preference and provides the theme toggle.
- `src/service/learning-utils.ts` contains the shared cache and binary-learning helpers, including FIFO, LRU, MIN, and LFU simulation. LFU uses LRU as its tie-breaker.
- `src/app/globals.css`, `src/app/layout.css`, `src/app/lesson.css`, and `src/app/theme.css` hold global, shell, lesson, and theme styles respectively. Global styles are imported by `src/app/layout.tsx`.
- Static files served by URL belong in `public/`; reference them from CSS with a root URL such as `/image-name.jpg`.

### Working conventions

- Preserve the generated Next.js instructions above. `next dev` manages that block; do not edit or remove it.
- Before changing Next.js APIs, routing, CSS integration, or component boundaries, read the matching guide under `node_modules/next/dist/docs/` and follow the installed version's conventions.
- Use `next/link` for navigation between app routes. Keep links keyboard-accessible and retain visible focus styles and current-page state.
- Keep browser state and event handlers in Client Components. Add or preserve the `"use client"` boundary only where interaction requires it.
- Keep styles in the existing CSS files and follow their existing selectors and responsive breakpoints instead of adding a new styling system.
- Prefer small, focused changes and reuse the shared lesson shell rather than duplicating it in route files. Keep lesson-specific UI and state in that lesson's own component instead of selecting content with route conditionals in the shared shell.
- Do not add or run tests, lint, or builds unless the user asks for verification.

### Available commands

- `pnpm dev` starts the local development server.
- `pnpm lint` runs ESLint.
- `pnpm build` creates a production build.
