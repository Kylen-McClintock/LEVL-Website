"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  FlaskConical,
  HeartPulse,
  Info,
  Mail,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Zap,
  X,
} from "lucide-react";
import {
  APPROACH_PREFERENCE_LABELS,
  ENERGY_TIMING_LABELS,
  GOAL_LABELS,
  MOTIVATION_LABELS,
  SLEEP_IMPROVEMENT_LABELS,
  TIME_ALLOWANCE_LABELS,
  generatePersonalizedPlan,
  type ApproachPreferenceId,
  type EnergyTimingId,
  type MotivationId,
  type QuizAnswers,
  type QuizGoalId,
  type SleepImprovementId,
  type TimeAllowanceId,
} from "@/data/quizProtocols";
import { sendQuizRecommendations } from "@/app/actions/quiz";
import { productContent } from "@/content/productLongevity";
import { PurchaseBox } from "@/components/product/PurchaseBox";
import type { ShopifyProduct } from "@/types/shopify";
import type { JudgeMeData } from "@/lib/judgeme";

type QuizStepId =
  | "opening"
  | "goals"
  | "experience"
  | "motivation"
  | "practical_fit"
  | "results";

type ExperienceSubCardId = "sleep" | "energy" | "longevity";

const HEALTHSPAN_DEFINITION =
  "Healthspan means the years of life spent in good health, with the physical and mental capacity to do what matters to you.";

interface IntentionalSliderProps {
  label: string;
  scaleLegend: string;
  value: number | null;
  onChange: (val: number) => void;
}

/**
 * Brand-consistent 0–10 native range slider + interactive number strip.
 * Follows modern-web-guidance `slider` pattern and enforces the spec rule:
 * "Sliders should require an intentional answer. An untouched default must not count as a response."
 */
