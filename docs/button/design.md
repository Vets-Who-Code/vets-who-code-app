# Design: Reusable Button Component Enhancement

**Issue:** [#896](https://github.com/Vets-Who-Code/vets-who-code-app/issues/896)  
**Branch:** `896-reusable-button-plan`  
**Date:** 2026-05-26

---

## Problem

Raw `<button>` elements with inline Tailwind or CSS module classes exist alongside
the shared `Button` component, producing inconsistent styles and accessibility. The
existing `Button` at `src/components/ui/button/index.tsx` is already well-built and
brand-aligned but has three gaps:

1. No `forwardRef` — third-party integrations (Radix, react-hook-form) can't obtain a ref.
2. No `React.ButtonHTMLAttributes` spread — native attrs (`aria-*`, `data-*`, `form`, `name`) are silently swallowed.
3. Missing semantic variants: `ghost`, `secondary`, `danger`.
4. Uses deprecated `defaultProps` pattern (React 18+).
5. No tests.
6. No barrel export from `src/components/ui/index.ts`.

---

## What Is NOT Changing

- The two-prop API (`variant` + `color`) is kept — changing it would break ~15 callers.
- `isLoading` is **out of scope**. Loading state is caller responsibility; the existing
  pattern (`disabled={isSubmitting}` + conditional children text) is correct and
  consistent. A `LoadingButton` wrapper can be added later if the pattern becomes
  repeated enough to justify it.
- No CVA, no new dependencies. `clsx` stays.
- No CSS module file. Tailwind utilities only.
- No Storybook (not in project).

---

## Architecture

Single file change: `src/components/ui/button/index.tsx`.

### Updated `ButtonProps`

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    // variant: add 'ghost'
    variant?: "contained" | "outlined" | "texted" | "ghost";
    // color: add 'secondary' (navy) and 'danger' (destructive red alias)
    color?: "primary" | "light" | "secondary" | "danger";
    size?: "xs" | "sm" | "md" | "lg";
    shape?: "tw-rounded" | "square" | "ellipse";
    fullwidth?: boolean;
    active?: boolean;
    iconButton?: boolean;
    path?: string;
    label?: string;
    hover?: "default" | "light" | false;
    // 'disabled' and 'onClick' are now inherited from HTMLButtonAttributes
    // 'type' is now inherited from HTMLButtonAttributes
    className?: string; // still explicit for clarity
}
```

Extending `HTMLButtonAttributes` means `disabled`, `type`, `onClick`, `aria-*`,
`data-*`, `form`, `name`, `id` all pass through via `...rest` spread.

### `forwardRef` wrapper

```ts
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "contained", color = "primary", size = "md", ...rest }, ref) => {
        // ...class composition unchanged...
        return <button ref={ref} className={classnames} {...rest} />;
    }
);
```

`defaultProps` is removed; all defaults move to destructure parameters.

When `path` is provided the component renders an `Anchor` — `ref` is not forwarded
in that case (same behavior as today).

### New variant/color classes

**`ghost` variant** — transparent background, no border, subtle hover tint:
- `ghost` + `primary`: text-primary, hover:bg-primary/10
- `ghost` + `light`: text-white, hover:bg-white/10
- `ghost` + `secondary`: text-navy, hover:bg-navy/10

**`secondary` color** — navy fill (VWC secondary brand color):
- `contained` + `secondary`: bg-secondary, text-white, hover: deeper navy
- `outlined` + `secondary`: border-secondary, text-secondary, hover: navy fill

**`danger` color** — semantic alias for destructive actions (same red token as
`primary`, distinct prop so callers signal intent explicitly):
- `contained` + `danger`: same red fill as primary, distinct semantic meaning
- `outlined` + `danger`: red border + text, hover: red fill

---

## Barrel Export

Create `src/components/ui/index.ts` exporting `Button` (and other UI primitives
already in the directory). Callers can then import from `@ui` instead of `@ui/button`.

---

## Tests

File: `__tests__/components/ui/button.test.tsx`

| Test | Assertion |
|---|---|
| Renders children | text content present |
| Defaults to `type="button"` | no accidental form submit |
| `disabled` sets HTML attribute | `getByRole('button')` has `disabled` |
| `disabled` applies opacity class | className contains opacity utility |
| `path` renders Anchor | element is `<a>`, not `<button>` |
| `forwardRef` forwards to DOM node | ref.current is HTMLButtonElement |
| `aria-label` passes through | attribute present on element |
| `className` merges with base | both classes present |
| Each `variant` + `color` combo | renders without throwing |
| `ghost` variant | no border/background base classes |

Test setup follows existing pattern: `@testing-library/react` + `vitest`, located in
`__tests__/components/ui/`.

---

## Callsite Updates (3–5 files)

Target components that bypass `Button` with raw elements or over-ride it with
redundant `className` declarations:

1. **`src/containers/software-factory/cta/index.tsx`**  
   Replace `<button className={styles.btnPrimary}>` → `<Button variant="contained">`  
   Replace `<button className={styles.btnGhost}>` → `<Button variant="ghost" color="light">`  
   Chip toggle buttons are left as-is (specialized pressed-state UI, not CTAs).

2. **`src/components/forms/contact-form.tsx`** (line 174)  
   Remove the large `className` override that re-declares colors already in the
   component (`tw-bg-red`, `tw-text-white`, hover states). Use `variant="contained"
   color="primary" fullwidth` instead.

3. Additional files TBD during implementation — grep for `<button` in `src/` will
   surface remaining candidates; target 3–5 total.

---

## JSDoc

Add a brief JSDoc block to `ButtonProps` and `Button` covering: what the component
does, the variant/color matrix, and the `path` → Anchor behavior.

---

## Design Decisions Log

| Decision | Rationale |
|---|---|
| Keep two-prop API (variant + color) | Changing to flat variant would break ~15 callers |
| Drop `isLoading` | Caller responsibility; existing pattern is consistent |
| `danger` as color alias | Same token as primary but semantic distinction for destructive actions |
| No CVA | Not in codebase; adding a dependency for one component is not justified |
| Chip buttons in software-factory CTA left alone | Specialized toggle UI with `aria-pressed`, not generic CTAs |
