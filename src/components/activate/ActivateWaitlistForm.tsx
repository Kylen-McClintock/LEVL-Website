"use client";

import React, { useId, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
  Compass,
} from "lucide-react";
import { subscribeUser } from "@/app/actions";

interface ActivateWaitlistFormProps {
  variant?: "hero" | "banner";
  source?: string;
}

export function ActivateWaitlistForm({
  variant = "hero",
}: ActivateWaitlistFormProps) {
  const emailFieldId = useId();
  const emailHintId = useId();
  const emailErrorId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // Sync aria-invalid with CSS :user-invalid state per modern-web-guidance `validate-input-after-interaction`
  const syncEmailAriaInvalid = (el: HTMLInputElement) => {
    try {
      const isUserInvalid = el.matches(":user-invalid");
      el.setAttribute("aria-invalid", isUserInvalid ? "true" : "false");
    } catch {
      const isValid = el.checkValidity();
      el.classList.toggle("user-invalid-fallback", !isValid);
      el.classList.toggle("user-valid-fallback", isValid);
      el.setAttribute("aria-invalid", !isValid ? "true" : "false");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("email", trimmed);
      const result = await subscribeUser(formData);

      if (result.success) {
        setStatus("success");
        setEmail("");
        setMessage(
          "You’re on the LIFESPAN+ Activate priority waitlist! We’ll notify you first for beta cohort invitations and founding member launch access."
        );
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to register. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-4">
        <div
          role="status"
          aria-live="polite"
          className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
        >
          <CheckCircle2
            aria-hidden="true"
            className="w-10 h-10 text-emerald-400 mx-auto"
          />
          <div className="text-lg font-extrabold text-white">
            Priority Waitlist Confirmed
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-white/85 font-medium text-center sm:text-left">
            Want your personalized daily longevity &amp; circadian starting plan
            right now?
          </div>
          <Link
            href="/find-your-protocol"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(246,149,32,0.35)] hover:brightness-110 transition-all"
          >
            <span>Take the 60-Second Protocol Quiz</span>
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5 text-left">
          <label
            htmlFor={emailFieldId}
            className="block text-xs sm:text-sm font-bold text-white"
          >
            Join the Early Access &amp; Beta Cohort Waitlist
          </label>
          {/* Format hint placed ABOVE input per modern-web-guidance `validate-input-after-interaction` */}
          <span id={emailHintId} className="block text-[11px] text-white/55">
            Format: you@example.com • Priority launch pricing &amp; beta updates
          </span>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-0.5">
            <div className="relative flex-1">
              <Mail
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
              />
              <input
                id={emailFieldId}
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => syncEmailAriaInvalid(e.currentTarget)}
                onInput={(e) => {
                  if (e.currentTarget.hasAttribute("aria-invalid")) {
                    syncEmailAriaInvalid(e.currentTarget);
                  }
                }}
                aria-describedby={emailHintId}
                aria-errormessage={emailErrorId}
                placeholder="you@example.com"
                className="quiz-email-input w-full h-12 pl-10 pr-4 rounded-xl bg-black/55 border border-white/15 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--color-levl-cyan)] transition-colors disabled:opacity-50"
              />
              <div
                id={emailErrorId}
                className="quiz-email-error items-center gap-1.5 text-xs text-red-400 pt-1.5"
              >
                <span aria-hidden="true">❌</span>
                <span>Please enter a valid email address.</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="h-12 px-6 rounded-xl bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] font-extrabold text-sm shadow-[0_0_24px_rgba(246,149,32,0.4)] hover:shadow-[0_0_30px_rgba(246,149,32,0.55)] hover:brightness-110 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles aria-hidden="true" className="w-4 h-4" />
              <span>
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {status === "error" && (
          <p role="alert" className="text-xs text-red-400 font-medium">
            {message}
          </p>
        )}
      </form>

      {/* Secondary CTA: Protocol Quiz */}
      <div
        className={`pt-3 border-t border-white/10 flex flex-col ${
          variant === "banner" ? "sm:flex-row items-center justify-between" : ""
        } gap-2.5`}
      >
        <div className="flex items-center justify-between gap-2 text-xs text-white/65">
          <span>Don’t wait for launch to start slowing your pace of aging:</span>
        </div>
        <Link
          href="/find-your-protocol"
          className="w-full py-3.5 px-5 rounded-xl bg-[linear-gradient(to_right,rgba(221,77,14,0.32)_0%,rgba(246,149,32,0.3)_32%,rgba(99,149,208,0.3)_68%,rgba(51,130,199,0.35)_100%)] hover:bg-[linear-gradient(to_right,rgba(221,77,14,0.55)_0%,rgba(246,149,32,0.52)_32%,rgba(99,149,208,0.52)_68%,rgba(51,130,199,0.58)_100%)] border border-[#F69520]/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group"
        >
          <Compass
            aria-hidden="true"
            className="w-4 h-4 text-[#F69520]"
          />
          <span>Take the 60-Second Protocol Quiz</span>
          <ArrowRight
            aria-hidden="true"
            className="w-4 h-4 text-[#6395D0] group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
