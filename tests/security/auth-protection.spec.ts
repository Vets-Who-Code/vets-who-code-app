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

    test("Courses Index - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
        expect(page.url()).toMatch(/callbackUrl=(\/|%2F)courses/);
    });

    test("Software Engineering Course - redirects to login when unauthenticated", async ({
        page,
    }) => {
        await page.goto("/courses/software-engineering");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
        expect(page.url()).toMatch(/callbackUrl=(\/|%2F)courses(\/|%2F)software-engineering/);
    });

    test("Data Engineering Course - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses/data-engineering");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("AI Engineering Course - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses/ai-engineering");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("Web Development Course - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses/web-development");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("DevOps Course - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses/devops");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("Lesson Player - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/courses/web-development/1/1");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });

    test("Job Board - redirects to login when unauthenticated", async ({ page }) => {
        await page.goto("/jobs");

        await page.waitForURL(/\/login/);
        expect(page.url()).toContain("/login");
    });
});

test.describe("Client-Side Bypass Prevention", () => {
    test("Protected content should not be visible without server-side auth", async ({ page }) => {
        // Go to courses page
        await page.goto("/courses");

        // Should be on login page
        await page.waitForURL(/\/login/);

        // Verify no course content is leaked in the page
        const pageContent = await page.content();
        expect(pageContent).not.toContain("VWC Engineering Verticals");
        expect(pageContent).not.toContain("Software Engineering");
        expect(pageContent).not.toContain("Data Engineering");
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
