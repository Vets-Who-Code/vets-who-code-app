# Feature Spec: Reusable Button Component Enhancement

**Feature:** 896-reusable-button-plan  
**Issue:** [#896](https://github.com/Vets-Who-Code/vets-who-code-app/issues/896)  
**Status:** Ready for planning  
**Date:** 2026-05-26

---

## Overview

The application has a shared `Button` component that most teams use, but raw `<button>`
elements with bespoke Tailwind or CSS module classes still exist in several places.
This creates inconsistent visual styles, inaccessible interactions, and maintenance
overhead. The existing Button already handles brand colors and sizing correctly — it
just needs four targeted improvements so it can replace every ad-hoc button in the
codebase.

---

## User Stories

### US1 — Semantic variant selection (P1)

As a developer building a UI feature, I want to express button intent (ghost, secondary,
danger) using a dedicated prop so I never have to re-declare brand colors in `className`.

**Acceptance criteria:**
- Button accepts `variant="ghost"` and renders with no background or border
- Button accepts `color="secondary"` and renders with the VWC navy fill
- Button accepts `color="danger"` and renders with the destructive red semantic (same
  red token as primary, distinct prop)
- All new combinations render without visual regressions on existing `contained primary`
  and `outlined light` usages

### US2 — Ref forwarding and attribute pass-through (P1)

As a developer integrating Button with a form library or Radix primitive, I want refs
and native HTML attributes (`aria-*`, `data-*`, `form`, `name`) to pass through
automatically so I don't have to maintain a growing explicit prop list.

**Acceptance criteria:**
- A forwarded ref resolves to the underlying `HTMLButtonElement`
- `aria-label`, `data-testid`, `form`, and `name` attributes appear on the rendered
  element when passed as props
- `onClick`, `disabled`, and `type` continue to behave identically to today

### US3 — Test coverage (P1)

As a developer, I want automated tests for the Button component so regressions are
caught before merging.

**Acceptance criteria:**
- Tests cover: renders children, default type, disabled state, forwardRef, aria-label
  spread, path → Anchor rendering, className merge, and each variant+color combo
- All tests pass in the existing vitest setup

### US4 — Barrel export and callsite consolidation (P2)

As a developer, I want to import Button from `@ui` (not `@ui/button`) and know that
all CTAs in the app are using the shared component, not one-off raw buttons.

**Acceptance criteria:**
- `src/components/ui/index.ts` exists and re-exports Button
- `src/containers/software-factory/cta/index.tsx` uses Button for its submit and ghost
  reset buttons (chip toggles are excluded — they use `aria-pressed` state)
- `src/components/forms/contact-form.tsx` no longer re-declares brand colors in
  `className` when using Button
- At least one additional callsite is converted (target: 3–5 total)

---

## Functional Requirements

- FR-01: `variant` prop accepts `"contained" | "outlined" | "texted" | "ghost"` (adds `ghost`)
- FR-02: `color` prop accepts `"primary" | "light" | "secondary" | "danger"` (adds `secondary`, `danger`)
- FR-03: Component wraps with `React.forwardRef<HTMLButtonElement, ButtonProps>`
- FR-04: `ButtonProps` extends `React.ButtonHTMLAttributes<HTMLButtonElement>`
- FR-05: All existing `defaultProps` defaults move to destructure parameter defaults
- FR-06: `src/components/ui/index.ts` barrel file exports Button
- FR-07: Props `disabled`, `type`, `onClick` continue to work identically
- FR-08: When `path` prop is set, component renders as `<a>` via Anchor — ref is not
  forwarded in that case
- FR-09: No new npm dependencies introduced
- FR-10: JSDoc documents the variant/color matrix and path→Anchor behavior

---

## Success Criteria

- Zero TypeScript errors after changes (`npx tsc --noEmit` passes)
- All existing tests continue to pass
- New Button tests pass (≥10 test cases)
- At least 3 callsites updated to use Button instead of raw elements or over-riding className
- No `defaultProps` usage remains in `src/components/ui/button/index.tsx`

---

## Out of Scope

- `isLoading` prop — loading state is caller responsibility
- CVA or any new styling dependency
- CSS module file for Button
- Storybook stories
- Changing the `variant` + `color` two-prop API to a flat single-prop API
- Converting chip toggle buttons in `software-factory/cta` (specialized `aria-pressed` UI)

---

## Assumptions

- The project's Tailwind config has `secondary` color token mapped to VWC navy `#091f40`
- `clsx` is already available (it is — already used by Button today)
- The `@testing-library/react` and `vitest` setup works for the `__tests__/components/`
  directory (confirmed by existing test files)
- Import alias `@ui/*` resolves to `src/components/ui/*` (confirmed in `tsconfig.json`)
