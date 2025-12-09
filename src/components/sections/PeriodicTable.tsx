"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, ChevronDown } from "lucide-react";
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
    | { type: "molecule"; data: Molecule; rowIndex: number }
    | { type: "hallmark"; data: Hallmark }
    | { type: "benefit"; data: Benefit };

export function PeriodicTable() {
    const [activeView, setActiveView] = useState<ActiveView>({ type: "none" });

    // Helper to check if a specific molecule is highlighted
    const isHighlighted = (molecule: Molecule) => {
        if (activeView.type === "molecule") return activeView.data.id === molecule.id;

        if (activeView.type === "hallmark") {
            return molecule.hallmarks.includes(activeView.data.id);
        }
        if (activeView.type === "benefit") {
            return molecule.benefits.includes(activeView.data.id);
        }
        return false;
    };

    const isDimmed = (molecule: Molecule) => {
        if (activeView.type === "none") return false;
        // If we are viewing a molecule detail, dim everything else
        if (activeView.type === "molecule") return activeView.data.id !== molecule.id;
        // Otherwise dim things that aren't highlighted
        return !isHighlighted(molecule);
    };

    return (
        <div className="relative w-full max-w-[1600px] mx-auto p-4 select-none">

            {/* Main Grid Container */}
            <div className="grid gap-2" style={{
                gridTemplateColumns: `150px repeat(${BENEFITS.length}, 1fr)`,
                // Dynamic rows: Header + (Hallmarks * (1 Row + Optional Expansion))
                // We handle expansion via Fragments and col-span-full
            }}>

                {/* Top Top Left (Empty) */}
                <div className="col-start-1 row-start-1" />

                {/* Sympathetic / Parasympathetic Axis Headers */}
                <div className="col-start-2 col-span-4 flex items-center justify-center pb-2 border-b border-white/10 mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Sympathetic (Action)</span>
                </div>
                <div className="col-start-6 col-span-4 flex items-center justify-center pb-2 border-b border-white/10 mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Parasympathetic (Rest)</span>
                </div>

                {/* X-Axis Headers: Benefits */}
                {BENEFITS.map((benefit, i) => (
                    <button
                        key={benefit.id}
                        style={{ gridColumnStart: i + 2, gridRowStart: 2 }}
                        onClick={() => setActiveView(activeView.type === 'benefit' && activeView.data.id === benefit.id ? { type: 'none' } : { type: "benefit", data: benefit })}
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
                        {/* Info Icon on Hover */}
                        <Info className="absolute -top-2 -right-2 w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}

                {/* Rows Loop */}
                {HALLMARKS.map((hallmark, rowIndex) => {
                    // Grid Row Index starts at 3 (1 = Sympathetic/Parasympathetic Labels, 2 = Benefits, 3 = First Hallmark)
                    // BUT, if we have expanded rows, CSS Grid alignment gets tricky if we rely on implicit flow.
                    // We must use explicit placement or flatten the structure. 
                    // To support "pushing away", we iterate and render rows.

                    // We will use a standard flex/grid wrapper per row if we weren't using a single big grid. 
                    // But since we want column alignment, we keep the single big grid.
                    // We just rely on auto-placement for the loop.
                    // Wait, auto-placement breaks if we inject full-width items in between.
                    // Actually, `col-span-full` works in CSS Grid to break to a new line and push content down.

                    const isExpanded = activeView.type === "molecule" && activeView.rowIndex === rowIndex;

                    return (
                        <div key={`row-group-${rowIndex}`} className="contents">
                            {/* Y-Axis Header */}
                            <button
                                onClick={() => setActiveView(activeView.type === 'hallmark' && activeView.data.id === hallmark.id ? { type: 'none' } : { type: "hallmark", data: hallmark })}
                                className={cn(
                                    "flex items-center justify-end text-right p-4 rounded-xl transition-all duration-300 relative group min-h-[100px]",
                                    "hover:bg-white/5",
                                    activeView.type === "hallmark" && activeView.data.id === hallmark.id ? "text-white bg-white/10 z-10" : "text-white/60 hover:text-white"
                                )}
                            >
                                <span className="text-xs font-medium leading-tight">{hallmark.label}</span>
                                <Info className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-50" />
                            </button>

                            {/* Molecule Cells for this Row */}
                            {BENEFITS.map((benefit, colIndex) => {
                                const index = rowIndex * 8 + colIndex;
                                const molecule = MOLECULES[index];

                                if (!molecule) return <div key={`empty-${index}`} className="opacity-10 bg-white/5 rounded-lg" />;

                                const isHighlightedState = isHighlighted(molecule);
                                const isSelected = activeView.type === "molecule" && activeView.data.id === molecule.id;

                                return (
                                    <motion.button
                                        key={molecule.id}
                                        layout
                                        onClick={() => isSelected ? setActiveView({ type: "none" }) : setActiveView({ type: "molecule", data: molecule, rowIndex })}
                                        className={cn(
                                            "relative rounded-lg p-2 flex items-center justify-center text-center transition-all duration-300 group",
                                            "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border",
                                            isSelected ? "z-20 scale-105 border-transparent ring-2 ring-white" : "border-white/5 hover:border-white/20 hover:scale-105 hover:z-20",
                                            isHighlightedState && !isSelected && "z-10 scale-105", // Highlighted but not selected
                                            isDimmed(molecule) && "opacity-20 blur-[1px] scale-95 grayscale"
                                        )}
                                    >
                                        {/* Rainbow Border for Highlighted Items */}
                                        {isHighlightedState && !isSelected && (
                                            <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 -z-10 animate-gradient-xy opacity-100" />
                                        )}

                                        <div className={cn(
                                            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                                            BENEFIT_COLORS[benefit.id]
                                        )} />

                                        <span className="text-[10px] md:text-xs font-medium text-white/90 leading-tight line-clamp-2">
                                            {molecule.name}
                                        </span>
                                    </motion.button>
                                );
                            })}

                            {/* Expansion Panel (Inserted Row) */}
                            <AnimatePresence>
                                {isExpanded && activeView.type === "molecule" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="col-span-full mx-4 my-2 overflow-hidden"
                                    >
                                        <div className="bg-[#1a1a1e] border border-white/10 rounded-2xl p-6 md:p-8 flex gap-8 shadow-2xl relative">

                                            {/* Close Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveView({ type: "none" }); }}
                                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-baseline gap-4 mb-2">
                                                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                                        {activeView.data.name}
                                                    </h2>
                                                    <span className="text-white/40 font-mono text-sm">#{MOLECULES.findIndex(m => m.id === activeView.data.id) + 1}</span>
                                                </div>

                                                <p className="text-xl text-white/80 leading-relaxed max-w-3xl mb-6">
                                                    {activeView.data.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-4">
                                                    {activeView.data.benefits.map(bId => {
                                                        const ben = BENEFITS.find(b => b.id === bId);
                                                        if (!ben) return null;
                                                        return (
                                                            <span key={bId} className={cn(
                                                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-black/20",
                                                                BORDER_COLORS[bId],
                                                                "text-white"
                                                            )}>
                                                                {ben.label}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Hallmarks List (Right Side) */}
                                            <div className="w-1/3 border-l border-white/10 pl-8 flex flex-col justify-center">
                                                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Targeted Hallmarks</h4>
                                                <div className="space-y-2">
                                                    {activeView.data.hallmarks.map(hId => {
                                                        const h = HALLMARKS.find(i => i.id === hId);
                                                        if (!h) return null;
                                                        return (
                                                            <div key={hId} className="flex items-center gap-2 text-sm text-white/70">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-copper" />
                                                                {h.label}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Overlays for Benefits/Hallmarks Details (Still using modal for these as they are axis-level) */}
            <AnimatePresence>
                {(activeView.type === "benefit" || activeView.type === "hallmark") && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none"
                    >
                        <div className="bg-[#1a1a1e]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl text-center pointer-events-auto">
                            <h3 className={cn(
                                "text-2xl font-bold mb-2",
                                activeView.type === "benefit" ? "text-brand-copper" : "text-brand-purple-100"
                            )}>
                                {activeView.data.label}
                            </h3>
                            <p className="text-white/80 leading-relaxed mb-4">
                                {activeView.data.description}
                            </p>
                            <button
                                onClick={() => setActiveView({ type: "none" })}
                                className="text-sm font-semibold text-white/40 hover:text-white transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
