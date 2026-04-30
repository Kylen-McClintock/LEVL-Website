"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid';
import { Activity, Moon, SunMoon, Dna, BrainCircuit, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScienceMechanismSection() {
    const [showReferences, setShowReferences] = useState(false);
    const [showAllMechanisms, setShowAllMechanisms] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    return (
        <section className="py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden relative">
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-[1.25] z-0"
            >
                <source src="/videos/levl-background-footage.mp4" type="video/mp4" />
            </video>

            {/* Opacity filter over video */}
            <div className="absolute inset-0 bg-[#0B0E17]/70 z-0 pointer-events-none" />

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 pointer-events-none bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_60%)] blur-[120px] z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] text-sm font-medium mb-6">
                        Core Biology
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto mb-4">
                        The Ultimate Sleep + Longevity Protocol
                    </h2>
                    <p className="text-xl text-[var(--color-levl-text-secondary)] font-medium max-w-2xl mx-auto">
                        The Science of Sleep Meets the Biology of Aging
                    </p>
                </div>

                <BentoGrid className="mb-12">
                    {/* Card 1 */}
                    <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-8 group hover:border-[var(--color-levl-cyan)]/50">
                                                <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Overnight Cellular Tuneup</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                            <p>
                                Deep sleep isn’t just rest—it’s when the <strong className="text-[var(--color-levl-cyan)]">glymphatic system</strong> flushes metabolic waste from the brain, including beta-amyloid, more efficiently than during wakefulness [1].
                            </p>
                            <p>
                                In parallel, <strong className="text-[var(--color-levl-cyan)]">autophagy</strong>—the cell’s recycling program—runs on a circadian timer and ramps with fasting cues, supporting mitochondrial cleanup and proteostasis overnight [2]. DeepCell is designed to work <em>with</em> these nocturnal processes.
                            </p>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </BentoCard>

                    {/* Card 2 */}
                    <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-green)]/50">
                                                <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-green)]">
                                <Moon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Deeper, More Restorative Sleep</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-green)]/20 pt-4">
                            <p>A calm nervous system → faster sleep onset and deeper stages.</p>
                            <ul className="space-y-2">
                                <li><strong className="text-[var(--color-levl-green)]">Magnesium glycinate</strong> improved sleep indices in a randomized, double-blind trial of adults with poor sleep [3].</li>
                                <li><strong className="text-[var(--color-levl-green)]">L-theanine</strong> increased relaxation biomarkers and supports sleep quality in controlled human studies [4].</li>
                                <li><strong className="text-[var(--color-levl-green)]">Lemon balm (Melissa officinalis)</strong> reduced anxiety and improved sleep measures in a randomized, placebo-controlled trial [5].</li>
                            </ul>
                            <p>Together, these actives promote balanced NREM/REM architecture without sedation.</p>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </BentoCard>

                                                {/* Card 3 */}
                            <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-magenta)]/50 ">
                                                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-magenta)]">
                                <SunMoon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Natural Melatonin Support</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-magenta)]/20 pt-4">
                                    <p>
                                        We support the pathway—<strong className="text-[var(--color-levl-magenta)]">not</strong> replace the hormone. <strong className="text-white">L-tryptophan</strong> is the dietary precursor to serotonin → melatonin, with <strong className="text-white">vitamin B6</strong> as a required cofactor in the conversion steps [6].
                                    </p>
                                    <p>
                                        <strong className="text-white">Zinc</strong> participates in enzymes governing melatonin synthesis and has been linked to better sleep quality in human data [7].
                                    </p>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                            </BentoCard>

                            {/* Card 4 */}
                            <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-cyan)]/50  ">
                                                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                                <Dna className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Nightly Cellular Rejuvenation</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                                    <p>DeepCell’s polyphenol stack targets longevity signaling linked to <strong className="text-[var(--color-levl-cyan)]">autophagy and AMPK</strong>:</p>
                                    <ul className="space-y-2">
                                        <li><strong className="text-[var(--color-levl-cyan)]">EGCG (green tea catechin)</strong> modulates <strong className="text-[var(--color-levl-cyan)]">AMPK/mTOR</strong> and has been shown to trigger autophagy in preclinical models [9]. A 12-month randomized study of matcha (EGCG-rich) in older adults reported sleep-quality improvements alongside cognitive measures [10].</li>
                                        <li><strong className="text-[var(--color-levl-cyan)]">Apigenin</strong> interacts with <strong className="text-white">GABA_A</strong> receptors and shows sedative effects in animals, with emerging links to healthy aging mechanisms [11].</li>
                                    </ul>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                            </BentoCard>

                            {/* Card 5 */}
                            <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-magenta)]/50  ">
                                                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-magenta)]">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Neuroprotection & Mood Resilience</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-magenta)]/20 pt-4">
                                    <p>
                                        Our <strong className="text-white">Lithium Orotate 50 mg</strong> capsule yields ~<strong className="text-white">2 mg elemental Li</strong>, a trace amount.
                                    </p>
                                    <p>
                                        <strong className="text-[var(--color-levl-magenta)]">Preclinical work (Nature, 2025)</strong> found that <strong className="text-white">low-dose lithium orotate</strong> avoided plaque binding and <strong className="text-white">reversed Alzheimer-like pathology and memory deficits in mice</strong>; human trials are the next step [12].
                                    </p>
                                    <p>
                                        Ecological and translational reviews also associate <strong className="text-white">low-dose lithium exposure</strong> with neuroprotective signals across cognition and mood [13].
                                    </p>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                            </BentoCard>

                            {/* Card 6 */}
                            <BentoCard colSpan={2} className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-green)]/50  ">
                                                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-green)]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white m-0">Non-Habit Forming</h3>
                        </div>
                        <AnimatePresence>
                            {showAllMechanisms && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-green)]/20 pt-4">
                                    <p>
                                        No sedatives. No tolerance spiral. We intentionally exclude high-dose melatonin and hypnotics that can impair next-day function or disrupt architecture.
                                    </p>
                                    <p>
                                        AASM guidance places <strong className="text-white">behavioral</strong> and non-sedative strategies first line and <strong className="text-[var(--color-levl-green)]">does not recommend melatonin</strong> for chronic insomnia in adults [8].
                                    </p>
                                    <p>
                                        DeepCell’s stack is <strong className="text-white">GMP-manufactured</strong>, <strong className="text-white">third-party tested</strong>, and formulated for nightly sustainability—so you wake clear, not groggy.
                                    </p>                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                            </BentoCard>
                </BentoGrid>

                {/* Show All Toggle Button */}
                <div className="flex justify-center mt-8 mb-12 relative z-20">
                    <button 
                        onClick={() => setShowAllMechanisms(!showAllMechanisms)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-md border border-[var(--color-levl-cyan)]/30 text-white font-medium hover:border-[var(--color-levl-cyan)] hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all group"
                    >
                        {showAllMechanisms ? "Collapse Protocol" : "View Full Protocol"}
                        {showAllMechanisms ? (
                            <ChevronUp className="w-4 h-4 text-[var(--color-levl-cyan)] group-hover:-translate-y-0.5 transition-transform" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-[var(--color-levl-cyan)] group-hover:translate-y-0.5 transition-transform" />
                        )}
                    </button>
                </div>

                {/* References Toggle */}
                <div className="max-w-4xl mx-auto mt-8 bg-black/30 backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--color-levl-cyan)]/30">
                    <button
                        onClick={() => setShowReferences(!showReferences)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <h3 className="text-xl font-bold text-white">Scientific Transparency (References & *Disclaimer)</h3>
                        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${showReferences ? "rotate-180" : ""}`}>
                            <ChevronDown className="w-5 h-5 text-white/50" />
                        </div>
                    </button>

                    <AnimatePresence>
                        {showReferences && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-6"
                            >
                                <div className="text-sm space-y-3 text-[var(--color-levl-text-secondary)] border-t border-[var(--color-levl-panel-border)] pt-6">
                                    <p>[1] Xie et al. <em className="italic">Science</em> (2013): Sleep markedly increases glymphatic clearance of brain metabolites. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PubMed</a></p>
                                    <p>[2] Wang et al. <em className="italic">Frontiers in Cell & Dev Bio</em> (2020): Circadian control of autophagy and its metabolic roles. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">Frontiers</a></p>
                                    <p>[3] Schuster et al. (2025) RCT: Magnesium <strong className="text-white">bis</strong>glycinate improved sleep quality in adults with poor sleep. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC</a></p>
                                    <p>[4] Evans et al. <em className="italic">Nutrients</em> (2021) RCT (L-theanine) + 2025 systematic review of L-theanine for sleep. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC+1</a></p>
                                    <p>[5] Bano et al. <em className="italic">Front Pharmacol</em> (2023): Melissa officinalis reduced distress and improved sleep vs. placebo. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PubMed</a></p>
                                    <p>[6] Kautz et al. (2024) review: Tryptophan→serotonin→melatonin pathway; B6 as cofactor. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC</a></p>
                                    <p>[7] Zinc–sleep evidence: mechanistic and human data review. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">MDPI</a></p>
                                    <p>[8] AASM Clinical Practice Guideline (2017): Suggest <strong className="text-white">not</strong> using melatonin for chronic insomnia in adults. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">AASM</a></p>
                                    <p>[9] Rahman et al. (2024) review: EGCG modulates AMPK/mTOR and autophagy; additional mechanistic support. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC</a></p>
                                    <p>[10] Uchida et al. <em className="italic">PLOS ONE</em> (2024) RCT: 12-month matcha intake improved sleep quality in older adults. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PLOS</a></p>
                                    <p>[11] Srivastava et al. (2010) review; Kramer et al. (2024) review: Apigenin binds GABA_A sites; sedative effects in animals. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC+1</a></p>
                                    <p>[12] Nature paper + news (2025): <strong className="text-white">Lithium orotate</strong> reversed AD-like pathology and memory deficits in mice; reduced plaque binding. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">Nature+1</a></p>
                                    <p>[13] Fraiha-Pegado et al. (2024) review: Trace lithium exposure and dementia risk; broader low-dose neuroprotection literature. <a href="#" className="underline hover:text-[var(--color-levl-cyan)]">PMC</a></p>

                                    <div className="mt-6 pt-4 border-t border-[var(--color-levl-panel-border)]">
                                        <p className="font-bold text-white mb-1">*Disclaimer</p>
                                        <p className="italic">“These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.”</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
