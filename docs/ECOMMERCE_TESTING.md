# E-Commerce Testing Checklist

## Test Environment Setup

### Required Environment Variables
```bash
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-token"
SHOPIFY_ADMIN_ACCESS_TOKEN="your-admin-token"
```

## 1. Cart to Checkout Flow ✅

### Test Steps:
1. Navigate to `/store`
2. Click on a product
3. Select variant options (if applicable)
4. Adjust quantity
5. Click "Add to Cart"
6. Cart slide-out should open
7. Verify item appears in cart with correct:
   - Product name
   - Variant details
   - Price
   - Quantity
8. Adjust quantity in cart
9. Click "Proceed to Checkout"
10. Should redirect to Shopify checkout page

### Expected Behavior:
- ✅ Cart persists across page refreshes (localStorage)
- ✅ Correct pricing calculations
- ✅ Checkout URL redirects to Shopify
- ✅ Can update quantities
- ✅ Can remove items

### Code Locations:
- Store page: `src/pages/store/index.tsx`
- Product detail: `src/pages/store/products/[handle].tsx`
- Cart component: `src/components/shopping-cart/shopping-cart.tsx`
- Cart hook: `src/hooks/useCart.ts`
- Shopify API: `src/lib/shopify.ts`

## 2. Product Variant Selection ✅

### Test Steps:
1. Find a product with variants (Size, Color, etc.)
2. Click on different variant options
3. Verify:
   - Price updates if variant has different price
   - Image changes if variant has specific image
   - "Add to Cart" uses correct variant ID
   - Selected variant is highlighted

### Expected Behavior:
- ✅ Options are displayed as buttons
- ✅ Selecting option finds matching variant
- ✅ Visual feedback for selected option
- ✅ Image gallery updates
- ✅ Correct variant added to cart

### Code Location:
- Variant selection: `src/pages/store/products/[handle].tsx:68-93`

## 3. Order Confirmation Webhook ❌ TO IMPLEMENT

### Requirements:
- Shopify webhook endpoint at `/api/shopify/webhooks/orders/create`
- Verify webhook signature (HMAC)
- Store order details in database
- Send confirmation email to customer (optional)

### Webhook Setup in Shopify:
1. Go to Shopify Admin → Settings → Notifications → Webhooks
2. Create webhook:
   - Event: Order creation
   - Format: JSON
   - URL: `https://your-domain.com/api/shopify/webhooks/orders/create`
   - Version: 2024-01 or latest

### Test Steps:
1. Complete a test order on Shopify checkout
2. Verify webhook is received at endpoint
3. Check database for order record
4. Verify order details are correct

### Expected Data:
```json
{
  "id": 1234567890,
  "email": "customer@example.com",
  "total_price": "29.99",
  "currency": "USD",
  "line_items": [...],
  "created_at": "2024-01-02T00:00:00Z",
  "customer": {...}
}
```

## 4. Order History Page ❌ TO IMPLEMENT

### Requirements:
- Page at `/orders` or `/store/orders`
- Fetch user's orders from database or Shopify
- Display order list with:
  - Order number
  - Date
  - Items
  - Total amount
  - Order status
  - Tracking info (if available)

### Test Steps:
1. Login as user
2. Navigate to `/orders`
3. Verify orders are displayed
4. Click on an order to see details
5. Check tracking link (if available)

### Expected Behavior:
- Shows all user's orders
- Most recent orders first
- Can view order details
- Shows order status (pending, fulfilled, etc.)
- Empty state if no orders

## Browser Testing Matrix

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

## Performance Checks

- [ ] Cart operations complete in < 1s
- [ ] Product page loads in < 2s
- [ ] Images are optimized
- [ ] No console errors
- [ ] Proper loading states

## Security Checks

- [ ] Webhook signature verification
- [ ] CORS configured correctly
- [ ] No sensitive data in frontend
- [ ] API keys not exposed
- [ ] HTTPS only for checkout

## Accessibility Checks

- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels on interactive elements
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

## Notes

- Cart uses Shopify Storefront API (read-only, safe for frontend)
- Checkout happens on Shopify (PCI compliant, secure)
- Webhooks use Admin API (requires HMAC verification)
- Orders stored locally for history/analytics

## Known Issues

None currently

## Future Enhancements

- [ ] Wishlist functionality
- [ ] Product reviews
- [ ] Related products
- [ ] Recently viewed products
- [ ] Abandoned cart recovery
- [ ] Discount code validation
