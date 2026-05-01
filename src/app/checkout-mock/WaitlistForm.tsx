"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        
        try {
            const { subscribeUser } = await import('../actions');
            const formData = new FormData();
            formData.append("email", email);

            const result = await subscribeUser(formData);

            if (result.success) {
                setStatus("success");
                setEmail("");
                setMessage("You're on the early access list! Keep an eye on your inbox.");
            } else {
                setStatus("error");
                setMessage(result.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
            setMessage("Failed to subscribe. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/30 rounded-xl animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-levl-cyan)] mb-3" />
                <p className="text-white font-medium text-lg text-center mb-1">Discount Secured!</p>
                <p className="text-sm text-white/70 text-center">{message}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    placeholder="Enter your email address"
                    className="w-full h-12 pl-12 pr-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-levl-cyan)]/50 transition-colors disabled:opacity-50"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading" || !email}
                className="group relative w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-levl-cyan)] to-[#3B82F6] text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
            >
                {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        Claim 15% Off & Get Alerted
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            {status === "error" && (
                <p className="text-sm text-red-400 text-center mt-1">{message}</p>
            )}
        </form>
    );
}
