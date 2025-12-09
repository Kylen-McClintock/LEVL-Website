"use client";

import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PeriodicTable } from "@/components/sections/PeriodicTable";

export default function LearnPage() {
    return (
        <main className="min-h-screen pb-20 overflow-x-hidden bg-brand-dark text-white">
            <Navbar />

            <Container className="pt-24 md:pt-32 space-y-8">

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

            <Footer />
        </main>
    );
}
