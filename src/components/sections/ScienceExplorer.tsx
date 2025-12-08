"use client";

import { useState } from "react";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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

const ingredients = [
    {
        name: "Vitamin B6",
        dose: "5 mg",
        summary: "Cofactor for neurotransmitter and melatonin synthesis that helps convert L tryptophan into serotonin and sleep supporting signaling.",
        halls: ["Genomic Stability", "Metabolic Health"],
        details: "Vitamin B6 is crucial for the biosynthesis of neurotransmitters, including serotonin and dopamine. It acts as a coenzyme in the conversion of L-Tryptophan to 5-HTP and then to serotonin/melatonin."
    },
    {
        name: "Magnesium Glycinate",
        dose: "70 mg",
        summary: "Highly absorbable magnesium chelate that supports nervous system calm, muscle relaxation, and over 300 metabolic reactions.",
        halls: ["Mitochondrial Health", "Metabolic Health", "Inflammatory Balance"],
        details: "Magnesium is essential for ATP stability and enzymatic function. The glycinate form provides glycine, an inhibitory neurotransmitter that promotes relaxation."
    },
    {
        name: "Zinc (as Zinc Citrate)",
        dose: "8 mg",
        summary: "Essential mineral involved in antioxidant defenses and enzymes that maintain DNA integrity and hormone balance.",
        halls: ["Genomic Stability", "Cellular Renewal", "Inflammatory Balance"],
        details: "Zinc plays a critical role in DNA repair mechanisms and immune modulation. It supports SOD (Superoxide Dismutase) activity to combat oxidative stress."
    },
    {
        name: "Valerian Root Extract",
        dose: "300 mg",
        summary: "Traditional calming root that modulates GABA signaling to reduce sleep onset time without heavy sedation.",
        halls: ["Cellular Renewal", "Inflammatory Balance"],
        details: "Valerenic acid in Valerian root inhibits the breakdown of GABA, extending its calming effects on the nervous system."
    },
    {
        name: "Astragalus Root Extract",
        dose: "300 mg",
        summary: "Adaptogenic root used to support immune resilience and telomere maintenance in preclinical research.",
        halls: ["Telomere Preservation", "Inflammatory Balance"],
        details: "Astragalus contains cycloastragenol and astragaloside IV, compounds studied for their potential to activate telomerase and protect telomere length."
    },
    {
        name: "Lemon Balm Extract",
        dose: "250 mg",
        summary: "Member of the mint family that reduces restlessness and supports sleep quality while providing gentle antioxidant support.",
        halls: ["Cellular Renewal", "Inflammatory Balance"],
        details: "Rosmarinic acid in Lemon Balm has been shown to increase GABA transaminase activity, helping to maintain higher GABA levels in the brain."
    },
    {
        name: "L Theanine",
        dose: "200 mg",
        summary: "Amino acid from green tea that promotes relaxed alertness by increasing alpha brain waves and balancing excitatory signaling.",
        halls: ["Mitochondrial Health", "Inflammatory Balance"],
        details: "L-Theanine crosses the blood-brain barrier to promote alpha wave generation, associated with a state of 'relaxed wakefulness' conducive to falling asleep."
    },
    {
        name: "L Tryptophan",
        dose: "100 mg",
        summary: "Essential amino acid and precursor for serotonin and melatonin pathways, included at a gentle dose.",
        halls: ["Metabolic Health", "Cellular Renewal"],
        details: "Precursor to 5-HTP and Serotonin. Provides raw substrate for the body's natural melatonin production pathways."
    },
    {
        name: "Passion Flower Extract",
        dose: "100 mg",
        summary: "Flowering vine used for easing a racing mind and improving subjective sleep quality.",
        halls: ["Cellular Renewal", "Inflammatory Balance"],
        details: "Contains flavonoids like chrysin which bind to benzodiazepine sites on GABA receptors, exerting mild anxiolytic effects."
    },
    {
        name: "Hops Extract",
        dose: "100 mg",
        summary: "Bitter cone that works with valerian and supports deeper sleep architecture.",
        halls: ["Cellular Renewal", "Inflammatory Balance"],
        details: "Humulone and lupulone in hops appear to enhance the activity of GABA, working synergistically with Valerian."
    },
    {
        name: "Apigenin",
        dose: "50 mg",
        summary: "Chamomile derived flavonoid that interacts with GABA receptors and is studied for sleep and autophagy.",
        halls: ["Autophagy", "Cellular Renewal", "Genomic Stability"],
        details: "Apigenin inhibits CD38, potentially boosting NAD+ levels, and modulates GABA receptors for sleep induction."
    },
    {
        name: "Luteolin",
        dose: "50 mg",
        summary: "Polyphenol with antioxidant and microglial calming properties that helps maintain healthy inflammatory responses.",
        halls: ["Inflammatory Balance", "Genomic Stability", "Autophagy"],
        details: "Luteolin is a potent inhibitor of microglial activation and pro-inflammatory cytokines, supporting neuroprotection."
    },
    {
        name: "Lithium Orotate",
        dose: "50 mg",
        summary: "Trace dose lithium salt explored for neuroprotective and mood supporting effects in early research.",
        halls: ["Stem Cell Vitality", "Genomic Stability", "Mitochondrial Health"],
        details: "Micro-dose lithium may support BDNF (Brain Derived Neurotrophic Factor) and autophagy pathways in neurons."
    }
];

