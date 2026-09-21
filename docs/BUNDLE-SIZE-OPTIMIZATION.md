# Bundle Size Optimization Summary

## Problem
The Vercel deployment was failing with the error: "Serverless Function has exceeded the unzipped maximum size of 250 MB"

## Root Causes Identified

### 1. ace-builds (57 MB)
- The code editor library was being statically imported
- Was being bundled into serverless functions unnecessarily
- Only used in client-side components

### 2. @playwright/test in dependencies
- Testing library was incorrectly placed in runtime dependencies
- Should have been in devDependencies only

### 3. Overly broad file tracing
- `outputFileTracingIncludes` was including ALL files from `src/data/**/*`
- No `outputFileTracingExcludes` configuration
- Unnecessary markdown files, test files, and build artifacts were being included

## Solutions Applied

### 1. Dynamic Import for CodeEditor (/src/components/code-editor/index.tsx:1-59)
- Converted to use Next.js `dynamic()` import with `ssr: false`
- Added "use client" directive
- ace-builds now only loads on the client-side when the component is actually used
- Added a loading placeholder for better UX

### 2. Updated package.json
- Moved `@playwright/test` from `dependencies` to `devDependencies`
- This prevents it from being included in production bundles

### 3. Optimized Next.js Configuration (/Users/jeromehardaway/work/vetswhocode/vets-who-code-app/next.config.js:29-57)

**Added `outputFileTracingIncludes`:**
- Only includes specific data files needed at runtime
- Homepage data only for root route
- Empty array for API routes (they don't need static data files)

**Added `outputFileTracingExcludes`:**
- Excludes `node_modules/@playwright/**`
- Excludes `node_modules/ace-builds/**`
- Excludes platform-specific SWC binaries
- Excludes markdown files, source maps, test files
- Excludes blog and curriculum lesson files from serverless functions

## Results

### Before Optimization
- Build failing with "exceeds 250 MB" error
- ace-builds (57 MB) bundled in serverless functions
- Unnecessary dependencies in production

### After Optimization
✅ **Build successful**
- Total server pages: **31 MB** (87.6% reduction from 250 MB limit)
- API routes: **932 KB**
- ace-builds: **0 files** in server bundle (verified)
- All serverless functions well under the limit

## Verification Commands

Check serverless function sizes:
```bash
du -sh .next/server/pages
du -sh .next/server/pages/api
```

Verify ace-builds exclusion:
```bash
find .next/server -name "*ace-builds*" | wc -l
```

## Bundle Analyzer

`@next/bundle-analyzer` is wired into `next.config.js` behind an `ANALYZE` env flag. With `ANALYZE`
unset the plugin is a pass-through, so `npm run build` and `vercel-build` are unchanged.

```bash
npm run analyze
```

Writes three treemaps to `.next/analyze/` (`client.html`, `nodejs.html`, `edge.html`) and opens them
in a browser. That directory is build output under `.next/` and is not committed.

### Baseline (`npm run analyze`, 2026-09-14)

Route weights as reported by `next build`:

- First Load JS shared by all: **148 kB**
- 17 of 215 routes exceed 200 kB First Load JS. Heaviest: `/` 259 kB, `/about-us` 242 kB,
  `/apply` 240 kB, `/mentor` 237 kB, `/curriculum` 220 kB
- Page data over Next's 128 kB warning threshold: `/career-guides` 1.22 MB, `/blogs/search` 225 kB,
  `/resume-translator` 159 kB, `/projects` 129 kB

Largest dependencies in the client build, parsed and uncompressed, read off `client.html`:

| Package | Parsed | Where it loads |
| --- | --- | --- |
| `swagger-client` + `swagger-ui-react` | 694 kB | async chunk, `/api-docs` only |
| `ace-builds` | 556 kB | async chunk (the dynamic import above) |
| `pdf-lib` | 369 kB | async chunk, certificate and resume PDFs |
| `gray-matter` | 176 kB | eager on `/admin/blog-images` |
| `motion` | 117 kB | eager on `/`, `/about-us`, `/apply`, blog author pages |
| `swiper` | 92 kB | eager on `/`, `/events/[slug]` |

The three heaviest are already split into async chunks and never enter First Load JS, so the
existing dynamic imports are doing their job. The eager entries are where the remaining wins are,
and the largest one is app source rather than a dependency: `src/lib/curriculum-graph.ts` pulls
`src/data/curriculum-graph/topics.json` (115 kB) and `edges.json` (65 kB) into a 196 kB chunk that
`build-manifest.json` lists on `/about-us`, `/curriculum`, and `/programs/accelerator`.

### Optimization work tracked elsewhere

This is tooling. The fixes it points at are owned by open issues:

- #1270 — marketing and blog route weight, including the 196 kB curriculum-graph chunk above
- #1271 — the `/career-guides` 1.22 MB page-data payload
- #1273 — unused dependencies and unreferenced images

**Bundle size budgets are deliberately not set yet.** A `size-limit` CI gate is deferred until
#1270 lands: the target is First Load JS under 200 kB, and 17 routes exceed that today, so a gate
at that threshold would fail the build the day it merged.

## Future Recommendations

1. **Regular Dependency Audits**
   - Run `npm ls` or `yarn why` to check dependency tree
   - Use `npm dedupe` to remove duplicate packages
   - Review bundle sizes with `npm run analyze` (see Bundle Analyzer above)

2. **Monitor Bundle Sizes**
   - Set up bundle size monitoring in CI/CD
   - Alert on functions exceeding 200 MB (80% of limit)

3. **Code Splitting**
   - Continue using dynamic imports for large client-side libraries
   - Split large API routes into smaller, focused functions

4. **Dependency Management**
   - Keep dependencies in correct sections (dependencies vs devDependencies)
   - Consider lighter alternatives for heavy packages
   - Review necessity of each dependency periodically

## Additional Notes

- Build now completes successfully with all 266 static pages generated
- No breaking changes to functionality
- Code editor still works as expected with improved loading UX
- All API routes remain functional
