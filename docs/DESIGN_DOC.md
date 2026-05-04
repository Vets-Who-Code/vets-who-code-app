# Vets Who Code — Visual Design System

A design doc describing the look and feel of vetswhocode.io. Intended to let an LLM faithfully describe, critique, or generate assets consistent with the brand.

---

## 1. Design Intent

A **serious, military-professional aesthetic tempered with approachable optimism.** Every visual decision reinforces discipline, precision, and authority while staying inviting to a veteran audience transitioning into tech.

Signals:
- Sharp edges (zero border-radius on most surfaces) → precision, discipline
- Bold uppercase headlines → command presence
- Navy + red palette → patriotic heritage without flag-waving
- Gold accents on dark → achievement, decoration
- Generous line-height and whitespace → readability, inclusion
- Subtle grain overlay on dark sections → warmth, texture
- Measured motion (~0.5s, short translate) → purposeful, never flashy

**Copy voice:** imperative, confident, direct. "APPLY NOW," "START YOUR JOURNEY," "VIEW ALL SUBJECTS." Navigation labels are uppercase and tight. Institutional elements (EIN, nonprofit seal) are surfaced openly.

---

## 2. Tech Stack (styling-relevant)

- **Next.js 15** + React 18 + TypeScript
- **Tailwind CSS 3** with a `tw-` prefix on every utility class
- **Framer Motion** for animation (plus `tailwindcss-animate`)
- **Radix UI** (dialog, icons) + **Lucide React** + custom SVGs via `@svgr/webpack` + FontAwesome Pro (legacy)
- **CSS Modules** for a few isolated components
- `clsx` + `tailwind-merge` for class composition

No shadcn/ui. No global dark-mode toggle (see §8).

---

## 3. Color Palette

### Brand core

| Role | Name | Hex | Pantone |
|---|---|---|---|
| Primary accent (CTAs, highlights) | Red | `#c5203e` | 193 C |
| Primary background/authority | Navy | `#091f40` | 282 C |
| Accent (success, badges, gold highlights) | Amber Gold | `#FDB330` | — |
| Body text | Ink Black | `#1A1823` | — |
| Light section background | Cream | `#EEEDE9` | — |

### Navy family
- Midnight `#061A40` • Deep `#003559` • Royal `#0353A4` • Ocean `#006DAA` • Sky `#B9D6F2`

### Red family
- Signal `#C52233` • Crimson `#A51C30` (hover) • Dark `#74121D` • Maroon `#580C1F`

### Gold family
- Light `#FFE169` • Bright `#FAD643` • Rich `#DBB42C` (hover) • Deep `#C9A227`

### UI grays (light)
- Off-white `#F8F9FA` • Silver `#DEE2E6` • Slate `#6C757D` • Charcoal `#495057` • Dark `#343A40`

### Semantic tokens
- **primary** = red `#c5203e`
- **secondary** = navy `#091f40`
- **accent** = gold `#FDB330` (verified ~9.5:1 on navy, WCAG AA)
- **success** = gold • **warning** = bright gold `#FAD643` • **danger** = red • **info** = ocean `#006DAA`

### Dark-surface tokens
- Background `#1A1823` • Surface `#212529` • Elevated `#343A40`
- Text `#F8F9FA` • Muted `#DEE2E6` • Disabled `#6C757D`
- Link/interactive `#84C1FF` (hover → sky `#B9D6F2`)
- Error-on-dark `#F38375` (coral)

### Overlays (used repeatedly)
- Hero gradient: `linear-gradient(135deg, rgba(9,31,64,0.92) 0%, rgba(6,26,64,0.88) 100%)`
- Subtle border on dark: `rgba(185, 214, 242, 0.08)` (1px)
- Muted text on dark: `rgba(185, 214, 242, 0.7)`

### Utility gradients
- `strawGradient`: `linear-gradient(45deg, #fe378c 0%, #fe5b34 100%)` (red→orange, occasional badge use)
- `darkGradient` / `lightGradient` / `bodyGradient` for section transitions

---

## 4. Typography

### Families
| Role | Font | Weights used |
|---|---|---|
| Headlines, buttons, labels, nav | **GothamPro** | 300 / 400 / 500 / 700 / 900 |
| Body copy | **Gilroy** | 100–900 |
| Optional serif accent | **Playfair Display** | 400–700 |
| Decorative | Conv_Rossela-Demo-2 | — |
| Code/metadata | system monospace stack | — |

`font-display: swap` on all custom faces.

### Scale
- h1 `2.5rem` (fluid clamp 36–64px)
- h2 `2.125rem` (clamp 28–48px)
- h3 `1.5rem` (clamp 20–28px)
- h4 `1.3125rem` • h5 `1.09375rem` • h6 `0.938rem`
- Body base `0.938rem` with `line-height: 1.74`

