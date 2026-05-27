# Tasks: Reusable Button Component Enhancement

**Feature:** 896-reusable-button-plan  
**Issue:** [#896](https://github.com/Vets-Who-Code/vets-who-code-app/issues/896)  
**Total tasks:** 18  
**Date:** 2026-05-26

---

## Phase 1 — Setup

**Goal:** Confirm clean baseline before any edits.

- [ ] T001 Validate TypeScript baseline with `npx tsc --noEmit` from project root — confirm zero errors before touching any files

---

## Phase 2 — Foundation

**Goal:** Read existing component to confirm current structure and surface any drift from design doc.

- [ ] T002 Read `src/components/ui/button/index.tsx` and confirm: variant union, color union, defaultProps present, no forwardRef, no HTMLButtonAttributes extension — no file changes; verify by inspection

---

## Phase 3 — US1: New Variants + defaultProps Fix

**Goal:** Add `ghost` variant, `secondary` and `danger` colors, replace `defaultProps`.

**Independent Test:** `<Button variant="ghost" color="secondary">Label</Button>` renders without errors and produces no background/border base classes.

- [ ] T003 [US1] Add `"ghost"` to `variant` union in `ButtonProps` and add ghost class logic (no bg, no border, hover tint per color) in `src/components/ui/button/index.tsx`; verify with `npx tsc --noEmit`
- [ ] T004 [US1] Add `"secondary"` and `"danger"` to `color` union in `ButtonProps` and add their contained/outlined class maps in `src/components/ui/button/index.tsx`; verify with `npx tsc --noEmit`
- [ ] T005 [US1] Replace `Button.defaultProps = {...}` with destructure parameter defaults (`variant = "contained"`, `color = "primary"`, `size = "md"`, etc.) in `src/components/ui/button/index.tsx`; verify with `npx tsc --noEmit`

**Verification:**
- [ ] T006 [US1] Validate Phase 3 — `npx tsc --noEmit` passes with zero errors — Phase merge gate

---

## Phase 4 — US2: forwardRef + HTMLButtonAttributes

**Goal:** Wrap with `React.forwardRef`, extend props from `HTMLButtonAttributes`.

**Independent Test:** `const ref = React.createRef<HTMLButtonElement>(); render(<Button ref={ref}>X</Button>)` — `ref.current` is an `HTMLButtonElement`.

- [ ] T007 [US2] Extend `ButtonProps` with `React.ButtonHTMLAttributes<HTMLButtonElement>`, remove explicit `onClick?: () => void` and `disabled?: boolean` (now inherited), and wrap component with `React.forwardRef<HTMLButtonElement, ButtonProps>` in `src/components/ui/button/index.tsx`; verify with `npx tsc --noEmit`

**Verification:**
- [ ] T008 [US2] Validate Phase 4 — `npx tsc --noEmit` passes and all existing callers compile — Phase merge gate

---

## Phase 5 — US3: Tests

**Goal:** Full test coverage for Button per spec acceptance criteria.

**Independent Test:** `pnpm vitest run __tests__/components/ui/button.test.tsx` passes all cases.

- [ ] T009 [US3] Create `__tests__/components/ui/button.test.tsx` with test skeleton; write tests: renders children, defaults to `type="button"`, `disabled` sets HTML attribute and applies opacity class; verify with `pnpm vitest run __tests__/components/ui/button.test.tsx`
- [ ] T010 [US3] Add tests to `__tests__/components/ui/button.test.tsx`: forwardRef resolves to HTMLButtonElement, `aria-label` passes through, `data-testid` passes through; verify with `pnpm vitest run __tests__/components/ui/button.test.tsx`
- [ ] T011 [US3] Add tests to `__tests__/components/ui/button.test.tsx`: `path` prop renders as `<a>` not `<button>`, `className` merges with base classes, `ghost` variant has no border/background; verify with `pnpm vitest run __tests__/components/ui/button.test.tsx`
- [ ] T012 [US3] Add variant+color matrix tests to `__tests__/components/ui/button.test.tsx`: each of `contained/outlined/ghost` × `primary/light/secondary/danger` renders without throwing; verify with `pnpm vitest run __tests__/components/ui/button.test.tsx`

**Verification:**
- [ ] T013 [US3] Validate Phase 5 — `pnpm vitest run __tests__/components/ui/button.test.tsx` — all tests pass — Phase merge gate

---

## Phase 6 — US4: Barrel Export + Callsite Updates + JSDoc

**Goal:** Barrel export, 3–5 callsite updates, JSDoc.

**Independent Test:** `import { Button } from "@ui"` resolves correctly after barrel creation.

- [ ] T014 [P] [US4] Create `src/components/ui/index.ts` exporting `Button` as named export (`export { default as Button } from "./button"`); verify with `npx tsc --noEmit`
- [ ] T015 [US4] Update `src/containers/software-factory/cta/index.tsx`: replace `<button className={styles.btnPrimary}>` with `<Button color="primary" fullwidth>` and `<button className={styles.btnGhost}>` with `<Button variant="ghost" color="light">`; add `import Button from "@ui/button"` if not present; remove dead `btnPrimary` and `btnGhost` selectors from `cta.module.css`; verify with `npx tsc --noEmit`
- [ ] T016 [US4] Update `src/components/forms/contact-form.tsx` (line 174): replace the large `className` override (`tw-bg-red tw-text-white hover:tw-bg-red-crimson ...`) with `fullwidth` only — the component defaults (`variant="contained" color="primary"`) already supply those styles; verify with `npx tsc --noEmit`
- [ ] T017 [P] [US4] Grep `src/` for remaining `<button className=` patterns (excluding ui/button itself and specialized components); convert up to 2 additional callsites to use Button; target 3–5 total updated across Phases 6 callsites; verify each with `npx tsc --noEmit`
- [ ] T018 [US4] Add JSDoc to `ButtonProps` and `Button` in `src/components/ui/button/index.tsx` covering: what the component does, variant/color matrix, `path`→Anchor behavior

---

## Phase 7 — Polish

**Goal:** Final validation sweep. Confirm all criteria from spec.md met.

- [ ] T019 Validate full type-check `npx tsc --noEmit` — zero errors
- [ ] T020 [P] Validate test suite `pnpm vitest run __tests__/components/ui/` — all pass
- [ ] T021 [P] Confirm no `defaultProps` usage remains in `src/components/ui/button/index.tsx` with `grep "defaultProps" src/components/ui/button/index.tsx` — expect zero matches

**Verification — final merge gate:**
- [ ] T022 All Phase 7 checks pass: zero TS errors, all tests green, no defaultProps, 3–5 callsites updated

---

## Dependencies

```
T001 (baseline) → T002 (audit) → T003–T005 (US1) → T006 (gate)
                                                   → T007 (US2) → T008 (gate)
                                                                 → T009–T012 (US3) → T013 (gate)
                                                                                    → T014, T015, T016, T017, T018 (US4)
                                                                                                                      → T019–T022 (polish)
```

T014 and T017 are [P] — they touch different files from each other and can run in
parallel once T013 (test gate) passes.

---

## Parallelization

**Wave 0** (sequential): T001 → T002  
**Wave 1** (sequential): T003 → T004 → T005 → T006  
**Wave 2** (sequential): T007 → T008  
**Wave 3** (sequential): T009 → T010 → T011 → T012 → T013  
**Wave 4** (parallel): T014 ‖ T017; then T015 → T016 → T018 (sequential among themselves)  
**Wave 5** (parallel): T019 ‖ T020 ‖ T021 → T022  

---

## Implementation Strategy

MVP: Phases 1–4 (T001–T008) — core component improvements usable immediately.  
Full delivery: Phases 5–7 — tests, barrel, callsites, polish.

Single PR — all 6 phases are mutually dependent (tests verify the component changes,
callsites depend on the new API). The diff is small (2 modified + 2 created files +
up to 5 callsite edits) and reviewable in one pass.
