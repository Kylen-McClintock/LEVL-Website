"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CheckoutButton } from './CheckoutButton';
import Image from 'next/image';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, isLoading, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-levl-panel)] border-l border-[var(--color-levl-panel-border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-levl-panel-border)]">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <ShoppingBag className="w-5 h-5 text-[var(--color-levl-cyan)]" />
                Your Protocol
                {cart && cart.totalQuantity > 0 && (
                  <span className="text-xs bg-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] px-2 py-0.5 rounded-full border border-[var(--color-levl-cyan)]/30 ml-2">
                    {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading && !cart ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-[var(--color-levl-cyan)] border-t-transparent rounded-full" />
                </div>
              ) : cart?.lines?.edges?.length ? (
                cart.lines.edges.map(({ node }) => (
                  <div 
                    key={node.id} 
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#060913] shrink-0 border border-white/5">
                      {node.merchandise.image ? (
                        <Image
                          src={node.merchandise.image.url}
                          alt={node.merchandise.image.altText || node.merchandise.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                          LEVL
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            {node.merchandise.product?.title || 'LEVL LIFESPAN+'}
                          </h3>
                          <p className="text-xs text-[var(--color-levl-text-secondary)] mt-0.5">
                            {node.merchandise.title}
                          </p>
                          {node.sellingPlanAllocation && (
                            <span className="inline-block text-[11px] font-medium text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 px-2 py-0.5 rounded-full border border-[var(--color-levl-cyan)]/20 mt-1">
                              {node.sellingPlanAllocation.sellingPlan.name}
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-white text-sm">
                          ${node.cost.totalAmount.amount}
                        </p>
                      </div>
                      
                      {/* Quantity & Delete */}
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center gap-2 bg-black/50 rounded-full px-2.5 py-1 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(node.id, node.quantity - 1)}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-white p-0.5 disabled:opacity-40 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center text-white">
                            {node.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(node.id, node.quantity + 1)}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-white p-0.5 disabled:opacity-40 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(node.id)}
                          disabled={isLoading}
                          className="text-gray-500 hover:text-red-400 p-1.5 transition-colors disabled:opacity-40"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                    <ShoppingBag className="w-6 h-6 text-[var(--color-levl-text-muted)]" />
                  </div>
                  <p className="text-white font-medium">Your protocol is empty</p>
                  <p className="text-xs text-[var(--color-levl-text-secondary)] mt-1 max-w-[200px]">
                    Select a 30-Day or 90-Day protocol to start your cellular longevity journey.
                  </p>
                </div>
              )}
            </div>

            {/* Footer with Checkout CTA */}
            {cart && cart.lines?.edges?.length > 0 && (() => {
              const hasSubscription = cart.lines.edges.some(e => Boolean(e.node.sellingPlanAllocation));
              const subtotalNum = parseFloat(cart.cost.subtotalAmount.amount || '0');
              const qualifiesForFreeShipping = hasSubscription || subtotalNum >= 75;

              return (
                <div className="p-6 border-t border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] space-y-4">
                  {/* Free shipping banner if not qualified */}
                  {!qualifiesForFreeShipping && (
                    <div className="bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/20 rounded-lg p-2.5 text-center text-xs text-[var(--color-levl-cyan)] font-medium">
                      💡 Tip: Subscriptions & 3-Bottle Bundles include <span className="font-bold underline">Free US Shipping</span>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[var(--color-levl-text-secondary)]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white text-base">
                        ${cart.cost.subtotalAmount.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--color-levl-text-muted)]">Shipping</span>
                      {qualifiesForFreeShipping ? (
                        <span className="text-[var(--color-levl-cyan)] font-bold flex items-center gap-1">
                          FREE ✓
                        </span>
                      ) : (
                        <span className="text-[var(--color-levl-text-muted)]">Calculated at checkout</span>
                      )}
                    </div>
                    <div className="flex justify-between text-xs text-[var(--color-levl-text-muted)]">
                      <span>Estimated Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <CheckoutButton 
                    checkoutUrl={cart.checkoutUrl} 
                    disabled={isLoading}
                    className="bg-[var(--color-levl-cyan)] text-black hover:bg-[var(--color-levl-cyan)]/90 shadow-[0_0_20px_rgba(34,197,94,0.25)] flex items-center justify-center gap-2 cursor-pointer font-bold"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </CheckoutButton>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--color-levl-text-muted)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-levl-cyan)]" />
                    <span>Secure 1-Click Checkout powered by Shopify & Shop Pay</span>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