### Weights & treatment
- Headlines: **800–900, uppercase, letter-spacing −0.02em** (tight, commanding)
- Buttons: **700, uppercase, letter-spacing 0.08em, 12px**
- Nav / metadata: monospace, uppercase, 10–12px, letter-spacing 0.06–0.1em
- Body: 400 default, 600 emphasis
- Headings line-height ≈ 1.3

### Selection & focus
- Text selection: white on red `#c5203e`
- Focus ring: **3px solid gold `#FDB330`, 2px offset, 4px radius** (one of the few places we use radius)

---

## 5. Layout

### Container widths (1230px is the "real" desktop cap)
`mobile 100%` • `sm 576` • `md 768` • `lg 992` • `xl 1230` • `2xl 1400` • `3xl 1600`
Horizontal gutter: 15px on mobile, auto-centered above.

### Breakpoints
Standard Tailwind plus `maxSm`, `smToMd`, `maxLg`, `maxXl` helpers for targeted overrides.

### Spacing
- Grid gaps: default `1.875rem` (30px), large `3.75rem` (60px)
- Dark section padding: 64px top/bottom
- Home-page section rhythm: ~140px between blocks
- Hero padding: 100/130 (mobile) → 170 (md) → 270/248 (xl)

### Grid
- 12-column CSS Grid on root layouts
- Card grids: 2-up (md) → 3-up (lg) with 30px gap
- Footer: 12-col with `50% / 25% / 25%` spans (brand / links / social+seal)

### Background textures
- Wrapper sections get `/images/bg/background-pattern-grid-line.png` (faint grid)
- Dark sections get an SVG turbulence noise overlay at ~2% opacity (almost imperceptible grain)

---

## 6. Components

### Buttons
- **Shape:** radius `0`. Sharp.
- **Variants:** contained, outlined, texted
- **Colors:** primary (red) • light (white, used on dark backgrounds)
- **Sizes:** xs (13px / 32h), sm (12px / ~40h), md (default, ~48h), lg
- **Typography:** GothamPro 700, 12px, uppercase, tracking 0.08em
- **Shadow:** md by default on contained; intensifies to lg on hover
- **Hover:** background darkens (crimson on red primary), `translateY(-1px)` lift
- **Active/pressed:** `scale(0.95)` — tactile, grounded (no translate)
- **Disabled:** reduced opacity, `not-allowed` cursor

### Cards (course/media/event)
- Border: `1px solid rgba(185, 214, 242, 0.08)`
- Radius: `0` on card; image top corners may be rounded
- Padding: 30px inside info section
- **Hover:** `translateY(-2px)` + a 2px solid red top border appears + `shadow-4md` (`0 10px 30px`), 300ms `cubic-bezier(0.3, 0.2, 0.3, 0.3)`
- Entrance: scroll-triggered fade + 16px translate-up, 0.5s ease-out

### Section titles
- **Eyebrow:** monospace, 12px, uppercase, tracking 0.1em, preceded by a **16×2px red accent bar** (pseudo-element)
- **Title:** GothamPro 800–900, uppercase, tracking −0.02em
- Large variant: `clamp(42px, 5vw, 56px)`
- Align: left / center / right (prop)

### Navigation / header
- Fixed, full-width
- Grid: logo ~22% / menu ~56% / actions ~22%
- Logo: 120px max (158 at sm+)
- Main menu hidden below `xl`; mobile uses burger → offcanvas
- **Sticky transition:** absolute → fixed with `headerSlideDown` animation (translateY(−100%) → 0, 0.95s ease)
- `backdrop-filter: blur(12px)` on the inner bar → glassy feel
- Light mode = white bg, dark text; dark mode = transparent over hero, then solidifies on sticky
- `mode="light" | "dark"` prop swaps logo + text colors

### Footer
- Dark navy ground, 12-col grid (50/25/25)
- Logo + blurb • two columns of links • socials + GuideStar/transparency seal
- Copyright line: monospace, 10px, uppercase, muted-on-dark color
- Top divider: 1px `rgba(185,214,242,0.08)`

### Inputs
- Height 56px, horizontal padding 20px
- Border `1px solid gray-200`
- Focus: border becomes primary red, no shadow, bg stays white
- States: success green border • warning yellow • error red
- Disabled/readonly: `bg-gray-300`

### Badges
- Sizes xs–lg; radius varies by size (xs is slightly rounded, sm is square, lg is rounded)
- Palettes: `teracotta` (light red bg), `scooter` (sky blue bg), `primary` (red), `gradient` (straw), white outline
- Padding 2–3px in each axis (compact, label-like)

### Testimonials
- **2px red left border**, 24px left padding
- Huge 64px GothamPro black quote mark at 30% opacity, positioned absolute behind the copy
- Quote: Gilroy italic 18px (white on dark)
- Attribution: monospace 10px uppercase, tracking 0.1em

### Section dividers
- 1px horizontal rule in navy-sky-overlay color
- `::after` pseudo-element adds a **48px red accent** on the left
- 56px vertical margin

### CTA banner
- Dark navy (optional), 1px top+bottom navy-sky borders, 48×1px red accent via `::before`

