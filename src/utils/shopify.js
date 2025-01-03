export async function shopifyFetch({ query, variables }) {
    const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!endpoint == !key) {
        throw new Error("Shopify Store domain or access token is missing.");
    }

    const body = JSON.stringify({ query, variables });

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
            },
            body,
        });

        if (!result.ok) {
            const errorDetails = await result.text();
            throw new Error(`Shopify API error: ${result.status} - ${errorDetails}`);
        }

        const responseBody = await result.json();

        return {
            status: result.status,
            body: responseBody,
        }
    } catch (error) {
        console.error('Error:', error);
        return {
          status: 500,
          error: error.message || 'Error receiving data',
        };
    }               
    
}

export async function getAllProducts() {
    return shopifyFetch({
      query: `{
          products(sortKey: TITLE, first: 100) {
            edges{
              node {
                id
                title
                description
              }
            }
          }
        }`
    });
  }