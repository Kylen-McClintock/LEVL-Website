"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { HALLMARKS, BENEFITS, MOLECULES, Hallmark, Benefit, Molecule } from "@/data/periodicTableData";
import { cn } from "@/lib/utils";

// Color mapping for Functional Benefits (Columns)
const BENEFIT_COLORS: Record<string, string> = {
    energy: "from-amber-400 to-orange-500",
    cognition: "from-orange-400 to-red-500",
    focus: "from-red-400 to-pink-500",
    metabolism: "from-pink-400 to-purple-500",
    immunity: "from-purple-400 to-indigo-500",
    recovery: "from-indigo-400 to-blue-500",
    calm: "from-blue-400 to-cyan-500",
    sleep: "from-cyan-400 to-teal-500",
};

const BORDER_COLORS: Record<string, string> = {
    energy: "border-orange-500/50",
    cognition: "border-red-500/50",
    focus: "border-pink-500/50",
    metabolism: "border-purple-500/50",
    immunity: "border-indigo-500/50",
    recovery: "border-blue-500/50",
    calm: "border-cyan-500/50",
    sleep: "border-teal-500/50",
};

type ActiveView =
    | { type: "none" }
    | { type: "molecule"; data: Molecule }
    | { type: "hallmark"; data: Hallmark }
    | { type: "benefit"; data: Benefit };

