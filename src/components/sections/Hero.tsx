import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BentoCard } from "@/components/ui/BentoGrid";
import { ArrowRight, Moon, Zap, Activity } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <BentoCard colSpan={4} className="min-h-[600px] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8 bg-gradient-to-br from-brand-dark via-[#1a0b2e] to-[#2a1b0a]">
            {/* Content Side */}
            <div className="flex flex-col gap-6 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple-100 text-sm font-medium w-fit">
                    <Moon className="w-4 h-4" />
                    <span>LIFESPAN+ DeepCell</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                    OutPace Aging <br />
                    <span className="text-gradient">in Your Sleep</span>
                </h1>

                <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
                    A melatonin-free sleep and cellular renewal stack for people who want better nights and more tomorrows.
                </p>

                <ul className="space-y-3 mb-4">
                    {[
                        "Deeper, more restorative sleep",
                        "Designed to support autophagy and nighttime cellular cleanup",
                        "Formulated by PhD and physician team"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/80">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-copper shadow-brand-glow" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4 mt-2">
                    <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-brand-purple/20">
                        Shop DeepCell
                    </Button>
                    <Button variant="ghost" size="lg" className="group">
                        See how it works
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>

            {/* Visual Side */}
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square flex-shrink-0">
                {/* Floating Platform/Glow */}
                <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/50 blur-xl rounded-[100%]" />

                {/* Product Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center animate-slide-up">
                    <div className="relative w-full h-full max-w-[300px] max-h-[500px]">
                        <Image
                            src="/images/deepcell-bottle.jpg"
                            alt="LIFESPAN+ DeepCell Bottle"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Floating Chips */}
            <div className="absolute top-[20%] right-0 animate-bounce delay-100 duration-[3000ms]">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 border-glow">
                    <Zap className="w-3 h-3 text-brand-copper" />
                    Mitochondrial Health
                </div>
            </div>

            <div className="absolute bottom-[30%] left-[-10%] animate-bounce delay-700 duration-[4000ms]">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 border-glow">
                    <Activity className="w-3 h-3 text-teal-400" />
                    Cellular Renewal
                </div>

            </div>
        </BentoCard >
    );
}
