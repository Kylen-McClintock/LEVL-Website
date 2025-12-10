"use client";

import { useState, useRef, useEffect } from "react";
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
    | { type: "molecule"; data: Molecule; rowIndex: number }
    | { type: "hallmark"; data: Hallmark }
    | { type: "benefit"; data: Benefit };

export function PeriodicTable() {
    const [activeView, setActiveView] = useState<ActiveView>({ type: "none" });
    const [geekMode, setGeekMode] = useState(false);

    // Click outside handler
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            // If the click target is the background/body or outside our interactive elements, close active view
            // However, implementing precise "click outside" for complex grid is tough.
            // Easier approach: The Grid Container itself handles the "Close" action, 
            // and all interactive children stopPropagation.
        };
        // We will implement this via the Container onClick in JSX.
    }, []);

    // Function to generate dynamic 2D gradient specific to the grid
    // Matches the Functional Benefit headers: Energy (Orange) -> ... -> Sleep (Teal)
    // Traverses counter-clockwise: Orange -> Red -> Pink -> Purple -> Blue -> Teal
    const getCellColor = (row: number, col: number) => {
        const startHue = 45; // Amber/Gold (Energy)
        const hueStepX = -32; // Color headers logic
        const hueStepY = -6;  // ~10 degree angle (tan(10) * 32)

        const hue = startHue + (col * hueStepX) + (row * hueStepY);
        return `hsl(${hue}, 90%, 65%)`; // High saturation, good legibility lightness
    };

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
        <div
            className="relative w-full max-w-[1600px] mx-auto p-4 select-none min-h-screen flex flex-col justify-center"
            onClick={() => setActiveView({ type: "none" })} // Click background to close
        >

            {/* Main Grid Container */}
            <div
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `150px repeat(${BENEFITS.length}, 1fr)`,
                }}
            // Removed stopPropagation here so clicks on grid gaps close the view
            >
                {/* Actually, if I click a GAP in the grid, it bubbles to Container -> Close. Good. */}
                {/* If I click a BUTTON, I need stopPropagation. */}

                {/* Row 1: Top Headers (Nervous System) + Top Left Title */}
                <div className="col-start-1 row-start-1 flex items-end justify-end p-2 pb-4">
                    <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-teal-400 uppercase tracking-widest text-right leading-relaxed">
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

                {/* Spacer for Col 1 Row 2 to prevent Hallmark Header from floating up */}
                <div className="col-start-1 row-start-2" />

                {BENEFITS.map((benefit, i) => (
                    <button
                        key={benefit.id}
                        style={{ gridColumnStart: i + 2, gridRowStart: 2 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveView(activeView.type === 'benefit' && activeView.data.id === benefit.id ? { type: 'none' } : { type: "benefit", data: benefit })
                        }}
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
                            onClick={(e) => e.stopPropagation()} // Clicking inside panel shouldn't close it
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

                {HALLMARKS.map((hallmark, rowIndex) => {
                    const isExpanded = activeView.type === "molecule" && activeView.rowIndex === rowIndex;
                    const isHallmarkExpanded = activeView.type === "hallmark" && activeView.data.id === hallmark.id;

                    // Hallmark Label Color: Match the start of the row (Col 0 approx)
                    const labelColor = getCellColor(rowIndex, 0);

                    return (
                        <div key={`row-group-${rowIndex}`} className="contents">
                            {/* Hallmark Header */}
                            <button
                                style={{ gridColumn: "1" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveView(activeView.type === 'hallmark' && activeView.data.id === hallmark.id ? { type: 'none' } : { type: "hallmark", data: hallmark })
                                }}
                                className={cn(
                                    "flex items-center justify-end text-right p-4 rounded-xl transition-all duration-300 relative group min-h-[100px] h-full",
                                    "hover:bg-white/5",
                                    activeView.type === "hallmark" && activeView.data.id === hallmark.id ? "bg-white/10 z-10" : "hover:bg-white/5"
                                )}
                            >
                                <span
                                    className="text-xs font-bold leading-tight uppercase tracking-wide transition-colors duration-300"
                                    style={{ color: labelColor }}
                                >
                                    {hallmark.label}
                                </span>
                                <Info className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-50 text-white" />
                            </button>

                            {/* Hallmark Expansion Panel (Immediate) */}
                            {isHallmarkExpanded && (
                                <div
                                    className="col-span-full mx-4 my-2 p-6 bg-[#1a1a1e] border border-brand-purple/30 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
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
                                // Standard Index Logic (Row-Major)
                                // Row 0: 0-7 (Fullerene to GABA)
                                // Row 1: 8-15 (Astragalus...)
                                const moleculeIndex = rowIndex * 8 + colIndex;

                                const molecule = moleculeIndex >= 0 ? MOLECULES[moleculeIndex] : null;

                                // Calc Color for this specific cell
                                const cellColor = getCellColor(rowIndex, colIndex);

                                if (!molecule) return (
                                    <div
                                        key={`empty-${rowIndex}-${colIndex}`}
                                        className="opacity-10 bg-white/5 rounded-lg min-h-[100px] h-full w-full"
                                    // Make sure even empty cells propagate clicks to close? Yes, it's non-interactive
                                    />
                                );

                                const isHighlightedState = isHighlighted(molecule);
                                const isSelected = activeView.type === "molecule" && activeView.data.id === molecule.id;

                                return (
                                    <motion.button
                                        key={molecule.id}
                                        layout
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            isSelected ? setActiveView({ type: "none" }) : setActiveView({ type: "molecule", data: molecule, rowIndex })
                                        }}
                                        className={cn(
                                            "relative rounded-lg p-2 flex items-center justify-center text-center transition-all duration-300 group min-h-[100px] h-full w-full",
                                            "backdrop-blur-sm border", // Keep border for structure, color will be dynamic
                                            isSelected
                                                ? "z-20 scale-105"
                                                : "hover:scale-105 hover:z-20",
                                            isDimmed(molecule) && "opacity-20 blur-[1px] scale-95 grayscale"
                                        )}
                                        style={{
                                            borderColor: isSelected || isHighlightedState ? cellColor : "rgba(255,255,255,0.1)",
                                            backgroundColor: isSelected ? "rgba(255,255,255,0.05)" : "transparent",
                                            boxShadow: isSelected || isHighlightedState ? `0 0 20px ${cellColor}` : "none",
                                        }}
                                    >
                                        {/* Inner Content Background */}
                                        <div className="absolute inset-[1px] rounded-[7px] bg-[#0a0a0a] z-[-1]" />

                                        {/* We can also tint the background slightly with the cell color on hover */}
                                        <div
                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"
                                            style={{ backgroundColor: cellColor }}
                                        />

                                        <span className="text-[10px] md:text-xs font-medium text-white/90 leading-tight line-clamp-2 relative z-10">
                                            {molecule.name}
                                        </span>

                                        {/* Always visible colored border? Or only on Highlight? 
                                            User said: "This is the rainbow gradient i meant for the cards". 
                                            Usually implies the grid ITSELF is the rainbow. 
                                            So let's make the border ALWAYS have the color, but maybe dimmer when not active? 
                                        */}
                                        <div
                                            className="absolute inset-0 rounded-lg border-2 pointer-events-none transition-opacity duration-300"
                                            style={{
                                                borderColor: cellColor,
                                                opacity: isSelected || isHighlightedState ? 1 : 0.4
                                            }}
                                        />

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
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="bg-[#1a1a1e] border border-white/10 rounded-2xl p-6 md:p-8 flex gap-8 shadow-2xl relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveView({ type: "none" }); setGeekMode(false); }}
                                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            {/* Hallmarks List (Left) */}
                                            <div className="w-1/4 border-r border-white/10 pr-8 flex flex-col justify-between text-right md:text-left">
                                                <div>
                                                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Targeted Hallmarks</h4>
                                                    <div className="space-y-2 mb-8">
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

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setGeekMode(!geekMode); }}
                                                    className={cn(
                                                        "flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border",
                                                        geekMode
                                                            ? "bg-brand-purple/20 border-brand-purple text-brand-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                                                    )}
                                                >
                                                    {geekMode ? "Geek Mode: ON" : "Geek Mode: OFF"}
                                                </button>
                                            </div>

                                            {/* Content (Right) */}
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-baseline gap-4 mb-2">
                                                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                                        {activeView.data.name}
                                                    </h2>
                                                    <span className="text-white/40 font-mono text-sm">#{MOLECULES.findIndex(m => m.id === activeView.data.id) + 1}</span>
                                                </div>

                                                <div className="relative min-h-[150px]">
                                                    <AnimatePresence mode="wait">
                                                        {geekMode ? (
                                                            <motion.div
                                                                key="geek"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="space-y-6"
                                                            >
                                                                <div className="prose prose-invert prose-sm max-w-none">
                                                                    <p className="text-lg text-white/90 leading-relaxed">
                                                                        {activeView.data.geekModeText || "Geek mode content coming soon..."}
                                                                    </p>
                                                                </div>

                                                                {activeView.data.sources && activeView.data.sources.length > 0 && (
                                                                    <div className="pt-4 border-t border-white/10">
                                                                        <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Sources</h5>
                                                                        <ul className="space-y-1">
                                                                            {activeView.data.sources.map((source, idx) => (
                                                                                <li key={idx} className="text-xs text-white/50 font-mono break-all">
                                                                                    {source}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="normal"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                            >
                                                                <p className="text-xl text-white/80 leading-relaxed max-w-3xl mb-6">
                                                                    {activeView.data.detailedDescription || activeView.data.description}
                                                                </p>

                                                                {activeView.data.synergies && activeView.data.synergies.length > 0 && (
                                                                    <div className="mb-6 bg-white/5 rounded-lg p-4 border border-white/5">
                                                                        <h5 className="text-xs font-bold text-brand-copper uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                            <span className="w-1 h-1 rounded-full bg-brand-copper" />
                                                                            Synergizes With
                                                                        </h5>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {activeView.data.synergies.map((syn, idx) => (
                                                                                <span key={idx} className="text-sm text-white/70 bg-black/20 px-2 py-1 rounded">
                                                                                    {syn}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Benefits Tags (Always Visible) */}
                                                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
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
