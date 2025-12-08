import { Container } from "@/components/ui/Container";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen pb-20 overflow-x-hidden bg-brand-dark text-white">
            <Navbar />

            <Container className="pt-24 md:pt-32 space-y-8">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        About <span className="text-gradient">LEVL</span>
                    </h1>
                </div>

                <BentoGrid>
                    {/* About Us Text */}
                    <BentoCard colSpan={2} className="p-8 md:p-12 flex flex-col justify-center bg-white/5 border-white/10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-copper">About Us</h2>
                        <p className="text-lg text-white/80 leading-relaxed">
                            We are a frontier research lab of Physicians, PhD chemists, Engineers, and anti-aging experts dedicated to translating breakthrough longevity science into accessible products designed to maximize quality time with people we love.
                        </p>
                    </BentoCard>

                    {/* Mission Text */}
                    <BentoCard colSpan={2} className="p-8 md:p-12 flex flex-col justify-center bg-brand-purple/10 border-brand-purple/20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-purple-100">Our Mission</h2>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Extend healthy lifespans through novel therapies and personalized protocols that slow, and ultimately reverse, the pace of human aging. Our long-term vision is to help humanity reach longevity escape velocity, the point where science extends health faster than we age.
                        </p>
                    </BentoCard>

                    {/* Escape Velocity Chart */}
                    <BentoCard colSpan={4} className="relative min-h-[400px] md:min-h-[600px] overflow-hidden bg-black border-white/10">
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="relative w-full h-full max-w-5xl">
                                <Image
                                    src="/images/levl-escape-velocity.png"
                                    alt="Path to Achieving Longevity Escape Velocity"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </BentoCard>
                </BentoGrid>

            </Container>

            <Footer />
        </main>
    );
}
