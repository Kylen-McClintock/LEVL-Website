import { BentoCard } from "@/components/ui/BentoGrid";
import Image from "next/image";

export function TopHero() {
    return (
        <BentoCard colSpan={4} className="h-[200px] md:h-[300px] relative overflow-hidden flex items-center justify-center border-none">
            <Image
                src="/images/hero-runner.jpg"
                alt="Advanced Longevity"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                    Advanced Longevity Supplements to Extend Healthy Lifespan
                </h1>
            </div>
        </BentoCard>
    );
}
