# Interactive Lessons (`/learn`)

learnjavascript.online-style coding lessons: a learner edits `index.html` / `index.css` /
`index.js`, runs it live in a sandboxed preview, and their code is graded by assertion
tests. Lessons are **git-tracked content** — adding one is a new data file, not new code.

- **Live at:** `/learn` (catalog) and `/learn/[slug]` (workspace). Both are **members-only**
  (SSR + `requireAuthSSR`) — signed-out visitors are redirected to `/login`.
- **Discoverable via:** the **avatar menu** (signed-in), not the public top nav.

---

## Add a lesson

1. **Create the file** `src/data/interactive-lessons/module-0X/<slug>.ts`, exporting one
   `InteractiveLesson` (template below).
2. **Register it** in `src/data/interactive-lessons/index.ts` — import it and add it to the
   `INTERACTIVE_LESSONS` array (order in the array doesn't matter; see ordering below).
3. **Verify:** `npm test` runs a content-lint on every lesson (well-formed, 2–6 tests, etc.).
   Then sign in and open `/learn/<slug>` — confirm the **starter fails** and, after pasting
   `solutionFiles`, **all tests pass**.

Ordering in the catalog + Back/Next is `module` ascending, then `order` ascending.

### Template

```ts
import type { InteractiveLesson } from "@/lib/interactive-lessons/types";

export const mySlug: InteractiveLesson = {
    slug: "my-slug",                 // URL: /learn/my-slug — must be unique
    title: "Human Title",
    module: 5,                       // Hashflag Stack module number
    moduleTitle: "JavaScript Fundamentals",
    order: 3,                        // position within the module
    hasPreview: true,                // false => JS-only: Console leads, Browser tab hidden
    runtime: "browser-web",          // reserved; "browser-pyodide" would unlock Python later
    instructions: `## What to do\n\nMarkdown. Explain the task; end with a nudge to hit **RUN**.`,
    files: [
        { name: "index.html", contents: `<h1>Start here</h1>\n<div id="app"></div>\n` },
        { name: "index.css", readOnly: true, contents: `body { font-family: system-ui; }` },
        { name: "index.js", contents: `// TODO: learner writes this\n` },
    ],
    tests: [
        { name: "renders something", body: `assert(document.querySelector("#app"), "No #app found.");` },
        {
            name: "shows the value",
            body: `assertEqual(document.querySelector("#app").textContent.trim(), "42", "Wrong text.");`,
        },
    ],
    solutionFiles: [
        { name: "index.js", contents: `document.querySelector("#app").textContent = "42";` },
    ],
};
```

---

## Authoring rules (the sharp edges)

- **`index.html` is BODY markup, not a full document.** The sandbox supplies the
  `<!doctype>`/`<head>` skeleton and injects your CSS/JS. Don't write `<html>`/`<head>`/`<body>`.
- **Test `body` is JavaScript that runs inside the iframe** after the learner's code, with
  `assert(cond, msg)`, `assertEqual(actual, expected, msg)`, and `document` / `window` /
  `getComputedStyle` in scope. **Throw (or fail an assert) to fail the test.**
- **Tested functions must be function _declarations_** (`function foo(){}`) — the learner JS
  runs as a classic script, so declarations land on `window` where tests can reach them.
- **CSS lessons: assert with `getComputedStyle`** (tests run in a real browser iframe). Give the
  learner the HTML as `readOnly` and have them write the CSS.
- **`readOnly: true`** marks provided files (given data, fixed markup) — shown but not editable,
  and never persisted/reset.
- **`hasPreview: false`** for pure-logic lessons (no visible page) — Console leads, tests still run.
- **`solutionFiles`** is the reference solution — only the files the learner edits (skip
  `readOnly` ones). Used by the Playwright/dev checks and a future reveal-solution UI. Keep it
  passing: if you change a lesson, re-verify the solution.
- **Keep 2–6 tests** with **plain-English `name`s and helpful failure `msg`s** — the message is
  what the learner reads when they're stuck.

---

## How it runs (architecture)

- **Content:** `src/data/interactive-lessons/**` (this doc). Types: `src/lib/interactive-lessons/types.ts`.
  Loader (ordering, prev/next, grouping): `src/lib/interactive-lessons/index.ts`.
- **Sandbox:** `src/lib/lesson-sandbox/` assembles the learner files into an
  `<iframe srcdoc>` — `sandbox="allow-scripts"` **without** `allow-same-origin`, so learner
  code runs at an **opaque origin** and can't touch the parent session/cookies/localStorage.
  A console shim + a test runner are injected; results return to the parent via `postMessage`,
  authenticated by frame identity + a monotonic `runId` (so stale runs are dropped).
  - `build-srcdoc.ts` — pure string builder (unit-tested)
  - `harness.ts` — the injected console/error/test-runner JS
  - `messages.ts` — the parent⇆iframe message contract + `isLessonMessage` guard
- **UI:** `src/containers/interactive-lesson/` (workspace state, Run/Reset, the message listener,
  localStorage persistence per `slug:file`) + `src/components/lesson-console`,
  `lesson-test-results`, and the extended `src/components/code-editor` (Ace, html/css/js modes).
- **Pages:** `src/pages/learn/index.tsx` (catalog) + `src/pages/learn/[slug].tsx` — SSR, gated.
- **Progress:** the `InteractiveProgress` Prisma model (`userId` + `lessonSlug`) via
  `src/pages/api/learn/progress.ts` (auth-gated). Completion auto-records the moment every test
  passes.

### UI gotcha worth knowing

Any heading placed on a **dark background** needs an **explicit light color class** (e.g.
`tw-text-cream`) — the design system's global `h1 { color: navy }` rule overrides an inherited
light color, so relying on inheritance renders dark-on-dark.

---

## Not yet built (deferred)

Python/Pyodide lessons (the `runtime` field + `challenge-runner`'s `"browser-pyodide"` string
reserve the slot) · reveal-solution UI · AI-coach hookup · a progress dashboard.
