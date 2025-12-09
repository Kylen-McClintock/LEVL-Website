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
        if (activeView.type === "molecule") return activeView.data.id !== molecule.id;
        return !isHighlighted(molecule);
    };

    return (
        <div className="relative w-full max-w-[1600px] mx-auto p-4 select-none">

            {/* Main Grid Container */}
            <div className="grid gap-2" style={{
                gridTemplateColumns: `150px repeat(${BENEFITS.length}, 1fr)`,
            }}>

                {/* Row 1: Top Headers (Nervous System) + Top Left Title */}
                <div className="col-start-1 row-start-1 flex items-end justify-end p-2 pb-4">
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest text-right leading-relaxed">
                        Hallmarks<br />of Aging
                    </span>
                </div>

                {/* Sympathetic (Cols 1-3) -> Grid Cols 2-4 */}
                <div className="hidden md:flex col-start-2 col-span-3 items-center justify-center pb-2 border-b border-white/10 mb-2 relative">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-copper font-bold">Sympathetic (Action)</span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-copper to-transparent opacity-50" />
                </div>

                {/* Neutral (Cols 4-5) -> Grid Cols 5-6 */}
                <div className="col-start-5 col-span-2" />

                {/* Parasympathetic (Cols 6-8) -> Grid Cols 7-9 */}
                <div className="hidden md:flex col-start-7 col-span-3 items-center justify-center pb-2 border-b border-white/10 mb-2 relative">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-cyan font-bold">Parasympathetic (Rest)</span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-50" />
                </div>


                {/* Row 2: Benefit Headers */}
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
                            "text-xs md:text-sm font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-br",
                            BENEFIT_COLORS[benefit.id]
                        )}>
                            {benefit.label}
                        </span>
                        <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50", BENEFIT_COLORS[benefit.id])} />
                        {/* Info Icon on Hover */}
                        <Info className="absolute -top-2 -right-2 w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}

                {/* Benefit Expansion Panel (Row 3, causing push) */}
                <AnimatePresence>
                    {activeView.type === "benefit" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="col-span-full mx-4 my-4 overflow-hidden order-last md:order-none"
                            style={{ gridRowStart: 3 }}
                        >
                            <div className="bg-[#1a1a1e] border border-white/10 rounded-2xl p-6 md:p-8 flex gap-8 shadow-2xl relative border-t-4" style={{ borderColor: activeView.data.id === 'energy' ? '#f59e0b' : 'rgba(255,255,255,0.1)' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveView({ type: "none" }); }}
                                    className="absolute top-4 right-4 p-2 text-white/40 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex flex-col items-center text-center w-full">
                                    <h2 className={cn("text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br", BENEFIT_COLORS[activeView.data.id])}>
                                        {activeView.data.label}
                                    </h2>
                                    <p className="text-xl text-white/80 max-w-2xl">{activeView.data.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Data Rows (Starting Row 3 or 4 depending on expansion) */}
                {/* Note: We rely on CSS Grid auto-placement for rows, but we need to account for the Benefit Expansion Panel taking up a visual "row" slot if active. */}
                {/* Actually, explicitly setting row start is safer. Benefit Header is Row 2. Benefit Panel is Row 3. First Data Row is 4. */}

                {HALLMARKS.map((hallmark, rowIndex) => {
                    // Offset for Rows: 1 (Labels) + 1 (Headers) + 1 (Benefit Panel Placeholder) = 3.
                    // So data starts at 4?
                    // If benefit is open, it pushes flow content. But utilizing `contents` wrapper and explicit placement helps.

                    const isExpanded = activeView.type === "molecule" && activeView.rowIndex === rowIndex;
                    const isHallmarkExpanded = activeView.type === "hallmark" && activeView.data.id === hallmark.id;

                    return (
                        <div key={`row-group-${rowIndex}`} className="contents">
                            {/* Hallmark Header */}
                            <button
                                style={{ gridColumn: "1" }}
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

                            {/* Hallmark Expansion Panel (Immediate) */}
                            {isHallmarkExpanded && (
                                <div className="col-span-full mx-4 my-2 p-6 bg-[#1a1a1e] border border-brand-purple/30 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveView({ type: "none" }); }}
                                        className="absolute top-4 right-4 p-2 text-white/40 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-white mb-2">{hallmark.label}</h3>
                                        <p className="text-lg text-white/70 max-w-3xl">{hallmark.description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Molecule Cells */}
                            {BENEFITS.map((benefit, colIndex) => {
                                // SHIFT LOGIC:
                                // If Row 0 (Genomic Instability), we shift +1.
                                // So Col 0 displays nothing? Col 1 displays Index 0?
                                // Regular: index = rowIndex * 8 + colIndex

                                let moleculeIndex = -1;

                                if (rowIndex === 0) {
                                    // Row 0 Shift:
                                    // Col 0 -> Empty
                                    // Col 1 -> Index 0
                                    if (colIndex === 0) {
                                        moleculeIndex = -1; // Empty
                                    } else {
                                        moleculeIndex = 0 * 8 + (colIndex - 1);
                                    }
                                } else {
                                    // Normal
                                    moleculeIndex = rowIndex * 8 + colIndex;
                                }

                                const molecule = moleculeIndex >= 0 ? MOLECULES[moleculeIndex] : null;

                                if (!molecule) return <div key={`empty-${rowIndex}-${colIndex}`} className="opacity-10 bg-white/5 rounded-lg" />;

                                const isHighlightedState = isHighlighted(molecule);
                                const isSelected = activeView.type === "molecule" && activeView.data.id === molecule.id;

                                return (
                                    <motion.button
                                        key={molecule.id}
                                        layout
                                        onClick={() => isSelected ? setActiveView({ type: "none" }) : setActiveView({ type: "molecule", data: molecule, rowIndex })}
                                        className={cn(
                                            "relative rounded-lg p-2 flex items-center justify-center text-center transition-all duration-300 group",
                                            "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm",
                                            isSelected
                                                ? "z-20 scale-105 border-transparent ring-0"
                                                : "border border-white/5 hover:border-transparent hover:scale-105 hover:z-20",
                                            isDimmed(molecule) && "opacity-20 blur-[1px] scale-95 grayscale"
                                        )}
                                    >
                                        {/* Rainbow Border for Selection / Highlight / Hover */}
                                        {/* We want rainbow on Hover OR Highlight OR Selection */}
                                        <div className={cn(
                                            "absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 -z-10 animate-gradient-xy transition-opacity duration-300",
                                            isSelected || isHighlightedState ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )} />

                                        {/* Inner Content Background (to cover the center of the rainbow border) */}
                                        <div className="absolute inset-[1px] rounded-[7px] bg-[#0a0a0a] z-[-1]" />

                                        <div className={cn(
                                            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br rounded-lg",
                                            BENEFIT_COLORS[benefit.id]
                                        )} />

                                        <span className="text-[10px] md:text-xs font-medium text-white/90 leading-tight line-clamp-2 relative z-10">
                                            {molecule.name}
                                        </span>
                                    </motion.button>
                                );
                            })}

                            {/* Molecule Expansion Panel */}
                            <AnimatePresence>
                                {isExpanded && activeView.type === "molecule" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="col-span-full mx-4 my-2 overflow-hidden"
                                    >
                                        <div className="bg-[#1a1a1e] border border-white/10 rounded-2xl p-6 md:p-8 flex gap-8 shadow-2xl relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveView({ type: "none" }); }}
                                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            {/* Hallmarks List (Left) */}
                                            <div className="w-1/4 border-r border-white/10 pr-8 flex flex-col justify-center text-right md:text-left">
                                                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Targeted Hallmarks</h4>
                                                <div className="space-y-2">
                                                    {activeView.data.hallmarks.map(hId => {
                                                        const h = HALLMARKS.find(i => i.id === hId);
                                                        if (!h) return null;
                                                        return (
                                                            <div key={hId} className="flex items-center gap-2 text-sm text-white/70 justify-end md:justify-start">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-copper shrink-0" />
                                                                {h.label}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Content (Right) */}
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

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
