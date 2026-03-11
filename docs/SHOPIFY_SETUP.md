# Shopify Integration Setup Guide

This guide will help you configure the Shopify integration for your Vets Who Code application.

## Overview

The Shopify integration allows you to:
- Display products from your Shopify store on your Next.js website
- Provide a full shopping cart experience
- Handle checkout through Shopify's secure checkout process
- Manage products, inventory, and orders through your Shopify admin

## What's Been Implemented

### 1. Backend Infrastructure
- **Shopify Client Library** (`/src/lib/shopify.ts`)
  - GraphQL queries for products, collections, and cart
  - Type-safe TypeScript interfaces
  - Helper functions for price formatting

- **API Routes** (`/src/pages/api/shopify/`)
  - `GET /api/shopify/products` - Get all products
  - `GET /api/shopify/products/[handle]` - Get single product
  - `GET /api/shopify/collections` - Get all collections
  - `GET /api/shopify/collections/[handle]` - Get single collection
  - `POST /api/shopify/cart/create` - Create new cart
  - `GET /api/shopify/cart/[cartId]` - Get cart details
  - `POST /api/shopify/cart/add` - Add items to cart
  - `POST /api/shopify/cart/update` - Update cart quantities
  - `POST /api/shopify/cart/remove` - Remove items from cart

### 2. Frontend Components
- **ProductCard** (`/src/components/product-card/`) - Individual product display with "Add to Cart"
- **ProductGrid** (`/src/components/product-grid/`) - Responsive grid layout for products
- **ShoppingCart** (`/src/components/shopping-cart/`) - Slide-out cart drawer with quantity controls
- **useCart Hook** (`/src/hooks/useCart.ts`) - Cart state management with localStorage persistence

### 3. Pages
- **Store Page** (`/src/pages/store/index.tsx`) - Main storefront with all products
- **Product Detail Page** (`/src/pages/store/products/[handle].tsx`) - Individual product page with variant selection

## Setup Instructions

### Step 1: Create Shopify Storefront API Access Token

1. Log in to your Shopify admin panel
2. Go to **Settings** → **Apps and sales channels** → **Develop apps**
3. Click **Create an app** (if you haven't already)
4. Name it something like "Vets Who Code Website"
5. Click on **Configure Storefront API scopes**
6. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
7. Click **Save**
8. Go to **API credentials** tab
9. Click **Install app**
10. Copy your **Storefront API access token**

### Step 2: Configure Environment Variables

Add these variables to your `.env` or `.env.local` file:

```bash
# Shopify Configuration
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
SHOPIFY_ADMIN_ACCESS_TOKEN="your-admin-access-token" # Optional for admin features
```

**Important Notes:**
- Replace `your-store` with your actual Shopify store name
- The domain should include `.myshopify.com`
- Never commit your `.env` file to version control
- The `.env.example` file has been updated with these variables

### Step 3: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the store page:**
   - Navigate to `http://localhost:3000/store`
   - You should see your products displayed

3. **Test the cart:**
   - Click "Add to Cart" on any product
   - Click the cart icon to view your cart
   - Try updating quantities or removing items
   - Click "Proceed to Checkout" to test Shopify checkout

### Step 4: Deploy to Production

1. **Add environment variables to your hosting platform** (Vercel, Netlify, etc.)
   - Add the same `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

2. **Build and deploy:**
   ```bash
   npm run build
   npm start
   ```

3. **Verify ISR (Incremental Static Regeneration):**
   - Products will be cached and revalidated every 5 minutes
   - This provides fast page loads with fresh data

## Usage

### Adding Products to Your Store

1. Add products in your Shopify admin at `https://[your-store].myshopify.com/admin/products`
2. Products will automatically appear on your website within 5 minutes (or immediately in development)
3. Make sure products are:
   - Published to the "Online Store" sales channel
   - Have at least one image
   - Have a valid price
   - Are in stock

### Cart Behavior

- Cart data is stored in the user's browser using localStorage
- Cart persists across page refreshes
- Cart ID is managed automatically
- Users are redirected to Shopify's secure checkout when they click "Proceed to Checkout"

### Customization

#### Changing Product Grid Layout
Edit `/src/pages/store/index.tsx`:
```tsx
<ProductGrid products={products} columns={4} /> // 2, 3, or 4 columns
```

#### Styling
All components use TailwindCSS with the `tw-` prefix. Modify classes in:
- `/src/components/product-card/product-card.tsx`
- `/src/components/shopping-cart/shopping-cart.tsx`
- `/src/pages/store/index.tsx`

#### Adding Collections
To add collection pages:
1. Create `/src/pages/store/collections/[handle].tsx`
2. Use the existing collection API routes
3. Follow the pattern from the product detail page

## Troubleshooting

### "Store Configuration Required" Message
- Check that your `.env` file contains the correct Shopify credentials
- Restart your development server after adding environment variables
- Verify the Storefront API access token is valid

### Products Not Showing
- Ensure products are published to the "Online Store" sales channel in Shopify
- Check that products have inventory available
- Look for errors in the browser console or server logs

### Cart Not Working
- Check browser console for JavaScript errors
- Verify localStorage is enabled in the browser
- Clear localStorage and try again: `localStorage.clear()`

### Checkout Redirect Issues
- Ensure your Shopify store's checkout settings are configured
- Verify the cart has valid items
- Check that the `checkoutUrl` is being returned from the API

## API Reference

### Shopify Client Functions

```typescript
import {
  getProducts,
  getProduct,
  getCollections,
  getCollection,
  createCart,
  getCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  formatPrice,
  isShopifyConfigured,
} from '@lib/shopify';
```

### useCart Hook

```typescript
const {
  cart,           // Current cart object
  cartCount,      // Total number of items
  cartTotal,      // Total price amount
  cartCurrency,   // Currency code
  isLoading,      // Loading state
  error,          // Error message
  addToCart,      // Add items to cart
  updateCartLines, // Update quantities
  removeFromCart, // Remove items
  clearCart,      // Clear entire cart
  refreshCart,    // Refresh cart data
} = useCart();
```

## Next Steps

### Optional Enhancements

1. **Add Collections Pages**
   - Create collection listing pages
   - Filter products by collection
   - Add collection navigation

2. **Product Search**
   - Implement search functionality
   - Use Shopify's search query syntax
   - Add autocomplete

3. **Wishlist Feature**
   - Save products for later
   - Use localStorage or database
   - Share wishlists

4. **Product Reviews**
   - Integrate review app from Shopify
   - Display reviews on product pages
   - Add review submission

5. **Discount Codes**
   - Apply discount codes in cart
   - Display discount amounts
   - Use Shopify Checkout API

6. **Related Products**
   - Show related/recommended products
   - Use product tags or AI
   - Increase cross-sells

## Support

For issues with:
- **Shopify API**: Visit [Shopify Developer Docs](https://shopify.dev/docs/api/storefront)
- **Next.js**: Visit [Next.js Docs](https://nextjs.org/docs)
- **Integration Issues**: Check the browser console and server logs

## Resources

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/api/storefront/2024-01/queries)
- [Next.js Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- [TypeScript Shopify Types](https://github.com/Shopify/hydrogen/tree/main/packages/hydrogen-react)

---

**Created**: November 2024
**Integration Version**: Shopify Storefront API 2024-01
**Framework**: Next.js 15 with TypeScript
