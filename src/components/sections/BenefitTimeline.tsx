import { BentoCard } from "@/components/ui/BentoGrid";
import { Clock, Calendar, CheckCircle, Zap } from "lucide-react";
import Image from "next/image";

const timelineItems = [
    {
        icon: Clock,
        time: "Tonight",
        stats: [
            "89% fell asleep faster",
            "87% increased next day energy"
        ],
        points: [
            "Fall asleep faster and feel calmer",
            "Wake with a clear head instead of a melatonin hangover"
        ]
    },
    {
        icon: Calendar,
        time: "1 Week",
        stats: [
            "96% improved sleep score"
        ],
        points: [
            "More consistent sleep schedule",
            "Deeper, more restorative sleep"
        ]
    },
    {
        icon: CheckCircle,
        time: "1 Month",
        stats: [
            "92% improved HRV Recovery & Readiness"
        ],
        points: [
            "Support for autophagy & mitochondrial function",
            "Improved recovery from training and long days"
        ]
    },
    {
        icon: Zap,
        time: "Long Term",
        stats: [],
        points: [
            "Supports Healthy Brain Aging",
            "Supports Cellular Rejuvenation"
        ]
    }
];

export function BenefitTimeline() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Image / Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_60%)] blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Better Nights. More Tomorrows.
                    </h2>
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] text-sm font-medium text-[var(--color-levl-text-secondary)]">
                        PhD Formulated • Physician Approved • Science Led Longevity
                    </div>
                </div>

                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-levl-cyan)]/30 to-transparent" />
                    {/* Connection Line (Mobile) */}
                    <div className="md:hidden absolute left-[2.25rem] top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[var(--color-levl-cyan)]/30 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                        {timelineItems.map((item, i) => {
                            // Assign a specific color to each step for visual interest
                            const colors = ['var(--color-levl-cyan)', 'var(--color-levl-green)', 'var(--color-levl-magenta)', 'var(--color-levl-cyan)'];
                            const color = colors[i];
                            
                            return (
                            <div key={i} className="flex md:flex-col items-start md:items-center gap-6 md:text-center group">
                                {/* Icon Bubble */}
                                <div 
                                    className="w-16 h-16 rounded-full bg-[var(--color-levl-panel)] border flex items-center justify-center shrink-0 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                    style={{ borderColor: `color-mix(in srgb, ${color} 20%, transparent)` }}
                                >
                                    <item.icon 
                                        className="w-6 h-6 transition-colors duration-500" 
                                        style={{ color: color }} 
                                    />
                                </div>

                                {/* Content */}
                                <div className="pt-2 md:pt-4 w-full">
                                    <h4 className="text-xl font-bold text-white mb-4">{item.time}</h4>
                                    
                                    {item.stats && item.stats.length > 0 && (
                                        <div className="flex flex-col gap-2 mb-4 md:items-center">
                                            {item.stats.map((stat, k) => (
                                                <div key={k} className="inline-flex items-center px-3 py-1.5 rounded bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider text-center max-w-[200px] leading-snug">
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <ul className="space-y-3">
                                        {item.points.map((point, j) => (
                                            <li key={j} className="text-sm text-[var(--color-levl-text-secondary)] leading-relaxed md:justify-center flex md:inline-flex items-start md:items-center gap-2">
                                                <span className="mt-1 md:hidden opacity-50 text-[10px] shrink-0">■</span>
                                                <span className="text-left md:text-center">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </section>
    );
}