export function PeriodicTable() {
    const [activeView, setActiveView] = useState<ActiveView>({ type: "none" });

    // Helper to find molecule at intersection
    // This is computationally cheap for 96 items
    const getMoleculeAt = (hallmarkId: string, benefitId: string) => {
        return MOLECULES.find(
            (m) => m.hallmarks.includes(hallmarkId) && m.benefits.includes(benefitId)
        );
    };

    // Derived state for highlighting
    const highlightedMolecules = useMemo(() => {
        if (activeView.type === "hallmark") {
            return MOLECULES.filter((m) => m.hallmarks.includes(activeView.data.id)).map(m => m.id);
        }
        if (activeView.type === "benefit") {
            return MOLECULES.filter((m) => m.benefits.includes(activeView.data.id)).map(m => m.id);
        }
        return [];
    }, [activeView]);

    const isDimmed = (moleculeId: string) => {
        if (activeView.type === "none" || activeView.type === "molecule") return false;
        return !highlightedMolecules.includes(moleculeId);
    };

    return (
        <div className="relative w-full max-w-[1600px] mx-auto p-4 select-none">

            {/* Main Grid Container */}
            <div className="grid gap-2" style={{
                gridTemplateColumns: `150px repeat(${BENEFITS.length}, 1fr)`,
                gridTemplateRows: `auto repeat(${HALLMARKS.length}, 1fr)`
            }}>

                {/* Corner (Empty) */}
                <div className="row-start-1 col-start-1" />

                {/* X-Axis Headers: Benefits */}
                {BENEFITS.map((benefit) => (
                    <button
                        key={benefit.id}
                        onClick={() => setActiveView({ type: "benefit", data: benefit })}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                            "hover:bg-white/5 active:scale-95",
                            activeView.type === "benefit" && activeView.data.id === benefit.id ? "ring-2 ring-white scale-105 z-10 bg-white/10" : ""
                        )}
                    >
                        <span className={cn(
                            "text-sm font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-br",
                            BENEFIT_COLORS[benefit.id]
                        )}>
                            {benefit.label}
                        </span>
                        <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50", BENEFIT_COLORS[benefit.id])} />
                    </button>
                ))}

                {/* Y-Axis Headers: Hallmarks */}
                {HALLMARKS.map((hallmark, rowIndex) => (
                    <button
                        key={hallmark.id}
                        style={{ gridRowStart: rowIndex + 2, gridColumnStart: 1 }}
                        onClick={() => setActiveView({ type: "hallmark", data: hallmark })}
                        className={cn(
                            "flex items-center justify-end text-right p-4 rounded-xl transition-all duration-300 relative group",
                            "hover:bg-white/5",
                            activeView.type === "hallmark" && activeView.data.id === hallmark.id ? "text-white bg-white/10 z-10" : "text-white/60 hover:text-white"
                        )}
                    >
                        <span className="text-xs font-medium leading-tight">{hallmark.label}</span>
                    </button>
                ))}

                {/* Molecule Cells */}
                {HALLMARKS.map((hallmark, rowIndex) => (
                    BENEFITS.map((benefit, colIndex) => {
                        const molecule = getMoleculeAt(hallmark.id, benefit.id);
                        if (!molecule) return <div key={`${rowIndex}-${colIndex}`} className="bg-white/5 rounded-lg opacity-20" />;

                        return (
                            <motion.button
                                key={molecule.id}
                                layoutId={`molecule-${molecule.id}`}
                                style={{ gridRowStart: rowIndex + 2, gridColumnStart: colIndex + 2 }}
                                onClick={() => setActiveView({ type: "molecule", data: molecule })}
                                className={cn(
                                    "relative aspect-[4/3] rounded-lg p-2 flex items-center justify-center text-center transition-all duration-300 group",
                                    "border border-white/5 hover:border-white/20 hover:scale-105 hover:z-20",
                                    "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm",
                                    isDimmed(molecule.id) && "opacity-20 blur-[1px] scale-95 grayscale",
                                    activeView.type === "benefit" && activeView.data.id === benefit.id && "ring-1 ring-white/50 bg-white/10",
                                    activeView.type === "hallmark" && activeView.data.id === hallmark.id && "ring-1 ring-white/50 bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                                    BENEFIT_COLORS[benefit.id]
                                )} />
                                <span className="text-[10px] md:text-xs font-medium text-white/90 leading-tight line-clamp-2">
                                    {molecule.name}
                                </span>
                            </motion.button>
                        );
                    })
                ))}
            </div>

            {/* Overlay Detail View */}
            <AnimatePresence>
                {activeView.type !== "none" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setActiveView({ type: "none" })}
                    >
                        <motion.div
                            layoutId={activeView.type === "molecule" ? `molecule-${activeView.data.id}` : undefined}
                            className="relative w-full max-w-3xl bg-[#0f0f11] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveView({ type: "none" })}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Molecule Detail */}
                            {activeView.type === "molecule" && (
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br text-2xl font-bold text-white",
                                            BENEFIT_COLORS[activeView.data.benefits[0]] // Use primary benefit color
                                        )}>
                                            {activeView.data.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-bold text-white mb-1">{activeView.data.name}</h2>
                                            <div className="flex gap-2">
                                                {activeView.data.benefits.map(bId => {
                                                    const b = BENEFITS.find(i => i.id === bId);
                                                    return b ? <span key={b.id} className="text-sm text-brand-copper uppercase tracking-wider font-semibold">{b.label}</span> : null;
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                                        {activeView.data.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mt-4">
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Functional Benefits</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeView.data.benefits.map(id => {
                                                    const item = BENEFITS.find(b => b.id === id);
                                                    return item ? (
                                                        <span key={id} className={cn(
                                                            "px-3 py-1.5 rounded-full text-sm font-medium border bg-white/5 text-white",
                                                            BORDER_COLORS[id]
                                                        )}>
                                                            {item.label}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Targeted Hallmarks</h4>
                                            <div className="flex flex-col gap-2">
                                                {activeView.data.hallmarks.map(id => {
                                                    const item = HALLMARKS.find(h => h.id === id);
                                                    return item ? (
                                                        <div key={id} className="flex items-center gap-2 text-white/80">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                                            {item.label}
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Category Detail (Benefit or Hallmark) */}
                            {(activeView.type === "benefit" || activeView.type === "hallmark") && (
                                <div className="flex flex-col gap-6 text-center items-center">
                                    <div className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center bg-white/5 mb-2",
                                        activeView.type === "benefit" ? "text-brand-copper" : "text-brand-purple-100"
                                    )}>
                                        <Info className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-bold text-white">
                                        {activeView.data.label}
                                    </h2>
                                    <p className="text-xl text-white/80 max-w-2xl">
                                        {activeView.data.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/5 text-sm text-white/50">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Highlighting {activeView.type === "benefit" ? "Molecules in this Column" : "Molecules in this Row"}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
