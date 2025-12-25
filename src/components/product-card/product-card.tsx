import { forwardRef, useState } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ShopifyProduct, formatPrice } from "@lib/shopify";
import { useCart } from "@hooks";

interface TProps {
    product: ShopifyProduct;
    className?: string;
}

const ProductCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, product }, ref) => {
        const { addToCart, isLoading: cartLoading } = useCart();
        const [isAdding, setIsAdding] = useState(false);

        const image = product.images.edges[0]?.node;
        const minPrice = product.priceRange.minVariantPrice;
        const maxPrice = product.priceRange.maxVariantPrice;
        const defaultVariant = product.variants.edges[0]?.node;

        const priceDisplay =
            minPrice.amount === maxPrice.amount
                ? formatPrice(minPrice.amount, minPrice.currencyCode)
                : `${formatPrice(minPrice.amount, minPrice.currencyCode)} - ${formatPrice(
                      maxPrice.amount,
                      maxPrice.currencyCode
                  )}`;

        const handleAddToCart = async (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (!defaultVariant || !product.availableForSale) return;

            try {
                setIsAdding(true);
                await addToCart([
                    {
                        merchandiseId: defaultVariant.id,
                        quantity: 1,
                    },
                ]);
            } catch (error) {
                console.error("Failed to add to cart:", error);
            } finally {
                setIsAdding(false);
            }
        };

        return (
            <div
                className={clsx(
                    "group tw-h-full tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-border tw-border-gray-200/50 tw-transition-all tw-duration-500 hover:tw-bg-white hover:tw-shadow-2xl hover:tw-shadow-primary/10 hover:-tw-translate-y-2",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative tw-overflow-hidden tw-aspect-square">
                    {image && (
                        <img
                            src={image.url}
                            alt={image.altText || product.title}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                        />
                    )}

                    {!product.availableForSale && (
                        <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
                            <span className="tw-bg-white tw-px-4 tw-py-2 tw-rounded-full tw-font-bold tw-text-gray-400">
                                Sold Out
                            </span>
                        </div>
                    )}

                    <Anchor className="link-overlay" path={`/store/products/${product.handle}`}>
                        {product.title}
                    </Anchor>
                </figure>

                <div className="tw-relative tw-px-7.5 tw-pb-10 tw-pt-7.5">
                    <div className="tw-mb-2">
                        <h3 className="tw-m-0 tw-text-lg tw-font-bold tw-leading-normal tw-text-secondary tw-line-clamp-2">
                            <Anchor path={`/store/products/${product.handle}`}>{product.title}</Anchor>
                        </h3>
                        {product.vendor && (
                            <span className="tw-text-sm tw-text-gray-300">{product.vendor}</span>
                        )}
                    </div>

                    {product.description && (
                        <p className="tw-mt-2 tw-text-sm tw-text-gray-200 tw-line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between tw-gap-4">
                        <span className="tw-text-xl tw-font-bold tw-text-primary">
                            {priceDisplay}
                        </span>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.availableForSale || isAdding || cartLoading}
                            className={clsx(
                                "tw-px-4 tw-py-2 tw-rounded-lg tw-font-semibold tw-text-sm tw-transition-all tw-duration-300",
                                product.availableForSale
                                    ? "tw-bg-primary tw-text-white hover:tw-bg-primary-dark hover:tw-shadow-lg disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                    : "tw-bg-gray-300 tw-text-gray-300 tw-cursor-not-allowed"
                            )}
                        >
                            {isAdding ? "Adding..." : product.availableForSale ? "Add to Cart" : "Unavailable"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
