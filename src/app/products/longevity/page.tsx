import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { ProductHero } from '../../../components/product/ProductHero';
import { BenefitTimeline } from '../../../components/sections/BenefitTimeline';
import { BenefitsAtEveryAge } from '../../../components/product/BenefitsAtEveryAge';
import { ScienceMechanismSection } from '../../../components/product/ScienceMechanismSection';
import { InteractiveIngredients } from '../../../components/product/InteractiveIngredients';
import { ComparisonTable } from '../../../components/product/ComparisonTable';
import { ReviewCards } from '../../../components/product/ReviewCards';
import { GuaranteeStrip } from '../../../components/product/GuaranteeStrip';
import { ProductFAQ } from '../../../components/product/ProductFAQ';
import { StickyMobileCTA } from '../../../components/product/StickyMobileCTA';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { productContent } from '../../../content/productLongevity';
import { getProduct, createCart } from '../../../lib/shopify';
import { StorefrontClient } from './StorefrontClient';

export const metadata: Metadata = {
  title: 'LEVL LIFESPAN+ | Daily Longevity Support',
  description: productContent.shortDescription,
  openGraph: {
    title: 'LEVL LIFESPAN+ | Daily Longevity Support',
    description: productContent.shortDescription,
    images: ['https://placehold.co/1200x630/0B0E17/22c55e?text=LEVL+LIFESPAN%2B'],
  }
};

export default async function LongevityProductPage() {
  const product = await getProduct('longevity');
  const initialCart = await createCart(); // Creates a mock cart or empty real cart

  return (
    <StorefrontClient product={product} initialCartId={initialCart.id}>
      <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans relative">
        
        {/* Global Twilight Background Orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
          <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
        </div>

        {/* Content wrappers need relative z-index to sit above the fixed background */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Announcement Bar */}
        <div className="bg-[var(--color-levl-panel)] border-b border-[var(--color-levl-panel-border)] text-center py-2 px-4">
          <p className="text-sm font-medium text-[var(--color-levl-text-secondary)]">
            {productContent.announcementBar}
          </p>
        </div>

        {/* Storefront Navigation (Placeholder for specific product nav) */}
        <header className="sticky top-0 z-30 bg-[var(--color-levl-bg)]/80 backdrop-blur-lg border-b border-[var(--color-levl-panel-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-[100px] h-[30px] flex items-center">
                <Image src="/images/levl_logo.png" alt="LEVL" fill className="object-contain object-left" priority />
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-levl-text-secondary)]">
              <a href="#science" className="hover:text-white transition-colors">Science</a>
              <a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a>
              <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center gap-4">
              <button id="cart-trigger" className="p-2 text-white hover:text-[var(--color-levl-cyan)] transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <ProductHero product={product} cartId={initialCart.id} />
          <BenefitTimeline />
          <div id="science"><ScienceMechanismSection /></div>
          <GuaranteeStrip />
          <div id="ingredients"><InteractiveIngredients /></div>
          <ComparisonTable />
          <div id="reviews"><ReviewCards /></div>
          <BenefitsAtEveryAge />
          <div id="faq"><ProductFAQ /></div>
        </main>

        <footer className="bg-[var(--color-levl-panel)] border-t border-[var(--color-levl-panel-border)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="relative w-[100px] h-[30px] mb-6 opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/images/levl_logo.png" alt="LEVL" fill className="object-contain" />
            </div>
            <p className="text-sm text-[var(--color-levl-text-muted)] max-w-2xl mb-8">
              {productContent.purchaseOptions.disclaimer}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-levl-text-secondary)]">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">Returns</a>
              <a href="#" className="hover:text-white">Subscription Policy</a>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </StorefrontClient>
  );
}
