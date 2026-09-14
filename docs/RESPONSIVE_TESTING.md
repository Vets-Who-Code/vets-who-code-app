# Responsive Design Testing Guide

How to verify a UI change across this app's breakpoints before you open a PR.

**Scope:** breakpoint-level verification — widths, layout reflow, container behavior, and the
Tailwind patterns we use to get there. Device-level concerns — real hardware, PWA install,
offline mode, orientation changes, and screen-reader passes — live in
[docs/MOBILE_TESTING.md](MOBILE_TESTING.md).

---

## Breakpoints

Source of truth: `tailwind.config.js` (`screens`, lines 284-309). These are **custom values, not
the Tailwind defaults.**

### Min-width breakpoints

| Prefix | Min width | Media query |
| ------ | --------- | ----------- |
| (none) | 0px | mobile-first base styles |
| `sm:` | 576px | `@media (min-width: 576px)` |
| `md:` | 768px | `@media (min-width: 768px)` |
| `lg:` | 992px | `@media (min-width: 992px)` |
| `xl:` | 1200px | `@media (min-width: 1200px)` |
| `2xl:` | 1400px | `@media (min-width: 1400px)` |
| `3xl:` | 1600px | `@media (min-width: 1600px)` |

### Max-width helpers

For targeted overrides that should stop applying above a width.

| Prefix | Range | Media query |
| ------ | ----- | ----------- |
| `maxSm:` | up to 575px | `@media (max-width: 575px)` |
| `maxLg:` | up to 991px | `@media (max-width: 991px)` |
| `maxXl:` | up to 1199px | `@media (max-width: 1199px)` |
| `smToMd:` | 576px - 767px | `@media (min-width: 576px) and (max-width: 767px)` |

### Two things that trip people up

**1. `screens` is inside `theme.extend`, but the defaults do not survive.** The block sits under
`theme:` → `extend:` → `screens:`, so it merges with Tailwind's defaults rather than replacing
them wholesale. It happens to redefine every default key (`sm`, `md`, `lg`, `xl`, `2xl`) and add
`3xl`. Do not reach for the Tailwind default numbers (640/768/1024/1280/1536) — only `md` is the
same, and the rest are gone.

**2. The container cap is not a breakpoint.** `corePlugins.container` is disabled
(`tailwind.config.js:338-340`) and a hand-rolled `.container` component sits on top
(`tailwind.config.js:356-375`):

| Screen | `.container` max-width |
| ------ | ---------------------- |
| base | 100% (15px side gutter) |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | **1230px** |

So the `xl` *breakpoint* fires at 1200px, but content inside `tw-container` caps at **1230px** and
stops growing there — the `2xl` and `3xl` breakpoints still change type and spacing, but they do
not widen the container. Use `tw-container`; do not substitute arbitrary `max-w-*`.

---

## Widths to test

Test the boundaries, not round numbers a designer picked. These seven cover every branch:

| Width | Why |
| ----- | --- |
| 375px | iPhone SE / common phone — inside `maxSm`, below every min-width breakpoint |
| 576px | `sm` and `smToMd` both turn on; `maxSm` turns off |
| 768px | `md` turns on; `smToMd` turns off |
| 992px | `lg` turns on; `maxLg` turns off |
| 1200px | `xl` turns on; `maxXl` turns off; container jumps to 1230px |
| 1440px | Typical laptop — container is already capped, gutters grow |
| 1600px | `3xl` turns on |

### Before every PR that touches UI

- [ ] 375px — no horizontal scroll, nothing clipped
- [ ] 768px — tablet layout reflows, not just a stretched phone view
- [ ] 1440px — desktop layout, container centered and capped
- [ ] Spot-check the boundary nearest whatever you changed (576 / 992 / 1200)

The PR template already carries a Responsive Design checklist — fill it in rather than
duplicating it in the description.

---

## Testing workflow

### 1. Local development

```bash
npm run dev
# http://localhost:3000
```

Resize the browser or use device emulation. Watch for a horizontal scrollbar at every width —
that is the single most common responsive bug in this codebase.

### 2. Browser DevTools

```
Chrome / Edge:
1. Open DevTools (F12)
2. Toggle the device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Set a custom width from the table above
4. Scroll the full page and exercise interactions
```

```
Firefox:
1. Tools → Browser Tools → Responsive Design Mode
2. Cmd+Option+M (macOS) / Ctrl+Shift+M (Windows)
```

### 3. Real devices

Emulation gets layout right and touch wrong. Before shipping anything with taps, drags, or
form input, open it on at least one real phone. See
[docs/MOBILE_TESTING.md](MOBILE_TESTING.md) for the device checklist.

### 4. Playwright at a phone viewport

```bash
npx playwright test --project="Mobile Chrome"
```

The `Mobile Chrome` project (`playwright.config.ts:49-52`) runs the suite with
`devices["Pixel 5"]`.

