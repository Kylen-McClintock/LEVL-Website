"use client";

import { useState } from "react";
import { BentoCard } from "@/components/ui/BentoGrid";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const scienceContent = [
    {
        title: "The Bidirectional Relationship",
        content: "Sleep and aging are inextricably linked. As we age, our sleep architecture fragments, leading to less deep sleep and REM. Conversely, poor sleep accelerates biological aging by impairing DNA repair and metabolic clearance. DeepCell is designed to intervene in this cycle."
    },
    {
        title: "Mitochondrial Function & Sleep",
        content: "Mitochondria are the power plants of your cells. During deep sleep, they undergo quality control processes like fusion and fission. Ingredients like Magnesium, Zinc, and Lithium Orotate support these mitochondrial maintenance pathways."
    },
    {
        title: "Glymphatic System & Autophagy",
        content: "The brain has a waste clearance system called the glymphatic system that is most active during deep sleep. It flushes out neurotoxic proteins. DeepCell's sleep-promoting agents help maximize the time spent in these restorative states alongside autophagy inducers like Apigenin."
    }
];

export function ScienceOfSleep() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <BentoCard colSpan={4} className="p-8 md:p-16 bg-gradient-to-b from-brand-dark to-[#0f172a] border-white/5 relative overflow-hidden">
            {/* Background graphic placeholder */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">The Science of Sleep Meets the Biology of Aging</h2>

                <div className="space-y-4">
                    {scienceContent.map((item, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-white/70 leading-relaxed text-lg"
                                    >
                                        {item.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
