# Color Migration Guide

## Overview
This guide maps old (deprecated) colors to new brand-approved colors based on the VetsWhoCode Brand Style Guide.

---

## Color Mappings

### Primary Colors

| Old Color | New Color | Usage |
|-----------|-----------|-------|
| `primary` (was red) | `primary` or `red` | Primary CTAs, accents |
| `secondary` (was blue) | `secondary` or `navy` | Primary brand color |

### Semantic Colors

| Old Color | New Color | Reason |
|-----------|-----------|--------|
| `success` (#4CAF50) | `success` or `gold` | Now uses Amber Gold (#FDB330) |
| `warning` (#FFC107) | `warning` or `gold-bright` | Now uses Bright Gold (#FAD643) |
| `danger` (#F44336) | `danger` or `red` | Now uses Brand Red (#c5203e) |
| `info` (#17A2B8) | `info` or `navy-ocean` | Now uses Ocean Blue (#006DAA) |

### Removed Colors (Map to Brand Colors)

| Removed Color | Map To | Notes |
|---------------|--------|-------|
| `orange` | `red` or `gold` | Context-dependent |
| `yellow` | `gold` | Amber Gold is brand gold |
| `blue-100` | `navy-sky` or `navy-ocean` | Use navy scale |
| `spring` (#F5F1ED) | `cream` (#EEEDE9) | Use brand cream |
| `desert` | `red` | Was using red anyway |
| `pearl` (#EAE1D6) | `cream` | Similar tone |
| `putty` (#e5c791) | `gold` or `gold-light` | Gold tone |
| `brunt` (#ee7455) | `red` or `red-signal` | Red tone |
| `jagged` (#BCE6DF) | `navy-sky` | Light blue tone |
| `azure` (#00adff) | `navy-ocean` | Blue tone |
| `alto` (#dedede) | `gray-100` (Silver) | Borders/dividers |
| `teracotta` | `red` or `gold` | Context-dependent |
| `scooter` | `navy-ocean` | Blue tone |
| `ebb` (#e9e6e3) | `gray-50` or `cream` | Light neutral |
| `pampas` (#ece8e4) | `cream` | Light background |
| `gore` (#1f1f52) | `navy` or `navy-midnight` | Dark blue |
| `porsche` (#ebb860) | `gold` | Gold tone |
| `mandy` (#df5b6c) | `red` | Red tone |
| `tan` (#d2a98e) | `gold` or `cream` | Warm neutral |
| `mishcka` (#e2e2e8) | `gray-100` | Light gray |

### Gray Scale Migration

| Old Gray | New Gray | Color | Usage |
|----------|----------|-------|-------|
| `gray-50` | `gray-50` | #F8F9FA | Off White - light cards |
| `gray-100` | `gray-100` | #DEE2E6 | Silver - borders, dividers |
| `gray-200` | `gray-200` | #6C757D | Slate - secondary text |
| `gray-300` | `gray-300` | #495057 | Charcoal - muted labels |
| `gray-350` | `gray-100` | - | Use Silver |
| `gray-400` | `gray-400` | #343A40 | Dark Gray - text blocks |
| `gray-450` | `gray-50` | - | Use Off White |
| `gray-500` | `gray-50` | - | Use Off White |
| `gray-550` | `gray-50` | - | Use Off White |
| `gray-600` | `gray-300` | - | Use Charcoal |
| `gray-650` | `gray-100` | - | Use Silver |
| `gray-700` | `gray-200` | - | Use Slate |
| `gray-750` | `gray-50` | - | Use Off White |
| `gray-800` | `gray-400` | - | Use Dark Gray |
| `gray-850` | `gray-300` | - | Use Charcoal |

---

## New Brand Colors Available

### Navy Blue Scale
```
navy (default): #091f40
navy-midnight: #061A40
navy-deep: #003559
navy-royal: #0353A4
navy-ocean: #006DAA
navy-sky: #B9D6F2
```

### Red Scale
```
red (default): #c5203e
red-signal: #C52233
red-crimson: #A51C30
red-dark: #74121D
red-maroon: #580C1F
```

### Gold Scale
```
gold (default): #FDB330
gold-light: #FFE169
gold-bright: #FAD643
gold-rich: #DBB42C
gold-deep: #C9A227
```

### Base Colors
```
cream: #EEEDE9 (backgrounds)
ink: #1A1823 (body text)
white: #FFFFFF
black: #000000
```

### Dark Mode Colors
```
dark (default): #1A1823
dark-surface: #212529
dark-elevated: #343A40
dark-text: #F8F9FA
dark-text-muted: #DEE2E6
dark-text-disabled: #6C757D
dark-accent: #84C1FF
dark-accent-hover: #B9D6F2
dark-error: #F38375
dark-success: #FFE169
dark-badge: #FAD643
```

---

## Migration Strategy

### Phase 1: High-Impact Components
1. Navigation/Header
2. Hero sections
3. CTAs (Call-to-action buttons)
4. Forms

### Phase 2: Content Areas
1. Blog components
2. Course components
3. Team/testimonials
4. Services

### Phase 3: Utility Components
1. Alerts
2. Badges
3. Cards
4. Modals

### Phase 4: Admin/Dashboard
1. Admin panels
2. Dashboard components
3. Data tables

---

## Testing Checklist

- [ ] Header/navigation displays correctly
- [ ] CTAs are prominent with brand red
- [ ] Text has proper contrast (WCAG AA: 4.5:1 minimum)
- [ ] Success states use gold (not green)
- [ ] Info boxes use navy-sky
- [ ] Links use navy-ocean
- [ ] Dark mode colors work properly
- [ ] No console errors about missing colors

---

## Quick Reference Commands

### Find files using deprecated colors
```bash
grep -r "tw-bg-orange\|tw-text-orange\|tw-border-orange" src/
grep -r "tw-bg-yellow\|tw-text-yellow\|tw-border-yellow" src/
grep -r "tw-bg-spring\|tw-text-spring\|tw-border-spring" src/
```

### Find old gray scale usage
```bash
grep -r "gray-350\|gray-450\|gray-550\|gray-650\|gray-750\|gray-800\|gray-850" src/
```
