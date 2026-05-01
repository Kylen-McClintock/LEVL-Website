import { Metadata } from 'next';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: 'Research Hub | LEVL',
  description: 'Explore the latest longevity and healthspan research.',
};

export default function ResearchHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-levl-bg)]">
      <Navbar />
      
      {/* 
        Padding top accounts for the fixed Navbar. 
        We use flex-1 to make the container stretch and give the iframe a minimum height.
      */}
      <main className="flex-1 w-full flex flex-col pt-[64px]"> 
        <iframe 
          src="https://levl-research-paper-summary-engine.vercel.app/" 
          className="flex-1 w-full border-0 min-h-[85vh]"
          title="LEVL Research Hub"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </main>

      <Footer />
    </div>
  );
}
