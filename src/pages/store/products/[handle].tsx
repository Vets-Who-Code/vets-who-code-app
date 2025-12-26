import { useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import ShoppingCart from "@components/shopping-cart";
import {
    getProducts,
    getProduct,
    ShopifyProduct,
    ShopifyProductVariant,
    formatPrice,
    isShopifyConfigured,
} from "@lib/shopify";
import { useCart } from "@hooks";
import clsx from "clsx";

interface ProductDetailPageProps {
    product: ShopifyProduct | null;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
    const router = useRouter();
    const { addToCart, isLoading: cartLoading, cartCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
        product?.variants.edges[0]?.node || null
    );
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);

    // Show loading state while page is being generated
    if (router.isFallback) {
        return (
            <Layout>
                <div className="tw-container tw-mx-auto tw-px-4 tw-py-20 tw-text-center">
                    <p className="tw-text-xl tw-text-gray-300">Loading product...</p>
                </div>
            </Layout>
        );
    }

    // Show 404 if product not found
    if (!product) {
        return (
            <Layout>
                <SEO title="Product Not Found" />
                <div className="tw-container tw-mx-auto tw-px-4 tw-py-20 tw-text-center">
                    <h1 className="tw-text-4xl tw-font-bold tw-text-secondary tw-mb-4">
                        Product Not Found
                    </h1>
                    <p className="tw-text-xl tw-text-gray-300 tw-mb-8">
                        The product you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => router.push("/store")}
                        className="tw-bg-primary tw-text-white tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-primary-dark tw-transition-colors tw-font-semibold"
                    >
                        Back to Store
                    </button>
                </div>
            </Layout>
        );
    }

    // Handle option selection
    const handleOptionChange = (optionName: string, value: string) => {
        const newOptions = { ...selectedOptions, [optionName]: value };
        setSelectedOptions(newOptions);

        // Find matching variant
        const matchingVariant = product.variants.edges.find(({ node: variant }) =>
            variant.selectedOptions.every(
                (option) => newOptions[option.name] === option.value
            )
        )?.node;

        if (matchingVariant) {
            setSelectedVariant(matchingVariant);
        }
    };

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!selectedVariant || !product.availableForSale) return;

        try {
            setIsAdding(true);
            await addToCart([
                {
                    merchandiseId: selectedVariant.id,
                    quantity,
                },
            ]);
            setIsCartOpen(true);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const currentImage = selectedVariant?.image || product.images.edges[0]?.node;
    const price = selectedVariant?.price || product.priceRange.minVariantPrice;
    const compareAtPrice = selectedVariant?.compareAtPrice;

    return (
        <Layout>
            <SEO
                title={product.title}
                description={product.description}
                image={currentImage?.url}
            />

            {/* Breadcrumb */}
            <div className="tw-bg-gray-50 tw-py-4">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <nav className="tw-flex tw-items-center tw-gap-2 tw-text-sm">
                        <button
                            onClick={() => router.push("/")}
                            className="tw-text-gray-300 hover:tw-text-primary"
                        >
                            Home
                        </button>
                        <span className="tw-text-gray-400">/</span>
                        <button
                            onClick={() => router.push("/store")}
                            className="tw-text-gray-300 hover:tw-text-primary"
                        >
                            Store
                        </button>
                        <span className="tw-text-gray-400">/</span>
                        <span className="tw-text-secondary tw-font-medium">{product.title}</span>
                    </nav>
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

                <div className="tw-grid md:tw-grid-cols-2 tw-gap-12">
                    {/* Product Images */}
                    <div>
                        {currentImage && (
                            <div className="tw-sticky tw-top-4">
                                <img
                                    src={currentImage.url}
                                    alt={currentImage.altText || product.title}
                                    className="tw-w-full tw-rounded-2xl tw-shadow-lg"
                                />

                                {/* Thumbnail Gallery */}
                                {product.images.edges.length > 1 && (
                                    <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-4">
                                        {product.images.edges.map(({ node: image }) => (
                                            <button
                                                key={image.id}
                                                onClick={() => {
                                                    // Find variant with this image
                                                    const variantWithImage = product.variants.edges.find(
                                                        ({ node }) => node.image?.id === image.id
                                                    )?.node;
                                                    if (variantWithImage) {
                                                        setSelectedVariant(variantWithImage);
                                                    }
                                                }}
                                                className={clsx(
                                                    "tw-rounded-lg tw-overflow-hidden tw-border-2 tw-transition-all",
                                                    currentImage.id === image.id
                                                        ? "tw-border-primary tw-shadow-md"
                                                        : "tw-border-gray-200 hover:tw-border-gray-300"
                                                )}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={image.altText || product.title}
                                                    className="tw-w-full tw-aspect-square tw-object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div>
                        {/* Vendor */}
                        {product.vendor && (
                            <p className="tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-2 tw-uppercase tw-tracking-wide">
                                {product.vendor}
                            </p>
                        )}

                        {/* Title */}
                        <h1 className="tw-text-4xl tw-font-bold tw-text-secondary tw-mb-4">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="tw-flex tw-items-baseline tw-gap-3 tw-mb-6">
                            <span className="tw-text-3xl tw-font-bold tw-text-primary">
                                {formatPrice(price.amount, price.currencyCode)}
                            </span>
                            {compareAtPrice && (
                                <span className="tw-text-xl tw-text-gray-500 tw-line-through">
                                    {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                                </span>
                            )}
                        </div>

                        {/* Availability */}
                        <div className="tw-mb-6">
                            {product.availableForSale ? (
                                <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-gold-light/30 tw-text-gold-deep tw-rounded-full tw-font-medium">
                                    <svg className="tw-w-5 tw-h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    In Stock
                                </span>
                            ) : (
                                <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-red-100 tw-text-red-800 tw-rounded-full tw-font-medium">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="tw-mb-8">
                                <p className="tw-text-gray-200 tw-leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Options (Size, Color, etc.) */}
                        {product.options
                            .filter((option) => {
                                // Only show options with multiple values
                                // Hide default Shopify "Title" option with "Default Title" value
                                return option.values.length > 1 &&
                                       !(option.name === 'Title' && option.values.includes('Default Title'));
                            })
                            .map((option) => (
                            <div key={option.id} className="tw-mb-6">
                                <label className="tw-block tw-font-semibold tw-text-secondary tw-mb-3">
                                    {option.name}
                                </label>
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    {option.values.map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleOptionChange(option.name, value)}
                                            className={clsx(
                                                "tw-px-6 tw-py-3 tw-border-2 tw-rounded-lg tw-font-medium tw-transition-all",
                                                selectedOptions[option.name] === value
                                                    ? "tw-border-primary tw-bg-primary tw-text-white"
                                                    : "tw-border-gray-300 tw-bg-white tw-text-gray-200 hover:tw-border-gray-400"
                                            )}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity */}
                        <div className="tw-mb-8">
                            <label className="tw-block tw-font-semibold tw-text-secondary tw-mb-3">
                                Quantity
                            </label>
                            <div className="tw-flex tw-items-center tw-gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-200 hover:tw-bg-gray-50 tw-font-bold tw-text-xl"
                                >
                                    -
                                </button>
                                <span className="tw-text-xl tw-font-semibold tw-w-12 tw-text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-200 hover:tw-bg-gray-50 tw-font-bold tw-text-xl"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.availableForSale || isAdding || cartLoading}
                            className={clsx(
                                "tw-w-full tw-py-4 tw-rounded-lg tw-font-bold tw-text-lg tw-transition-all tw-duration-300",
                                product.availableForSale
                                    ? "tw-bg-primary tw-text-white hover:tw-bg-primary-dark hover:tw-shadow-xl disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                    : "tw-bg-gray-300 tw-text-gray-300 tw-cursor-not-allowed"
                            )}
                        >
                            {isAdding
                                ? "Adding to Cart..."
                                : product.availableForSale
                                ? "Add to Cart"
                                : "Out of Stock"}
                        </button>

                        {/* Product Type & Tags */}
                        {(product.productType || product.tags.length > 0) && (
                            <div className="tw-mt-8 tw-pt-8 tw-border-t tw-border-gray-200">
                                {product.productType && (
                                    <p className="tw-text-sm tw-text-gray-300 tw-mb-2">
                                        <span className="tw-font-semibold">Category:</span>{" "}
                                        {product.productType}
                                    </p>
                                )}
                                {product.tags.length > 0 && (
                                    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-3">
                                        {product.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="tw-px-3 tw-py-1 tw-bg-gray-100 tw-text-gray-200 tw-rounded-full tw-text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Shopping Cart */}
            <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (!isShopifyConfigured()) {
        return {
            paths: [],
            fallback: true,
        };
    }

    try {
        const products = await getProducts(100);
        const paths = products.map((product) => ({
            params: { handle: product.handle },
        }));

        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        console.error("Failed to fetch products for paths:", error);
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({ params }) => {
    const handle = params?.handle as string;

    if (!handle || !isShopifyConfigured()) {
        return {
            notFound: true,
        };
    }

    try {
        const product = await getProduct(handle);

        if (!product) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                product,
            },
            revalidate: 300, // Revalidate every 5 minutes
        };
    } catch (error) {
        console.error(`Failed to fetch product ${handle}:`, error);
        return {
            notFound: true,
        };
    }
};

export default ProductDetailPage;
