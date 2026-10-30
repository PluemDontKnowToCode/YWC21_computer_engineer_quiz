---
name: readable-code
description: Write human-readable TypeScript/React code and split files efficiently in this Next.js learning app. Use whenever adding or changing components, helpers, hooks, types, or styles.
---
 
# Readable Code and File Splitting
 
Goal: a new contributor should understand any file in under a minute. Prefer code that is obvious over code that is clever.
 
Read the Next.js guide in `node_modules/next/dist/docs/` before touching Next.js APIs (see AGENTS.md). This skill covers style and structure only.
 
## 1. Core principles
 
1. **One file, one responsibility.** If you need "and" to describe a file, split it.
2. **Names say what and why.** Reading a name should replace reading the body.
3. **Small units.** A function does one thing; a component renders one thing.
4. **Comments explain why, not what.** Delete comments that restate the code.
5. **Change only what is asked.** Small, focused diffs; no drive-by refactors.
6. **Reuse before adding.** Search `src/service/` and shared components first.
## 2. Naming
 
| Kind | Rule | Example |
| --- | --- | --- |
| Component | PascalCase noun | `CacheTable`, `BitRow` |
| Function | verb + object | `simulateLru`, `parseBinaryInput` |
| Boolean | `is` / `has` / `can` prefix | `isHit`, `hasError` |
| Event handler | `handle` + event | `handleStepClick` |
| Props callback | `on` + event | `onStepChange` |
| Constant | UPPER_SNAKE_CASE | `MAX_CACHE_SIZE` |
| Type | PascalCase, no `I` prefix | `CacheStep` |
| File | kebab-case | `cache-lesson.tsx` |

Avoid abbreviations (`idx`, `tmp`, `res`, `val`) unless universal (`i` in a tiny loop, `id`). Domain terms stay precise: use `hit`, `miss`, `evict`, `frequency`, `bit`, `radix` consistently.
 
## 3. Functions
 
- Aim for under ~30 lines; if it needs section comments, extract named functions.
- Max 3 parameters; beyond that, pass one typed object.
- Use early returns to avoid deep nesting (max 2 levels).
- Keep pure logic pure: input in, output out, no DOM, no React, no hidden state.
- Replace magic numbers and strings with named constants.
- Prefer explicit return types on exported functions.
```ts
// Good: named, pure, early return
export function findEvictionIndex(entries: CacheEntry[]): number {
  if (entries.length === 0) return -1;
  return entries.reduce(
    (oldest, entry, index) => (entry.loadedAt < entries[oldest].loadedAt ? index : oldest),
    0,
  );
}
```
 
## 4. TypeScript
 
- No `any`. Use `unknown` and narrow, or define a type.
- Model states with union types (`"idle" | "running" | "done"`) instead of loose strings or boolean pairs.
- Export a type only when another file uses it.
- Keep types next to the code that owns them; move to `types.ts` only when shared.
## 5. React components
 
- A component receives props, renders UI, and wires events. It does not contain algorithms.
- Move algorithms to `src/service/`, derived state to a custom hook, repeated markup to a child component.
- Keep `"use client"` only on files that use state, effects, or event handlers. Push the boundary as low as possible so parents stay Server Components.
- Order inside a component: hooks, derived values, handlers, JSX.
- Avoid inline anonymous logic in JSX longer than one expression; name it as a handler or variable.
- Lists need stable `key`s (not array index when order can change).
- Interactive elements are real `button` / `a` (use `next/link` for routes) with visible focus and correct `aria-current` / `aria-label`.
## 6. When to split a file
 
Split when any of these is true:
 
- File exceeds ~200 lines (component) or ~300 lines (helpers).
- It mixes UI, algorithms, and constants.
- A block is used by two or more files.
- You scroll to find things or need section banners.
Do **not** split when:
 
- The piece is used once, is under ~30 lines, and is tightly coupled to its parent.
- Splitting would create files that only re-export or forward props.
- It would force passing 5+ props through just to separate markup.
### Target layout per lesson

```
src/app/<topic>/
  page.tsx                  # route entry, composes the lesson (Server Component)
  <topic>-lesson.tsx        # client shell: state wiring, layout of the lesson
  components/               # presentational pieces (tables, controls, legends)
  use-<topic>-lesson.ts     # custom hook for lesson state, if the shell grows
  constants.ts              # lesson-specific constants and default inputs
  types.ts                  # lesson-specific types shared by 2+ files
src/service/
  learning-utils.ts         # shared pure helpers (split by domain when large)
```

When `learning-utils.ts` grows past ~300 lines, split by domain and keep one barrel-free import path per file:

```
src/service/
  cache/fifo.ts  lru.ts  min.ts  lfu.ts  types.ts
  bits/binary.ts  conversion.ts
```

Import from the specific file; do not add `index.ts` re-export barrels unless asked.
## 7. Comments and docs
 
- Use a short JSDoc on exported functions whose behaviour is not obvious (tie-breakers, edge cases, units).
- Explain non-obvious decisions: "LFU breaks ties with LRU so the result is deterministic."
- Never leave commented-out code or stale TODOs.
## 8. CSS
 
- Reuse existing files: `globals.css`, `layout.css`, `lesson.css`. Follow existing selectors and breakpoints.
- Class names describe the thing (`cache-table__row--hit`), not the look (`red-box`).
- One concern per rule block; group related rules and keep the file's existing order.
- Keep the fixed dark theme; do not add theme toggles.
## 9. Errors and edge cases
 
- Validate user input at the boundary (converter fields, cache size) and show a clear message.
- Handle empty and invalid input explicitly; never rely on silent `NaN`.
- Helpers throw or return a typed result; components decide how to display it.
## 10. Before finishing a change
 
Self-check (do not run tests, lint, or builds unless the user asks):
 
- [ ] Names are clear and consistent with the domain.
- [ ] No function does two jobs; no component holds algorithms.
- [ ] Logic lives in `src/service/`, UI in the lesson component.
- [ ] `"use client"` exists only where needed.
- [ ] Sidebar links and `aria-current` still match the routes.
- [ ] No dead code, unused imports, or leftover comments.
- [ ] Diff is limited to what the user asked for.
- [ ] Summary tells the user which files changed and why they were split.
