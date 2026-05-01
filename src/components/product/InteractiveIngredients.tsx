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

export function InteractiveIngredients() {
    const [selectedHall, setSelectedHall] = useState<string | null>(null);
    const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);

    const ingredients = productContent.ingredients;

    const filteredIngredients = selectedHall
        ? ingredients.filter(i => i.halls?.includes(selectedHall))
        : ingredients;

    return (
        <div className="py-12 md:py-24 space-y-12">
            <div className="text-center max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">13 Ingredients Targeting 8 Key Hallmarks of Aging</h2>
                <p className="text-[var(--color-levl-text-secondary)] text-lg">DeepCell isn't just a sleep aid. It's a longevity protocol.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
                {/* Left Side: Hallmarks Menu */}
                <div className="lg:col-span-3 space-y-2">
                    <h3 className="text-sm font-bold text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-4 px-2">Improved Hallmarks</h3>
                    {hallucinations.map((hall) => (
                        <button
                            key={hall}
                            onClick={() => setSelectedHall(selectedHall === hall ? null : hall)}
                            className={`w-full text-left px-5 py-3.5 rounded-full transition-all text-base font-medium border border-white/10 ${selectedHall === hall
                                ? "bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] text-white shadow-[0_0_20px_rgba(229,128,99,0.4)] scale-[1.02]"
                                : "bg-[linear-gradient(to_right,rgba(229,128,99,0.6)_0%,rgba(159,69,118,0.6)_25%,rgba(45,27,84,0.6)_60%,rgba(16,5,36,0.6)_100%)] text-white/80 hover:bg-[linear-gradient(to_right,rgba(229,128,99,1)_0%,rgba(159,69,118,1)_25%,rgba(45,27,84,1)_60%,rgba(16,5,36,1)_100%)] hover:text-white hover:scale-[1.01]"
                                }`}
                        >
                            {hall}
                        </button>
                    ))}
                    {selectedHall && (
                        <button
                            onClick={() => setSelectedHall(null)}
                            className="text-xs text-[var(--color-levl-text-muted)] hover:text-white mt-4 w-full text-center underline"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>

                {/* Right Side: Ingredients Grid */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredIngredients.map((ing) => (
                            <motion.div
                                key={ing.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`bg-[linear-gradient(30deg,#5D265Ee6,#AC4A6933)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 flex flex-col hover:border-[var(--color-levl-green)]/30 transition-all`}
                            >
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    <h4 className="font-bold text-white text-lg leading-tight">{ing.name}</h4>
                                    <span className="text-xs font-mono text-[var(--color-levl-green)] bg-[var(--color-levl-green)]/10 px-2 py-0.5 rounded whitespace-nowrap">{ing.dose}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4">
                                  <p className="text-sm text-[var(--color-levl-text-secondary)] leading-relaxed font-medium">{ing.function}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {ing.halls?.map(h => (
                                        <Badge key={h} variant="outline" className={`text-[10px] ${selectedHall === h ? 'bg-[var(--color-levl-cyan)]/20 border-[var(--color-levl-cyan)]/40 text-[var(--color-levl-cyan)]' : 'bg-transparent border-white/10 text-white/50'}`}>
                                            {h}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Desktop: Always expanded */}
                                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-[var(--color-levl-text-secondary)] hidden md:block">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Evidence Level:</span>
                                        <Badge variant="outline" className="text-[10px] bg-white/5 text-[var(--color-levl-text-secondary)] border-white/10 font-medium shrink-0">
                                            {ing.evidenceTag}
                                        </Badge>
                                    </div>
                                    {ing.whyItMatters}
                                </div>

                                {/* Mobile: Toggleable */}
                                <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                                  <button
                                      onClick={() => setExpandedIngredient(expandedIngredient === ing.name ? null : ing.name)}
                                      className="text-xs font-semibold text-[var(--color-levl-green)] hover:text-[var(--color-levl-green)]/80 flex items-center gap-1"
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
                                            className="mt-4 pt-4 border-t border-white/10 text-sm text-[var(--color-levl-text-secondary)] overflow-hidden"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Evidence Level:</span>
                                                <Badge variant="outline" className="text-[10px] bg-white/5 text-[var(--color-levl-text-secondary)] border-white/10 font-medium shrink-0">
                                                    {ing.evidenceTag}
                                                </Badge>
                                            </div>
                                            {ing.whyItMatters}
                                        </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
