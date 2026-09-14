import { expect, test } from "@playwright/test";

test.describe("Shopify Image Caching", () => {
    // The explicit waits below (service-worker activation, two cache probes, the
    // decoded-pixels poll) allow more than Playwright's 30s default per-test
    // timeout on their own, so without this the bounds never get to do their job:
    // the run aborts on the test timeout instead of skipping or failing on the
    // assertion that actually matters.
    test.describe.configure({ timeout: 90000 });

    test.afterEach(async ({ page }) => {
        // Never leave the context offline when an assertion above fails.
        await page.context().setOffline(false);
    });

    test("should load product images from cache when offline", async ({ page }) => {
        // Intercept all network requests to track image loading
        const requests: string[] = [];
        page.on("request", (request) => requests.push(request.url()));

        // Go to the store page
        await page.goto("/store");

        // Wait for the page to be fully loaded
        await page.waitForLoadState("networkidle");

        // When SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN aren't set,
        // /store renders a "Store Configuration Required" fallback with no
        // products. Skip the test at runtime rather than fail — this test
        // requires a live Shopify connection to be meaningful.
        const storeUnconfigured = await page
            .getByText("Store Configuration Required")
            .isVisible()
            .catch(() => false);
        test.skip(
            storeUnconfigured,
            "Shopify not configured — set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN to run this test"
        );

        // Find the first product image from Shopify
        const productImage = page.locator('img[src*="cdn.shopify.com"]').first();
        await expect(productImage).toBeVisible();

        const firstLoadUrl = await productImage.getAttribute("src");
        expect(firstLoadUrl).not.toBeNull();

        // Check that the image was loaded from the network initially
        const initialRequest = requests.find((url) => url === firstLoadUrl);
        expect(initialRequest).toBeDefined();

        // The first navigation is not service-worker controlled, so nothing it
        // fetched was cached. Wait for the worker to activate — bounded, because
        // `navigator.serviceWorker.ready` never settles when no worker registers
        // (next-pwa is disabled in development), and a hang there is a timeout
        // rather than the skip we want.
        const swActive = await page.evaluate(async () => {
            if (!("serviceWorker" in navigator)) return false;
            const registration = await Promise.race([
                navigator.serviceWorker.ready,
                new Promise((resolve) => setTimeout(() => resolve(null), 15000)),
            ]);
            return Boolean(registration);
        });
        test.skip(
            !swActive,
            "No active service worker — run against a production build (npm run build && npm run start)"
        );

        // Warm reload: this navigation is worker-controlled, so both the /store
        // document and the CDN image go through the runtime caching routes.
        await page.reload();
        await page.waitForLoadState("networkidle");

        const warmImage = page.locator('img[src*="cdn.shopify.com"]').first();
        await expect(warmImage).toBeVisible();

        const imageUrl = await warmImage.getAttribute("src");
        if (!imageUrl) {
            throw new Error("Shopify product image is missing a src attribute");
        }

        // Both caches must be primed before going offline. The image probe is the
        // real regression guard: the worker's own fetch is governed by connect-src,
        // so a CDN host missing from it leaves the "shopify-images" cache empty and
        // the offline reload has nothing to serve.
        await expect
            .poll(() => page.evaluate(() => caches.match("/store").then(Boolean)), {
                timeout: 15000,
            })
            .toBe(true);
        await expect
            .poll(() => page.evaluate((url) => caches.match(url).then(Boolean), imageUrl), {
                timeout: 15000,
            })
            .toBe(true);

        // Go offline
        await page.context().setOffline(true);

        // Reload the page
        await page.reload();

        // Wait for the page to be fully loaded (from service worker)
        await page.waitForLoadState("load");

        // Verify that the image is still visible (loaded from cache)
        const cachedProductImage = page.locator(`img[src="${imageUrl}"]`).first();
        await expect(cachedProductImage).toBeVisible();

        // A broken image still fills its aspect-ratio box, so a bounding box check
        // passes on failure. Assert the browser actually decoded pixels instead.
        await expect
            .poll(
                () =>
                    cachedProductImage.evaluate(
                        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0
                    ),
                { timeout: 10000 }
            )
            .toBe(true);
    });
});
