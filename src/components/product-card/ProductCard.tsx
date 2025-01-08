import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    node: {
      id: string;
      title: string;
      handle: string;
      featuredImage?: {
        url: string;
        altText?: string;
      };
      priceRange: {
        minVariantPrice: {
          amount: string;
        };
      };
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  
  const { node } = product;

  return (
    <div className={styles.card}>
     
      <div className={styles.image}>
        {node.featuredImage?.url ? (
          <Image
            src={node.featuredImage.url}
            alt={node.featuredImage.altText || 'Product image'}
            fill={true}
          />
        ) : (
          <div className={styles.placeholder}>No Image Available</div> 
        )}
      </div>

     
      <div className={styles.content}>
        <small>
          <Link
            href={`/products/${node.handle}/?id=${node.id}`}
            className={styles.action}
          >
            {node.title}
          </Link>
        </small>
        <small>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(parseFloat(node.priceRange.minVariantPrice.amount))}
        </small>
      </div>
    </div>
  );
}
