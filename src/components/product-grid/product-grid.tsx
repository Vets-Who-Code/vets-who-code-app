import { forwardRef } from "react";
import clsx from "clsx";
import ProductCard from "@components/product-card";
import { ShopifyProduct } from "@lib/shopify";

interface TProps {
    products: ShopifyProduct[];
    className?: string;
    columns?: 2 | 3 | 4;
}

const ProductGrid = forwardRef<HTMLDivElement, TProps>(
    ({ className, products, columns = 3 }, ref) => {
        const gridCols = {
            2: "tw-grid-cols-1 md:tw-grid-cols-2",
            3: "tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3",
            4: "tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4",
        };

        return (
            <div
                className={clsx(
                    "tw-grid tw-gap-6",
                    gridCols[columns],
                    className
                )}
                ref={ref}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    }
);

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
