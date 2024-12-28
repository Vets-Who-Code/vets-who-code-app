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
    <div className="w-full max-w-xs rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title || "Product image"}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{description}</p>
        <p className="text-xl font-semibold mt-2 text-primary">{price}</p>

        <Link href={path}>
          <button className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
