import ShoppingCart from "@components/shopping-cart/shopping-cart";
import { fireEvent, render, screen } from "@testing-library/react";

// Only useCart is stubbed; useKeyboardFocus must stay real for the trap and focus return.
vi.mock("@hooks", async (importOriginal) => ({
    ...(await importOriginal<typeof import("@hooks")>()),
    useCart: () => ({
        cart: {
            id: "cart-1",
            checkoutUrl: "https://checkout.example/1",
            cost: {
                totalAmount: { amount: "25.00", currencyCode: "USD" },
                subtotalAmount: { amount: "25.00", currencyCode: "USD" },
                totalTaxAmount: null,
            },
            lines: {
                edges: [
                    {
                        node: {
                            id: "line-1",
                            quantity: 1,
                            cost: { totalAmount: { amount: "25.00", currencyCode: "USD" } },
                            merchandise: {
                                id: "variant-1",
                                title: "Large",
                                selectedOptions: [],
                                product: {
                                    id: "product-1",
                                    handle: "vwc-tee",
                                    title: "VWC Tee",
                                    featuredImage: null,
                                },
                            },
                        },
                    },
                ],
            },
        },
        cartTotal: "25.00",
        cartCurrency: "USD",
        isLoading: false,
        updateCartLines: vi.fn(),
        removeFromCart: vi.fn(),
    }),
}));

describe("ShoppingCart", () => {
    // happy-dom does not compute visibility from a class, so assert the class itself.
    it("hides the closed panel from the tab order and the accessibility tree", () => {
        render(<ShoppingCart isOpen={false} onClose={vi.fn()} />);

        expect(screen.getByRole("dialog", { hidden: true })).toHaveClass("tw-invisible");
    });

    it("is a labelled dialog whose buttons all have an explicit type", () => {
        render(<ShoppingCart isOpen={true} onClose={vi.fn()} />);
        const dialog = screen.getByRole("dialog", { name: "Shopping Cart" });

        expect(dialog).not.toHaveClass("tw-invisible");
        for (const button of screen.getAllByRole("button")) {
            expect(button).toHaveAttribute("type", "button");
        }
        expect(screen.getByRole("button", { name: "Increase quantity of VWC Tee" })).toBeVisible();
        expect(screen.getByRole("button", { name: "Remove VWC Tee" })).toBeVisible();
    });

    it("focuses the close button on open, closes on Escape and returns focus", () => {
        const onClose = vi.fn();
        const { rerender } = render(
            <>
                <button type="button">Open shopping cart</button>
                <ShoppingCart isOpen={false} onClose={onClose} />
            </>
        );
        const opener = screen.getByRole("button", { name: "Open shopping cart" });
        opener.focus();

        rerender(
            <>
                <button type="button">Open shopping cart</button>
                <ShoppingCart isOpen={true} onClose={onClose} />
            </>
        );
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close cart" }));

        fireEvent.keyDown(window, { key: "Escape" });
        expect(onClose).toHaveBeenCalledTimes(1);

        rerender(
            <>
                <button type="button">Open shopping cart</button>
                <ShoppingCart isOpen={false} onClose={onClose} />
            </>
        );
        expect(document.activeElement).toBe(opener);
    });
});
