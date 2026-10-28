import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { StorefrontClient } from "@/app/StorefrontClient";
import { getProduct } from "@/lib/shopify";
import { getJudgeMeReviews } from "@/lib/judgeme";
import { ProtocolQuizClient } from "@/components/quiz/ProtocolQuizClient";

export const metadata: Metadata = {
  title: "Find Your Longevity Starting Point | LEVL Health",
  description:
    "Discover a practical routine for better nights, more energized days, and long-term health. Takes about 60 seconds • No email required to see results.",
  openGraph: {
    title: "Find Your Longevity Starting Point | LEVL Health",
    description:
      "Discover a practical routine for better nights, more energized days, and long-term health.",
    url: "https://www.levlhealth.com/find-your-protocol",
    images: ["https://www.levlhealth.com/images/deepcell-bottle.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Longevity Starting Point | LEVL Health",
    description:
      "Discover a practical routine for better nights, more energized days, and long-term health.",
    images: ["https://www.levlhealth.com/images/deepcell-bottle.jpg"],
  },
};

export default async function FindYourProtocolPage() {
  const [product, judgeMeData] = await Promise.all([
    getProduct("lifespan-deepcell"),
    getJudgeMeReviews("lifespan-deepcell"),
  ]);

  return (
    <StorefrontClient product={product}>
      {/* Early TLS & DNS handshakes for LEVL Protocols App and LongevityReviews */}
      <link
        rel="preconnect"
        href="https://2026-levl-protocols-app.vercel.app"
        crossOrigin="anonymous"
      />
      <link
        rel="dns-prefetch"
        href="https://2026-levl-protocols-app.vercel.app"
      />
      <link
        rel="preconnect"
        href="https://www.longevityreviews.org"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://www.longevityreviews.org" />

      <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans relative text-white selection:bg-[var(--color-levl-cyan)]/30">
        {/* Global Twilight Background Orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
          <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
        </div>

        <div className="relative z-50">
          <Navbar showCart={true} />
        </div>

        <main className="relative z-10 flex-grow pt-24 md:pt-32 pb-20">
          <Container>
            <ProtocolQuizClient product={product} judgeMeData={judgeMeData} />
          </Container>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </StorefrontClient>
  );
}
