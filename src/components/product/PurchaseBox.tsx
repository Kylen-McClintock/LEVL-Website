"use client";

import React, { useState, useMemo } from 'react';
import { ShieldCheck, Calendar, Truck, RefreshCcw, Loader2, Zap } from 'lucide-react';
import { SubscriptionSelector, PlanType } from './SubscriptionSelector';
import { QuantitySelector } from './QuantitySelector';
import { productContent } from '../../content/productLongevity';
import { ShopifyProduct } from '../../types/shopify';
import { useCart } from '../../context/CartContext';
import { cn } from '../cart/CheckoutButton';

interface PurchaseBoxProps {
  product?: ShopifyProduct;
  onCartOpen?: () => void;
  cartId?: string | null;
}

export function PurchaseBox({ product }: PurchaseBoxProps) {
  const { addToCart, instantBuy, isLoading } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('subscribe-90');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isExpressBuying, setIsExpressBuying] = useState(false);

  // Match live Shopify variants & selling plans from product data
  const { variantId, sellingPlanId, displayPrice, originalPrice, perBottleText } = useMemo(() => {
    const variants = product?.variants?.edges?.map(e => e.node) || [];
    
    // Find 90-day variant (or 3-pack) vs 30-day variant (or single)
    const variant90 = variants.find(v => v.title.toLowerCase().includes('90') || v.title.toLowerCase().includes('3 bottle') || v.sku?.includes('90')) || variants[1] || variants[0];
    const variant30 = variants.find(v => v.title.toLowerCase().includes('30') || v.title.toLowerCase().includes('1 bottle') || v.sku?.includes('30')) || variants[0];

    if (selectedPlan === 'subscribe-90') {
      const activeVariant = variant90 || variant30;
      const plan = activeVariant?.sellingPlanAllocations?.edges?.[0]?.node?.sellingPlan;
      return {
        variantId: activeVariant?.id || 'gid://shopify/ProductVariant/mock-variant-90',
        sellingPlanId: plan?.id || undefined,
        displayPrice: '$39 / bottle',
        originalPrice: '$49',
        perBottleText: '($117 total for 3-Month Protocol)'
      };
    }

    if (selectedPlan === 'subscribe-30') {
      const activeVariant = variant30;
      const plan = activeVariant?.sellingPlanAllocations?.edges?.[0]?.node?.sellingPlan;
      return {
        variantId: activeVariant?.id || 'gid://shopify/ProductVariant/mock-variant-30',
        sellingPlanId: plan?.id || undefined,
        displayPrice: '$43 / bottle',
        originalPrice: '$49',
        perBottleText: '(Billed monthly, cancel anytime)'
      };
    }

    // One-Time
    const activeVariant = variant30;
    return {
      variantId: activeVariant?.id || 'gid://shopify/ProductVariant/mock-variant-30',
      sellingPlanId: undefined,
      displayPrice: '$49',
      originalPrice: null,
      perBottleText: '(Single bottle, one-time delivery)'
    };
  }, [product, selectedPlan]);

  const handleAddToCart = async () => {
    if (!variantId) return;
    setIsAdding(true);
    try {
      await addToCart(variantId, quantity, sellingPlanId);
    } catch (e) {
      console.error('Error adding to protocol:', e);
    } finally {
      setIsAdding(false);
    }
  };

  const handleExpressBuy = async () => {
    if (!variantId) return;
    setIsExpressBuying(true);
    try {
      await instantBuy(variantId, quantity, sellingPlanId);
    } catch (e) {
      console.error('Error executing express checkout:', e);
    } finally {
      setIsExpressBuying(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(30deg,#1B1237e6,#451F5233)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl shadow-black/50">
      {/* Price Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {product?.title || 'LIFESPAN+ DeepCell'}
          </h2>
          {selectedPlan.includes('subscribe') && (
            <span className="text-xs bg-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] px-2.5 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 font-medium">
              Save Up to 20%
            </span>
          )}
        </div>

        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-white tracking-tight">{displayPrice}</span>
            {originalPrice && (
              <span className="text-lg text-[var(--color-levl-text-muted)] line-through mb-1">
                {originalPrice}
              </span>
            )}
          </div>
          {perBottleText && (
            <span className="text-xs font-medium text-[var(--color-levl-cyan)] mb-2">
              {perBottleText}
            </span>
          )}
        </div>
      </div>

      {/* Selectors */}
      <SubscriptionSelector selectedPlan={selectedPlan} onChange={setSelectedPlan} />
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <QuantitySelector quantity={quantity} onChange={setQuantity} className="h-12 w-28" />
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isLoading || isExpressBuying}
            className={cn(
              "flex-1 h-12 rounded-full font-semibold transition-all duration-300 shadow-lg",
              selectedPlan.includes('subscribe')
                ? "bg-[var(--color-levl-cyan)] text-black hover:bg-[var(--color-levl-cyan)]/90 shadow-[0_0_20px_rgba(34,197,94,0.25)]"
                : "bg-white text-black hover:bg-gray-200",
              "disabled:opacity-50 flex items-center justify-center gap-2"
            )}
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Add to Protocol"
            )}
          </button>
        </div>

        {/* Express Shop Pay / 1-Click Buy Button */}
        <button
          onClick={handleExpressBuy}
          disabled={isExpressBuying || isAdding || isLoading}
          className="w-full h-11 rounded-full bg-[#5A31F4]/20 hover:bg-[#5A31F4]/30 border border-[#5A31F4]/50 text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.99] disabled:opacity-50"
        >
          {isExpressBuying ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#9B80FA]" />
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-[#9B80FA] fill-[#9B80FA]" />
              <span>Instant Buy with <span className="font-bold text-[#9B80FA]">Shop Pay</span> / Apple Pay</span>
            </>
          )}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-[var(--color-levl-panel-border)] grid grid-cols-2 gap-3">
        {productContent.purchaseOptions.trustRow.map((trustItem, i) => {
          const Icon = [ShieldCheck, RefreshCcw, Truck, Calendar][i % 4];
          return (
            <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-levl-text-secondary)]">
              <Icon className="w-3.5 h-3.5 text-[var(--color-levl-cyan)] shrink-0" />
              <span>{trustItem}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[var(--color-levl-text-muted)] text-center">
        {productContent.purchaseOptions.disclaimer}
      </p>
    </div>
  );
}
