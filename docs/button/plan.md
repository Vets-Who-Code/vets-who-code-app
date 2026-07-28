# Implementation Plan: Reusable Button Component Enhancement

**Feature:** 896-reusable-button-plan  
**Issue:** [#896](https://github.com/Vets-Who-Code/vets-who-code-app/issues/896)  
**Date:** 2026-05-26

---

## Technical Context

| Item | Value |
|---|---|
| Framework | Next.js 15, React 18, TypeScript |
| Styling | Tailwind CSS 3 (tw- prefix), clsx |
| Test runner | vitest + @testing-library/react |
| Import alias | `@ui/*` → `src/components/ui/*` |
| Existing Button | `src/components/ui/button/index.tsx` |
| Design doc | `docs/superpowers/specs/2026-05-26-reusable-button-design.md` |

---

## Files Touched

| File | Action | Notes |
|---|---|---|
| `src/components/ui/button/index.tsx` | MODIFY | Core changes — forwardRef, new variants, defaultProps fix, JSDoc |
| `src/components/ui/index.ts` | CREATE | Barrel export |
| `__tests__/components/ui/button.test.tsx` | CREATE | New test file |
| `src/containers/software-factory/cta/index.tsx` | MODIFY | Replace raw buttons |
| `src/components/forms/contact-form.tsx` | MODIFY | Remove className override |
| Up to 2 more callsites | MODIFY | Identified during T017 grep |

---

## Phase Structure

### Phase 1 — Setup
Confirm clean TypeScript baseline before touching any files.

### Phase 2 — Foundation (read-only audit)
Confirm existing component structure before editing.

### Phase 3 — US1: New Variants
Add `ghost` variant and `secondary`/`danger` colors. Replace `defaultProps`.
All changes in `src/components/ui/button/index.tsx`.

### Phase 4 — US2: forwardRef + HTMLButtonAttributes
Wrap with `React.forwardRef`, extend props interface.
All changes in `src/components/ui/button/index.tsx`.

### Phase 5 — US3: Tests
Write `__tests__/components/ui/button.test.tsx` covering all spec acceptance criteria.

### Phase 6 — US4: Barrel + Callsites
Create barrel, update 3–5 callsites, add JSDoc.

### Phase 7 — Polish
Final grep sweep for remaining raw buttons. Full type-check + test run merge gate.

---

## Variant/Color Class Map

### New: `ghost` variant
```
ghost + primary  → tw-text-primary hover:tw-bg-primary/10
ghost + light    → tw-text-white hover:tw-bg-white/10
ghost + secondary → tw-text-secondary hover:tw-bg-secondary/10
ghost + danger   → tw-text-primary hover:tw-bg-primary/10
```
No border, no background. Hover adds a subtle tint.

### New: `secondary` color  
```
contained + secondary → tw-bg-secondary tw-border-secondary tw-text-white
                        hover: tw-bg-navy-deep tw-border-navy-deep
outlined  + secondary → tw-border-secondary tw-text-secondary
                        hover: tw-bg-secondary tw-text-white
```

### New: `danger` color
```
contained + danger → same classes as contained + primary (red fill)
                     (semantic distinction only — caller signals destructive intent)
outlined  + danger → same classes as outlined + primary (red border/text)
```

---

## forwardRef Pattern

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "contained",
            color = "primary",
            size = "md",
            shape = "square",
            fullwidth = false,
            active = false,
            disabled = false,
            iconButton = false,
            hover = "default",
            children,
            className,
            path,
            label,
            ...rest   // ← spreads all HTMLButtonAttributes
        },
        ref
    ) => {
        // ...class composition...
        if (path) {
            return <Anchor path={path} className={classnames} aria-label={label} {...rest}>{children}</Anchor>;
        }
        return (
            <button ref={ref} className={classnames} aria-label={label} {...rest}>
                {children}
            </button>
        );
    }
);
```

`onClick` and `disabled` and `type` come through `...rest` — explicit props in the
old interface are removed (they're inherited from `HTMLButtonAttributes`).

---

## Barrel Export

`src/components/ui/index.ts`:
```ts
export { default as Button } from "./button";
// Future: add other ui primitives as needed
```

---

## Test Strategy

File: `__tests__/components/ui/button.test.tsx`

Follow existing test patterns from `__tests__/components/AITeachingAssistant.test.tsx`:
- `@testing-library/react` render + screen queries
- vitest `describe` / `it` / `expect`

All 10+ cases from spec.md US3 acceptance criteria.

---

## Callsite Guidance

### `src/containers/software-factory/cta/index.tsx`

Before:
```tsx
<button type="submit" disabled={state === "sending"} className={styles.btnPrimary}>
    {state === "sending" ? "Transmitting…" : "Transmit →"}
</button>
<button type="button" onClick={reset} className={styles.btnGhost}>
    Send another →
</button>
```

After:
```tsx
<Button type="submit" disabled={state === "sending"} color="primary" fullwidth>
    {state === "sending" ? "Transmitting…" : "Transmit →"}
</Button>
<Button type="button" onClick={reset} variant="ghost" color="light">
    Send another →
</Button>
```

Remove unused `styles.btnPrimary` and `styles.btnGhost` from `cta.module.css` if no
other selectors reference them (check first).

### `src/components/forms/contact-form.tsx` (line 174)

Before:
```tsx
<Button
    type="submit"
    className="tw-w-full tw-transform tw-rounded-lg tw-bg-red tw-px-6 tw-py-4 ..."
>
```

After:
```tsx
<Button type="submit" fullwidth>
```

The explicit color/hover classes are redundant — they duplicate what `variant="contained"
color="primary"` already provides.
