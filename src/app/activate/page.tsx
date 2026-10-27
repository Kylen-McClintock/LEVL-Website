import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sun, Sparkles, FlaskConical, Zap } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "LIFESPAN+ Activate (In Development) | LEVL Health",
  description:
    "Our energizing daytime longevity complex is in development. Find your starting protocol today and register interest for Activate launch updates.",
};

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans relative text-white selection:bg-[var(--color-levl-cyan)]/30">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
      </div>

      <div className="relative z-50">
        <Navbar showCart={false} />
      </div>

      <main className="relative z-10 flex-grow pt-28 md:pt-36 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#0B0E17]/90 border border-amber-500/25 p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5" />
              In Development • Daytime Longevity Complex
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                LIFESPAN+ Activate
              </h1>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                LIFESPAN+ Activate is our upcoming daytime energizing longevity
                complex—formulated to complement evening cellular recovery with
                clean mitochondrial ATP support, metabolic resilience, and
                sustained daytime focus without stimulant crashes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <div className="font-bold text-sm text-white">
                  Mitochondrial Bioenergetics
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  Designed to support cellular NAD+ and electron transport
                  efficiency during waking hours.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <FlaskConical className="w-5 h-5 text-[var(--color-levl-cyan)]" />
                <div className="font-bold text-sm text-white">
                  Zero Afternoon Crash
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  Formulated to work alongside circadian morning sunlight and
                  adenosine clearance.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <div className="font-bold text-sm text-white">
                  Community Beta Cohort
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  Register your interest via our personalized protocol quiz to
                  receive launch updates and beta invitations.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/find-your-protocol"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:bg-[var(--color-levl-cyan)]/90 transition-all"
              >
                <span>Take the 60-Second Protocol Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="text-sm font-semibold text-white/70 hover:text-white underline"
              >
                Explore LIFESPAN+ DeepCell →
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
