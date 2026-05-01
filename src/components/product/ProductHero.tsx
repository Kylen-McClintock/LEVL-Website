"use client";

import React from 'react';
import { Star, Moon } from 'lucide-react';
import { ProductGallery } from './ProductGallery';
import { PurchaseBox } from './PurchaseBox';
import { StatsBar } from './StatsBar';
import { ShopifyProduct } from '../../types/shopify';
import { productContent } from '../../content/productLongevity';
import { Badge } from '../ui/Badge'; // Assume this exists or I will create it

import { StorefrontContext } from '../../app/StorefrontClient';

interface ProductHeroProps {
  product?: ShopifyProduct;
  cartId: string | null;
}

export function ProductHero({ product, cartId }: ProductHeroProps) {
  const { openCart } = React.useContext(StorefrontContext);
  const baseImages = product?.images.edges.map(e => e.node) || [
    { url: 'https://placehold.co/800x800/0B0E17/22c55e?text=LEVL+LIFESPAN%2B+Main', altText: 'LEVL LIFESPAN+' }
  ];

  const images = [
    baseImages[0],
    { url: '/images/deepcell_pathways_bg.png', altText: '5 Core Biological Pathways' },
    { url: '/images/supplement_facts.png', altText: 'Supplement Facts' },
    { url: '/images/value_prop_thumbnail.png', altText: 'Value Proposition' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Column: Gallery */}
        <div className="flex flex-col gap-8 h-fit lg:sticky lg:top-24">
          <ProductGallery images={images} />
        </div>

        {/* Right Column: Info & Purchase */}
        <div 
          className="flex flex-col gap-2 pb-12 lg:pb-0 lg:sticky"
          style={{ top: 'max(6rem, calc(100vh - 100% - 2rem))' }}
        >
          {/* Title and Rating */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-6">
              OutPace Aging <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-levl-cyan)] via-[var(--color-levl-magenta)] to-[#6D28D9]">in Your Sleep</span>
            </h1>
            <p className="text-xl text-[var(--color-levl-text-secondary)] mb-8">
              A melatonin-free sleep and cellular renewal stack for people who want better nights and more tomorrows.
            </p>
          </div>

          <ul className="space-y-4 mb-10">
              {[
                  "Deeper, more restorative sleep",
                  "Designed to support autophagy and nighttime cellular cleanup",
                  "13 active ingredients shown to improve 8 hallmarks of aging"
              ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-levl-cyan)] shadow-[0_0_8px_var(--color-levl-cyan)]" />
                      {item}
                  </li>
              ))}
          </ul>

          <PurchaseBox product={product} onCartOpen={openCart} cartId={cartId} />
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
