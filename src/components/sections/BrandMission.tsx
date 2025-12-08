import { BentoCard } from "@/components/ui/BentoGrid";
import { Button } from "@/components/ui/Button";
import { Rocket, Target, Users } from "lucide-react";
import Image from "next/image";


export function BrandMission() {
    return (
        <BentoCard colSpan={4} className="p-0 bg-transparent border-none overflow-hidden flex flex-col shadow-none group-none">

            {/* Content Side */}
            <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center items-center glass-panel rounded-t-3xl border border-white/10 bg-gradient-to-tr from-[#1e1e1e] to-brand-dark z-10 relative">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
                    Peak Health Today, <br />
                    <span className="text-brand-copper">Longevity Escape Velocity Tomorrow</span>
                </h2>

                <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-3xl">
                    Longevity Escape Velocity is the point where every year you stay alive, science adds more than a year of healthy life expectancy back.
                    LEVL exists to help people reach that point.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto py-8 w-full">
                    {[
                        { icon: Target, text: "Advanced formulations that target multiple hallmarks of aging." },
                        { icon: Rocket, text: "An outcomes testing app that closes the loop between science and protocol." },
                        { icon: Users, text: "A community of people who want to live long enough to live forever." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <item.icon className="w-6 h-6 text-brand-purple shrink-0" />
                            <p className="text-sm text-white/80">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Side - Bottom Full Width */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-b-3xl border-x border-b border-white/10 -mt-6 group">
                <Image
                    src="/images/longevity-art.jpg"
                    alt="Live Fast Die Never"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
                <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-brand-dark to-transparent" />

                {/* Centered Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <a href="https://discord.gg/9zBP7rvD6d" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-2xl transition-all hover:scale-105"
                        >
                            OutPace Aging With Us
                        </Button>
                    </a>
                </div>
            </div>
        </BentoCard>
    );
}
