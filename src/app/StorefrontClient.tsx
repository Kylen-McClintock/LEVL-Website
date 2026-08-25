"use client";

import React from 'react';
import { CartProvider } from '../context/CartContext';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ShopifyProduct } from '../types/shopify';

interface StorefrontClientProps {
  children: React.ReactNode;
  product?: ShopifyProduct;
  initialCartId?: string | null;
}

export function StorefrontClient({ children, initialCartId }: StorefrontClientProps) {
  return (
    <CartProvider initialCartId={initialCartId}>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
