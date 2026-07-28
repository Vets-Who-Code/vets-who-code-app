# Delivery Plan: Reusable Button Component Enhancement (896)

**Feature**: `896-reusable-button-plan` | **Date**: 2026-05-27  
**Source**: `docs/button/tasks.md` (22 tasks)  
**Parent issue**: #896

> **Note**: `speckit.analyze` was not run before this delivery plan was created.
> The spec has no `[NEEDS CLARIFICATION]` markers and task numbering was verified
> manually. The implementation was committed in `bc954268` before this plan was
> written (retrospective delivery plan).

---

## PR Decomposition

| PR | Tasks | Files Touched | Size | Merge Condition |
|----|-------|--------------|------|----------------|
| TBD | T001–T022 | `src/components/ui/button/index.tsx` (modified), `__tests__/components/ui/button.test.tsx` (created), `src/components/ui/index.ts` (created), `src/containers/software-factory/cta/index.tsx` (modified), `src/containers/software-factory/cta/cta.module.css` (modified), `src/components/forms/contact-form.tsx` (modified), up to 2 additional callsites (modified) | M | Zero TS errors, all tests green, 3–5 callsites updated, no `defaultProps` remaining |

**Rationale**: Single PR. US1–US4 are mutually dependent — US4 callsite updates require
the new API from US1+US2, and US3 tests verify the component changes that underpin
everything. A reviewer needs the full picture to assess correctness. The diff is
M-size (6–8 files) but reviewable in one pass.

**PR closes**: `Closes #896`

---

## Issue Grouping Map

**Grouping pattern**: Single issue (#896 — parent already exists, no child issues)  
**Rationale**: All 4 user stories ship in one PR under one issue. No child issues
created — US1–US4 story breakdown is tracked in `tasks.md` and `delivery.md` only.

---

## Parallelization Waves

| Wave | Mode | Tasks | Gate / Notes |
|------|------|-------|-------------|
| 0 | Sequential | T001 → T002 | T001 must pass before any edits; T002 confirms structure before writing |
| 1 | Sequential | T003 → T004 → T005 → T006 | All touch `button/index.tsx` — sequential to avoid conflicts; T006 is tsc gate |
| 2 | Sequential | T007 → T008 | T007 depends on T003–T005 output; T008 is tsc gate |
| 3 | Sequential | T009 → T010 → T011 → T012 → T013 | Test file built incrementally; T013 is vitest gate |
| 4 | Parallel then sequential | T014 ‖ T017, then T015 → T016 → T018 | T014 (barrel) and T017 (grep) touch different files; T015/T016/T018 are sequential callsite updates |
| 5 | Parallel then sequential | T019 ‖ T020 ‖ T021 → T022 | T019/T020/T021 are independent read-only checks; T022 is final merge gate |

**Single-agent order** (recommended — S/M feature, mostly sequential):
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T017 → T015 → T016 → T018 → T019 → T020 → T021 → T022

---

## Agent Fanning Instructions

Single agent recommended for this M feature. Most waves are sequential because tasks
share `button/index.tsx`. Only Wave 4 and Wave 5 offer genuine parallelism:

**Wave 4 fanning (2 agents after T013 passes):**

**Agent A prompt:**
```
Create `src/components/ui/index.ts` with the following content:
  export { default as Button } from "./button";
Then run `npx tsc --noEmit` and confirm zero errors.
Branch: 896-reusable-button-plan
```

**Agent B prompt:**
```
Grep `src/` for remaining `<button className=` patterns (excluding
`src/components/ui/button/` itself and specialized `aria-pressed` components).
Report the file paths and line numbers. Do not edit anything yet.
Branch: 896-reusable-button-plan
```

**Fan-in gate after Wave 4:** `npx tsc --noEmit && pnpm vitest run __tests__/components/ui/`

---

## Verification Checklist

- [x] `delivery.md` written to `docs/button/delivery.md`
- [x] PR count justified (single PR — mutual dependency rationale)
- [x] Issue count matches grouping pattern (4 children + parent, not 1:1)
- [x] Every task assigned to exactly one wave
- [x] PR closes #896 (single issue, no child issues)
- [ ] PR created with `Closes #896` in description
