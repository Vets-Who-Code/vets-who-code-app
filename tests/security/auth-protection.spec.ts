import { expect, test } from "@playwright/test";

/**
 * Security Tests - Verify Protected Routes
 *
 * These tests verify that protected routes cannot be accessed
 * without proper authentication in production mode.
 */

test.describe("Protected Routes - Authentication Required", () => {
    test.beforeEach(async ({ page }) => {
        // Clear all cookies to ensure unauthenticated state
        // Note: localStorage clearing is not needed since server-side auth uses cookies only
        await page.context().clearCookies();
    });

    test("Job Board - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/jobs");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });
});

test.describe("Public Routes - No Auth Required", () => {
    test("Homepage is publicly accessible", async ({ page }) => {
        const response = await page.goto("/");
        expect(response?.status()).toBe(200);
    });

    test("About Us page is publicly accessible", async ({ page }) => {
        const response = await page.goto("/about-us");
        expect(response?.status()).toBe(200);
    });

    test("Login page is publicly accessible", async ({ page }) => {
        const response = await page.goto("/login");
        expect(response?.status()).toBe(200);
    });

    test("Apply page is publicly accessible", async ({ page }) => {
        const response = await page.goto("/apply");
        expect(response?.status()).toBe(200);
    });

    test("Resume Translator is publicly accessible", async ({ page }) => {
        const response = await page.goto("/resume-translator");
        expect(response?.status()).toBe(200);
    });
});
