import { expect, type Locator, type Page, test } from "@playwright/test";

/**
 * /career-guides is URL-addressed: branch and family facets and page numbers are prerendered
 * routes reached by plain links (to #database, so they land on the results). Rank, sort and a
 * branch + family pair cover the whole facet (its other pages' data loads on demand); search
 * filters the page on screen. All of them are mirrored into ?rank / ?sort / ?family / ?q.
 */

// Guide detail links only, not the facet chips or page numbers.
const guideCards = (page: Page) =>
    page.locator(
        '#database a[href^="/career-guides/"]:not([href*="/branch/"]):not([href*="/family/"]):not([href*="/page/"])'
    );

const pagination = (page: Page) => page.getByRole("navigation", { name: "Pagination" });

const sortSelect = (page: Page) => page.locator("#database").getByRole("combobox");

const searchBox = (page: Page) => page.getByRole("textbox", { name: "Search guides on this page" });

const countLabel = (page: Page) => page.locator("#database").getByText(/^Showing/);

// Click until the URL changes. A click that lands before hydration attaches the handler is
// lost (Firefox shows it most), so retry; every target here is idempotent once reached.
const clickUntilUrl = async (target: Locator, url: RegExp) => {
    await expect(async () => {
        await target.click();
        await expect(target.page()).toHaveURL(url, { timeout: 1000 });
    }).toPass();
};

