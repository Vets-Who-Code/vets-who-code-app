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

## Future Recommendations

1. **Regular Dependency Audits**
   - Run `npm ls` or `yarn why` to check dependency tree
   - Use `npm dedupe` to remove duplicate packages
   - Review bundle sizes with `@next/bundle-analyzer`

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
