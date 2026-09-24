# Alt Text Audit

Companion to issue #897. Every `<img>` / `<Image>` reachable from `src/pages/` was classified
and the live defects fixed in code; this file carries the parts that need a human or a later
pass: images whose wording must come from the content team, the unreachable template files that
were deliberately left alone, and the icon SVGs that belong to a separate follow-up.

---

## Rules applied

Biome already enforces two things (`biome.json`): every `<img>` must carry an `alt` attribute
(`a11y/useAltText: error`) and the alt may never contain the words **image**, **photo** or
**picture** (`a11y/noRedundantAlt: error`). Nothing enforces *meaningful* text, so the audit used
the [W3C alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/):

| Case | Rule |
| ---- | ---- |
| Decorative art (parallax shapes, section washes, overlays with text on top) | `alt=""` |
| Image inside a link or button that already has a visible or `aria-label` name | `alt=""` |
| Card thumbnail with no data alt | fall back to the card's `title` (matches the blog-card convention) |
| Photo with no data alt and no adjacent name | `alt=""` until the content team supplies wording via the JSON `alt` key |
| Image that shows text | alt carries that text |

Never write `"Photo of ..."` or `"... image"` in a fallback; Biome fails the lint.

## What this pass changed

Live call sites fixed:

- `src/containers/blog-details/nav-links/nav-item.tsx` — operator-precedence bug: `image?.alt || variant === "prev" ? ... : ...` never emitted `image.alt` and announced a "next" link as "Prev Navigation". The hover background is now `alt=""`; the link is named by the post title.
- `src/components/logo/index.tsx`, `src/components/ui/engagement-modal/EngagementModal.tsx` — sole-content home links now read "Vets Who Code" instead of "Logo" / "Animated Flag Logo".
- `src/components/ui/video-button/index.tsx` — play icon is `alt=""`; the button already has `aria-label` ("Play video").
- `src/containers/video/layout-04`, `src/containers/testimonial/layout-04` — parallax medal / dog-tag ornaments `alt=""`.
- `src/containers/hero/layout-04`, `src/containers/newsletter/layout-02`, `src/containers/event-details/hero.tsx` — full-bleed backgrounds under a gradient or `bg-black/40` overlay with the heading rendered as text on top: `alt=""`. **If a designer removes the overlay these become informative again.**
- `src/components/event-card/event-01.tsx`, `src/components/zoom-card/index.tsx`, `src/containers/zoom-meeting-details/index.tsx` (+ `src/pages/zoom-meetings/[slug].tsx` now passes `title`), `src/components/vwc-card/index.tsx` — generic "Event" / "zoom meeting" / "Course" fallbacks replaced by the item title.
- `src/components/blog-meta/author.tsx` — avatar `alt=""`; the link already contains the author's name.
- `src/components/ui/video-with-poster/video-02.tsx`, `src/containers/hero-image/index.tsx`, `src/containers/faq/layout-03/index.tsx`, `src/components/html-content/index.tsx` — "video poster" / "Hero" / "Faq" / "Image" fallbacks replaced by `""` pending content-team wording.
- `src/components/menu/main-menu/megamenu.tsx`, `src/components/menu/mobile-menu/megamenu.tsx` — banner `<img>` is the sole child of its link, so the fallback is the column title (`banner.image?.alt || title || ""`), never a bare `""`. No banner exists in `src/data/menu.ts` today; if one is added, give its `image.alt` a real name.
- `src/components/url-preview-card/index.tsx` — "Preview image" fallback contained a forbidden word; now `""`.
- `src/data/mdx-pages/code-of-conduct.md` — `![alt text](...)` placeholder replaced by the text the graphic shows ("Code of Conduct").
- `src/pages/projects.tsx` — the static hashflag badge on the modal's column divider announced "<project name> screenshot"; it is an ornament, so `alt=""`.

