import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { ProductHero } from '../../components/product/ProductHero';
import { BenefitTimeline } from '../../components/sections/BenefitTimeline';
import { BenefitsAtEveryAge } from '../../components/product/BenefitsAtEveryAge';
import { ScienceMechanismSection } from '../../components/product/ScienceMechanismSection';
import { InteractiveIngredients } from '../../components/product/InteractiveIngredients';
import { ComparisonTable } from '../../components/product/ComparisonTable';
import { ReviewCards } from '../../components/product/ReviewCards';
import { GuaranteeStrip } from '../../components/product/GuaranteeStrip';
import { ProductFAQ } from '../../components/product/ProductFAQ';
import { Navbar } from '../../components/sections/Navbar';
import { Footer } from '../../components/sections/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { productContent } from '../../content/productLongevity';
import { getProduct, createCart } from '../../lib/shopify';
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
      <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans">
        
        {/* Announcement Bar */}
        <div className="bg-[var(--color-levl-panel)] border-b border-[var(--color-levl-panel-border)] text-center py-2 px-4">
          <p className="text-sm font-medium text-[var(--color-levl-text-secondary)]">
            {productContent.announcementBar}
          </p>
        </div>

        {/* Storefront Navigation */}
        <div className="relative z-50">
          <Navbar showCart={true} />
        </div>

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

        <Footer />
      </div>
    </StorefrontClient>
  );
}
