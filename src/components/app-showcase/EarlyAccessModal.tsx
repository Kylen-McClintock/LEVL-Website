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

  // Early Access Email Signup state (ported from existing EmailCapture / subscribeUser flow)
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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

  // Auto-redirect 1.2s timer when VIP code is unlocked
  useEffect(() => {
    if (!vipUnlocked || !autoRedirectActive) return;
    const timer = setTimeout(() => {
      window.location.href = webAppUrl;
    }, 1200);
    return () => clearTimeout(timer);
  }, [vipUnlocked, autoRedirectActive, webAppUrl]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      const result = await subscribeUser(formData);

      if (result.success) {
        setStatus("success");
        setEmail("");
        setMessage("You're on the list! Watch your inbox for your VIP activation code.");
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
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
            ? "rgba(11, 14, 23, 0.96)"
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
              LEVL: OutPace Aging • Early Access Portal
            </div>
            <h2
              id={titleId}
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
            >
              {activeTab === "waitlist"
                ? "Gain Early Access to LEVL: OutPace Aging"
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
              ? "rgba(6, 9, 19, 0.75)"
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
            <span>Early Access List</span>
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
            TAB 1: EARLY ACCESS EMAIL SIGN UP (APP ACCESS)
           ============================================================ */}
        {activeTab === "waitlist" && (
          <div>
            {status === "success" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-emerald-400 font-bold text-lg">
                  Welcome Early Adopter
                </p>
                <p className="text-sm opacity-80">{message}</p>
                <div className="pt-2 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Add another email
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("vip")}
                    className="text-xs font-bold text-sky-400 hover:underline cursor-pointer"
                  >
                    Already have a VIP code? Enter it here →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDark ? "#9CA3AF" : "#475569" }}
                >
                  Join the first cohort to access{" "}
                  <strong style={{ color: isDark ? "#F9FAFB" : "#0F172A" }}>
                    LEVL: OutPace Aging
                  </strong>
                  . Founding members get priority onboarding, their VIP activation
                  code, and direct input into circadian protocol features.
                </p>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                  <input
                    name="email"
                    type="email"
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(6, 9, 19, 0.75)"
                        : "#FFFFFF",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.14)"
                        : "rgba(15,23,42,0.15)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="w-full h-12 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {status === "loading"
                      ? "Joining..."
                      : "Join the Early Access List"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {status === "error" && (
                  <p className="text-xs text-center text-red-400">{message}</p>
                )}

                <p className="text-xs text-center opacity-50">
                  No spam. Only high signal longevity app updates &amp; activation access.
                </p>

                <p className="text-center text-xs opacity-75 pt-1">
                  Already have a VIP code?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("vip")}
                    className="text-emerald-400 font-bold underline cursor-pointer"
                  >
                    Enter VIP Code →
                  </button>
                </p>
              </form>
            )}
          </div>
        )}

        {/* ============================================================
            TAB 2: VIP INVITE CODE
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
                    placeholder="Enter invite code"
                    className="w-full px-4 py-3.5 rounded-xl border text-center font-mono text-lg font-extrabold tracking-[0.2em] uppercase outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:font-medium placeholder:normal-case"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(6, 9, 19, 0.8)"
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
                        Switch to Early Access List →
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Instant LEVL: OutPace Aging Access</span>
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
                    VIP Access Unlocked — Launching LEVL: OutPace Aging...
                  </p>
                  <p className="text-xs opacity-80">
                    Your VIP invite code has been verified &amp; persisted to your device.
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
                  <span>Launch LEVL: OutPace Aging Now →</span>
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
                <div
                  className="p-4 text-xs space-y-2.5 border-t opacity-85"
                  style={{
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(15,23,42,0.08)",
                  }}
                >
                  <p className="font-semibold text-emerald-400">
                    Zero App Store Friction • Fullscreen 120Hz Native Experience:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>
                      Open <strong>LEVL: OutPace Aging</strong> in{" "}
                      <strong>Safari (iOS)</strong> or{" "}
                      <strong>Chrome (Android)</strong>.
                    </li>
                    <li>
                      Tap the <strong>Share</strong> icon (iOS bottom bar) or{" "}
                      <strong>⋮ Menu</strong> (Android).
                    </li>
                    <li>
                      Select <strong>“Add to Home Screen”</strong> — launches
                      instantly from your dock with persistent local &amp; cloud
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
