import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface OrderItem {
    id: string;
    productTitle: string;
    variantTitle: string | null;
    quantity: number;
    price: string;
    totalPrice: string;
    sku: string | null;
    imageUrl: string | null;
}

interface Order {
    id: string;
    shopifyId: string;
    orderNumber: string;
    customerEmail: string;
    customerName: string | null;
    totalPrice: string;
    currency: string;
    financialStatus: string;
    fulfillmentStatus: string | null;
    orderCreatedAt: string;
    items: OrderItem[];
}

const OrderHistoryPage = () => {
    const { status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/orders");
            return;
        }

        if (status === "authenticated") {
            fetchOrders();
        }
    }, [status, router]);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/orders");

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data.orders);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load order history");
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (amount: string, currency: string): string => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
        });
        return formatter.format(parseFloat(amount));
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { color: string; label: string }> = {
            paid: { color: "tw-bg-green-100 tw-text-green-800", label: "Paid" },
            pending: { color: "tw-bg-yellow-100 tw-text-yellow-800", label: "Pending" },
            refunded: { color: "tw-bg-red-100 tw-text-red-800", label: "Refunded" },
            partially_refunded: {
                color: "tw-bg-orange-100 tw-text-orange-800",
                label: "Partially Refunded",
            },
            voided: { color: "tw-bg-gray-100 tw-text-gray-800", label: "Voided" },
        };

        const { color, label } = statusMap[status] || {
            color: "tw-bg-gray-100 tw-text-gray-800",
            label: status,
        };

        return (
            <span
                className={clsx("tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium", color)}
            >
                {label}
            </span>
        );
    };

    const getFulfillmentBadge = (status: string | null) => {
        if (!status) {
            return (
                <span className="tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-bg-gray-100 tw-text-gray-800">
                    Unfulfilled
                </span>
            );
        }

        const statusMap: Record<string, { color: string; label: string }> = {
            fulfilled: { color: "tw-bg-green-100 tw-text-green-800", label: "Fulfilled" },
            partial: { color: "tw-bg-yellow-100 tw-text-yellow-800", label: "Partially Fulfilled" },
            unfulfilled: { color: "tw-bg-gray-100 tw-text-gray-800", label: "Unfulfilled" },
        };

        const { color, label } = statusMap[status] || {
            color: "tw-bg-gray-100 tw-text-gray-800",
            label: status,
        };

        return (
            <span
                className={clsx("tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium", color)}
            >
                {label}
            </span>
        );
    };

    if (status === "loading" || isLoading) {
        return (
            <Layout>
                <SEO title="Order History" />
                <div className="tw-container tw-mx-auto tw-px-4 tw-py-20 tw-text-center">
                    <div className="tw-flex tw-items-center tw-justify-center">
                        <div className="tw-text-xl tw-text-gray-300">Loading orders...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO title="Order History" description="View your Vets Who Code store order history" />

            {/* Hero Section */}
            <div className="tw-bg-white tw-py-12">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <h1 className="tw-text-4xl tw-font-bold tw-text-primary tw-mb-2">
                        Order History
                    </h1>
                    <p className="tw-text-lg tw-text-gray-200">
                        View and track your purchases from the VWC Store
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="tw-container tw-mx-auto tw-px-4 tw-py-12">
                {error && (
                    <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-text-red-800 tw-px-6 tw-py-4 tw-rounded-lg tw-mb-8">
                        {error}
                    </div>
                )}

                {!error && orders.length === 0 ? (
                    <div className="tw-max-w-2xl tw-mx-auto tw-text-center tw-py-20">
                        <div className="tw-bg-gray-50 tw-rounded-2xl tw-p-12">
                            <svg
                                className="tw-w-20 tw-h-20 tw-text-gray-300 tw-mx-auto tw-mb-6"
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
                            <h2 className="tw-text-2xl tw-font-bold tw-text-secondary tw-mb-3">
                                No Orders Yet
                            </h2>
                            <p className="tw-text-gray-300 tw-mb-8">
                                You haven't placed any orders yet. Visit our store to get started!
                            </p>
                            <button
                                onClick={() => router.push("/store")}
                                className="tw-bg-primary tw-text-white tw-px-8 tw-py-3 tw-rounded-lg hover:tw-bg-primary-dark tw-transition-colors tw-font-semibold"
                            >
                                Browse Store
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="tw-space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden tw-border tw-border-gray-200 hover:tw-shadow-lg tw-transition-shadow"
                            >
                                {/* Order Header */}
                                <div className="tw-bg-gray-50 tw-px-6 tw-py-4 tw-border-b tw-border-gray-200">
                                    <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4">
                                        <div>
                                            <h3 className="tw-text-lg tw-font-bold tw-text-secondary">
                                                Order {order.orderNumber}
                                            </h3>
                                            <p className="tw-text-sm tw-text-gray-300">
                                                Placed on {formatDate(order.orderCreatedAt)}
                                            </p>
                                        </div>
                                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                                            {getStatusBadge(order.financialStatus)}
                                            {getFulfillmentBadge(order.fulfillmentStatus)}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="tw-px-6 tw-py-4">
                                    <div className="tw-space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="tw-flex tw-gap-4">
                                                {/* Placeholder for product image */}
                                                <div className="tw-w-20 tw-h-20 tw-bg-gray-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                                                    <svg
                                                        className="tw-w-10 tw-h-10 tw-text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        />
                                                    </svg>
                                                </div>

                                                {/* Product Info */}
                                                <div className="tw-flex-1 tw-min-w-0">
                                                    <h4 className="tw-font-semibold tw-text-secondary">
                                                        {item.productTitle}
                                                    </h4>
                                                    {item.variantTitle && (
                                                        <p className="tw-text-sm tw-text-gray-300 tw-mt-1">
                                                            {item.variantTitle}
                                                        </p>
                                                    )}
                                                    {item.sku && (
                                                        <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
                                                            SKU: {item.sku}
                                                        </p>
                                                    )}
                                                    <p className="tw-text-sm tw-text-gray-300 tw-mt-2">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>

                                                {/* Price */}
                                                <div className="tw-text-right tw-flex-shrink-0">
                                                    <p className="tw-font-bold tw-text-primary">
                                                        {formatPrice(
                                                            item.totalPrice,
                                                            order.currency
                                                        )}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="tw-text-sm tw-text-gray-300 tw-mt-1">
                                                            {formatPrice(
                                                                item.price,
                                                                order.currency
                                                            )}{" "}
                                                            each
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Total */}
                                <div className="tw-bg-gray-50 tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
                                    <div className="tw-flex tw-justify-between tw-items-center">
                                        <span className="tw-text-lg tw-font-semibold tw-text-secondary">
                                            Order Total
                                        </span>
                                        <span className="tw-text-2xl tw-font-bold tw-text-primary">
                                            {formatPrice(order.totalPrice, order.currency)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default OrderHistoryPage;
