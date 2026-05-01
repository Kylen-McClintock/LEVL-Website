import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

export const metadata: Metadata = {
  title: 'Checkout | LEVL DeepCell',
  description: 'Join the waitlist for LEVL DeepCell early access.',
};

export default function CheckoutMockPage() {
  return (
    <div className="min-h-screen bg-[var(--color-levl-bg)] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Global Twilight Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <Link 
          href="/products/longevity" 
          className="inline-flex items-center gap-2 text-[var(--color-levl-text-secondary)] hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Storefront
        </Link>

        <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-levl-cyan)] to-transparent opacity-50" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-levl-magenta)]/10 border border-[var(--color-levl-magenta)]/20 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.15)] relative">
               <div className="absolute inset-0 rounded-2xl bg-[var(--color-levl-magenta)]/20 blur-xl animate-pulse" />
               <Clock className="w-8 h-8 text-[var(--color-levl-magenta)] relative z-10" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4 tracking-tight">
            Almost Ready.
          </h1>
          
          <p className="text-[var(--color-levl-text-secondary)] text-center text-lg mb-8 leading-relaxed">
            Due to overwhelming demand, LEVL DeepCell is currently finalizing our initial production run. We will be officially launching and fulfilling orders in a few weeks.
          </p>

          <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-levl-cyan)]/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="font-semibold text-white flex items-center gap-2 mb-3 relative z-10">
              <Zap className="w-4 h-4 text-[var(--color-levl-cyan)]" />
              Secure Your Spot
            </h3>
            <p className="text-sm text-white/80 mb-5 leading-relaxed relative z-10">
              Enter your email to be the first to know when checkout opens. As a thank you for being an early supporter, you'll receive an exclusive <span className="text-[var(--color-levl-cyan)] font-semibold">15% discount</span> on your first protocol order.
            </p>
            
            <div className="relative z-10">
              <WaitlistForm />
            </div>
          </div>
          
          <p className="text-xs text-center text-[var(--color-levl-text-muted)] mt-6">
            No spam. We will only email you when your protocol is ready to ship.
          </p>
        </div>
      </div>
    </div>
  );
}
