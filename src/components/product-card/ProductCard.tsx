// components/ProductCard.tsx
import Link from 'next/link';

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  path: string;
};

const ProductCard = ({ id, title, description, image, price, path }: ProductCardProps) => {
  return (
    <div className="tw-w-full tw-max-w-xs tw-rounded-lg tw-bg-white tw-shadow-lg tw-overflow-hidden">

      <div className="tw-relative">
        <img
          src={image}
          alt={title}
          className="tw-w-full tw-h-60 tw-object-cover tw-rounded-t-lg"
        />
      </div>

  
      <div className="tw-p-4">
        <h3 className="tw-text-lg tw-font-semibold tw-truncate">{title}</h3>
        <p className="tw-text-sm tw-text-gray-600 tw-mt-1 tw-truncate">{description}</p>

   
        <p className="tw-text-xl tw-font-semibold tw-mt-2 tw-text-primary">{price}</p>

        <Link href={path}>
          <a
            className="tw-inline-block tw-mt-4 tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded-lg tw-text-center hover:tw-bg-blue-700"
          >
            View Product
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
