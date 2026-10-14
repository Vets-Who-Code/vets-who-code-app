import { expect, type Page, test } from "@playwright/test";

/**
 * The Store journey: browse /store, open a product, add it to the cart, and hand off to Shopify
 * checkout. /store and the product page are server-rendered from the Storefront API, so they need
 * real SHOPIFY_* credentials; without them the spec skips. The cart endpoints the browser calls
 * (/api/shopify/cart/*) are fulfilled here, so no cart is ever created in Shopify, and the
 * checkout URL is stubbed so the handoff never loads Shopify either.
 */

const CART_ID = "gid://shopify/Cart/e2e-test-cart";
const CHECKOUT_URL = "https://e2e-test-store.myshopify.com/cart/c/e2e-test-cart";

const money = (amount: string) => ({ amount, currencyCode: "USD" });

const mockCartApi = async (page: Page, productTitle: () => string) => {
    const emptyCart = {
        id: CART_ID,
        checkoutUrl: CHECKOUT_URL,
        cost: { totalAmount: money("0.0"), subtotalAmount: money("0.0") },
        lines: { edges: [] },
        totalQuantity: 0,
    };

    await page.route("**/api/shopify/cart/create", (route) =>
        route.fulfill({ json: { cart: emptyCart } })
    );

    await page.route("**/api/shopify/cart/add", (route) => {
        const { lines } = route.request().postDataJSON() as {
            lines: Array<{ merchandiseId: string; quantity: number }>;
        };
        const { merchandiseId, quantity } = lines[0];
        route.fulfill({
            json: {
                cart: {
                    ...emptyCart,
                    cost: { totalAmount: money("25.0"), subtotalAmount: money("25.0") },
                    lines: {
                        edges: [
                            {
                                node: {
                                    id: "gid://shopify/CartLine/e2e-line",
                                    quantity,
                                    cost: { totalAmount: money("25.0") },
                                    merchandise: {
                                        id: merchandiseId,
                                        title: "Default Title",
                                        selectedOptions: [],
                                        product: {
                                            id: "gid://shopify/Product/e2e",
                                            handle: "e2e",
                                            title: productTitle(),
                                            featuredImage: null,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    totalQuantity: quantity,
                },
            },
        });
    });

    // Stand in for Shopify checkout so the handoff is observable without leaving the test.
    await page.route(CHECKOUT_URL, (route) =>
        route.fulfill({ contentType: "text/html", body: "<h1>Checkout</h1>" })
    );
};

test("browse the store, add a product to the cart, and hand off to checkout", async ({ page }) => {
    let productTitle = "";
    await mockCartApi(page, () => productTitle);

    await page.goto("/store");

    const storeUnconfigured = await page
        .getByText("Store Configuration Required")
        .isVisible()
        .catch(() => false);
    test.skip(
        storeUnconfigured,
        "Shopify not configured — set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN to run this test"
    );

    await expect(page.getByRole("heading", { name: "Vets Who Code Store" })).toBeVisible();
    const productLinks = page.locator('a[href^="/store/products/"]');
    test.skip((await productLinks.count()) === 0, "The Shopify store has no products to browse");

    await productLinks.first().click();
    await expect(page).toHaveURL(/\/store\/products\/[^/]+$/);

    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toBeVisible();
    productTitle = (await title.textContent())?.trim() ?? "";

    const addToCart = page.getByRole("button", { name: "Add to Cart" });
    test.skip(!(await addToCart.isVisible()), "The first product is out of stock");
    await addToCart.click();

    const cart = page.getByRole("dialog", { name: "Shopping Cart" });
    await expect(cart).toBeVisible();
    await expect(cart.getByRole("heading", { name: productTitle })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open shopping cart" })).toContainText("1");

    await cart.getByRole("button", { name: "Proceed to Checkout" }).click();
    await expect(page).toHaveURL(CHECKOUT_URL);
});
