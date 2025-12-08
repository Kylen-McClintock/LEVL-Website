"use client";

import { useState } from "react";
import { BentoCard } from "@/components/ui/BentoGrid";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

export function EmailCapture() {
    return (
        <BentoCard id="early-access" colSpan={2} className="p-8 bg-brand-copper/10 border-brand-copper/20 flex flex-col justify-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-copper/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3">Gain Early Access</h3>
                <p className="text-white/70 mb-6">
                    Join the first cohort to test DeepCell. Founding customers get launch pricing and direct input into future formulations.
                </p>

                <EmailForm />
            </div>
        </BentoCard>
    );
}

function EmailForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent("Early Access Request");
        const body = encodeURIComponent(`Please add ${email} to the early access list.`);
        window.location.href = `mailto:kylen@levlhealth.com?subject=${subject}&body=${body}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full h-11 pl-10 pr-4 bg-black/40 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-brand-copper/50 transition-colors"
                />
            </div>
            <Button variant="secondary" className="w-full" type="submit">
                Join the Early Access List
            </Button>
            <p className="text-xs text-center text-white/40">No spam. Only high signal longevity updates.</p>
        </form>
    );
}
