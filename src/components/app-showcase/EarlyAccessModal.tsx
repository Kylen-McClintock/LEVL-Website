"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  X,
  Sparkles,
  KeyRound,
  Mail,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  ChevronDown,
  LockOpen,
  AlertCircle,
} from "lucide-react";
import { subscribeUser } from "@/app/actions";
import type { ShowcaseTheme } from "./IPhoneShowcaseFrame";

export type ModalTab = "waitlist" | "vip";

interface EarlyAccessModalProps {
  isOpen: boolean;
  initialTab: ModalTab;
  theme: ShowcaseTheme;
  webAppUrl: string;
  onClose: () => void;
}

const LONGEVITY_GOALS = [
  "Slow Biological Aging",
  "VO2 Max & Heart",
  "Brain & Deep Sleep",
  "Metabolic & Body Comp",
] as const;

const WEARABLES_AND_LABS = [
  "Whoop",
  "Oura",
  "Apple Watch",
  "Garmin",
  "Function Health / Blood Panels",
] as const;

export function EarlyAccessModal({
  isOpen,
  initialTab,
  theme,
  webAppUrl,
  onClose,
}: EarlyAccessModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const vipInputRef = useRef<HTMLInputElement | null>(null);
  const titleId = useId();

  const [activeTab, setActiveTab] = useState<ModalTab>(initialTab);
  const [email, setEmail] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Slow Biological Aging",
  ]);
  const [selectedWearables, setSelectedWearables] = useState<string[]>([
    "Oura",
    "Function Health / Blood Panels",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistConfirmed, setWaitlistConfirmed] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // VIP Code state
  const [vipCode, setVipCode] = useState("");
  const [vipError, setVipError] = useState<string | null>(null);
  const [vipUnlocked, setVipUnlocked] = useState(false);
  const [autoRedirectActive, setAutoRedirectActive] = useState(true);
  const [showPwaDrawer, setShowPwaDrawer] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  // Sync native <dialog> showModal() / close() with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      if (initialTab === "vip") {
        setTimeout(() => vipInputRef.current?.focus(), 60);
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen, initialTab]);

  // Fallback for browsers without <dialog closedby="any"> support (e.g., Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      onClose();
    };
    dialog.addEventListener("close", handleNativeClose);

    let handleBackdropClick: ((event: MouseEvent) => void) | undefined;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", handleNativeClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, [onClose]);

  // Auto-redirect 1.2s timer when VIP code LEV2035 is unlocked
  useEffect(() => {
    if (!vipUnlocked || !autoRedirectActive) return;
    const timer = setTimeout(() => {
      window.location.href = webAppUrl;
    }, 1200);
    return () => clearTimeout(timer);
  }, [vipUnlocked, autoRedirectActive, webAppUrl]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const toggleWearable = (item: string) => {
    setSelectedWearables((prev) =>
      prev.includes(item) ? prev.filter((w) => w !== item) : [...prev, item]
    );
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("goals", selectedGoals.join(", "));
      formData.append("wearables", selectedWearables.join(", "));
      await subscribeUser(formData).catch(() => null);
    } finally {
      setIsSubmitting(false);
      setWaitlistConfirmed(true);
    }
  };

  const handleVipVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = vipCode.trim().toUpperCase();
    if (normalized === "LEV2035") {
      setVipError(null);
      setVipUnlocked(true);
      try {
        localStorage.setItem("levl_vip_unlocked", "true");
      } catch {}
    } else {
      setVipUnlocked(false);
      setVipError(
        "Invalid invite code. Join the Early Access Waitlist to receive your VIP activation code."
      );
    }
  };

  const copyReferralLink = () => {
    const link = "https://levlhealth.com/app?ref=VIP-COHORT";
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2200);
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      aria-labelledby={titleId}
      className="m-auto w-[94vw] max-w-lg rounded-3xl p-0 bg-transparent border-0 outline-none backdrop:bg-black/70 backdrop:backdrop-blur-md open:animate-fade-in"
    >
      <div
        className="relative rounded-3xl border p-6 sm:p-8 shadow-2xl transition-colors duration-300"
        style={{
          backgroundColor: isDark
            ? "rgba(17, 24, 39, 0.94)"
            : "rgba(255, 255, 255, 0.96)",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(15, 23, 42, 0.12)",
          color: isDark ? "#F9FAFB" : "#0F172A",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Top Ambient Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3 h-3" />
              LEVL OS v2.6 • Early Access Portal
            </div>
            <h2
              id={titleId}
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
            >
              {activeTab === "waitlist"
                ? "Reserve Your Biological Operating System"
                : "Enter VIP Invite Code"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full border transition-colors cursor-pointer hover:opacity-80"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(15,23,42,0.12)",
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Tab Segmented Switcher */}
        <div
          className="grid grid-cols-2 p-1 rounded-2xl border mb-6"
          style={{
            backgroundColor: isDark
              ? "rgba(3, 7, 18, 0.65)"
              : "rgba(241, 245, 249, 0.9)",
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(15,23,42,0.08)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("waitlist")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "waitlist"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Early Access Waitlist</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("vip");
              setTimeout(() => vipInputRef.current?.focus(), 50);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "vip"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Have a VIP Code?</span>
          </button>
        </div>

        {/* ============================================================
            TAB 1: EARLY ACCESS WAITLIST
           ============================================================ */}
        {activeTab === "waitlist" && (
          <div>
            {!waitlistConfirmed ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    1. Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@company.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(3, 7, 18, 0.7)"
                        : "#FFFFFF",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.14)"
                        : "rgba(15,23,42,0.15)",
                    }}
                  />
                </div>

                {/* Primary Longevity Goal Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    2. Primary Longevity Goal
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LONGEVITY_GOALS.map((goal) => {
                      const active = selectedGoals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleGoal(goal)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            active
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          style={
                            !active
                              ? {
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.12)"
                                    : "rgba(15,23,42,0.15)",
                                }
                              : undefined
                          }
                        >
                          {active ? "✓ " : ""}
                          {goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Current Wearable / Labs Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    3. Current Wearable / Labs Stack
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WEARABLES_AND_LABS.map((item) => {
                      const active = selectedWearables.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleWearable(item)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            active
                              ? "bg-sky-500/20 text-sky-400 border-sky-500/50"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          style={
                            !active
                              ? {
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.12)"
                                    : "rgba(15,23,42,0.15)",
                                }
                              : undefined
                          }
                        >
                          {active ? "✓ " : ""}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {isSubmitting
                      ? "Securing Priority Spot..."
                      : "Join Early Access Waitlist"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs opacity-70">
                  Already have a founder or VIP code?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("vip")}
                    className="text-emerald-400 font-bold underline cursor-pointer"
                  >
                    Enter VIP Code →
                  </button>
                </p>
              </form>
            ) : (
              /* Waitlist Confirmation State */
              <div className="space-y-4 py-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    QUEUE PRIORITY #142 • BIOHACKER COHORT
                  </span>
                  <h3 className="text-lg font-extrabold">
                    You’re on the Priority Onboarding List
                  </h3>
                  <p className="text-xs opacity-75 mt-1 max-w-md mx-auto">
                    We’ve calibrated your profile for{" "}
                    <strong>{selectedGoals.join(" + ")}</strong> with{" "}
                    <strong>{selectedWearables.join(", ")}</strong>.
                  </p>
                </div>

                {/* Referral Share Box */}
                <div
                  className="p-4 rounded-2xl border text-left space-y-2"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(3, 7, 18, 0.65)"
                      : "rgba(241, 245, 249, 0.85)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(15,23,42,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <Share2 className="w-3.5 h-3.5" />
                      Bump Queue Priority — Share Your Referral Link
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://levlhealth.com/app?ref=VIP-COHORT"
                      className="flex-1 px-3 py-2 rounded-lg text-xs font-mono border bg-transparent"
                      style={{
                        borderColor: isDark
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(15,23,42,0.15)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={copyReferralLink}
                      className="px-3 py-2 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedReferral ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("vip")}
                    className="text-xs font-bold text-sky-400 hover:underline cursor-pointer"
                  >
                    Have a VIP Invite Code right now? Unlock Instant Access →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            TAB 2: VIP INVITE CODE (LEV2035)
           ============================================================ */}
        {activeTab === "vip" && (
          <div className="space-y-5">
            {!vipUnlocked ? (
              <form onSubmit={handleVipVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    Enter Your VIP Activation Code
                  </label>
                  <input
                    ref={vipInputRef}
                    type="text"
                    value={vipCode}
                    onChange={(e) => {
                      setVipCode(e.target.value);
                      if (vipError) setVipError(null);
                    }}
                    placeholder="e.g. LEV2035"
                    className="w-full px-4 py-3.5 rounded-xl border text-center font-mono text-lg font-extrabold tracking-[0.25em] uppercase outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(3, 7, 18, 0.8)"
                        : "#FFFFFF",
                      borderColor: vipError
                        ? "#EF4444"
                        : isDark
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(15,23,42,0.2)",
                    }}
                  />
                </div>

                {vipError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">{vipError}</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab("waitlist")}
                        className="text-emerald-400 font-bold underline cursor-pointer"
                      >
                        Switch to Early Access Waitlist →
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Instant LEVL OS Access</span>
                </button>
              </form>
            ) : (
              /* VIP UNLOCKED STATE */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2 animate-fade-in">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                    <LockOpen className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-extrabold text-emerald-400 tracking-wide">
                    VIP Access Unlocked — Launching LEVL OS...
                  </p>
                  <p className="text-xs opacity-80">
                    Code <span className="font-mono font-bold">LEV2035</span>{" "}
                    verified & persisted to your device.
                  </p>
                  {autoRedirectActive && (
                    <button
                      type="button"
                      onClick={() => setAutoRedirectActive(false)}
                      className="text-[11px] font-mono underline opacity-75 hover:opacity-100 cursor-pointer"
                    >
                      Pause auto-redirect to view iOS/Android Home Screen setup
                    </button>
                  )}
                </div>

                <a
                  href={webAppUrl}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch LEVL Web App Now →</span>
                </a>
              </div>
            )}

            {/* Collapsible Native iOS / Android Home Screen App Drawer */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(15,23,42,0.1)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowPwaDrawer(!showPwaDrawer);
                  setAutoRedirectActive(false);
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold cursor-pointer hover:opacity-90"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(15,23,42,0.03)",
                }}
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Install as Native iOS / Android Home Screen App
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showPwaDrawer ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showPwaDrawer && (
                <div className="p-4 text-xs space-y-2.5 border-t opacity-85" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)" }}>
                  <p className="font-semibold text-emerald-400">
                    Zero App Store Friction • Fullscreen 120Hz Native Experience:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>
                      Open <strong>LEVL Web App</strong> in{" "}
                      <strong>Safari (iOS)</strong> or{" "}
                      <strong>Chrome (Android)</strong>.
                    </li>
                    <li>
                      Tap the <strong>Share</strong> icon (iOS bottom bar) or{" "}
                      <strong>⋮ Menu</strong> (Android).
                    </li>
                    <li>
                      Select <strong>“Add to Home Screen”</strong> — launches
                      instantly from your dock with persistent local & cloud
                      circadian state.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
