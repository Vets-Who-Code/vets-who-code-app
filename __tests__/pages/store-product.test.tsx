import { render, screen } from "@testing-library/react";
import type { GetServerSidePropsContext } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1204: a Shopify outage on the product page must not render as a 404.
 */

const shopify = vi.hoisted(() => ({
    getProduct: vi.fn(),
    isShopifyConfigured: vi.fn(() => true),
    formatPrice: vi.fn(),
}));
vi.mock("@lib/shopify", () => shopify);

vi.mock("@components/seo/page-seo", () => ({ default: () => null }));
vi.mock("@components/shopping-cart", () => ({ default: () => null }));
vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@hooks", () => ({
    useCart: () => ({ addToCart: vi.fn(), isLoading: false, cartCount: 0 }),
}));
vi.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/store/products/tee", push: vi.fn() }),
}));

import ProductDetailPage, { getServerSideProps } from "@/pages/store/products/[handle]";

function ctx() {
    const res = { statusCode: 200 };
    return {
        res,
        context: { params: { handle: "tee" }, res } as unknown as GetServerSidePropsContext,
    };
}

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("product page getServerSideProps", () => {
    it("returns notFound when Shopify has no product with that handle", async () => {
        shopify.getProduct.mockResolvedValue(null);
        const { context, res } = ctx();
        expect(await getServerSideProps(context)).toEqual({ notFound: true });
        expect(res.statusCode).toBe(200);
    });

    it("returns a 503 degraded state when Shopify fails", async () => {
        shopify.getProduct.mockRejectedValue(new Error("Shopify API error: 502 Bad Gateway"));
        const { context, res } = ctx();
        expect(await getServerSideProps(context)).toEqual({
            props: { product: null, unavailable: true },
        });
        expect(res.statusCode).toBe(503);
    });
});

describe("ProductDetailPage", () => {
    it("shows an outage message with a retry link, not Product Not Found", () => {
        render(<ProductDetailPage product={null} unavailable={true} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "Store Temporarily Unavailable"
        );
        expect(screen.getByRole("link", { name: "Try Again" })).toHaveAttribute(
            "href",
            "/store/products/tee"
        );
        expect(screen.queryByText("Product Not Found")).not.toBeInTheDocument();
    });
});