**Start `npm run dev` first.** Locally, `playwright.config.ts:66` runs
`npm run build && npm run start` before the specs, which costs a full production build. Because
`reuseExistingServer: !process.env.CI` (`:68`) is set, an already-running dev server on port 3000
is reused and the build is skipped.

**Be honest about what this covers.** There is currently **no responsive regression suite**. The
`tests/` directory holds three specs — `tests/e2e/interactive-lesson.spec.ts`,
`tests/e2e/shopify-image-cache.spec.ts`, and `tests/security/auth-protection.spec.ts` — and none
of them calls `setViewportSize` or asserts anything about layout. `--project="Mobile Chrome"`
re-runs those existing specs at a phone viewport, which catches "the app is broken on mobile,"
not "this card wraps wrong at 992px." Manual verification at the widths above is still the real
gate.

---

## What to check

### Layout
- [ ] Content fits the viewport — no horizontal scroll at any width
- [ ] Spacing stays proportional; sections don't collide
- [ ] Grid and flex tracks reflow instead of squeezing
- [ ] `tw-container` used for page width, not arbitrary `max-w-*`

### Navigation
- [ ] Mobile menu opens, closes, and traps focus
- [ ] Every link and button is tappable (44x44px minimum)
- [ ] Dropdowns work on touch, not hover alone
- [ ] The header has very little slack near 1230px — check it explicitly

### Typography
- [ ] Body copy is 16px or larger
- [ ] Headings scale down instead of wrapping into four lines
- [ ] No text overflow or clipped descenders
- [ ] Line length stays readable at wide widths

### Forms
- [ ] Inputs are large enough to tap and are labelled
- [ ] Correct mobile keyboard (`type="email"`, `type="tel"`, etc.)
- [ ] Error messages are visible without scrolling away from the field
- [ ] Submit buttons stay reachable above the keyboard

### Images and media
- [ ] Images scale and never overflow their container
- [ ] Video embeds keep their aspect ratio
- [ ] Icons render at the intended size at every breakpoint

### Tables
- [ ] Wide tables scroll horizontally inside their own container
- [ ] The scroll region is keyboard reachable
- [ ] The most important columns stay visible on a phone

### Modals and overlays
- [ ] Modal fits a 375px-tall-ish viewport; content scrolls if it doesn't
- [ ] Close control is reachable without scrolling
- [ ] Background scroll is locked while open
- [ ] Escape closes it and focus returns to the trigger

### Touch
- [ ] Tap targets are 44x44px minimum
- [ ] Nothing is hover-only
- [ ] Swipe gestures work where implemented

---

## Performance on mobile

- [ ] Page is usable in under 3 seconds on a throttled 3G profile
- [ ] Images are sized and served through Cloudinary/`next/image`, not full-resolution originals
- [ ] No layout shift as fonts and images arrive
- [ ] The JS a phone downloads is proportional to what the page actually does

## Accessibility on mobile

- [ ] Tap targets meet the minimum size
- [ ] Zoom to 200% does not break the layout or hide content
- [ ] Focus order still makes sense once the layout has reflowed
- [ ] Screen-reader pass — see [docs/MOBILE_TESTING.md](MOBILE_TESTING.md)

---

## Screenshots for PRs

For visible UI changes, attach three:

```markdown
## Screenshots

### Mobile (375px)
![Mobile view](url)

### Tablet (768px)
![Tablet view](url)

### Desktop (1440px)
![Desktop view](url)
```

---

## Common Tailwind patterns

The `tw-` prefix is mandatory. Unprefixed classes silently do nothing.

### Responsive padding

```tsx
<div className="tw-px-4 md:tw-px-6 lg:tw-px-8">Content</div>
```

### Responsive grid

```tsx
<div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">Cards</div>
```

### Responsive text

```tsx
<h1 className="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl">Heading</h1>
```

### Hide/show by width

```tsx
<div className="tw-hidden md:tw-block">Desktop only</div>
<div className="tw-block md:tw-hidden">Mobile only</div>
```

### Targeted override with a max-width helper

```tsx
<div className="tw-flex tw-gap-8 maxLg:tw-flex-col maxLg:tw-gap-4">Stacks below 992px</div>
```

Biome's `nursery.useSortedClasses` rule sorts class lists in `class`, `className`, `clsx`, `cn`,
and `cva`. Let `npm run lint:fix` order them; don't fight it.

---

## Resources

- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [Tailwind: Responsive design](https://tailwindcss.com/docs/responsive-design)
- [docs/MOBILE_TESTING.md](MOBILE_TESTING.md) — device, PWA, offline, orientation
- [docs/DESIGN_DOC.md](DESIGN_DOC.md) — layout, spacing, and color tokens

Cross-device services such as BrowserStack or LambdaTest can cover hardware we don't own. The
project has no account for either — treat them as optional and ask before expensing one.
