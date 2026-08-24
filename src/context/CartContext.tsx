"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ShopifyCart, ShopifyCartLineInput } from '../types/shopify';
import { 
  createCart, 
  getCart, 
  addToCart as shopifyAddToCart, 
  updateCartLines, 
  removeFromCart as shopifyRemoveFromCart,
  getDirectCheckoutUrl
} from '../lib/shopify';

interface CartContextType {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (merchandiseId: string, quantity: number, sellingPlanId?: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  instantBuy: (merchandiseId: string, quantity: number, sellingPlanId?: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'levl_shopify_cart_id';

export function CartProvider({ 
  children,
  initialCartId
}: { 
  children: React.ReactNode;
  initialCartId?: string | null;
}) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(initialCartId || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize or restore cart from localStorage
  useEffect(() => {
    async function initCart() {
      let storedId = localStorage.getItem(CART_STORAGE_KEY);
      if (!storedId && initialCartId) {
        storedId = initialCartId;
      }

      if (storedId) {
        setCartId(storedId);
        setIsLoading(true);
        try {
          const existingCart = await getCart(storedId);
          if (existingCart && existingCart.id) {
            setCart(existingCart);
          } else {
            // Expired or invalid cart, create a fresh one
            const newCart = await createCart();
            setCart(newCart);
            setCartId(newCart.id);
            localStorage.setItem(CART_STORAGE_KEY, newCart.id);
          }
        } catch (e) {
          console.error('Error initializing cart:', e);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Create initial cart
        try {
          const newCart = await createCart();
          setCart(newCart);
          setCartId(newCart.id);
          localStorage.setItem(CART_STORAGE_KEY, newCart.id);
        } catch (e) {
          console.error('Error creating new cart:', e);
        }
      }
    }

    initCart();
  }, [initialCartId]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(async (
    merchandiseId: string, 
    quantity: number = 1, 
    sellingPlanId?: string
  ) => {
    setIsLoading(true);
    try {
      let activeCartId = cartId;
      if (!activeCartId) {
        const newCart = await createCart();
        activeCartId = newCart.id;
        setCartId(activeCartId);
        localStorage.setItem(CART_STORAGE_KEY, activeCartId);
      }

      const lines: ShopifyCartLineInput[] = [{
        merchandiseId,
        quantity,
        ...(sellingPlanId ? { sellingPlanId } : {})
      }];

      const updatedCart = await shopifyAddToCart(activeCartId, lines);
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (e) {
      console.error('Failed to add item to cart:', e);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return;
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        const updatedCart = await shopifyRemoveFromCart(cartId, [lineId]);
        setCart(updatedCart);
      } else {
        const updatedCart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
        setCart(updatedCart);
      }
    } catch (e) {
      console.error('Failed to update quantity:', e);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const updatedCart = await shopifyRemoveFromCart(cartId, [lineId]);
      setCart(updatedCart);
    } catch (e) {
      console.error('Failed to remove item:', e);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const instantBuy = useCallback(async (
    merchandiseId: string, 
    quantity: number = 1, 
    sellingPlanId?: string
  ) => {
    setIsLoading(true);
    try {
      const checkoutUrl = await getDirectCheckoutUrl(merchandiseId, quantity, sellingPlanId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (e) {
      console.error('Instant buy redirect failed:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        instantBuy
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: null,
      cartId: null,
      isLoading: false,
      isCartOpen: false,
      openCart: () => {},
      closeCart: () => {},
      addToCart: async () => {},
      updateQuantity: async () => {},
      removeItem: async () => {},
      instantBuy: async () => {}
    };
  }
  return context;
}

