import { gql, GraphQLClient } from "graphql-request";

const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS;
const endpoint = process.env.SHOPIFY_STORE_DOMAIN;

const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
});

export async function getProducts() {
    const getAllProductsQuery = gql`
        {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        priceRange {
                            minVariantPrice {
                                amount
                            }
                        }
                        featuredImage {
                            altText
                            url
                        }
                    }
                }
            }
        }
    `;
    try {
        return await graphQLClient.request(getAllProductsQuery);
    } catch (error) {
        throw new Error(error);
    }
}

export async function addToCart(itemId, quantity) {
    const createCartMutation = gql`
        mutation createCart($cartInput: CartInput) {
            cartCreate(input: $cartInput) {
                cart {
                    id
                }
            }
        }
    `;
    const variables = {
        cartInput: {
            lines: [
                {
                    quantity: parseInt(quantity),
                    merchandiseId: itemId,
                },
            ],
        },
    };
    try {
        return await graphQLClient.request(createCartMutation, variables);
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateCart(cartId, itemId, quantity) {
    const updateCartMutation = gql`
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                }
            }
        }
    `;
    const variables = {
        cartId: cartId,
        lines: [
            {
                quantity: parseInt(quantity),
                merchandiseId: itemId,
            },
        ],
    };
    try {
        return await graphQLClient.request(updateCartMutation, variables);
    } catch (error) {
        throw new Error(error);
    }
}

export async function retrieveCart(cartId) {
    const cartQuery = gql`
        query cartQuery($cartId: ID!) {
            cart(id: $cartId) {
                id
                createdAt
                updatedAt

                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                }
                            }
                        }
                    }
                }
                estimatedCost {
                    totalAmount {
                        amount
                    }
                }
            }
        }
    `;
    const variables = {
        cartId,
    };
    try {
        const data = await graphQLClient.request(cartQuery, variables);
        return data.cart;
    } catch (error) {
        throw new Error(error);
    }
}

export const getProduct = async (id) => {
    const productQuery = gql`
        query getProduct($id: ID!) {
            product(id: $id) {
                id
                handle
                title
                description
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                featuredImage {
                    url
                    altText
                }
                variants(first: 10) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        }
    `;

    const variables = { id };

    try {
        const data = await graphQLClient.request(productQuery, variables);
        return data.product; // Return the product object
    } catch (error) {
        throw new Error(`Error fetching product by ID: ${error.message}`);
    }
};

export const getCheckoutUrl = async (cartId) => {
    const getCheckoutUrlQuery = gql`
        query checkoutURL($cartId: ID!) {
            cart(id: $cartId) {
                checkoutUrl
            }
        }
    `;
    const variables = {
        cartId: cartId,
    };
    try {
        return await graphQLClient.request(getCheckoutUrlQuery, variables);
    } catch (error) {
        throw new Error(error);
    }
};