function Intentional0To10Slider({
  label,
  scaleLegend,
  value,
  onChange,
}: IntentionalSliderProps) {
  const sliderId = useId();
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const isUntouched = value === null;
  const numericValue = value ?? 5;

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.style.setProperty("--attr-min", "0");
    el.style.setProperty("--attr-max", "10");
    el.style.setProperty("--control-value", String(numericValue));
  }, [numericValue]);

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    e.target.style.setProperty("--control-value", String(nextVal));
    onChange(nextVal);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label
          htmlFor={sliderId}
          className="text-base sm:text-lg font-bold text-white leading-snug"
        >
          {label}
        </label>
        <div className="shrink-0">
          {isUntouched ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Tap or slide 0–10 to answer
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] border border-[var(--color-levl-cyan)]/40">
              Selected: {value} / 10
            </span>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-white/70 font-medium">
        {scaleLegend}
      </p>

      {/* Native <input type="range"> styled per modern-web-guidance `slider` */}
      <div className="pt-1">
        <input
          ref={sliderRef}
          id={sliderId}
          type="range"
          min={0}
          max={10}
          step={1}
          value={numericValue}
          data-untouched={isUntouched ? "true" : "false"}
          aria-valuetext={
            isUntouched ? "Not yet selected" : `${value} out of 10`
          }
          onChange={handleRangeInput}
          onPointerDown={() => {
            if (isUntouched) {
              onChange(numericValue);
            }
          }}
          className="quiz-range-slider"
        />
      </div>

      {/* Clickable 0-10 Number Strip for 1-tap precision */}
      <div
        className="grid grid-cols-11 gap-1 sm:gap-1.5 pt-1"
        role="group"
        aria-label="Select a score from 0 to 10"
      >
        {Array.from({ length: 11 }, (_, idx) => {
          const isSelected = value === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(idx)}
              className={`h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                isSelected
                  ? "bg-[var(--color-levl-cyan)] text-slate-950 border-[var(--color-levl-cyan)] shadow-[0_0_12px_rgba(14,165,233,0.45)] scale-105"
                  : "bg-black/40 text-white/75 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {idx}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ProtocolQuizClientProps {
  product?: ShopifyProduct;
  judgeMeData?: JudgeMeData;
}

export function ProtocolQuizClient({
  product,
  judgeMeData,
}: ProtocolQuizClientProps) {
  const [step, setStep] = useState<QuizStepId>("opening");
  const [experienceCardIdx, setExperienceCardIdx] = useState<number>(0);
  const quizStartTimeRef = useRef<number | null>(null);

  const [answers, setAnswers] = useState<QuizAnswers>({
    goals: [],
    primaryGoal: null,
    sleepScore: null,
    sleepImprovements: [],
    energyScore: null,
    energyTimings: [],
    longevityHighInterestFromGoal: false,
    longevityPriorityScore: null,
    motivations: [],
    motivationOtherText: "",
    timeAllowance: null,
    approachPreference: null,
  });

  // Email Module State
  const emailSectionRef = useRef<HTMLDivElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const emailFieldId = useId();
  const emailHintId = useId();
  const emailErrorId = useId();

  const [email, setEmail] = useState("");
  const [emailProtocolLink, setEmailProtocolLink] = useState(true);
  const [subscribeActivate, setSubscribeActivate] = useState(false);
  const [subscribeInsights, setSubscribeInsights] = useState(false);
  const [activateHighlightNotice, setActivateHighlightNotice] = useState(false);
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [emailFeedback, setEmailFeedback] = useState("");

  // DeepCell Formula Preview & Quick-Add Modal (<dialog closedby="any">)
  const deepCellDialogRef = useRef<HTMLDialogElement | null>(null);
  const deepCellDialogTitleId = useId();
  const [isDeepCellModalOpen, setIsDeepCellModalOpen] = useState(false);

  // Sync native <dialog> showModal()/close() + Safari closedby fallback per modern-web-guidance `light-dismiss-a-dialog`
  useEffect(() => {
    const dialog = deepCellDialogRef.current;
    if (!dialog) return;

    if (isDeepCellModalOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isDeepCellModalOpen]);

  useEffect(() => {
    const dialog = deepCellDialogRef.current;
    if (!dialog) return;

    const handleClose = () => setIsDeepCellModalOpen(false);
    dialog.addEventListener("close", handleClose);

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
      dialog.removeEventListener("close", handleClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, []);

  // Determine which Step 2 sub-cards apply based on selected goals
  const experienceCards = useMemo<ExperienceSubCardId[]>(() => {
    const cards: ExperienceSubCardId[] = [];
    if (answers.goals.includes("sleep")) cards.push("sleep");
    if (answers.goals.includes("energy")) cards.push("energy");
    // Only ask the longevity priority slider if longevity was NOT already selected as a goal
    if (!answers.goals.includes("longevity")) cards.push("longevity");
    return cards;
  }, [answers.goals]);

  // Toggle Goal in Step 1
  const toggleGoal = (goalId: QuizGoalId) => {
    if (!quizStartTimeRef.current) {
      quizStartTimeRef.current = Date.now();
      track("quiz_started", { entry: "goal_card" });
    }

    setAnswers((prev) => {
      const exists = prev.goals.includes(goalId);
      const nextGoals = exists
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId];

      let nextPrimary = prev.primaryGoal;
      if (nextGoals.length === 1) {
        nextPrimary = nextGoals[0];
      } else if (nextGoals.length === 0) {
        nextPrimary = null;
      } else if (nextPrimary && !nextGoals.includes(nextPrimary)) {
        nextPrimary = null;
      }

      return {
        ...prev,
        goals: nextGoals,
        primaryGoal: nextPrimary,
        longevityHighInterestFromGoal: nextGoals.includes("longevity"),
      };
    });
  };

  // Toggle Sleep Improvement (multi-select all that apply; "maintain_good_sleep" is exclusive)
  const toggleSleepImprovement = (id: SleepImprovementId) => {
    setAnswers((prev) => {
      if (id === "maintain_good_sleep") {
        const alreadySelected = prev.sleepImprovements.includes(
          "maintain_good_sleep"
        );
        return {
          ...prev,
          sleepImprovements: alreadySelected ? [] : ["maintain_good_sleep"],
        };
      }

      const withoutMaintain = prev.sleepImprovements.filter(
        (item) => item !== "maintain_good_sleep"
      );
      if (withoutMaintain.includes(id)) {
        return {
          ...prev,
          sleepImprovements: withoutMaintain.filter((item) => item !== id),
        };
      }
      return {
        ...prev,
        sleepImprovements: [...withoutMaintain, id],
      };
    });
  };

  // Toggle Energy Timing (multi-select all that apply; "maintain_current_energy" is exclusive)
  const toggleEnergyTiming = (id: EnergyTimingId) => {
    setAnswers((prev) => {
      if (id === "maintain_current_energy") {
        const alreadySelected = prev.energyTimings.includes(
          "maintain_current_energy"
        );
        return {
          ...prev,
          energyTimings: alreadySelected ? [] : ["maintain_current_energy"],
        };
      }

      const withoutMaintain = prev.energyTimings.filter(
        (item) => item !== "maintain_current_energy"
      );
      if (withoutMaintain.includes(id)) {
        return {
          ...prev,
          energyTimings: withoutMaintain.filter((item) => item !== id),
        };
      }
      return {
        ...prev,
        energyTimings: [...withoutMaintain, id],
      };
    });
  };

  // Toggle Motivation (multi-select all that apply)
  const toggleMotivation = (id: MotivationId) => {
    setAnswers((prev) => {
      if (prev.motivations.includes(id)) {
        return {
          ...prev,
          motivations: prev.motivations.filter((m) => m !== id),
        };
      }
      return {
        ...prev,
        motivations: [...prev.motivations, id],
      };
    });
  };

  // Validation per step
  const isStep1Valid =
    answers.goals.length > 0 &&
    (answers.goals.length === 1 || answers.primaryGoal !== null);

  const currentExperienceCard = experienceCards[experienceCardIdx] || null;

  const isCurrentExperienceCardValid = useMemo(() => {
    if (!currentExperienceCard) return true;
    if (currentExperienceCard === "sleep") {
      return (
        answers.sleepScore !== null && answers.sleepImprovements.length > 0
      );
    }
    if (currentExperienceCard === "energy") {
      return answers.energyScore !== null && answers.energyTimings.length > 0;
    }
    if (currentExperienceCard === "longevity") {
      return answers.longevityPriorityScore !== null;
    }
    return true;
  }, [
    currentExperienceCard,
    answers.sleepScore,
    answers.sleepImprovements.length,
    answers.energyScore,
    answers.energyTimings.length,
    answers.longevityPriorityScore,
  ]);

  const isStep3Valid = answers.motivations.length > 0;
  const isStep4Valid =
    answers.timeAllowance !== null && answers.approachPreference !== null;

  // Navigation handlers
  const handleStartQuiz = () => {
    if (!quizStartTimeRef.current) {
      quizStartTimeRef.current = Date.now();
      track("quiz_started", { entry: "cta_button" });
    }
    setStep("goals");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep1Continue = () => {
    if (!isStep1Valid) return;
    if (experienceCards.length > 0) {
      setExperienceCardIdx(0);
      setStep("experience");
    } else {
      // Only longevity was selected, so no redundant priority slider is asked
      setStep("motivation");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExperienceContinue = () => {
    if (!isCurrentExperienceCardValid) return;
    if (experienceCardIdx + 1 < experienceCards.length) {
      setExperienceCardIdx((prev) => prev + 1);
    } else {
      setStep("motivation");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExperienceBack = () => {
    if (experienceCardIdx > 0) {
      setExperienceCardIdx((prev) => prev - 1);
    } else {
      setStep("goals");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep4Submit = () => {
    if (!isStep4Valid) return;
    const elapsedSeconds = quizStartTimeRef.current
      ? Math.round((Date.now() - quizStartTimeRef.current) / 1000)
      : 60;

    // Privacy-safe analytics event: no health scores or personal motivations
    track("quiz_completed", {
      durationSeconds: elapsedSeconds,
      goalCount: answers.goals.length,
      timeAllowance: answers.timeAllowance || "15_to_30m",
      approachPreference: answers.approachPreference || "combination",
    });

    setStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute Personalized Plan Result
  const plan = useMemo(() => generatePersonalizedPlan(answers), [answers]);
  const warmedUrlsRef = useRef<Set<string>>(new Set());

  // Proactively pre-warm LEVL App & LongevityReviews serverless routes during the quiz
  // so cold starts and ISR caches are already hot before the user clicks a protocol CTA.
  useEffect(() => {
    const warmUrl = (url: string) => {
      if (!url || warmedUrlsRef.current.has(url)) return;
      warmedUrlsRef.current.add(url);
      try {
        void fetch(url, { mode: "no-cors", credentials: "omit" }).catch(
          () => {}
        );
      } catch {}
    };

    if (step === "goals" || step === "experience") {
      warmUrl("https://2026-levl-protocols-app.vercel.app/");
      warmUrl("https://www.longevityreviews.org/protocols");
    }

    if (
      step === "motivation" ||
      step === "practical_fit" ||
      step === "results"
    ) {
      warmUrl(plan.levlAppStartUrl);
      warmUrl(plan.longevityReviewsStartUrl);
      warmUrl(plan.levlAppAddNextUrl);
      warmUrl(plan.longevityReviewsAddNextUrl);
    }
  }, [
    step,
    plan.levlAppStartUrl,
    plan.longevityReviewsStartUrl,
    plan.levlAppAddNextUrl,
    plan.longevityReviewsAddNextUrl,
  ]);

  // Sync aria-invalid with CSS :user-invalid state per modern-web-guidance `validate-input-after-interaction`
  const syncEmailAriaInvalid = (inputEl: HTMLInputElement) => {
    try {
      const isUserInvalid = inputEl.matches(":user-invalid");
      inputEl.setAttribute("aria-invalid", isUserInvalid ? "true" : "false");
    } catch {
      const isValid = inputEl.checkValidity();
      inputEl.setAttribute("aria-invalid", isValid ? "false" : "true");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setEmailStatus("loading");
    setEmailFeedback("");

    const res = await sendQuizRecommendations({
      email: email.trim(),
      emailProtocolLink,
      subscribeActivate: plan.includeActivate ? subscribeActivate : false,
      subscribeInsights,
      startSlug: plan.startHereProtocol.slug,
      nextSlug: plan.addNextProtocol.slug,
      levlAppStartUrl: plan.levlAppStartUrl,
      longevityReviewsStartUrl: plan.longevityReviewsStartUrl,
      levlAppAddNextUrl: plan.levlAppAddNextUrl,
      longevityReviewsAddNextUrl: plan.longevityReviewsAddNextUrl,
      deepCellEligible: plan.deepCell.eligible,
      deepCellHeadline: plan.deepCell.headline,
      deepCellRationale: plan.deepCell.rationale,
    });

    if (res.success) {
      setEmailStatus("success");
      setEmailFeedback(res.message);
      track("quiz_email_submitted", {
        requestedPlanLink: emailProtocolLink,
        optedInActivate: plan.includeActivate ? subscribeActivate : false,
        optedInInsights: subscribeInsights,
      });
    } else {
      setEmailStatus("error");
      setEmailFeedback(res.message);
    }
  };

  // Step progress indicator for steps 1–4
  const stepNumber =
    step === "goals"
      ? 1
      : step === "experience"
      ? 2
      : step === "motivation"
      ? 3
      : step === "practical_fit"
      ? 4
      : null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* =================================================================
          STEP PROGRESS BAR (Steps 1–4)
         ================================================================= */}
      {stepNumber !== null && (
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white/60">
            <span>
              Step {stepNumber} of 4 •{" "}
              {stepNumber === 1
                ? "Goals"
                : stepNumber === 2
                ? "Current Experience & Priorities"
                : stepNumber === 3
                ? "Personal Motivation"
                : "Practical Fit"}
            </span>
            <span>{Math.round((stepNumber / 4) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-levl-cyan)] to-purple-400 transition-all duration-300"
              style={{ width: `${(stepNumber / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* =================================================================
          OPENING SCREEN
         ================================================================= */}
      {step === "opening" && (
        <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/30 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              LEVL: OutPace Aging • Personalized Plan
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Find your longevity starting point
            </h1>

            <p className="text-base sm:text-xl text-white/75 leading-relaxed">
              Discover a practical routine for better nights, more energized
              days, and slowing your pace of aging to increase healthy lifespan.
            </p>
          </div>

          {/* Primary Opening CTA + Micro-copy */}
          <div className="flex flex-col items-center space-y-3">
            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-base sm:text-lg shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer"
            >
              <span>Find my protocol</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs sm:text-sm text-white/60 font-medium">
              Takes about 60 seconds • No email required to see results.
            </p>
          </div>

          {/* Quick-Start Goal Cards right on the Opening screen */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-center text-white/50">
              Or tap a goal below to jump right in
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  id: "sleep" as QuizGoalId,
                  icon: Moon,
                  title: GOAL_LABELS.sleep,
                  desc: "Fall asleep faster, stay asleep, and wake restored",
                },
                {
                  id: "energy" as QuizGoalId,
                  icon: Zap,
                  title: GOAL_LABELS.energy,
                  desc: "Steady morning, afternoon, and workout vitality",
                },
                {
                  id: "longevity" as QuizGoalId,
                  icon: HeartPulse,
                  title: GOAL_LABELS.longevity,
                  desc: "Cellular renewal, biological age deceleration, and healthspan",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      toggleGoal(item.id);
                      setStep("goals");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group text-left p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--color-levl-cyan)]/50 transition-all cursor-pointer flex flex-col justify-between gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-levl-cyan)]/15 border border-[var(--color-levl-cyan)]/30 flex items-center justify-center text-[var(--color-levl-cyan)] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base mb-1 flex items-center justify-between gap-1">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 text-[var(--color-levl-cyan)] transition-opacity" />
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          STEP 1: GOALS
         ================================================================= */}
      {step === "goals" && (
        <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What would you like to work on?
            </h2>
            <p className="text-sm sm:text-base text-white/65">
              Select all that apply. Multiple goals will produce a broader,
              de-conflicted plan.
            </p>
          </div>

          <div className="space-y-3.5">
            {(
              [
                {
                  id: "sleep" as QuizGoalId,
                  icon: Moon,
                  label: GOAL_LABELS.sleep,
                  sub: "Sleep onset, uninterrupted rest, and waking refreshed",
                },
                {
                  id: "energy" as QuizGoalId,
                  icon: Zap,
                  label: GOAL_LABELS.energy,
                  sub: "Morning drive, eliminating afternoon crashes, and workout stamina",
                },
                {
                  id: "longevity" as QuizGoalId,
                  icon: HeartPulse,
                  label: GOAL_LABELS.longevity,
                  sub: "Decelerate biological aging, support cellular renewal, and extend healthspan",
                },
              ] as const
            ).map((option) => {
              const selected = answers.goals.includes(option.id);
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleGoal(option.id)}
                  aria-pressed={selected}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    selected
                      ? "bg-[var(--color-levl-cyan)]/12 border-[var(--color-levl-cyan)] shadow-[0_0_20px_rgba(14,165,233,0.18)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      selected
                        ? "bg-[var(--color-levl-cyan)] text-slate-950"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {option.label}
                    </div>
                    <p className="text-xs sm:text-sm text-white/65 mt-0.5">
                      {option.sub}
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      selected
                        ? "bg-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)] text-slate-950"
                        : "border-white/25"
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inline Healthspan definition shown to everyone */}
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              {HEALTHSPAN_DEFINITION}
            </p>
          </div>

          {/* Conditional Follow-up when multiple goals are selected */}
          {answers.goals.length > 1 && (
            <div className="pt-4 border-t border-white/10 space-y-3.5 animate-fade-in">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Which matters most right now?
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  We’ll preserve every goal you selected and use your top
                  priority to anchor your starting recommendation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {answers.goals.map((goalId) => {
                  const isPrimary = answers.primaryGoal === goalId;
                  return (
                    <button
                      key={goalId}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          primaryGoal: goalId,
                        }))
                      }
                      aria-pressed={isPrimary}
                      className={`p-3.5 rounded-xl border text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isPrimary
                          ? "bg-[var(--color-levl-cyan)] text-slate-950 border-[var(--color-levl-cyan)] shadow-lg"
                          : "bg-white/[0.03] text-white border-white/15 hover:border-white/35"
                      }`}
                    >
                      <span>{GOAL_LABELS[goalId]}</span>
                      {isPrimary && (
                        <Check className="w-4 h-4 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep("opening")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={!isStep1Valid}
              onClick={handleStep1Continue}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================
          STEP 2: CURRENT EXPERIENCE AND PRIORITIES (One Topic Card at a Time)
         ================================================================= */}
      {step === "experience" && currentExperienceCard && (
        <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          {/* Sub-card badge when multiple Step 2 cards exist */}
          {experienceCards.length > 1 && (
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-white/75 border border-white/10">
                Part {experienceCardIdx + 1} of {experienceCards.length} •{" "}
                {currentExperienceCard === "sleep"
                  ? "Sleep Experience"
                  : currentExperienceCard === "energy"
                  ? "Daytime Energy"
                  : "Pace of Aging & Healthspan"}
              </span>
            </div>
          )}

          {/* SUB-CARD A: SLEEP */}
          {currentExperienceCard === "sleep" && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-levl-cyan)]">
                  <Moon className="w-3.5 h-3.5" />
                  Sleep Assessment
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Your current sleep experience
                </h2>
              </div>

              <Intentional0To10Slider
                label="How would you rate your sleep overall over the past two weeks?"
                scaleLegend="0 = Very poor · 10 = Excellent"
                value={answers.sleepScore}
                onChange={(val) =>
                  setAnswers((prev) => ({ ...prev, sleepScore: val }))
                }
              />

              <div className="space-y-3.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    What would you most like to improve?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Select all that apply (“Maintain good sleep” is exclusive of
                    the other options).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      "falling_asleep",
                      "staying_asleep",
                      "waking_rested",
                      "sleep_consistency",
                      "maintain_good_sleep",
                    ] as SleepImprovementId[]
                  ).map((id) => {
                    const selected = answers.sleepImprovements.includes(id);
                    const isExclusive = id === "maintain_good_sleep";
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleSleepImprovement(id)}
                        aria-pressed={selected}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isExclusive ? "sm:col-span-2" : ""
                        } ${
                          selected
                            ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white font-bold shadow-md"
                            : "bg-white/[0.02] border-white/10 text-white/80 hover:border-white/25"
                        }`}
                      >
                        <span className="text-sm sm:text-base">
                          {SLEEP_IMPROVEMENT_LABELS[id]}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            selected
                              ? "bg-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)] text-slate-950"
                              : "border-white/25"
                          }`}
                        >
                          {selected && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUB-CARD B: ENERGY */}
          {currentExperienceCard === "energy" && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Zap className="w-3.5 h-3.5" />
                  Energy Assessment
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Your daytime energy rhythm
                </h2>
              </div>

              <Intentional0To10Slider
                label="How would you rate your energy throughout the day over the past two weeks?"
                scaleLegend="0 = Consistently drained · 10 = Consistently energized"
                value={answers.energyScore}
                onChange={(val) =>
                  setAnswers((prev) => ({ ...prev, energyScore: val }))
                }
              />

              <div className="space-y-3.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    When would you most like more energy?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Select all that apply (“Maintain current energy” is
                    exclusive of the other options).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      "morning",
                      "afternoon",
                      "throughout_day",
                      "during_exercise",
                      "maintain_current_energy",
                    ] as EnergyTimingId[]
                  ).map((id) => {
                    const selected = answers.energyTimings.includes(id);
                    const isExclusive = id === "maintain_current_energy";
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleEnergyTiming(id)}
                        aria-pressed={selected}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isExclusive ? "sm:col-span-2" : ""
                        } ${
                          selected
                            ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white font-bold shadow-md"
                            : "bg-white/[0.02] border-white/10 text-white/80 hover:border-white/25"
                        }`}
                      >
                        <span className="text-sm sm:text-base">
                          {ENERGY_TIMING_LABELS[id]}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            selected
                              ? "bg-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)] text-slate-950"
                              : "border-white/25"
                          }`}
                        >
                          {selected && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUB-CARD C: LONGEVITY (Only shown if Longevity was NOT selected in Step 1) */}
          {currentExperienceCard === "longevity" && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Pace of Aging &amp; Healthspan
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Slowing your pace of aging &amp; extending healthspan
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                  {HEALTHSPAN_DEFINITION}
                </p>
              </div>

              <Intentional0To10Slider
                label="How much of a priority is slowing your pace of aging and increasing your healthy lifespan?"
                scaleLegend="0 = Not a priority right now · 5 = Important, alongside other priorities · 10 = One of my highest priorities"
                value={answers.longevityPriorityScore}
                onChange={(val) =>
                  setAnswers((prev) => ({
                    ...prev,
                    longevityPriorityScore: val,
                  }))
                }
              />
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleExperienceBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={!isCurrentExperienceCardValid}
              onClick={handleExperienceContinue}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================
          STEP 3: PERSONAL MOTIVATION
         ================================================================= */}
      {step === "motivation" && (
        <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What would improving these areas make more room for in your life?
            </h2>
            <p className="text-sm sm:text-base text-white/65">
              Select all that apply. We’ll use this to keep your plan grounded
              in what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(
              [
                "slow_pace_of_aging",
                "present_with_loved_ones",
                "meaningful_work",
                "exercise_and_adventure",
                "feeling_better_daily",
                "capable_and_independent",
                "other",
              ] as MotivationId[]
            ).map((id) => {
              const selected = answers.motivations.includes(id);
              const isFullRow = id === "slow_pace_of_aging";
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleMotivation(id)}
                  aria-pressed={selected}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isFullRow ? "sm:col-span-2" : ""
                  } ${
                    selected
                      ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white font-bold shadow-md"
                      : "bg-white/[0.02] border-white/10 text-white/80 hover:border-white/25"
                  }`}
                >
                  <span className="text-sm sm:text-base">
                    {MOTIVATION_LABELS[id]}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      selected
                        ? "bg-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)] text-slate-950"
                        : "border-white/25"
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional text input when "Other" is selected */}
          {answers.motivations.includes("other") && (
            <div className="space-y-2 animate-fade-in">
              <label
                htmlFor="motivation-other-input"
                className="block text-xs sm:text-sm font-semibold text-white/80"
              >
                Share what this would make more room for (optional):
              </label>
              <input
                id="motivation-other-input"
                type="text"
                maxLength={120}
                value={answers.motivationOtherText}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    motivationOtherText: e.target.value,
                  }))
                }
                placeholder="e.g., training for a marathon, creative projects, keeping up with grandkids..."
                className="w-full h-12 px-4 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--color-levl-cyan)]"
              />
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                if (experienceCards.length > 0) {
                  setExperienceCardIdx(experienceCards.length - 1);
                  setStep("experience");
                } else {
                  setStep("goals");
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={!isStep3Valid}
              onClick={() => {
                setStep("practical_fit");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================
          STEP 4: PRACTICAL FIT
         ================================================================= */}
      {step === "practical_fit" && (
        <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          {/* Time Investment */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How much additional time could you realistically invest in your
                health most days?
              </h2>
              <p className="text-sm sm:text-base text-white/60 mt-1">
                Beyond what you already do.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(
                [
                  "up_to_5m",
                  "5_to_15m",
                  "15_to_30m",
                  "30_to_60m",
                  "1_to_2h",
                  "2h_plus",
                ] as TimeAllowanceId[]
              ).map((id) => {
                const selected = answers.timeAllowance === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, timeAllowance: id }))
                    }
                    aria-pressed={selected}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      selected
                        ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white font-bold shadow-md"
                        : "bg-white/[0.02] border-white/10 text-white/80 hover:border-white/25"
                    }`}
                  >
                    <span className="text-sm sm:text-base">
                      {TIME_ALLOWANCE_LABELS[id]}
                    </span>
                    {selected && (
                      <Check className="w-4 h-4 text-[var(--color-levl-cyan)] shrink-0 stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Approach Preference */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                What approach would you prefer?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  "habits_first",
                  "supplements",
                  "combination",
                  "exploring",
                ] as ApproachPreferenceId[]
              ).map((id) => {
                const selected = answers.approachPreference === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        approachPreference: id,
                      }))
                    }
                    aria-pressed={selected}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selected
                        ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white font-bold shadow-md"
                        : "bg-white/[0.02] border-white/10 text-white/80 hover:border-white/25"
                    }`}
                  >
                    <span className="text-sm sm:text-base">
                      {APPROACH_PREFERENCE_LABELS[id]}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        selected
                          ? "bg-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)] text-slate-950"
                          : "border-white/25"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setStep("motivation");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={!isStep4Valid}
              onClick={handleStep4Submit}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>See my recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================
          RESULTS: YOUR PERSONALIZED STARTING PLAN
         ================================================================= */}
      {step === "results" && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Summary & Revise Answers Bar */}
          <div className="rounded-3xl bg-[#0B0E17]/95 border border-white/10 p-6 sm:p-9 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Your personalized starting plan
              </div>

              {/* Revise Answers Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("practical_fit");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/80 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("goals");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/80 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Revise Answers</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your Personalized Longevity Starting Plan
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {plan.summaryParagraph}
            </p>

            {plan.motivationSentence && (
              <div className="p-4 rounded-2xl bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/25 text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
                {plan.motivationSentence}
              </div>
            )}
          </div>

          {/* ===============================================================
              ORDERED RECOMMENDATION BLOCKS
              (Strictly follows spec ordering & keeps 1 visually dominant CTA)
             =============================================================== */}
          {plan.orderedBlocks.map((blockType, idx) => {
            const isDominant = idx === 0;

            if (blockType === "protocol") {
              return (
                <div key="protocol-block" className="space-y-6">
                  {/* START HERE PROTOCOL CARD */}
                  <div
                    className={`rounded-3xl p-6 sm:p-9 transition-all ${
                      isDominant
                        ? "bg-gradient-to-b from-[#0E1629] to-[#0B0E17] border-2 border-[var(--color-levl-cyan)] shadow-[0_0_35px_rgba(14,165,233,0.18)]"
                        : "bg-[#0B0E17]/95 border border-white/15 shadow-xl"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[var(--color-levl-cyan)] text-slate-950">
                          Start here
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/80 border border-white/10">
                          {plan.startHereProtocol.categoryBadge}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Evidence Score: {plan.startHereProtocol.evidenceScore}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 px-3 py-1 rounded-full border border-[var(--color-levl-cyan)]/30">
                        <Clock className="w-3.5 h-3.5" />
                        {plan.startHereProtocol.typicalTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                      {plan.startHereProtocol.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/55 font-medium mb-4">
                      {plan.startHereProtocol.authorOrSource} •{" "}
                      {plan.startHereProtocol.approachType}
                    </p>

                    <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-5">
                      {plan.startHereProtocol.summary}
                    </p>

                    {/* Why this matches your answers */}
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 mb-6 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-levl-cyan)]">
                        Why this fits your answers
                      </div>
                      <ul className="space-y-2">
                        {plan.startHereWhyItFits.map((reason, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80"
                          >
                            <Check className="w-4 h-4 text-[var(--color-levl-cyan)] shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-emerald-300/90 pt-1 font-medium">
                        {plan.startHereTimeFitNote}
                      </p>
                    </div>

                    {/* Reviewed Protocol Actions & Expected Time Commitment */}
                    <div className="space-y-3 mb-7">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Core Daily Actions ({plan.startHereActionsToDisplay.length}{" "}
                        Steps)
                      </div>
                      <div className="space-y-2.5">
                        {plan.startHereActionsToDisplay.map((action, aIdx) => (
                          <div
                            key={aIdx}
                            className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="space-y-1">
                              <div className="font-bold text-white text-sm sm:text-base">
                                {action.title}
                              </div>
                              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                                {action.detail}
                              </p>
                            </div>
                            <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/10 text-white/90">
                                {action.duration}
                              </span>
                              <span className="text-[11px] text-white/50">
                                {action.timing}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Protocol CTA & Supporting Text */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <a
                          href={plan.levlAppStartUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            track("protocol_engaged", {
                              role: "start_here",
                              destination: "levl_app",
                              protocolSlug: plan.startHereProtocol.slug,
                            })
                          }
                          className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-extrabold text-sm sm:text-base transition-all ${
                            isDominant
                              ? "bg-[var(--color-levl-cyan)] text-slate-950 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:bg-[var(--color-levl-cyan)]/90"
                              : "bg-white text-slate-950 hover:bg-white/90"
                          }`}
                        >
                          <span>View your protocol</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>

                        <a
                          href={plan.longevityReviewsStartUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            track("protocol_engaged", {
                              role: "start_here",
                              destination: "longevity_reviews",
                              protocolSlug: plan.startHereProtocol.slug,
                            })
                          }
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white/85 hover:text-white text-xs sm:text-sm font-semibold transition-all"
                        >
                          <span>Read Audit on LongevityReviews.org</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs text-white/60">
                        Explore the protocol on LongevityReviews and implement
                        it in the LEVL app.
                      </p>
                    </div>
                  </div>

                  {/* ADD NEXT PROTOCOL CARD */}
                  <div className="rounded-3xl bg-[#0B0E17]/80 border border-white/10 p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Add next
                        </span>
                        <span className="text-xs text-white/60 font-medium">
                          Complementary &amp; De-Conflicted
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                          Score: {plan.addNextProtocol.evidenceScore}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/60">
                        {plan.addNextProtocol.typicalTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {plan.addNextProtocol.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                        {plan.addNextWhyItFits}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <a
                        href={plan.levlAppAddNextUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("protocol_engaged", {
                            role: "add_next",
                            destination: "levl_app",
                            protocolSlug: plan.addNextProtocol.slug,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-levl-cyan)] hover:underline"
                      >
                        <span>Stage in LEVL App</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={plan.longevityReviewsAddNextUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("protocol_engaged", {
                            role: "add_next",
                            destination: "longevity_reviews",
                            protocolSlug: plan.addNextProtocol.slug,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/65 hover:text-white underline"
                      >
                        <span>View on LongevityReviews.org</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            if (blockType === "deepcell" && plan.deepCell.eligible) {
              return (
                <div
                  key="deepcell-block"
                  className={`rounded-3xl p-6 sm:p-9 transition-all ${
                    isDominant
                      ? "bg-gradient-to-b from-[#131129] to-[#0B0E17] border-2 border-[var(--color-levl-cyan)] shadow-[0_0_35px_rgba(14,165,233,0.18)]"
                      : "bg-[#0B0E17]/95 border border-white/15 shadow-xl"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-500/20 text-purple-200 border border-purple-500/35">
                        LIFESPAN+ DeepCell
                      </span>
                      {plan.deepCell.isOptionalHabitsBadge && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/85 border border-white/15">
                          Optional supplement to explore
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/60 font-medium">
                      Melatonin-Free Nighttime Formulation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                    <div className="md:col-span-8 space-y-3">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {plan.deepCell.headline}
                      </h2>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        {plan.deepCell.rationale}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex justify-center">
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-3 overflow-hidden">
                        <Image
                          src="/images/deepcell-bottle.jpg"
                          alt="LEVL LIFESPAN+ DeepCell"
                          width={150}
                          height={150}
                          className="object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamically Matched Ingredients (3-4) */}
                  <div className="space-y-3 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Key Ingredients Matched to Your Priorities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {plan.deepCell.matchedIngredients.map((ing, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-white text-sm">
                              {ing.name}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                              {ing.dose}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[var(--color-levl-cyan)]">
                            {ing.role}
                          </div>
                          <p className="text-xs text-white/65 leading-relaxed">
                            {ing.whyMatched}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-white/10">
                    <Link
                      href="/#purchase-section"
                      onClick={() =>
                        track("deepcell_engaged", {
                          action: "explore_page",
                          framingPath: plan.deepCell.framingPath || 1,
                        })
                      }
                      className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-extrabold text-sm sm:text-base transition-all ${
                        isDominant
                          ? "bg-[var(--color-levl-cyan)] text-slate-950 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:bg-[var(--color-levl-cyan)]/90"
                          : "bg-white text-slate-950 hover:bg-white/90"
                      }`}
                    >
                      <span>Explore DeepCell</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsDeepCellModalOpen(true);
                        track("deepcell_engaged", {
                          action: "open_formula_drawer",
                          framingPath: plan.deepCell.framingPath || 1,
                        });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white/85 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      <FlaskConical className="w-4 h-4 text-purple-300" />
                      <span>View Full 12-Ingredient Formula &amp; Options</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-white/45 mt-3">
                    Educational recommendation based on your stated goals; not a
                    clinical diagnosis or medical evaluation.
                  </p>
                </div>
              );
            }

            if (blockType === "activate" && plan.includeActivate) {
              return (
                <div
                  key="activate-block"
                  className="rounded-3xl bg-[#0B0E17]/85 border border-amber-500/25 p-6 sm:p-8 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      <Sun className="w-3.5 h-3.5" />
                      In Development • Daytime Energy Complex
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Help shape LIFESPAN+ Activate
                  </h3>

                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    Our energizing longevity complex is in development. Register
                    your interest for launch updates and potential beta-testing
                    opportunities.
                  </p>

                  <p className="text-xs text-white/55">
                    Note: Interest registration notifies you of launch milestones
                    and beta applications; beta cohort spots are limited and not
                    guaranteed. Start with your behavioral protocol above today.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        track("activate_interest_clicked");
                        setActivateHighlightNotice(true);
                        emailSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setTimeout(() => emailInputRef.current?.focus(), 350);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <span>Interested in Activate?</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <Link
                      href="/activate"
                      className="text-xs sm:text-sm font-semibold text-white/65 hover:text-white underline"
                    >
                      Learn about Activate →
                    </Link>
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* ===============================================================
              ONE OPTIONAL EMAIL MODULE
              Title: “Keep your personalized recommendations”
             =============================================================== */}
          <div
            ref={emailSectionRef}
            id="keep-recommendations-module"
            className="rounded-3xl bg-[#0B0E17]/95 border border-white/15 p-6 sm:p-9 shadow-2xl space-y-6"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-levl-cyan)]">
                <Mail className="w-3.5 h-3.5" />
                Optional • Save Your Plan
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Keep your personalized recommendations
              </h2>
              <p className="text-xs sm:text-sm text-white/65">
                Receive the exact starting protocol, action steps, and links
                shown above in your inbox.
              </p>
            </div>

            {emailStatus === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-base">
                  {emailFeedback}
                </div>
                <p className="text-xs text-white/65">
                  We only send the specific updates you selected.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                {/* Format hint placed ABOVE input per modern-web-guidance `validate-input-after-interaction` */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={emailFieldId}
                    className="block text-sm font-bold text-white"
                  >
                    Email address
                  </label>
                  <span
                    id={emailHintId}
                    className="block text-xs text-white/55"
                  >
                    Format: you@example.com
                  </span>
                  <input
                    ref={emailInputRef}
                    id={emailFieldId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
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
                    className="quiz-email-input w-full h-12 px-4 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--color-levl-cyan)] transition-colors"
                  />
                  <div
                    id={emailErrorId}
                    className="quiz-email-error items-center gap-1.5 text-xs text-red-400 pt-1"
                  >
                    <span aria-hidden="true">❌</span>
                    <span>Please enter a valid email address.</span>
                  </div>
                </div>

                {/* Granular Consent Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={emailProtocolLink}
                      onChange={(e) => setEmailProtocolLink(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-[var(--color-levl-cyan)] cursor-pointer"
                    />
                    <span className="text-sm text-white/90 font-medium">
                      Email me my personalized protocol link
                    </span>
                  </label>

                  {/* Only show the Activate checkbox when energy was selected */}
                  {plan.includeActivate && (
                    <label
                      className={`flex items-start gap-3 cursor-pointer select-none p-2.5 -mx-2.5 rounded-xl transition-colors ${
                        activateHighlightNotice
                          ? "bg-amber-500/10 border border-amber-500/30"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={subscribeActivate}
                        onChange={(e) => {
                          setSubscribeActivate(e.target.checked);
                          setActivateHighlightNotice(false);
                        }}
                        className="mt-0.5 w-4 h-4 rounded accent-amber-400 cursor-pointer"
                      />
                      <span className="text-sm text-white/90 font-medium">
                        Keep me updated on Activate’s launch and beta
                        opportunities
                        {activateHighlightNotice && (
                          <span className="block text-xs text-amber-300 mt-0.5">
                            Check this box to register your interest in
                            LIFESPAN+ Activate.
                          </span>
                        )}
                      </span>
                    </label>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={subscribeInsights}
                      onChange={(e) => setSubscribeInsights(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-[var(--color-levl-cyan)] cursor-pointer"
                    />
                    <span className="text-sm text-white/75">
                      Subscribe to LEVL health insights
                    </span>
                  </label>
                </div>

                {emailStatus === "error" && (
                  <p className="text-xs text-red-400 font-medium">
                    {emailFeedback}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={
                    emailStatus === "loading" ||
                    !email.trim() ||
                    (!emailProtocolLink &&
                      !subscribeActivate &&
                      !subscribeInsights)
                  }
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-extrabold text-sm hover:bg-[var(--color-levl-cyan)]/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>
                    {emailStatus === "loading"
                      ? "Sending..."
                      : "Send my selected updates"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =================================================================
          DEEPCELL FORMULA & QUICK-ADD MODAL (<dialog closedby="any">)
          Allows exploring the full 12-ingredient formula & adding to cart
          without losing the personalized quiz results page.
         ================================================================= */}
      <dialog
        ref={deepCellDialogRef}
        {...({
          closedby: "any",
        } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby={deepCellDialogTitleId}
        className="m-auto w-[95vw] max-w-3xl max-h-[90vh] rounded-3xl p-0 bg-transparent border-0 outline-none backdrop:bg-black/75 backdrop:backdrop-blur-md open:animate-fade-in"
      >
        <div className="rounded-3xl bg-[#0B0E17] border border-white/15 p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[88vh] space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                LIFESPAN+ DeepCell • Full Clinical Formula
              </div>
              <h2
                id={deepCellDialogTitleId}
                className="text-xl sm:text-2xl font-extrabold text-white"
              >
                12 Clinically Dosed Nighttime &amp; Longevity Ingredients
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsDeepCellModalOpen(false)}
              aria-label="Close DeepCell formula dialog"
              className="p-2 rounded-full border border-white/15 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productContent.ingredients.map((ing) => (
              <div
                key={ing.name}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white">
                    {ing.name}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-levl-cyan)]">
                    {ing.dose}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-purple-300">
                  {ing.function}
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  {ing.whyItMatters}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <PurchaseBox product={product} judgeMeData={judgeMeData} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
