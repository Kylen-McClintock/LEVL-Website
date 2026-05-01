import { Metadata } from 'next';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: 'LEV Trajectory | LEVL',
  description: 'Track your path to Longevity Escape Velocity.',
};

export default function LEVTrajectoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-levl-bg)]">
      <Navbar />
      
      {/* 
        The top padding ensures the iframe content is not hidden behind the fixed navbar.
        We use flex-1 to make the main container fill the available vertical space.
      */}
      <main className="flex-1 w-full flex flex-col pt-[64px]"> 
        <iframe 
          src="https://lev-longevity-trajectory.vercel.app/" 
          className="flex-1 w-full border-0 min-h-[85vh]"
          title="LEV Trajectory Model"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </main>

      <Footer />
    </div>
  );
}
