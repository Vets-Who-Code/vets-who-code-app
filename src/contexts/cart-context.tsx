import type { ShopifyCart } from "@lib/shopify";
import { SafeLocalStorage } from "@utils/safe-storage";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const CART_ID_KEY = "shopify_cart_id";
// Cart session expires after 7 days (Shopify cart lifetime)
const CART_TIMEOUT_MINUTES = 7 * 24 * 60;

interface CartLine {
    merchandiseId: string;
    quantity: number;
}

interface UpdateCartLine {
    id: string;
    quantity: number;
}

interface CartContextType {
    cart: ShopifyCart | null;
    cartCount: number;
    cartTotal: string;
    cartCurrency: string;
    isLoading: boolean;
    error: string | null;
    addToCart: (lines: CartLine[]) => Promise<ShopifyCart>;
    updateCartLines: (lines: UpdateCartLine[]) => Promise<ShopifyCart>;
    removeFromCart: (lineIds: string[]) => Promise<ShopifyCart>;
    clearCart: () => void;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<ShopifyCart | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get cart ID from localStorage with safe handling
    const getCartId = useCallback((): string | null => {
        if (typeof window === "undefined") return null;
        return SafeLocalStorage.getItem<string | null>(CART_ID_KEY, null);
    }, []);

    // Save cart ID to localStorage with expiration
    const saveCartId = useCallback((cartId: string) => {
        if (typeof window === "undefined") return;
        SafeLocalStorage.setItem(CART_ID_KEY, cartId, CART_TIMEOUT_MINUTES);
    }, []);

    // Clear cart ID from localStorage
    const clearCartId = useCallback(() => {
        if (typeof window === "undefined") return;
        SafeLocalStorage.removeItem(CART_ID_KEY);
    }, []);

    // Fetch cart data
    const fetchCart = useCallback(
        async (cartId: string) => {
            try {
                const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        clearCartId();
                        return null;
                    }
                    throw new Error("Failed to fetch cart");
                }

                const data = await response.json();
                return data.cart;
            } catch (err) {
                console.error("Error fetching cart:", err);
                throw err;
            }
        },
        [clearCartId]
    );

    // Create a new cart
    const createCart = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/shopify/cart/create", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to create cart");
            }

            const data = await response.json();
            const newCart = data.cart;

            saveCartId(newCart.id);
            setCart(newCart);

            return newCart;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to create cart";
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [saveCartId]);

    // Add items to cart
    const addToCart = useCallback(
        async (lines: CartLine[]) => {
            try {
                setIsLoading(true);
                setError(null);

                let cartId = getCartId();

                // If no cart exists, create one
                if (!cartId) {
                    const newCart = await createCart();
                    cartId = newCart.id;
                }

                const response = await fetch("/api/shopify/cart/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartId, lines }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add items to cart");
                }

                const data = await response.json();
                setCart(data.cart);

                return data.cart;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to add to cart";
                setError(errorMessage);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [getCartId, createCart]
    );

    // Update cart line quantities
    const updateCartLines = useCallback(
        async (lines: UpdateCartLine[]) => {
            try {
                setIsLoading(true);
                setError(null);

                const cartId = getCartId();
                if (!cartId) {
                    throw new Error("No cart found");
                }

                const response = await fetch("/api/shopify/cart/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartId, lines }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update cart");
                }

                const data = await response.json();
                setCart(data.cart);

                return data.cart;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to update cart";
                setError(errorMessage);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [getCartId]
    );

    // Remove items from cart
    const removeFromCart = useCallback(
        async (lineIds: string[]) => {
            try {
                setIsLoading(true);
                setError(null);

                const cartId = getCartId();
                if (!cartId) {
                    throw new Error("No cart found");
                }

                const response = await fetch("/api/shopify/cart/remove", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartId, lineIds }),
                });

                if (!response.ok) {
                    throw new Error("Failed to remove items from cart");
                }

                const data = await response.json();
                setCart(data.cart);

                return data.cart;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to remove from cart";
                setError(errorMessage);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [getCartId]
    );

    // Clear the entire cart
    const clearCart = useCallback(() => {
        clearCartId();
        setCart(null);
    }, [clearCartId]);

    // Refresh cart data
    const refreshCart = useCallback(async () => {
        const cartId = getCartId();
        if (!cartId) {
            setCart(null);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const cartData = await fetchCart(cartId);
            setCart(cartData);
        } catch (err) {
            console.error("Error refreshing cart:", err);
            setError("Failed to refresh cart");
        } finally {
            setIsLoading(false);
        }
    }, [getCartId, fetchCart]);

    // Initialize cart on mount
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // Calculate cart totals
    const cartCount = cart?.totalQuantity || 0;
    const cartTotal = cart?.cost.totalAmount.amount || "0";
    const cartCurrency = cart?.cost.totalAmount.currencyCode || "USD";

    const value: CartContextType = {
        cart,
        cartCount,
        cartTotal,
        cartCurrency,
        isLoading,
        error,
        addToCart,
        updateCartLines,
        removeFromCart,
        clearCart,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
