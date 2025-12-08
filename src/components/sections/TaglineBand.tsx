import { BentoCard } from "@/components/ui/BentoGrid";

export function TaglineBand() {
    return (
        <BentoCard colSpan={4} className="bg-gradient-to-r from-brand-purple/20 via-brand-dark to-brand-copper/20 border-brand-purple/10 flex items-center justify-center py-12 md:py-16 text-center">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Better Nights. <span className="text-white/60">More Tomorrows.</span>
                </h2>
                <p className="text-brand-copper font-medium tracking-wide uppercase text-sm md:text-base">
                    PhD Formulated • Physician Approved • Science Led Longevity
                </p>
            </div>
        </BentoCard>
    );
}