test.describe("Career guides — facet pages", () => {
    test("branch chips and page numbers navigate to their own URLs", async ({ page }) => {
        await page.goto("/career-guides");
        await expect(guideCards(page)).toHaveCount(60);

        await clickUntilUrl(
            page.getByRole("link", { name: /^ARMY/ }),
            /\/career-guides\/branch\/army#database$/
        );
        await expect(page).toHaveTitle("Army MOS to Civilian Tech Careers - Vets Who Code");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Army MOS");
        await expect(guideCards(page)).toHaveCount(60);
        // The chip lands on the results, not the top of the hero.
        await expect(searchBox(page)).toBeInViewport();

        await clickUntilUrl(
            pagination(page).getByRole("link", { name: "2", exact: true }),
            /\/career-guides\/branch\/army\/page\/2#database$/
        );
        await expect(searchBox(page)).toBeInViewport();
        await expect(pagination(page).getByText("2", { exact: true })).toHaveAttribute(
            "aria-current",
            "page"
        );
        await expect(guideCards(page)).toHaveCount(60);
    });

    test("rank and sort cover the whole facet and survive a reload", async ({ page }) => {
        await page.goto("/career-guides/family/cyber");

        // Cyber has 16 officers spread over its 4 pages; page 1 alone holds 7.
        await clickUntilUrl(page.getByRole("button", { name: "Officer" }), /\?rank=officer$/);
        await expect(guideCards(page)).toHaveCount(16);
        await expect(countLabel(page)).toHaveText("Showing 16 of 16 on this page · 16 total");

        await sortSelect(page).selectOption("salaryHigh");
        await expect(page).toHaveURL(/\?rank=officer&sort=salaryHigh$/);

        await page.reload();
        await expect(page).toHaveURL(
            /\/career-guides\/family\/cyber\?rank=officer&sort=salaryHigh$/
        );
        await expect(guideCards(page)).toHaveCount(16);
        await expect(sortSelect(page)).toHaveValue("salaryHigh");
        await expect(guideCards(page).first()).toContainText("1847");

        const search = searchBox(page);
        await search.pressSequentially("1847");
        // The URL is updated outside the router, so typing never loses focus.
        await expect(search).toBeFocused();
        await expect(search).toHaveValue("1847");
        await expect(page).toHaveURL(/[?&]q=1847(&|$)/);
        await expect(guideCards(page)).toHaveCount(1);

        await page.goto("/career-guides/family/cyber?q=1847");
        await expect(guideCards(page)).toHaveCount(1);
        await expect(searchBox(page)).toHaveValue("1847");
    });

    test("salary sort ranks the whole facet, not the page", async ({ page }) => {
        // 3D090 and 3D190 sit on later pages of Cyber than 17C0.
        await page.goto("/career-guides/family/cyber?sort=salaryHigh");
        await expect(guideCards(page).nth(0)).toContainText("17C0");
        await expect(guideCards(page).nth(1)).toContainText("3D090");
        await expect(guideCards(page).nth(2)).toContainText("3D190");
    });

    test("rank on the index covers all 4,202 guides", async ({ page }) => {
        await page.goto("/career-guides?rank=officer");
        await expect(countLabel(page)).toHaveText("Showing 60 of 60 on this page · 542 total");
        await expect(
            pagination(page).getByRole("link", { name: "10", exact: true })
        ).toHaveAttribute("href", "/career-guides/page/10?rank=officer#database");
    });

    test("a family chip on a branch page narrows the branch", async ({ page }) => {
        await page.goto("/career-guides/branch/army");
        await clickUntilUrl(
            page.getByRole("link", { name: "Cyber", exact: true }),
            /\/career-guides\/branch\/army\?family=cyber#database$/
        );
        await expect(guideCards(page)).toHaveCount(27);
        for (const card of await guideCards(page).all()) {
            await expect(card).toContainText("ARMY");
        }
        await expect(page.getByRole("link", { name: "Cyber", exact: true })).toHaveAttribute(
            "aria-current",
            "true"
        );

        // Leaving the branch keeps the family.
        await clickUntilUrl(
            page.getByRole("link", { name: "All", exact: true }),
            /\/career-guides\/family\/cyber#database$/
        );
        await expect(guideCards(page)).toHaveCount(60);
    });

    test("search says it covers only the loaded page", async ({ page }) => {
        // 11B has a guide, but it is not among the index's first 60 codes.
        await page.goto("/career-guides?q=11B");
        await expect(searchBox(page)).toHaveValue("11B");
        await expect(searchBox(page)).toHaveAttribute(
            "placeholder",
            "Search this page by code, title, or civilian role…"
        );
        await expect(guideCards(page)).toHaveCount(0);
        await expect(page.getByText("No matches on this page.")).toBeVisible();
        await expect(
            page.getByText("Search only looks at the guides on this page.", { exact: false })
        ).toBeVisible();
    });

    test("the view carries across page links and the back button", async ({ page }) => {
        // 64 Army officers: a full first page and 4 more on page 2.
        await page.goto("/career-guides/branch/army");
        await clickUntilUrl(page.getByRole("button", { name: "Officer" }), /\?rank=officer$/);
        await expect(guideCards(page)).toHaveCount(60);
        await expect(pagination(page).getByRole("link")).toHaveCount(2); // "2" and "Next"

        await clickUntilUrl(
            pagination(page).getByRole("link", { name: "2", exact: true }),
            /\/career-guides\/branch\/army\/page\/2\?rank=officer#database$/
        );
        await expect(guideCards(page)).toHaveCount(4);
        for (const card of await guideCards(page).all()) {
            await expect(card).toContainText("Officer");
        }

        await page.goBack();
        await expect(page).toHaveURL(/\/career-guides\/branch\/army\?rank=officer$/);
        await expect(guideCards(page)).toHaveCount(60);
        for (const card of await guideCards(page).all()) {
            await expect(card).toContainText("Officer");
        }

        // A new rank on a later page starts again from page 1.
        await page.goForward();
        await expect(page).toHaveURL(/\/page\/2\?rank=officer#database$/);
        await expect(guideCards(page)).toHaveCount(4);
        await clickUntilUrl(
            page.getByRole("button", { name: "Warrant" }),
            /\/career-guides\/branch\/army\?rank=warrant#database$/
        );
        await expect(guideCards(page)).toHaveCount(43);
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
        await expect(
            page.locator('a[href="/career-guides/branch/coast-guard#database"]')
        ).toHaveCount(1);
        await expect(
            page.locator('a[href="/career-guides/family/it-comms#database"]').first()
        ).toBeVisible();
        await expect(page.locator('a[href="/career-guides/page/71#database"]')).toHaveCount(1);

        await page.goto("/career-guides/branch/air-force");
        await expect(guideCards(page)).toHaveCount(60);
        // Every page of the facet is one hop from its first page.
        await expect(pagination(page).getByRole("link")).toHaveCount(31);
        await expect(
            page.locator('a[href="/career-guides/branch/air-force/page/31#database"]')
        ).toHaveCount(1);
    });
});
