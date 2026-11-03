"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Calendar,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { activateContent } from "@/content/productActivate";

export function ActivateGuaranteeStrip() {
  const icons = [ShieldCheck, Calendar, Truck, RefreshCcw];

  return (
    <div className="border-y border-[var(--color-levl-panel-border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {activateContent.purchaseOptions.trustRow.map((trustItem, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--color-levl-cyan)]" />
                </div>
                <span className="text-sm font-medium text-[var(--color-levl-text-secondary)]">
                  {trustItem}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ActivateFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)]">
          Everything you need to know about LIFESPAN+ Activate and our pre-launch
          waitlist.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {activateContent.faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-[var(--color-levl-text-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