export function ScienceExplorer() {
    const [selectedHall, setSelectedHall] = useState<string | null>(null);
    const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);

    const filteredIngredients = selectedHall
        ? ingredients.filter(i => i.halls.includes(selectedHall))
        : ingredients;

    return (
        <div className="py-12 md:py-24 space-y-12">
            <div className="text-center max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Targeting 8 Key Hallmarks of Aging</h2>
                <p className="text-white/60 text-lg">DeepCell isn't just a sleep aid. It's a longevity protocol.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
                {/* Left Side: Hallmarks Menu */}
                <div className="lg:col-span-3 space-y-2">
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 px-2">Improved Hallmarks of Aging</h3>
                    {hallucinations.map((hall) => (
                        <button
                            key={hall}
                            onClick={() => setSelectedHall(selectedHall === hall ? null : hall)}
                            className={`w-full text-left px-4 py-3 rounded-full transition-all text-sm font-medium border ${selectedHall === hall
                                ? "bg-brand-purple text-white border-brand-purple shadow-brand-glow"
                                : "bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {hall}
                        </button>
                    ))}
                    {selectedHall && (
                        <button
                            onClick={() => setSelectedHall(null)}
                            className="text-xs text-white/40 hover:text-white mt-4 w-full text-center underline"
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
                                className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all ${expandedIngredient === ing.name ? 'row-span-2 bg-white/10' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-white text-lg">{ing.name}</h4>
                                    <span className="text-xs font-mono text-brand-copper bg-brand-copper/10 px-2 py-0.5 rounded">{ing.dose}</span>
                                </div>

                                <p className="text-sm text-white/70 mb-4 leading-relaxed">{ing.summary}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {ing.halls.map(h => (
                                        <Badge key={h} variant="outline" className={`text-[10px] ${selectedHall === h ? 'bg-brand-purple/20 border-brand-purple/40 text-brand-purple-100' : ''}`}>
                                            {h}
                                        </Badge>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setExpandedIngredient(expandedIngredient === ing.name ? null : ing.name)}
                                    className="text-xs font-semibold text-brand-copper hover:text-white flex items-center gap-1 mt-auto"
                                >
                                    {expandedIngredient === ing.name ? "Show less" : "Learn more"}
                                    {expandedIngredient === ing.name ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>

                                {expandedIngredient === ing.name && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 pt-4 border-t border-white/10 text-sm text-white/80"
                                    >
                                        {ing.details}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