Skipped on purpose: `src/containers/contact-info/layout-01/index.tsx` (removed by #1210).

Regression coverage: `__tests__/components/image-alt-fallbacks.test.tsx` and `__tests__/pages/projects.tests.tsx`.

## Images that need content-team wording

These render with `alt=""` (or the card title) until someone writes a description. Add an
`"alt"` key next to `"src"` in the data file — no code change is needed.

| # | Data location | Where it renders | Current fallback |
| - | ------------- | ---------------- | ---------------- |
| 1 | `src/data/homepages/index.json` `content[1].items[0..2].images[0]` (three photos: `9_xwkdus.png`, `5_beplkr.png`, `1_tvrmfb.png`) | Home service cards "Remote-First", "Market-Driven Curriculum", "Mentorship, Not Hand-Holding" | card title (`image-box-02.tsx`) |
| 2 | `src/data/homepages/index.json` `content[3].images[0]` | Home video poster | `""` |
| 3 | `src/data/innerpages/apply-to-be-a-student.json` `content[2].images[0]` | `/apply` hero | `""` |
| 4 | `src/data/innerpages/join-our-community.json` `content[2].images[0]` (`/images/hero-image/hero-image.png`; file is CRLF — keep it that way) | `/join-our-community` hero | `""` |
| 5 | `src/data/innerpages/faq.json` `content[1].images[0]` | `/faq` | `""` |
| 6 | `src/data/innerpages/contact-me.json` `content[0].images[0]` (`/images/contact/contact.jpg`) | `/contact-me` — container removed by #1210; drop this row once that lands | `"Hero"` |

Lower priority, not blocking:

- Event thumbnails fall back to the event title. All four files lack `thumbnail.alt`:
  `src/data/events/vetswhocode-drill-anthony-bartolo.json`,
  `vetswhocode-drill-logan-kilpatrick.json`, `vetswhocode-drill-seattle-university.json`,
  `vetswhocode-drill-swyz.json`. Two titles carry typos that the fallback now exposes to screen
  readers: `"#VetsWhoCode Drill:: Logan Kilpatrick"` (double colon) and
  `"#VetsWhoCode Drill:Seattle University MBA Candidates"` (missing space).
- Zoom-meeting thumbnails fall back to the meeting title. All seven files lack `thumbnail.alt`:
  `src/data/zoom-meetings/meeting-01.json` through `meeting-07.json`.
- All 38 `src/data/blogs/*.md` front-matter `image:` blocks carry only `src`; cards and the
  post header fall back to the post title, which is acceptable.
- `src/data/board-members.json` `image.alt` is "Board Member" on 12 of 13 entries, but no
  consumer reads it (`team.tsx` uses `alt=""`, `team/[slug].tsx` uses the name). Leave it.

## Live sites reviewed and left as-is

- `src/components/profile/ProfileHeader.tsx:53` — **live** (via `src/pages/profile/[id].tsx`),
  not dead as an earlier inventory claimed. `alt={user.name || "User"}` sits beside an `<h1>`
  with the same name, so `alt=""` would match `team.tsx`; the file has an unrelated pre-existing
  Biome error (`noCommentText`, line 83), so it was not touched here. Auth-gated, low priority.
- `src/components/image-box/image-box-02.tsx:28` — `image?.alt || title`; kept for consistency
  with blog cards. Real wording is row 1 above.
- `src/pages/404.tsx` — `alt="Not Found"` on the "404" word-art; the heading beneath explains.
- `src/pages/press-kit.tsx`, `src/pages/programs.tsx`, `src/layouts/footers/footer-01.tsx`,
  `src/containers/donate-form/layout-01`, `src/containers/ways-to-give`,
  `src/containers/brand/layout-01` (CSS mask logos with `role="img"` + `aria-label`),
  `src/components/media-card`, Shopify product/cart images, and every "name as alt" headshot —
  informative and correctly named.
- `src/components/blog-image-manager.tsx:119`, `src/components/cloudinary-media-library.tsx:230`
  — alt is the Cloudinary `public_id`; admin-only tooling.
- CSS background images (`ui/wrapper/*`, `funfact/layout-03`, `programs/mentorship`,
  `ui/offcanvas`, grain data-URIs) are all decorative washes and need no text alternative.

## Unreachable template code, left untouched

No path from `src/pages/` imports these (verified with an import graph over the `tsconfig`
aliases; spot-checked with grep). They still carry alts like `"shape"`, `"bg"`, `"logo"`,
`"popular"`, `"team"`. Fix them if they are ever wired up; otherwise they are candidates for
deletion.

- `src/components/blog-card/blog-01.tsx`, `blog-02.tsx`
- `src/components/course-card/course-01.tsx` … `course-04.tsx`
- `src/components/image-box/image-box-01.tsx`, `image-box-03.tsx`, `image-box-04.tsx`
- `src/components/review/index.tsx`
- `src/components/testimonial/testimonial-01.tsx`, `-02`, `-05`, `-06`
- `src/components/ui/video-with-poster/video-01.tsx`
- `src/components/widgets/banner-widget.tsx`, `recent-courses-widget.tsx`
- `src/components/cloudinary-upload-example.tsx`
- `src/containers/about/layout-01`, `about/layout-02`
- `src/containers/app-download`
- `src/containers/blog/layout-01`
- `src/containers/brand/layout-02`
- `src/containers/cta/layout-02`
- `src/containers/faq/layout-01`, `faq/layout-04`
- `src/containers/gallery/item.tsx`
- `src/containers/hero/layout-01`, `-02`, `-03`, `-05`, `-06`, `-07`, `-08`
- `src/containers/newsletter/layout-01`
- `src/containers/profile/bio.tsx`
- `src/containers/register-guide`
- `src/containers/service/layout-06`, `service/layout-08`
- `src/containers/team/layout-01`
- `src/containers/testimonial/layout-05`
- `src/containers/timeline/item.tsx`
- `src/containers/video/layout-01`, `-02`, `-03`, `-06`, `-07`

Data files no page consumes: `src/data/innerpages/about-us.json`, `theory-of-change.json`,
`become-a-mentor.json`, `become-a-teacher.json`.

## Follow-up: icon-only inline SVGs

Out of #897's scope (icons next to text, not images), but they lack `aria-hidden="true"` and
should get it in an icon pass like `__tests__/components/decorative-icons.test.tsx` covers for
FontAwesome:

- `src/pages/_offline.tsx:21`
- `src/pages/store/index.tsx:64`
- `src/pages/store/products/[handle].tsx:143`, `:236`
- `src/pages/orders/index.tsx:182`, `:241`
- `src/components/forms/donate-form.tsx:27`, `:43`
- `src/components/shopping-cart/shopping-cart.tsx:65`, `:89`
- `src/components/ai-assistant/AITeachingAssistant.tsx:274`
- `src/components/jobs/ResumeScorer.tsx:527`

`src/containers/theory-of-change/pipeline.tsx` root `<svg>` has no `role`/`aria-label` but
contains `<text>` nodes inside a section with `aria-labelledby`; acceptable.

## Note on email templates

`src/emails/` does not exist in this repository despite the mention in `AGENTS.md`; there are no
React Email images to audit.
