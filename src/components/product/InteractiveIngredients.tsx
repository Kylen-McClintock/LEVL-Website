"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { productContent } from "../../content/productLongevity";

const hallucinations = [
    "Telomere Preservation",
    "Stem Cell Vitality",
    "Genomic Stability",
    "Mitochondrial Health",
    "Autophagy",
    "Cellular Renewal",
    "Inflammatory Balance",
    "Metabolic Health"
];

const nightlyBenefits = [
    "Natural Deep Sleep",
    "Overnight Cellular Tuneup",
    "Next Morning Clarity"
];

export function InteractiveIngredients() {
    const [selectedHall, setSelectedHall] = useState<string | null>(null);
    const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
    const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);

    const ingredients = productContent.ingredients;

    const filteredIngredients = ingredients.filter(i => {
        if (selectedHall && !i.halls?.includes(selectedHall)) return false;
        if (selectedBenefit && !i.nightlyBenefits?.includes(selectedBenefit)) return false;
        return true;
    });

    return (
        <div className="py-12 md:py-24 space-y-12">
            <div className="text-center max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">13 Ingredients Targeting 8 Key Hallmarks of Aging</h2>
                <p className="text-[var(--color-levl-text-secondary)] text-lg">DeepCell isn't just a sleep aid. It's a longevity protocol.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
                {/* Left Side: Filter Menus */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Nightly Benefits Filter */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-4 px-2">Nightly Benefits</h3>
                        {nightlyBenefits.map((benefit) => (
                            <button
                                key={benefit}
                                onClick={() => {
                                    setSelectedBenefit(selectedBenefit === benefit ? null : benefit);
                                    setSelectedHall(null);
                                }}
                                className={`w-full text-left px-5 py-3.5 rounded-full transition-all text-base font-medium border border-white/10 ${selectedBenefit === benefit
                                    ? "bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] text-white shadow-[0_0_20px_rgba(229,128,99,0.4)] scale-[1.02]"
                                    : "bg-[linear-gradient(to_right,rgba(229,128,99,0.6)_0%,rgba(159,69,118,0.6)_25%,rgba(45,27,84,0.6)_60%,rgba(16,5,36,0.6)_100%)] text-white/80 hover:bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] hover:text-white hover:scale-[1.01]"
                                    }`}
                            >
                                {benefit}
                            </button>
                        ))}
                    </div>

                    {/* Hallmarks Filter */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-4 px-2">Improved Hallmarks</h3>
                        {hallucinations.map((hall) => (
                            <button
                                key={hall}
                                onClick={() => {
                                    setSelectedHall(selectedHall === hall ? null : hall);
                                    setSelectedBenefit(null);
                                }}
                                className={`w-full text-left px-5 py-3.5 rounded-full transition-all text-base font-medium border border-white/10 ${selectedHall === hall
                                    ? "bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] text-white shadow-[0_0_20px_rgba(229,128,99,0.4)] scale-[1.02]"
                                    : "bg-[linear-gradient(to_right,rgba(229,128,99,0.6)_0%,rgba(159,69,118,0.6)_25%,rgba(45,27,84,0.6)_60%,rgba(16,5,36,0.6)_100%)] text-white/80 hover:bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] hover:text-white hover:scale-[1.01]"
                                    }`}
                            >
                                {hall}
                            </button>
                        ))}
                    </div>

                    {(selectedHall || selectedBenefit) && (
                        <button
                            onClick={() => { setSelectedHall(null); setSelectedBenefit(null); }}
                            className="text-xs text-[var(--color-levl-text-muted)] hover:text-white mt-4 w-full text-center underline"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Right Side: Ingredients Grid */}
                <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 content-start">
                    <AnimatePresence>
                        {filteredIngredients.map((ing) => (
                            <motion.div
                                key={ing.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`relative rounded-2xl p-[2px] flex flex-col bg-gradient-to-bl from-[#2D1B54] via-[#9F4576] to-[#E58063] hover:shadow-[0_0_20px_rgba(229,128,99,0.2)] transition-shadow duration-300 ${expandedIngredient === ing.name ? 'h-auto' : 'aspect-square'}`}
                            >
                                <div className="bg-[#0B0E17] rounded-2xl p-4 md:p-5 flex flex-col h-full w-full relative">
                                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                                        <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-1 rounded-md">{ing.dose}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center flex-grow pt-8 pb-4">
                                        <h4 className="font-bold text-white text-xl md:text-2xl leading-tight">{ing.name}</h4>
                                    </div>

                                    <div className="mt-auto flex flex-col shrink-0">
                                        <p className="text-[12px] md:text-[13px] text-center text-[var(--color-levl-text-secondary)] leading-relaxed font-medium mb-4 px-2">
                                            {ing.function}
                                        </p>

                                        {/* Toggleable Description */}
                                        <div className="pt-4 border-t border-white/10">
                                            <button
                                                onClick={() => setExpandedIngredient(expandedIngredient === ing.name ? null : ing.name)}
                                                className="text-xs font-semibold text-white/60 hover:text-white flex items-center justify-center gap-1 w-full transition-colors"
                                            >
                                                {expandedIngredient === ing.name ? "Show less" : "Learn more"}
                                                {expandedIngredient === ing.name ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                            </button>

                                            <AnimatePresence>
                                                {expandedIngredient === ing.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="mt-5 text-sm text-[var(--color-levl-text-secondary)] overflow-hidden flex flex-col gap-5"
                                                    >
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            {ing.nightlyBenefits?.map((b: string) => (
                                                                <Badge key={b} variant="outline" className={`text-[10px] ${selectedBenefit === b ? 'bg-[var(--color-levl-copper)]/20 border-[var(--color-levl-copper)]/40 text-[var(--color-levl-copper)]' : 'bg-transparent border-white/10 text-white/50'}`}>
                                                                    {b}
                                                                </Badge>
                                                            ))}
                                                            {ing.halls?.map((h: string) => (
                                                                <Badge key={h} variant="outline" className={`text-[10px] ${selectedHall === h ? 'bg-[var(--color-levl-cyan)]/20 border-[var(--color-levl-cyan)]/40 text-[var(--color-levl-cyan)]' : 'bg-transparent border-white/10 text-white/50'}`}>
                                                                    {h}
                                                                </Badge>
                                                            ))}
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Evidence:</span>
                                                                <Badge variant="outline" className="text-[10px] bg-white/5 text-[var(--color-levl-text-secondary)] border-white/10 font-medium shrink-0">
                                                                    {ing.evidenceTag}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-center text-[13px] leading-relaxed">{ing.whyItMatters}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
