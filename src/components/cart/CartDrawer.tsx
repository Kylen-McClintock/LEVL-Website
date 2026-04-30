"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart } from '../../lib/shopify';
import { ShopifyCart } from '../../types/shopify';
import { CheckoutButton } from './CheckoutButton';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartId: string | null;
}

export function CartDrawer({ isOpen, onClose, cartId }: CartDrawerProps) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      if (!cartId || !isOpen) return;
      setLoading(true);
      const fetchedCart = await getCart(cartId);
      if (fetchedCart) setCart(fetchedCart);
      setLoading(false);
    }
    fetchCart();
  }, [cartId, isOpen]);

  const handleRemove = async (lineId: string) => {
    if (!cartId) return;
    setLoading(true);
    const updatedCart = await removeFromCart(cartId, [lineId]);
    setCart(updatedCart);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-levl-panel)] border-l border-[var(--color-levl-panel-border)] shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-levl-panel-border)]">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <ShoppingBag className="w-5 h-5 text-[var(--color-levl-cyan)]" />
                Your Protocol
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loading && !cart ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin w-8 h-8 border-2 border-[var(--color-levl-cyan)] border-t-transparent rounded-full" />
                </div>
              ) : cart?.lines.edges.length ? (
                cart.lines.edges.map(({ node }) => (
                  <div key={node.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#060913] shrink-0">
                      {node.merchandise.image && (
                        <Image
                          src={node.merchandise.image.url}
                          alt={node.merchandise.image.altText || node.merchandise.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{node.merchandise.product.title}</h3>
                          <p className="text-sm text-[var(--color-levl-text-secondary)]">{node.merchandise.title}</p>
                          {node.sellingPlanAllocation && (
                            <p className="text-xs text-[var(--color-levl-cyan)] mt-1">
                              {node.sellingPlanAllocation.sellingPlan.name}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-white">${node.cost.totalAmount.amount}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex items-center gap-3 bg-black/40 rounded-full px-3 py-1 border border-white/10">
                          <button className="text-gray-400 hover:text-white disabled:opacity-50" disabled>
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{node.quantity}</span>
                          <button className="text-gray-400 hover:text-white disabled:opacity-50" disabled>
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(node.id)}
                          className="text-gray-500 hover:text-red-400 p-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-[var(--color-levl-text-muted)] mb-4" />
                  <p className="text-[var(--color-levl-text-secondary)]">Your protocol is currently empty.</p>
                </div>
              )}
            </div>

            {cart && cart.lines.edges.length > 0 && (
              <div className="p-6 border-t border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)]">
                <div className="flex justify-between mb-4">
                  <span className="text-[var(--color-levl-text-secondary)]">Subtotal</span>
                  <span className="font-semibold text-white">${cart.cost.subtotalAmount.amount}</span>
                </div>
                <CheckoutButton checkoutUrl={cart.checkoutUrl} disabled={loading} />
                <p className="text-xs text-center text-[var(--color-levl-text-muted)] mt-4">
                  Secure checkout provided by Shopify.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
