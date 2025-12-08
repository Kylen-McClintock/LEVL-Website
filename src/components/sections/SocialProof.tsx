"use client";

import { useRef, useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/BentoGrid";
import { useInView, animate, motion, AnimatePresence } from "framer-motion";

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
    {
        quote: "LEVL’s DeepCell product has worked tremendously for me. I typically have a hard time falling asleep, often lying awake for hours, but since I started using this, I’ve noticed a huge difference. Within an hour of taking the supplement, I feel relaxed and a sleepy wave comes over me. I’m able to drift off without the usual tossing and turning. What I love most is that I wake up feeling refreshed and energized, never groggy or drowsy. It’s been a total game changer for my nightly routine.",
        author: "Andrea S. (DeepCell Tester)"
    },
    {
        quote: "As a postmenopausal woman I was frustrated with experiencing nights of difficulty falling asleep, staying asleep or just broken sleep. Then I tried LEVL’s DeepCell product. I was looking for a drug free sleep aid so that I would wake up rested and ready to start my day. DeepCell was the perfect choice. Beginning on night 1, I took the recommended dosage and actually felt myself drifting off into a relaxed state. Next thing I know it's a new day. I experienced a restful night which I hadn't encountered in a long time. I take LEVL on a regular schedule and can honestly say I feel so much better in the morning after sleeping through the night.",
        author: "Cathleen L. (DeepCell Tester)"
    },
    {
        quote: "2 Capsules turned out to be perfect. It was the best night of sleep I may have ever had in years",
        author: "Lisa Melser (DeepCell Tester)"
    },
    {
        quote: "I drift into dreamland pretty easily again. From a physical standpoint, I’m gaining and retaining muscle mass easier and I haven’t done a grip strength test but my overall health outcomes seem to have leveled up since starting a nightly regiment of LEVL.",
        author: "Aaron Miltenberger (DeepCell Tester)"
    },
    {
        quote: "I fell asleep quickly, and actually stayed asleep the entire night. As a young mom, waking up feeling actually rested was so refreshing.",
        author: "Michelle (DeepCell Tester)"
    }
];

export function SocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Testimonials Card */}
            <BentoCard colSpan={4} className="p-8 md:p-12 glass-panel border border-white/5 bg-brand-dark/50 flex flex-col justify-center min-h-[300px]">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="mb-8 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">Built with real world feedback</h3>
                        <p className="text-white/60">We test until the data says it works.</p>
                    </div>

                    <div className="relative min-h-[150px] flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full"
                            >
                                <blockquote className="border-l-2 border-brand-purple pl-6 md:pl-8 py-2">
                                    <p className="text-lg md:text-xl text-white/90 italic mb-6 leading-relaxed">
                                        "{testimonials[currentIndex].quote}"
                                    </p>
                                    <footer className="flex items-center gap-3">
                                        <div className="h-px w-8 bg-brand-copper/50" />
                                        <span className="text-sm md:text-base text-brand-copper font-medium tracking-wide">
                                            {testimonials[currentIndex].author}
                                        </span>
                                    </footer>
                                </blockquote>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </BentoCard>

            {/* Metrics Card */}
            <BentoCard colSpan={4} className="p-8 border border-white/5 bg-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                    <div className="text-center">
                        <div className="mb-2 text-brand-purple">
                            <Counter to={258} />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">DeepCell Testers</div>
                    </div>

                    <div className="text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-8 sm:pt-0">
                        <div className="mb-2 text-brand-copper">
                            <Counter to={8.4} decimals={1} />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">Avg Next Day Feel</div>
                    </div>

                    <div className="text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-8 sm:pt-0">
                        <div className="mb-2 text-white">
                            <Counter to={92} suffix="%" />
                        </div>
                        <div className="text-sm text-white/60 font-medium uppercase tracking-wide">Would Recommend</div>
                    </div>
                </div>
            </BentoCard>
        </>
    );
}

