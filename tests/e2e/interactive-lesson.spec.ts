import { expect, test } from "@playwright/test";

/**
 * The interactive lesson pages (/learn, /learn/[slug]) are members-only: signed-out
 * visitors are redirected to /login. These specs verify the gate.
 *
 * The lesson *engine* (srcdoc builder, loader, run/test flow) is covered by the
 * Vitest unit tests in src/lib/lesson-sandbox and src/lib/interactive-lessons; the
 * end-to-end run/pass flow was verified manually in-browser (driving a real session
 * is out of scope for this spec).
 */
test.describe("Interactive lessons — auth gate", () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
    });

    test("the catalog redirects to login when signed out", async ({ page }) => {
        await page.goto("/learn");
        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("a lesson redirects to login when signed out", async ({ page }) => {
        await page.goto("/learn/js-render-table-rows");
        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });
});