### Modal (EngagementModal)
- Framer Motion spring-physics entrance
- Fires ~3s after page load (once per session, stored in `sessionStorage`)
- Focus trap, ESC close, backdrop click closes
- CSS Modules scoped styles, Radix Dialog primitive

---

## 7. Motion & Interaction

### Library: Framer Motion, configured variants
- `scrollUpVariants`: opacity 0→1, y 16→0, 0.5s ease-out
- `fadeInUp`: y 100%→0, opacity 0→1, 0.5s
- `scrollLeftVariants` / `scrollRightVariants`: x ±60→0 + fade
- `staggerContainer`: 0.1s stagger, 0.1s delay

### Tailwind keyframes
- `headerSlideDown` 0.95s ease on sticky
- Utility animations from `tailwindcss-animate`

### Hero typewriter
- `react-simple-typewriter` on the home hero CTA line, infinite loop, custom blinking cursor

### Principles
- Short distances (16px, 60px max)
- Half-second durations are standard
- Scroll-triggered, not time-triggered (things appear as you meet them)
- No parallax, no big camera moves, no flashy reveals

---

## 8. Dark Mode (important — it's not what you'd expect)

**There is no global dark-mode toggle, no `next-themes`, no `prefers-color-scheme` listener.**

Instead, darkness is **section-scoped**:
- Light is the default canvas
- Dark backgrounds are opt-in via classes: `.dark-section`, `.dark-section-alt`, `.dark-section-subtle`, `.section-dark`, `.cta-banner`, or `tw-bg-navy`
- Header and footer accept `mode="light" | "dark"` to swap logo + text color per page
- Dark-section headings get overridden to white via a CSS rule: `.tw-bg-navy h1, .dark-section h1 { color: var(--white); }`

This lets pages alternate cream/light/dark blocks within a single scroll, which is the dominant page rhythm.

---

## 9. Page Structure

Every page is a SPA-style composition of:
1. **Header** (fixed, slides down on sticky)
2. **Hero / title section** — usually dark navy with grain, gradient overlay, and a typography-forward headline
3. **Alternating wrappers** — cream/light/dark, each introduced by an eyebrow + title with the red accent bar, then a card grid or content block
4. **CTA banner** — dark with red accent line, newsletter or apply-now style
5. **Footer** — navy, three-column, with nonprofit transparency seal

Known pages: Home • About • Apply • Courses • Projects (Radix dialogs + Lucide icons for GitHub stats) • Blog • Events • FAQ (motion-animated accordion) • Career Guides • Code of Conduct • Contact • Donate.

---

## 10. Imagery & Iconography

- **Icons:** hybrid — custom SVGs (dynamic import by name) are primary, Lucide for the projects page (GitFork/Eye/Star/X), Radix icons for some modals, FontAwesome Pro for legacy spots
- **Image treatment:** full-bleed heroes, `object-cover`, dark navy gradient overlay
- **Cards:** default course thumbnail 370×229, Next/Image optimized, Cloudinary + Shopify CDN whitelisted
- **No illustrations / no mascot** — photography of cohorts and code is the dominant imagery

---

## 11. Distinctive Signatures (the "tells")

If you see these, it's Vets Who Code:
1. **16×2px red bar** next to every eyebrow label
2. **48×1px red accent line** on section dividers and banners
3. **Sharp zero-radius** on nearly every surface
4. **2px red top-border on card hover** (the border is absent at rest — it appears)
5. **0.95s glass-morphic header slide-down** with `backdrop-filter: blur(12px)`
6. **Grain overlay at 2% opacity** on dark sections
7. **Gold focus rings** (3px, +2px offset) — the only prominent non-red accent state
8. **Active-press `scale(0.95)` buttons** — no translate, just a grounded squish
9. **Monospace metadata** (copyright, dates, eyebrows) — technical, institutional
10. **Navy hero gradient** at 92%/88% opacity — consistent across every hero

---

## 12. Accessibility Notes

- Gold on navy verified ~9.5:1 (WCAG AA Large + AAA)
- Explicit focus rings (gold, 3px)
- High-contrast mode: body text forced to `#000`
- Reduced motion: not currently honored globally — a known gap
- No global color-scheme toggle — another known limitation for users who want dark UI everywhere

---

## 13. Design Tokens — TL;DR for generation

```
primary:   #c5203e   (red, CTAs)
secondary: #091f40   (navy, authority)
accent:    #FDB330   (gold, highlights/focus)
ink:       #1A1823   (body text)
cream:     #EEEDE9   (light backgrounds)
white:     #FFFFFF

heading-font: "GothamPro", system-ui, sans-serif; 800–900, uppercase, tracking -0.02em
body-font:    "Gilroy", system-ui, sans-serif; 400/600, line-height 1.74
mono-font:    ui-monospace, SFMono-Regular, "Fira Code"; uppercase, tracking 0.1em

radius:     0
container:  1230px max
motion:     0.5s ease-out, translate 16px
shadows:    layered, md default, 4md (0 10px 30px) on card hover
```
