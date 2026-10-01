"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFounder } from '../../context/FounderContext';
import { CheckoutButton } from './CheckoutButton';
import Image from 'next/image';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, isLoading, updateQuantity, removeItem } = useCart();
  const { isFounder, founderCode } = useFounder();

  const finalCheckoutUrl = useMemo(() => {
    if (!cart?.checkoutUrl) return undefined;
    if (isFounder && founderCode) {
      const sep = cart.checkoutUrl.includes('?') ? '&' : '?';
      return `${cart.checkoutUrl}${sep}discount=${encodeURIComponent(founderCode)}`;
    }
    return cart.checkoutUrl;
  }, [cart?.checkoutUrl, isFounder, founderCode]);

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

            {/* Founder Status Banner in Cart */}
            {isFounder && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-950/70 via-[var(--color-levl-cyan)]/15 to-transparent border border-[var(--color-levl-cyan)]/40 flex items-center gap-2.5 text-xs shadow-sm">
                <Sparkles className="w-4 h-4 text-[var(--color-levl-cyan)] shrink-0 animate-pulse" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-white flex items-center gap-1.5">
                    Founder Pricing Applied
                    <span className="bg-[var(--color-levl-cyan)] text-black text-[10px] font-black px-1.5 py-0.2 rounded">
                      {founderCode}
                    </span>
                  </span>
                  <span className="text-[11px] text-[var(--color-levl-cyan)] mt-0.5">
                    Additional 30% off for life auto-applied to subscriptions at checkout
                  </span>
                </div>
              </div>
            )}

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading && !cart ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-[var(--color-levl-cyan)] border-t-transparent rounded-full" />
                </div>
              ) : cart?.lines?.edges?.length ? (
                cart.lines.edges.map(({ node }) => {
                  const isSubscription = Boolean(node.sellingPlanAllocation);
                  const planId = node.sellingPlanAllocation?.sellingPlan?.id || '';
                  const planName = (node.sellingPlanAllocation?.sellingPlan?.name || '').toLowerCase();
                  const titleLower = `${node.merchandise.title || ''} ${planName}`.toLowerCase();

                  const is30Day = 
                    node.merchandise.id === 'gid://shopify/ProductVariant/46955690262726' ||
                    node.merchandise.id?.endsWith('262726') ||
                    node.merchandise.id?.includes('mock-variant-30') ||
                    (node.merchandise as any)?.sku === 'LEVL-DC-30' ||
                    planId.includes('15180792006') ||
                    planId.includes('15367569606') ||
                    titleLower.includes('30-day') ||
                    titleLower.includes('30 day') ||
                    titleLower.includes('1 bottle') ||
                    titleLower.includes('month');

                  const is90Day = !is30Day && (
                    node.merchandise.id === 'gid://shopify/ProductVariant/46955690295494' ||
                    node.merchandise.id?.endsWith('295494') ||
                    node.merchandise.id?.includes('mock-variant-90') ||
                    (node.merchandise as any)?.sku === 'LEVL-DC-90' ||
                    planId.includes('15180759238') ||
                    planId.includes('15367602374') ||
                    titleLower.includes('90') ||
                    titleLower.includes('3 bottle') ||
                    titleLower.includes('quarterly')
                  );

                  // Detect whether this specific line item has founder pricing applied:
                  // It is founder pricing if the selling plan ID is the founder plan (15367602374 or 15367569606),
                  // or the plan name mentions 93/35, or founder access is active and it's not explicitly the standard plan.
                  const isFounderPlan = isSubscription && (
                    planId.includes('15367602374') || 
                    planId.includes('15367569606') || 
                    planName.includes('93') || 
                    planName.includes('35') ||
                    (isFounder && !planId.includes('15180759238') && !planId.includes('15180792006'))
                  );

                  let unitPrice = 59;
                  let pricePerBottle = 59;
                  let billingScheduleText = '$59 one-time purchase';
                  let deliveryPillText: string | null = null;

                  if (isFounderPlan) {
                    if (is90Day) {
                      unitPrice = 93;
                      pricePerBottle = 31;
                      billingScheduleText = '$93 billed every 3 months';
                      deliveryPillText = 'Free delivery every 3 months';
                    } else {
                      unitPrice = 35;
                      pricePerBottle = 35;
                      billingScheduleText = '$35 billed monthly';
                      deliveryPillText = 'Free delivery every month';
                    }
                  } else if (isSubscription) {
                    if (is90Day) {
                      unitPrice = 132;
                      pricePerBottle = 44;
                      billingScheduleText = '$132 billed every 3 months';
                      deliveryPillText = 'Free delivery every 3 months';
                    } else {
                      unitPrice = 49;
                      pricePerBottle = 49;
                      billingScheduleText = '$49 billed monthly';
                      deliveryPillText = 'Free delivery every month';
                    }
                  } else {
                    if (is90Day) {
                      unitPrice = 147;
                      pricePerBottle = 49;
                      billingScheduleText = '$147 one-time purchase';
                      deliveryPillText = 'Free US delivery';
                    } else {
                      unitPrice = 59;
                      pricePerBottle = 59;
                      billingScheduleText = '$59 one-time purchase';
                      deliveryPillText = null;
                    }
                  }

                  const lineTotal = unitPrice * node.quantity;

                  return (
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

                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-white text-sm leading-snug">
                              {node.merchandise.product?.title || 'LEVL LIFESPAN+ DeepCell'}
                            </h3>
                            <p className="text-xs text-[var(--color-levl-text-secondary)] mt-0.5">
                              {is90Day ? '90-Day Supply (3 Bottles)' : '30-Day Supply (1 Bottle)'}
                            </p>
                          </div>

                          {/* Top Right Price & Emphasized per-bottle cost */}
                          <div className="text-right shrink-0">
                            <p className="font-bold text-white text-base leading-tight">
                              ${lineTotal.toFixed(2)}
                            </p>
                            <span className="text-xs font-bold text-[var(--color-levl-cyan)] block">
                              ${pricePerBottle}/bottle
                            </span>
                          </div>
                        </div>

                        {/* Blue Delivery Pill */}
                        {deliveryPillText && (
                          <div className="mt-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-levl-cyan)]/25 whitespace-nowrap">
                              <Truck className="w-3 h-3 shrink-0" />
                              {deliveryPillText}
                            </span>
                          </div>
                        )}

                        {/* Billing Schedule & Emphasized Price Per Bottle */}
                        <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                          <span className="text-gray-300 font-medium">
                            {billingScheduleText}
                          </span>
                          <span className="text-[11px] font-extrabold text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/15 px-2 py-0.5 rounded-md border border-[var(--color-levl-cyan)]/30">
                            ${pricePerBottle}/bottle
                          </span>
                        </div>
                        
                        {/* Quantity & Delete */}
                        <div className="flex items-center justify-between mt-auto pt-3">
                          <div className="flex items-center gap-2 bg-black/50 rounded-full px-2.5 py-1 border border-white/10">
                            <button 
                              onClick={() => updateQuantity(node.id, node.quantity - 1)}
                              disabled={isLoading}
                              className="text-gray-400 hover:text-white p-0.5 disabled:opacity-40 transition-colors cursor-pointer"
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
                              className="text-gray-400 hover:text-white p-0.5 disabled:opacity-40 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(node.id)}
                            disabled={isLoading}
                            className="text-gray-500 hover:text-red-400 p-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
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
              const getLineCost = (node: any) => {
                const isSub = Boolean(node.sellingPlanAllocation);
                const planId = node.sellingPlanAllocation?.sellingPlan?.id || '';
                const planName = (node.sellingPlanAllocation?.sellingPlan?.name || '').toLowerCase();
                const tLower = `${node.merchandise?.title || ''} ${planName}`.toLowerCase();
                const is30 = node.merchandise?.id === 'gid://shopify/ProductVariant/46955690262726' ||
                             node.merchandise?.id?.endsWith('262726') ||
                             node.merchandise?.id?.includes('mock-variant-30') ||
                             (node.merchandise as any)?.sku === 'LEVL-DC-30' ||
                             planId.includes('15180792006') ||
                             planId.includes('15367569606') ||
                             tLower.includes('30-day') ||
                             tLower.includes('30 day') ||
                             tLower.includes('1 bottle') ||
                             tLower.includes('month');
                const is90 = !is30 && (
                  node.merchandise?.id === 'gid://shopify/ProductVariant/46955690295494' ||
                  node.merchandise?.id?.endsWith('295494') ||
                  node.merchandise?.id?.includes('mock-variant-90') ||
                  (node.merchandise as any)?.sku === 'LEVL-DC-90' ||
                  planId.includes('15180759238') ||
                  planId.includes('15367602374') ||
                  tLower.includes('90') ||
                  tLower.includes('3 bottle') ||
                  tLower.includes('quarterly')
                );
                const isFounderPlan = isSub && (
                  planId.includes('15367602374') || 
                  planId.includes('15367569606') || 
                  planName.includes('93') || 
                  planName.includes('35') ||
                  (isFounder && !planId.includes('15180759238') && !planId.includes('15180792006'))
                );
                let price = 59;
                if (isFounderPlan) {
                  price = is90 ? 93 : 35;
                } else if (isSub) {
                  price = is90 ? 132 : 49;
                } else {
                  price = is90 ? 147 : 59;
                }
                return { is90, isSub, price };
              };

              const calculatedSubtotal = cart.lines.edges.reduce((sum, { node }) => {
                const { price } = getLineCost(node);
                return sum + price * node.quantity;
              }, 0);

              const qualifiesForFreeShipping = cart.lines.edges.some(({ node }) => {
                const { isSub, is90 } = getLineCost(node);
                return isSub || is90;
              }) || calculatedSubtotal >= 75;

              return (
                <div className="p-6 border-t border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] space-y-4">
                  {/* Free shipping banner if not qualified */}
                  {!qualifiesForFreeShipping && (
                    <div className="bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/20 rounded-lg p-2.5 text-center text-xs text-[var(--color-levl-cyan)] font-medium">
                      💡 Tip: 3-Bottle (90-Day) Protocols & all subscriptions include <span className="font-bold underline">Free US Shipping</span>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[var(--color-levl-text-secondary)]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white text-base">
                        ${calculatedSubtotal.toFixed(2)}
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
                    checkoutUrl={finalCheckoutUrl} 
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
