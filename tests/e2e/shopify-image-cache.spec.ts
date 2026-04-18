
import { test, expect } from "@playwright/test";

test.describe("Shopify Image Caching", () => {
  test("should load product images from cache when offline", async ({
    page,
  }) => {
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

    const imageUrl = await productImage.getAttribute("src");
    expect(imageUrl).not.toBeNull();

    // Check that the image was loaded from the network initially
    const initialRequest = requests.find((url) => url === imageUrl);
    expect(initialRequest).toBeDefined();

    // Go offline
    await page.context().setOffline(true);

    // Reload the page
    await page.reload();

    // Wait for the page to be fully loaded (from service worker)
    await page.waitForLoadState("load");

    // Verify that the image is still visible (loaded from cache)
    const cachedProductImage = page.locator(`img[src*="${imageUrl}"]`).first();
    await expect(cachedProductImage).toBeVisible();

    // Check the image's dimensions to ensure it's not a broken image
    const boundingBox = await cachedProductImage.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(0);
    expect(boundingBox?.height).toBeGreaterThan(0);

    // Go back online
    await page.context().setOffline(false);
  });
});
