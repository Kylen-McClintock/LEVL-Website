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
                    Join the first cohort to test DeepCell. Founding customers get launch pricing and direct input into future formulations designed to extend healthy lifespan.
                </p>

                <EmailForm />
            </div>
        </BentoCard>
    );
}

import { subscribeUser } from "@/app/actions";

function EmailForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        const formData = new FormData();
        formData.append("email", email);

        const result = await subscribeUser(formData);

        if (result.success) {
            setStatus("success");
            setEmail("");
            setMessage("You're on the list! Watch your inbox.");
        } else {
            setStatus("error");
            setMessage(result.message || "Something went wrong.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <p className="text-green-400 font-medium mb-1">Welcome Early Adopter</p>
                <p className="text-sm text-white/60">{message}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-xs text-white/40 hover:text-white transition-colors"
                >
                    Add another email
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    placeholder="Enter your email"
                    className="w-full h-11 pl-10 pr-4 bg-black/40 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-brand-copper/50 transition-colors disabled:opacity-50"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading" || !email}
                className={`inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple h-11 px-8 text-base bg-gradient-to-r from-brand-purple to-[#2a0f55] hover:shadow-lg hover:shadow-brand-purple/25 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {status === "loading" ? "Joining..." : "Join the Early Access List"}
            </button>

            {status === "error" && (
                <p className="text-xs text-center text-red-400">{message}</p>
            )}

            <p className="text-xs text-center text-white/40">No spam. Only high signal longevity updates.</p>
        </form>
    );
}
