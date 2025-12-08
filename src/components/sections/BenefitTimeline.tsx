import { BentoCard } from "@/components/ui/BentoGrid";
import { Clock, Calendar, CheckCircle, Zap } from "lucide-react";

const timelineItems = [
    {
        icon: Clock,
        time: "Tonight",
        points: [
            "Fall asleep faster and feel calmer",
            "Wake with a clear head instead of a melatonin hangover"
        ]
    },
    {
        icon: Calendar,
        time: "1 Week",
        points: [
            "More consistent sleep schedule",
            "Smoother mood, less wired & tired feeling"
        ]
    },
    {
        icon: CheckCircle,
        time: "1 Month",
        points: [
            "Deeper, more restorative sleep",
            "Improved recovery from training and long days"
        ]
    },
    {
        icon: Zap,
        time: "Long Term",
        points: [
            "Support for autophagy & mitochondrial function",
            "Sleep hygiene aligned with longevity hallmarks"
        ]
    }
];

export function BenefitTimeline() {
    return (
        <BentoCard colSpan={4} className="p-8 md:p-12 bg-white/5 border-white/10">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-2">The Timeline</h3>
                <p className="text-white/60">What to expect when you OutPace Aging</p>
            </div>

            <div className="relative">
                {/* Connection Line (Desktop) */}
                <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-0.5 bg-gradient-to-r from-brand-purple/0 via-brand-purple/50 to-brand-purple/0" />
                {/* Connection Line (Mobile) */}
                <div className="md:hidden absolute left-[2.25rem] top-0 h-full w-0.5 bg-gradient-to-b from-brand-purple/0 via-brand-purple/50 to-brand-purple/0" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                    {timelineItems.map((item, i) => (
                        <div key={i} className="flex md:flex-col items-start md:items-center gap-6 md:text-center group">
                            {/* Icon Bubble */}
                            <div className="w-16 h-16 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-copper/50 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <item.icon className="w-6 h-6 text-brand-purple group-hover:text-brand-copper transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="pt-2 md:pt-4">
                                <h4 className="text-xl font-bold text-white mb-3">{item.time}</h4>
                                <ul className="space-y-2">
                                    {item.points.map((point, j) => (
                                        <li key={j} className="text-sm text-white/70 leading-relaxed md:justify-center">
                                            • {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
