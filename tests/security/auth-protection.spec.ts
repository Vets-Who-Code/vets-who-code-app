import { expect, test } from "@playwright/test";

/**
 * Security Tests - Verify public routes are reachable without an account.
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

    test("Apply page is publicly accessible", async ({ page }) => {
        const response = await page.goto("/apply");
        expect(response?.status()).toBe(200);
    });
});
