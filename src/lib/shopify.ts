/**
 * Shopify Storefront API Client
 * Handles all interactions with Shopify's Storefront API for products, cart, and checkout
 */

// Environment variables
const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = '2024-01';

// Shopify Storefront API endpoint
const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

// Type definitions
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  tags: string[];
  vendor: string;
  productType: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  image: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  sku: string | null;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    } | null;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
        merchandise: {
          id: string;
          title: string;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          product: {
            id: string;
            handle: string;
            title: string;
            featuredImage: {
              url: string;
              altText: string | null;
            } | null;
          };
        };
      };
    }>;
  };
  totalQuantity: number;
}

// Helper function to make Shopify Storefront API requests
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<{ data: T; errors?: Array<{ message: string }> }> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      throw new Error(`Shopify API error: ${result.status} ${result.statusText}`);
    }

    return result.json();
  } catch (error) {
    console.error('Shopify API request failed:', error);
    throw error;
  }
}

// GraphQL Fragments
const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    vendor
    productType
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            id
            url
            altText
            width
            height
          }
          selectedOptions {
            name
            value
          }
          sku
        }
      }
    }
    options {
      id
      name
      values
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

// API Functions

/**
 * Get all products with optional filtering
 */
export async function getProducts(
  limit = 100,
  query?: string
): Promise<ShopifyProduct[]> {
  const gql = `
    query GetProducts($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const response = await shopifyFetch<{
    products: {
      edges: Array<{ node: ShopifyProduct }>;
    };
  }>({
    query: gql,
    variables: { first: limit, query },
  });

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    throw new Error('Failed to fetch products');
  }

  return response.data.products.edges.map((edge) => edge.node);
}

/**
 * Get a single product by handle
 */
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const gql = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const response = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: gql,
    variables: { handle },
  });

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    return null;
  }

  return response.data.product;
}

/**
 * Get all collections
 */
export async function getCollections(limit = 100): Promise<ShopifyCollection[]> {
  const gql = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            image {
              id
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>;
    };
  }>({
    query: gql,
    variables: { first: limit },
  });

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    throw new Error('Failed to fetch collections');
  }

  return response.data.collections.edges.map((edge) => edge.node);
}

/**
 * Get a single collection with products by handle
 */
export async function getCollection(
  handle: string,
  productsLimit = 100
): Promise<ShopifyCollection | null> {
  const gql = `
    query GetCollection($handle: String!, $productsFirst: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        image {
          id
          url
          altText
        }
        products(first: $productsFirst) {
          edges {
            node {
              ...ProductFragment
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const response = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: gql,
    variables: { handle, productsFirst: productsLimit },
  });

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    return null;
  }

  return response.data.collection;
}

/**
 * Create a new cart
 */
export async function createCart(): Promise<ShopifyCart> {
  const gql = `
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const response = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>({
    query: gql,
  });

  if (response.data.cartCreate.userErrors.length > 0) {
    console.error('Cart creation errors:', response.data.cartCreate.userErrors);
    throw new Error(response.data.cartCreate.userErrors[0].message);
  }

  return response.data.cartCreate.cart;
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const gql = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `;

  const response = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: gql,
    variables: { cartId },
  });

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    return null;
  }

  return response.data.cart;
}

/**
 * Add items to cart
 */
export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const gql = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const response = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>({
    query: gql,
    variables: { cartId, lines },
  });

  if (response.data.cartLinesAdd.userErrors.length > 0) {
    console.error('Add to cart errors:', response.data.cartLinesAdd.userErrors);
    throw new Error(response.data.cartLinesAdd.userErrors[0].message);
  }

  return response.data.cartLinesAdd.cart;
}

/**
 * Update cart line quantities
 */
export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  const gql = `
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const response = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>({
    query: gql,
    variables: { cartId, lines },
  });

  if (response.data.cartLinesUpdate.userErrors.length > 0) {
    console.error('Update cart errors:', response.data.cartLinesUpdate.userErrors);
    throw new Error(response.data.cartLinesUpdate.userErrors[0].message);
  }

  return response.data.cartLinesUpdate.cart;
}

/**
 * Remove items from cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const gql = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const response = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>({
    query: gql,
    variables: { cartId, lineIds },
  });

  if (response.data.cartLinesRemove.userErrors.length > 0) {
    console.error('Remove from cart errors:', response.data.cartLinesRemove.userErrors);
    throw new Error(response.data.cartLinesRemove.userErrors[0].message);
  }

  return response.data.cartLinesRemove.cart;
}

/**
 * Format price for display
 */
export function formatPrice(amount: string, currencyCode: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });

  return formatter.format(parseFloat(amount));
}

/**
 * Check if environment variables are configured
 */
export function isShopifyConfigured(): boolean {
  return !!(domain && storefrontAccessToken);
}
