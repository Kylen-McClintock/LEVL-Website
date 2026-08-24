"use client";

import React from 'react';
import { CartProvider } from '../context/CartContext';
import { CartDrawer } from '../components/cart/CartDrawer';
import { StickyMobileCTA } from '../components/product/StickyMobileCTA';
import { StickyDesktopHeader } from '../components/product/StickyDesktopHeader';
import { ShopifyProduct } from '../types/shopify';

interface StorefrontClientProps {
  children: React.ReactNode;
  product?: ShopifyProduct;
  initialCartId?: string | null;
}

export function StorefrontClient({ children, product, initialCartId }: StorefrontClientProps) {
  return (
    <CartProvider initialCartId={initialCartId}>
      {children}
      <CartDrawer />
      <StickyMobileCTA product={product} />
      <StickyDesktopHeader product={product} />
    </CartProvider>
  );
}
