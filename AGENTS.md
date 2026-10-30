<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project guide

This repository is a small computer-engineering learning app built with Next.js 16.4.3, React, TypeScript, and the App Router.

**Before writing or changing code, read `SKILL.md` (readable-code).** It defines naming, function size, component structure, and when to split files.

### App structure

- `src/app/page.tsx` sends the home route to `/cache` (FIFO).
- Cache lesson routes are `/cache` (FIFO), `/cache/lru`, `/cache/min`, and `/cache/lfu`.
- Bit lesson routes are `/bits` (SUM), `/bits/subtract`, `/bits/shl`, `/bits/shr`, and `/bits/convert`.
- The mixed practice quiz is at `/quiz`; its correct-answer total is stored in browser `localStorage`.
- `src/app/quiz/` contains the quiz route, questions, progress hook, and quiz display components.
- `src/app/cache/cache-lesson.tsx` and `src/app/bits/bit-lesson.tsx` compose the independent interactive lesson UIs from feature components.
- `src/app/cache/components/` contains the cache input, table cells, answer states, and summary display components.
- `src/app/bits/components/` contains the bit-operation and converter field display components.
- `src/app/bits/number-converter.tsx` converts unsigned 8-bit values between decimal, hexadecimal, and binary.
- The left lesson sidebar has one entry per lesson route; keep its links and active-page state synchronized with the route.
- `src/app/components/lesson-layout.tsx` contains the shared lesson shell and sidebar expansion state.
- `src/app/components/site-sidebar.tsx` contains the lesson sidebar and its collapse control. Keep route selection and `aria-current` in sync with the active lesson.
- `src/app/components/lesson-types.ts` contains the shared lesson navigation type used by the shell and route components.
- The app uses a fixed dark theme in CSS; there is no theme toggle or theme attribute on the root HTML element.
- `src/service/cache/` separates cache input helpers, shared types, simulation, and one eviction strategy per file. LFU uses LRU as its tie-breaker.
- `src/service/bits/` separates binary formatting, bit-operation calculations, and decimal/hex/binary conversion helpers.
- `src/app/styles/` groups global, shell/theme, and lesson styles. `src/app/layout.tsx` stays at the App Router root and imports them in cascade order: globals, lesson, then layout/theme.
- Static files served by URL belong in `public/`; reference them from CSS with a root URL such as `/image-name.jpg`.

### Code organization (how files are split)

- **UI vs logic:** components render and handle events; algorithms and calculations live in `src/service/` as pure functions.
- **Lesson folders:** keep lesson-only pieces beside the lesson (`components/`, `constants.ts`, `types.ts`, `use-<topic>-lesson.ts`). Move code to `src/service/` or `src/app/components/` only when two or more features use it.
- **Size triggers:** consider splitting a component past ~200 lines, helpers past ~300 lines, or any function past ~30 lines. Do not split code used once and under ~30 lines.
- **Logic:** keep parsing, validation, and calculations in `src/service/`; import directly from the owning service file. Do not add re-export barrels unless asked.
- **Conditional UI:** move alternate display states (such as answer/input, empty/results, or active/inactive navigation) into focused components in the owning feature folder.
- **Shared shell:** reuse the lesson shell; do not select lesson content with route conditionals inside it.

### Readability rules

- Use descriptive names (verb + object for functions, `is`/`has` for booleans, `handle*` for handlers, `on*` for callback props).
- No `any`; model states with union types; export types only when shared.
- Prefer early returns over deep nesting; replace magic numbers with named constants.
- Comments explain why, not what. Remove dead code and commented-out code.
- Validate user input at the boundary and handle empty or invalid values explicitly.

### Working conventions

- Preserve the generated Next.js instructions above. `next dev` manages that block; do not edit or remove it.
- Before changing Next.js APIs, routing, CSS integration, or component boundaries, read the matching guide under `node_modules/next/dist/docs/` and follow the installed version's conventions.
- Use `next/link` for navigation between app routes. Keep links keyboard-accessible and retain visible focus styles and current-page state.
- Keep browser state and event handlers in Client Components. Add or preserve the `"use client"` boundary only where interaction requires it, and keep it as low in the tree as possible.
- Keep styles in the existing CSS files and follow their existing selectors and responsive breakpoints instead of adding a new styling system.
- Prefer small, focused changes and reuse the shared lesson shell rather than duplicating it in route files. Keep lesson-specific UI and state in that lesson's own component instead of selecting content with route conditionals in the shared shell.
- When splitting a file, update imports in the same change and mention the new files in the summary.
- Do not add or run tests, lint, or builds unless the user asks for verification.

### Available commands

- `pnpm dev` starts the local development server.
- `pnpm lint` runs ESLint.
- `pnpm build` creates a production build.
