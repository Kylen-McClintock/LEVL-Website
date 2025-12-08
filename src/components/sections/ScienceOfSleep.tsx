"use client";

import { useState } from "react";
import { BentoCard } from "@/components/ui/BentoGrid";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const scienceContent = [
    {
        title: "Overnight Cellular Tuneup",
        content: (
            <>
                Deep sleep isn’t just rest—it’s when the <strong className="text-white">glymphatic system</strong> flushes metabolic waste from the brain,
                including beta-amyloid, more efficiently than during wakefulness [1]. In parallel, <strong className="text-white">autophagy</strong>—the cell’s
                recycling program—runs on a circadian timer and ramps with fasting cues, supporting mitochondrial
                cleanup and proteostasis overnight [2]. DeepCell is designed to work <em>with</em> these nocturnal processes.
            </>
        )
    },
    {
        title: "Deeper, More Restorative Sleep",
        content: (
            <>
                <p className="mb-4">A calm nervous system → faster sleep onset and deeper stages.</p>

                <p className="mb-2"><strong className="text-white">Magnesium glycinate</strong> improved sleep indices in a randomized, double-blind trial of adults with poor sleep [3].</p>

                <p className="mb-2"><strong className="text-white">L-theanine</strong> increased relaxation biomarkers and supports sleep quality in controlled human studies [4].</p>

                <p className="mb-4"><strong className="text-white">Lemon balm (Melissa officinalis)</strong> reduced anxiety and improved sleep measures in a randomized, placebo-controlled trial [5].</p>

                <p>Together, these actives promote balanced NREM/REM architecture without sedation.</p>
            </>
        )
    },
    {
        title: "Natural Melatonin Support (Melatonin-Free)",
        content: (
            <>
                <p className="mb-4">We support the pathway—<strong className="text-white">not</strong> replace the hormone. <strong className="text-white">L-tryptophan</strong> is the dietary precursor to serotonin → melatonin, with <strong className="text-white">vitamin B6</strong> as a required cofactor in the conversion steps [6]. <strong className="text-white">Zinc</strong> participates in enzymes governing melatonin synthesis and has been linked to better sleep quality in human data [7].</p>
            </>
        )
    },
    {
        title: "Nightly Cellular Rejuvenation Pathways",
        content: (
            <>
                <p className="mb-4">DeepCell’s polyphenol stack targets longevity signaling linked to <strong className="text-white">autophagy and AMPK</strong>:</p>

                <p className="mb-4"><strong className="text-white">EGCG (green tea catechin)</strong> modulates <strong className="text-white">AMPK/mTOR</strong> and has been shown to trigger autophagy in preclinical models [9]. A 12-month randomized study of matcha (EGCG-rich) in older adults reported sleep-quality improvements alongside cognitive measures [10].</p>

                <p className="mb-4"><strong className="text-white">Apigenin</strong> (the chamomile flavonoid) interacts with <strong className="text-white">GABA_A</strong> receptors and shows sedative effects in animals, with emerging links to healthy aging mechanisms [11].</p>

                <p>These are supportive, <strong className="text-white">non-sedating</strong> routes to overnight cellular upkeep.</p>
            </>
        )
    },
    {
        title: "Neuroprotection & Mood Resilience",
        content: (
            <>
                <p className="mb-4">Our <strong className="text-white">Lithium Orotate 50 mg</strong> capsule yields ~<strong className="text-white">2 mg elemental Li</strong>, a trace amount. <strong className="text-white">Preclinical work (Nature, 2025)</strong> found that <strong className="text-white">low-dose lithium orotate</strong> avoided plaque binding and <strong className="text-white">reversed Alzheimer-like pathology and memory deficits in mice</strong>; human trials are the next step [12]. Ecological and translational reviews also associate <strong className="text-white">low-dose lithium exposure</strong> with neuroprotective signals across cognition and mood [13].</p>
            </>
        )
    },
    {
        title: "Non-Habit Forming, Evidence-Aligned",
        content: (
            <>
                <p className="mb-4">No sedatives. No tolerance spiral. We intentionally exclude high-dose melatonin and hypnotics that can impair next-day function or disrupt architecture. AASM guidance places <strong className="text-white">behavioral</strong> and non-sedative strategies first line and <strong className="text-white">does not recommend melatonin</strong> for chronic insomnia in adults [8]. DeepCell’s stack is <strong className="text-white">GMP-manufactured</strong>, <strong className="text-white">third-party tested</strong>, and formulated for nightly sustainability—so you wake clear, not groggy.</p>
            </>
        )
    },
    {
        title: "Scientific Transparency (References & *Disclaimer)",
        content: (
            <div className="text-sm space-y-3 text-white/60">
                <p className="font-bold text-white mb-2">References</p>
                <p>[1] Xie et al. <em className="italic">Science</em> (2013): Sleep markedly increases glymphatic clearance of brain metabolites. <a href="#" className="underline hover:text-brand-copper">PubMed</a></p>
                <p>[2] Wang et al. <em className="italic">Frontiers in Cell & Dev Bio</em> (2020): Circadian control of autophagy and its metabolic roles. <a href="#" className="underline hover:text-brand-copper">Frontiers</a></p>
                <p>[3] Schuster et al. (2025) RCT: Magnesium <strong className="text-white">bis</strong>glycinate improved sleep quality in adults with poor sleep. <a href="#" className="underline hover:text-brand-copper">PMC</a></p>
                <p>[4] Evans et al. <em className="italic">Nutrients</em> (2021) RCT (L-theanine) + 2025 systematic review of L-theanine for sleep. <a href="#" className="underline hover:text-brand-copper">PMC+1</a></p>
                <p>[5] Bano et al. <em className="italic">Front Pharmacol</em> (2023): Melissa officinalis reduced distress and improved sleep vs. placebo. <a href="#" className="underline hover:text-brand-copper">PubMed</a></p>
                <p>[6] Kautz et al. (2024) review: Tryptophan→serotonin→melatonin pathway; B6 as cofactor. <a href="#" className="underline hover:text-brand-copper">PMC</a></p>
                <p>[7] Zinc–sleep evidence: mechanistic and human data review. <a href="#" className="underline hover:text-brand-copper">MDPI</a></p>
                <p>[8] AASM Clinical Practice Guideline (2017): Suggest <strong className="text-white">not</strong> using melatonin for chronic insomnia in adults. <a href="#" className="underline hover:text-brand-copper">AASM</a></p>
                <p>[9] Rahman et al. (2024) review: EGCG modulates AMPK/mTOR and autophagy; additional mechanistic support. <a href="#" className="underline hover:text-brand-copper">PMC</a></p>
                <p>[10] Uchida et al. <em className="italic">PLOS ONE</em> (2024) RCT: 12-month matcha intake improved sleep quality in older adults. <a href="#" className="underline hover:text-brand-copper">PLOS</a></p>
                <p>[11] Srivastava et al. (2010) review; Kramer et al. (2024) review: Apigenin binds GABA_A sites; sedative effects in animals. <a href="#" className="underline hover:text-brand-copper">PMC+1</a></p>
                <p>[12] Nature paper + news (2025): <strong className="text-white">Lithium orotate</strong> reversed AD-like pathology and memory deficits in mice; reduced plaque binding. <a href="#" className="underline hover:text-brand-copper">Nature+1</a></p>
                <p>[13] Fraiha-Pegado et al. (2024) review: Trace lithium exposure and dementia risk; broader low-dose neuroprotection literature. <a href="#" className="underline hover:text-brand-copper">PMC</a></p>

                <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="font-bold text-white mb-1">*Disclaimer</p>
                    <p className="italic">“These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.”</p>
                </div>
            </div>
        )
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
