import { expect, test } from "@playwright/test";

// The catalog is built from src/data/projects at build time and degrades to
// "no repo stats" without a GitHub token, so nothing here needs credentials.
test.describe("Projects catalog", () => {
    test("index cards open a detail page with SoftwareSourceCode data", async ({ page }) => {
        await page.goto("/projects");

        const card = page.locator('a[href^="/projects/"]').first();
        await expect(card).toBeVisible();
        const href = await card.getAttribute("href");
        expect(href).not.toBeNull();

        await card.click();
        await expect(page).toHaveURL(new RegExp(`${href}$`));

        const heading = page.getByRole("heading", { level: 1 });
        await expect(heading).toHaveCount(1);
        await expect(heading).toBeVisible();
        await expect(page.getByRole("heading", { name: "Built by" })).toBeVisible();

        const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
        const sourceCode = blocks
            .map((block) => JSON.parse(block) as { "@type"?: string; url?: string })
            .find((block) => block["@type"] === "SoftwareSourceCode");
        expect(sourceCode?.url).toMatch(new RegExp(`${href}$`));
    });
});
