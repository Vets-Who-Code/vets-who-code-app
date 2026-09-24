import { expect, test } from "@playwright/test";

/**
 * Keyboard-only paths through the site chrome and custom widgets: the skip link,
 * the desktop and mobile navigation, the /store cart drawer, the /events sort
 * select and the homepage carousel bullets.
 *
 * The desktop menu renders from the xl breakpoint (1280px, the Desktop Chrome
 * device) and the burger below it (Pixel 5), so the nav cases pick by `isMobile`.
 */
const focusedIsInside = (page: import("@playwright/test").Page, selector: string) =>
    page.evaluate((sel) => document.activeElement?.closest(sel) !== null, selector);

test.describe("Keyboard navigation", () => {
    test("the skip link is the first tab stop and moves focus into main", async ({ page }) => {
        await page.goto("/");

        await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();

        await page.keyboard.press("Enter");
        await expect(page.locator("#main-content")).toBeFocused();
    });

    test("desktop parents open on focus, close on Escape and never open a new tab", async ({
        page,
        context,
        isMobile,
    }) => {
        test.skip(isMobile, "the desktop menu only renders from the xl breakpoint");
        await page.goto("/");
        // Scope to the header nav: the footer has its own "About Us" link.
        const nav = page.getByRole("navigation", { name: "Main Menu" });
        const about = nav.getByRole("button", { name: "About", exact: true });
        const aboutUs = nav.getByRole("link", { name: "About Us" });

        await about.focus();
        await expect(about).toHaveAttribute("aria-expanded", "true");
        await expect(aboutUs).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(about).toHaveAttribute("aria-expanded", "false");
        await expect(about).toBeFocused();
        await expect(aboutUs).toBeHidden();

        // Regression: the old <a href="#!" target="_blank"> opened /#! in a new tab.
        await page.keyboard.press("Enter");
        expect(context.pages()).toHaveLength(1);
        expect(page.url()).not.toContain("#!");
    });

    test("the mobile drawer takes focus, closes on Escape and returns focus", async ({
        page,
        isMobile,
    }) => {
        test.skip(!isMobile, "the burger only renders below the xl breakpoint");
        await page.goto("/");
        const burger = page.getByRole("button", { name: "Toggle Menu" });

        await burger.click();
        const dialog = page.getByRole("dialog", { name: "Navigation menu" });
        await expect(dialog).toBeVisible();
        await expect.poll(() => focusedIsInside(page, '[role="dialog"]')).toBe(true);
        await expect(dialog.getByRole("button", { name: "Close menu" })).toBeVisible();

        // "#!" parents are disclosure buttons here too, not new-tab links.
        const about = dialog.getByRole("button", { name: "About", exact: true });
        await expect(about).toHaveAttribute("aria-expanded", "false");
        await about.click();
        await expect(about).toHaveAttribute("aria-expanded", "true");

        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(burger).toBeFocused();
    });

    test("the cart drawer leaves the tab order when closed and returns focus", async ({ page }) => {
        await page.goto("/store");
        await page.waitForLoadState("networkidle");

        // Without Shopify credentials /store renders a configuration notice with no
        // cart, so skip at runtime rather than fail (see shopify-image-cache.spec.ts).
        const storeUnconfigured = await page
            .getByText("Store Configuration Required")
            .isVisible()
            .catch(() => false);
        test.skip(
            storeUnconfigured,
            "Shopify not configured — set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN to run this test"
        );

        const panel = page.getByRole("dialog", { name: "Shopping Cart" });
        await expect(panel).toBeHidden();
        for (let i = 0; i < 40; i += 1) {
            await page.keyboard.press("Tab");
            expect(await focusedIsInside(page, '[aria-labelledby="cart-title"]')).toBe(false);
        }

        const opener = page.getByRole("button", { name: "Open shopping cart" });
        await opener.click();
        await expect(panel).toBeVisible();
        await expect(page.getByRole("button", { name: "Close cart" })).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(opener).toBeFocused();
    });

    test("the events sort select is operable with the keyboard alone", async ({ page }) => {
        await page.goto("/events");
        const trigger = page.getByRole("button", { name: /Event Type:/ });

        await trigger.focus();
        await page.keyboard.press("Enter");
        await expect(trigger).toHaveAttribute("aria-expanded", "true");

        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await expect(page.getByRole("option", { name: "Happening" })).toBeFocused();

        await page.keyboard.press("Enter");
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toContainText("Happening");
    });

    test("carousel pagination bullets show the focus ring", async ({ page }) => {
        await page.goto("/");
        // Swiper renders bullets on the client, so wait for hydration before deciding.
        const bullet = page.locator(".swiper-pagination-bullet").first();
        await bullet.waitFor({ state: "attached", timeout: 10000 }).catch(() => undefined);
        test.skip((await bullet.count()) === 0, "no event carousel rendered on the homepage");

        // Arrive by keyboard so :focus-visible matches.
        await bullet.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        await expect(bullet).toBeFocused();

        const outline = await bullet.evaluate((el) => {
            const style = getComputedStyle(el);
            return { style: style.outlineStyle, width: style.outlineWidth };
        });
        expect(outline.style).not.toBe("none");
        expect(outline.width).toBe("3px");
    });
});
