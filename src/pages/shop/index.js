import ProductCard from '../../components/product-card/ProductCard';
import { getAllProducts } from '../../utils/shopify'; // Import from your utility file

export default function Home({ products, error }) {
  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!products || products.length === 0) { // Check for null or empty array
    return <div className="container mx-auto p-4 text-center">No products found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} /> // Spread props for cleaner code
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await getAllProducts();

    if (response.status !== 200 || !response.body.data || !response.body.data.products || !response.body.data.products.edges) {
      console.error("Invalid response from Shopify API:", response);
      throw new Error("Failed to fetch products from Shopify."); // Throw an error
    }

    const products = response.body.data.products.edges.map(({ node }) => {
      if (!node || !node.id || !node.title) {
        console.warn("Incomplete product data:", node); // Warn about incomplete data
        return null; // Skip this product
      }
      return {
        id: node.id,
        title: node.title,
        description: node.description || "", // Provide default values
        price: node.priceRange?.minVariantPrice?.amount || "0.00",
        image: node.featuredImage?.src || '/default-product-image.jpg',
      };
    }).filter(product => product !== null); // Remove null products

    return {
      props: { products },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: { products: [], error: error.message }, // Return an error prop
    };
  }
}