"use client";

import { useRef, useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/BentoGrid";
import { useInView, animate } from "framer-motion";

function Counter({ from = 0, to, duration = 2, decimals = 0, suffix = "" }: { from?: number; to: number; duration?: number; decimals?: number; suffix?: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!nodeRef.current || !inView) return;

        const node = nodeRef.current;

        const controls = animate(from, to, {
            duration,
            onUpdate(value) {
                node.textContent = value.toFixed(decimals) + suffix;
            },
        });

        return () => controls.stop();
    }, [from, to, duration, inView, decimals, suffix]);

    return <span ref={nodeRef} className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">0</span>;
}

const testimonials = [
    { quote: "Finally a sleep supplement that doesn't leave me groggy.", author: "Sarah J., DeepCell Cohort 1" },
    { quote: "My Oura scores have consistently been +15% higher.", author: "Mike T., Biohacker" },
    { quote: "I feel like I actually rested, not just passed out.", author: "Elena R., Physician" },
];

export function SocialProof() {
    return (
        <BentoCard colSpan={4} className="p-8 md:p-12 glass-panel border border-white/5 bg-brand-dark/50">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">

                {/* Header & Testimonials */}
                <div className="flex-1 space-y-8 max-w-lg">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Built with real world feedback, not hype</h3>
                        <p className="text-white/60">We test until the data says it works.</p>
                    </div>

                    <div className="relative h-32 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col gap-4 animate-slide-up">
                            {/* Simplified static display for now, could be a carousel */}
                            <blockquote className="border-l-2 border-brand-purple pl-4">
                                <p className="text-lg text-white/90 italic mb-2">"Finally a sleep supplement that doesn't leave me groggy."</p>
                                <footer className="text-sm text-brand-copper font-medium">— Sarah J., DeepCell Cohort 1</footer>
                            </blockquote>
                            <blockquote className="border-l-2 border-brand-purple pl-4 hidden md:block">
                                <p className="text-lg text-white/90 italic mb-2">"My Oura scores have consistently been +15% higher since starting."</p>
                                <footer className="text-sm text-brand-copper font-medium">— Mike T., Biohacker</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="mb-2 text-brand-purple">
                            <Counter to={258} />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">DeepCell Testers</div>
                    </div>

                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="mb-2 text-brand-copper">
                            <Counter to={8.4} decimals={1} />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">Avg Next Day Feel</div>
                    </div>

                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="mb-2 text-white">
                            <Counter to={92} suffix="%" />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">Would Recommend</div>
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
