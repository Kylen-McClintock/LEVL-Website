"use client";

import React, { useState, useEffect } from 'react';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { StickyMobileCTA } from '../../components/product/StickyMobileCTA';
import { ShopifyProduct } from '../../types/shopify';

interface StorefrontClientProps {
  children: React.ReactNode;
  product?: ShopifyProduct;
  initialCartId: string | null;
}

export function StorefrontClient({ children, product, initialCartId }: StorefrontClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // We need to attach the open cart handler to the header cart button
  // A clean way in Next.js is via Context or simple DOM event since the header is static.
  // We will just use Context or capture clicks for simplicity.
  useEffect(() => {
    const handleCartClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#cart-trigger')) {
        e.preventDefault();
        setIsCartOpen(true);
      }
    };
    
    document.addEventListener('click', handleCartClick);
    return () => document.removeEventListener('click', handleCartClick);
  }, []);

  // We also need to clone the children to pass down onCartOpen to ProductHero if needed, 
  // but since we attached an event listener, we can just let ProductHero button also have id="cart-trigger" or we can pass it down via context.
  // Wait, ProductHero takes `onCartOpen` as a prop. Let's pass it via Context.

  return (
    <StorefrontContext.Provider value={{ openCart: () => setIsCartOpen(true) }}>
      {children}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartId={initialCartId} 
      />
      <StickyMobileCTA product={product} onAddToCart={() => setIsCartOpen(true)} />
    </StorefrontContext.Provider>
  );
}

export const StorefrontContext = React.createContext({
  openCart: () => {}
});
