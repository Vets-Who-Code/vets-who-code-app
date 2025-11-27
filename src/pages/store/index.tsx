import { useState } from "react";
import type { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import ProductGrid from "@components/product-grid";
import ShoppingCart from "@components/shopping-cart";
import { getProducts, ShopifyProduct, isShopifyConfigured } from "@lib/shopify";
import { useCart } from "@hooks";
import clsx from "clsx";

interface StorePageProps {
    products: ShopifyProduct[];
    isConfigured: boolean;
}

const StorePage: React.FC<StorePageProps> = ({ products, isConfigured }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();

    if (!isConfigured) {
        return (
            <Layout>
                <SEO title="Store" />
                <div className="tw-container tw-mx-auto tw-px-4 tw-py-20">
                    <div className="tw-max-w-2xl tw-mx-auto tw-text-center">
                        <h1 className="tw-text-4xl tw-font-bold tw-text-secondary tw-mb-4">
                            Store Configuration Required
                        </h1>
                        <p className="tw-text-lg tw-text-gray-600">
                            The Shopify store is not configured yet. Please add your Shopify
                            credentials to the environment variables.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO
                title="Store"
                description="Shop official Vets Who Code merchandise and apparel"
            />

            {/* Hero Section */}
            <div className="tw-bg-white tw-py-20">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-max-w-3xl tw-mx-auto tw-text-center">
                        <h1 className="tw-text-5xl tw-font-bold tw-mb-4 tw-text-primary">
                            Vets Who Code Store
                        </h1>
                        <p className="tw-text-xl tw-text-gray-700">
                            Shop official merchandise and support our mission
                        </p>
                    </div>
                </div>
            </div>

            {/* Fixed Floating Cart Button */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="tw-fixed tw-bottom-[8.75rem] tw-right-6 tw-z-30 tw-bg-primary tw-text-white tw-w-16 tw-h-16 tw-rounded-full tw-shadow-2xl hover:tw-bg-primary-dark hover:tw-scale-110 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center"
                aria-label="Open shopping cart"
            >
                <svg
                    className="tw-w-7 tw-h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
                {cartCount > 0 && (
                    <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-red-600 tw-text-white tw-rounded-full tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-text-sm tw-font-bold tw-shadow-lg">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Main Content */}
            <div className="tw-container tw-mx-auto tw-px-4 tw-py-12">
                {/* Header */}
                <div className="tw-mb-8">
                    <h2 className="tw-text-3xl tw-font-bold tw-text-secondary tw-mb-2">
                        All Products
                    </h2>
                    <p className="tw-text-gray-600">
                        {products.length} {products.length === 1 ? "product" : "products"}{" "}
                        available
                    </p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <ProductGrid products={products} columns={3} />
                ) : (
                    <div className="tw-text-center tw-py-20">
                        <p className="tw-text-xl tw-text-gray-600">
                            No products available at the moment.
                        </p>
                    </div>
                )}
            </div>

            {/* Shopping Cart */}
            <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<StorePageProps> = async () => {
    const isConfigured = isShopifyConfigured();

    if (!isConfigured) {
        return {
            props: {
                products: [],
                isConfigured: false,
            },
            revalidate: 60,
        };
    }

    try {
        const products = await getProducts(100);

        return {
            props: {
                products,
                isConfigured: true,
            },
            revalidate: 300, // Revalidate every 5 minutes
        };
    } catch (error) {
        console.error("Failed to fetch products:", error);

        return {
            props: {
                products: [],
                isConfigured: true,
            },
            revalidate: 60,
        };
    }
};

export default StorePage;
