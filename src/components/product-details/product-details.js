import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProductDetails.module.css";

export default function ProductDetails({ product }) {
    const [quantity, setQuantity] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const updateQuantity = (e) => {
        setQuantity(e.target.value);
        if (quantity == 0) setCheckout(false);
    };

    const handleAddToCart = async () => {
        let cartId = sessionStorage.getItem("cartId");
        if (quantity > 0) {
            if (cartId) {
                await updateCart(cartId, product.variants.edges[0].node.id, quantity);
                setCheckout(true);
            } else {
                let data = await addToCart(product.variants.edges[0].node.id, quantity);
                cartId = data.cartCreate.cart.id;
                sessionStorage.setItem("cartId", cartId);
                setCheckout(true);
            }
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText}
                        fill={true}
                    />
                </div>
                <div className={styles.content}>
                    <span>
                        <h2>{product.title}</h2>
                        <h3>{product.priceRange.minVariantPrice.amount}</h3>
                    </span>
                    <input value={quantity} onChange={updateQuantity} type="number" min={0} />
                    <button className={styles.cartbtn} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}
