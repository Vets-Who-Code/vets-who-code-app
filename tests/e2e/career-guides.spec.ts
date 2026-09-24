import { expect, type Page, test } from "@playwright/test";

/**
 * /career-guides is URL-addressed: branch and family facets and page numbers are prerendered
 * routes reached by plain links, while rank, sort and search filter the loaded page and are
 * mirrored into ?rank / ?sort / ?q.
 */

// Guide detail links only, not the facet chips or page numbers.
const guideCards = (page: Page) =>
    page.locator(
        '#database a[href^="/career-guides/"]:not([href*="/branch/"]):not([href*="/family/"]):not([href*="/page/"])'
    );

const pagination = (page: Page) => page.getByRole("navigation", { name: "Pagination" });

const sortSelect = (page: Page) => page.locator("#database").getByRole("combobox");

test.describe("Career guides — facet pages", () => {
    test("branch chips and page numbers navigate to their own URLs", async ({ page }) => {
        await page.goto("/career-guides");
        await expect(guideCards(page)).toHaveCount(60);

        await page.getByRole("link", { name: /^ARMY/ }).click();
        await page.waitForURL(/\/career-guides\/branch\/army$/);
        await expect(page).toHaveTitle("Army MOS to Civilian Tech Careers - Vets Who Code");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Army MOS");
        await expect(guideCards(page)).toHaveCount(60);

        await pagination(page).getByRole("link", { name: "2", exact: true }).click();
        await page.waitForURL(/\/career-guides\/branch\/army\/page\/2$/);
        await expect(pagination(page).getByText("2", { exact: true })).toHaveAttribute(
            "aria-current",
            "page"
        );
        await expect(guideCards(page)).toHaveCount(60);
    });

    test("rank, sort and search survive a reload", async ({ page }) => {
        await page.goto("/career-guides/branch/army/page/2");

        // Retry until hydration has attached the click handler.
        await expect(async () => {
            await page.getByRole("button", { name: "Officer" }).click();
            await expect(page).toHaveURL(/\?rank=officer$/, { timeout: 1000 });
        }).toPass();
        const officers = await guideCards(page).count();
        expect(officers).toBeGreaterThan(0);
        expect(officers).toBeLessThan(60);

        await sortSelect(page).selectOption("salaryHigh");
        await expect(page).toHaveURL(/\?rank=officer&sort=salaryHigh$/);

        await page.reload();
        await expect(page).toHaveURL(
            /\/career-guides\/branch\/army\/page\/2\?rank=officer&sort=salaryHigh$/
        );
        await expect(guideCards(page)).toHaveCount(officers);
        await expect(sortSelect(page)).toHaveValue("salaryHigh");

        const search = page.getByRole("textbox", { name: "Search career guides" });
        await search.pressSequentially("12D");
        // The URL is updated outside the router, so typing never loses focus.
        await expect(search).toBeFocused();
        await expect(search).toHaveValue("12D");
        await expect(page).toHaveURL(/[?&]q=12D(&|$)/);
        await expect(guideCards(page)).toHaveCount(0);

        await page.goto("/career-guides/branch/army/page/2?q=12D");
        await expect(guideCards(page)).toHaveCount(1);
        await expect(page.getByRole("textbox", { name: "Search career guides" })).toHaveValue(
            "12D"
        );
    });

    test("the view carries across page links and the back button", async ({ page }) => {
        await page.goto("/career-guides/branch/army");
        await expect(async () => {
            await page.getByRole("button", { name: "Officer" }).click();
            await expect(page).toHaveURL(/\?rank=officer$/, { timeout: 1000 });
        }).toPass();

        await pagination(page).getByRole("link", { name: "2", exact: true }).click();
        await page.waitForURL(/\/career-guides\/branch\/army\/page\/2\?rank=officer$/);
        await expect(guideCards(page)).not.toHaveCount(60);
        for (const card of await guideCards(page).all()) {
            await expect(card).toContainText("Officer");
        }

        await page.goBack();
        await page.waitForURL(/\/career-guides\/branch\/army\?rank=officer$/);
        await expect(guideCards(page)).not.toHaveCount(60);
        for (const card of await guideCards(page).all()) {
            await expect(card).toContainText("Officer");
        }
    });

    test("serves no /page/1 or unknown facet URLs", async ({ page }) => {
        for (const path of [
            "/career-guides/page/1",
            "/career-guides/branch/army/page/1",
            "/career-guides/branch/space-force",
        ]) {
            const response = await page.goto(path);
            expect(response?.status(), path).toBe(404);
        }
    });
});

test.describe("Career guides — without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("every facet and page is a plain link in the server HTML", async ({ page }) => {
        await page.goto("/career-guides");
        await expect(guideCards(page)).toHaveCount(60);
        await expect(page.locator('a[href="/career-guides/branch/coast-guard"]')).toHaveCount(1);
        await expect(
            page.locator('a[href="/career-guides/family/it-comms"]').first()
        ).toBeVisible();
        await expect(page.locator('a[href="/career-guides/page/71"]')).toHaveCount(1);

        await page.goto("/career-guides/branch/air-force");
        await expect(guideCards(page)).toHaveCount(60);
        // Every page of the facet is one hop from its first page.
        await expect(pagination(page).getByRole("link")).toHaveCount(31);
        await expect(page.locator('a[href="/career-guides/branch/air-force/page/31"]')).toHaveCount(
            1
        );
    });
});
