import { BentoCard } from "@/components/ui/BentoGrid";
import { Button } from "@/components/ui/Button";
import { Rocket, Target, Users } from "lucide-react";

export function BrandMission() {
    return (
        <BentoCard colSpan={4} className="p-8 md:p-12 lg:p-16 bg-gradient-to-tr from-[#1e1e1e] to-brand-dark border-white/10 flex flex-col items-center text-center">
            <div className="max-w-3xl space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Peak Health Today, <br />
                    <span className="text-brand-copper">Longevity Escape Velocity Tomorrow</span>
                </h2>

                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                    Longevity Escape Velocity is the point where every year you stay alive, science adds more than a year of healthy life expectancy back.
                    LEVL exists to help people reach that point by combining evidence based formulas, real world data, and a transparent R&D loop.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto py-8">
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

                <div>
                    <Button size="lg" className="bg-white text-black hover:bg-white/90">
                        OutPace Aging With Us
                    </Button>
                </div>
            </div>
        </BentoCard>
    );
}
