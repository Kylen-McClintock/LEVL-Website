import { BentoCard } from "@/components/ui/BentoGrid";
import { Button } from "@/components/ui/Button";
import { Smartphone, Activity, BarChart3, FlaskConical } from "lucide-react";

export function DeepCellAppCard() {
    return (
        <BentoCard colSpan={2} className="p-8 bg-gradient-to-br from-brand-dark to-brand-purple/20 flex flex-col justify-between overflow-hidden">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-brand-purple/20 rounded-lg">
                        <Smartphone className="w-5 h-5 text-brand-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">DeepCell Testing App</h3>
                </div>

                <p className="text-lg text-white/80 font-medium mb-4">
                    Do not just trust claims. <br /> See your own data.
                </p>

                <ul className="space-y-4 mb-8">
                    {[
                        { icon: Activity, text: "Connect Oura, Apple Watch, or Whoop" },
                        { icon: BarChart3, text: "Track sleep stages, HRV & energy" },
                        { icon: FlaskConical, text: "Run A/B experiments on your routine" },
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                            <item.icon className="w-4 h-4 text-brand-copper shrink-0" />
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-6">
                <Button className="w-full bg-white text-black hover:bg-white/90">
                    Gain Early Access to App
                </Button>

                {/* Pseudo-mockup viz */}
                <div className="relative w-full h-32 bg-black/40 rounded-t-2xl border-t border-x border-white/10 mx-auto -mb-8 overflow-hidden">
                    <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full" />
                    <div className="absolute top-8 left-4 w-1/2 h-2 bg-brand-purple rounded-full" />
                    <div className="absolute top-14 left-4 right-4 bottom-0 bg-gradient-to-t from-brand-purple/20 to-transparent p-4 flex items-end justify-around">
                        <div className="w-4 h-8 bg-brand-purple/40 rounded-sm" />
                        <div className="w-4 h-12 bg-brand-copper/60 rounded-sm" />
                        <div className="w-4 h-10 bg-brand-purple/40 rounded-sm" />
                        <div className="w-4 h-16 bg-brand-copper rounded-sm shadow-[0_0_15px_rgba(180,83,9,0.5)]" />
                        <div className="w-4 h-14 bg-brand-purple/40 rounded-sm" />
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}
