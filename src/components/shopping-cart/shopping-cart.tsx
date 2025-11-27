import { Fragment } from "react";
import { useCart } from "@hooks";
import { formatPrice } from "@lib/shopify";
import clsx from "clsx";

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
    const {
        cart,
        cartTotal,
        cartCurrency,
        isLoading,
        updateCartLines,
        removeFromCart,
    } = useCart();

    const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            await updateCartLines([{ id: lineId, quantity: newQuantity }]);
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const handleRemove = async (lineId: string) => {
        try {
            await removeFromCart([lineId]);
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const handleCheckout = () => {
        if (cart?.checkoutUrl) {
            window.location.href = cart.checkoutUrl;
        }
    };

    return (
        <Fragment>
            {/* Overlay */}
            <div
                className={clsx(
                    "tw-fixed tw-inset-0 tw-bg-black/50 tw-transition-opacity tw-z-40",
                    isOpen
                        ? "tw-opacity-100 tw-pointer-events-auto"
                        : "tw-opacity-0 tw-pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Cart Panel */}
            <div
                className={clsx(
                    "tw-fixed tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[400px] tw-bg-white tw-shadow-2xl tw-transition-transform tw-duration-300 tw-z-50 tw-flex tw-flex-col",
                    isOpen ? "tw-translate-x-0" : "tw-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b tw-border-gray-200">
                    <h2 className="tw-text-2xl tw-font-bold tw-text-secondary">
                        Shopping Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="tw-text-gray-500 hover:tw-text-gray-700 tw-transition-colors"
                        aria-label="Close cart"
                    >
                        <svg
                            className="tw-w-6 tw-h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="tw-flex-1 tw-overflow-y-auto tw-p-6">
                    {isLoading && !cart ? (
                        <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                            <div className="tw-text-gray-500">Loading cart...</div>
                        </div>
                    ) : !cart || cart.lines.edges.length === 0 ? (
                        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-text-center">
                            <svg
                                className="tw-w-16 tw-h-16 tw-text-gray-300 tw-mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <p className="tw-text-gray-600 tw-text-lg tw-font-medium">
                                Your cart is empty
                            </p>
                            <p className="tw-text-gray-500 tw-text-sm tw-mt-1">
                                Add some products to get started
                            </p>
                        </div>
                    ) : (
                        <div className="tw-space-y-4">
                            {cart.lines.edges.map(({ node: line }) => (
                                <div
                                    key={line.id}
                                    className="tw-flex tw-gap-4 tw-p-4 tw-bg-gray-50 tw-rounded-lg"
                                >
                                    {/* Product Image */}
                                    {line.merchandise.product.featuredImage && (
                                        <img
                                            src={line.merchandise.product.featuredImage.url}
                                            alt={
                                                line.merchandise.product.featuredImage.altText ||
                                                line.merchandise.product.title
                                            }
                                            className="tw-w-20 tw-h-20 tw-object-cover tw-rounded-lg"
                                        />
                                    )}

                                    {/* Product Details */}
                                    <div className="tw-flex-1 tw-min-w-0">
                                        <h3 className="tw-font-semibold tw-text-secondary tw-truncate">
                                            {line.merchandise.product.title}
                                        </h3>
                                        <p className="tw-text-sm tw-text-gray-600 tw-mt-1">
                                            {line.merchandise.title}
                                        </p>
                                        <p className="tw-font-bold tw-text-primary tw-mt-2">
                                            {formatPrice(
                                                line.cost.totalAmount.amount,
                                                line.cost.totalAmount.currencyCode
                                            )}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="tw-flex tw-items-center tw-gap-2 tw-mt-3">
                                            <button
                                                onClick={() =>
                                                    handleUpdateQuantity(line.id, line.quantity - 1)
                                                }
                                                disabled={line.quantity <= 1 || isLoading}
                                                className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-text-gray-700 hover:tw-bg-gray-100 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                            >
                                                -
                                            </button>
                                            <span className="tw-w-8 tw-text-center tw-font-medium">
                                                {line.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleUpdateQuantity(line.id, line.quantity + 1)
                                                }
                                                disabled={isLoading}
                                                className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-text-gray-700 hover:tw-bg-gray-100 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => handleRemove(line.id)}
                                                disabled={isLoading}
                                                className="tw-ml-auto tw-text-red-600 hover:tw-text-red-800 tw-text-sm tw-font-medium disabled:tw-opacity-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart && cart.lines.edges.length > 0 && (
                    <div className="tw-border-t tw-border-gray-200 tw-p-6 tw-bg-gray-50">
                        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                            <span className="tw-text-lg tw-font-semibold tw-text-secondary">
                                Subtotal
                            </span>
                            <span className="tw-text-2xl tw-font-bold tw-text-primary">
                                {formatPrice(cartTotal, cartCurrency)}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="tw-w-full tw-bg-primary tw-text-white tw-font-bold tw-py-4 tw-rounded-lg hover:tw-bg-primary-dark tw-transition-colors tw-duration-300 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>

                        <p className="tw-text-xs tw-text-gray-600 tw-text-center tw-mt-3">
                            Shipping and taxes calculated at checkout
                        </p>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default ShoppingCart;
