"use client";

import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PeriodicTable } from "@/components/sections/PeriodicTable";

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-[var(--color-levl-bg)] font-sans relative flex flex-col text-white selection:bg-[var(--color-levl-cyan)]/30">
            {/* Global Twilight Background Orbs */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
                <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
            </div>

            <div className="relative z-50">
                <Navbar />
            </div>

            <main className="relative z-10 flex-grow pt-24 md:pt-32 pb-20 overflow-x-hidden">
                <Container className="space-y-8">

                    {/* Header Section */}
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Longevity <span className="text-gradient">Periodic Table</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                            Explore the complex interactions between longevity molecules, hallmarks of aging, and real-world functional benefits.
                        </p>
                    </div>

                    {/* Mobile Warning */}
                    <div className="md:hidden p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Desktop Only Experience</h3>
                        <p className="text-white/60">
                            The Periodic Table of Longevity Molecules is a complex interactive visualization designed for larger screens. Please visit this page on a desktop computer to explore.
                        </p>
                    </div>

                    {/* Desktop Visualization */}
                    <div className="hidden md:block">
                        <PeriodicTable />
                    </div>

                </Container>
            </main>

            <Footer />
        </div>
    );
}
