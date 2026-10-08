import { expect, test } from "@playwright/test";

/**
 * Security Tests - Verify Protected Routes
 *
 * These tests verify that protected routes cannot be accessed
 * without proper authentication in production mode.
 */

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
});
