"use client";

import { useState, useEffect } from "react";
import { X, Stethoscope, ArrowRight, Clock } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const SESSION_KEY = "asad_popup_dismissed";
const DELAY_MS = 8000; // 8 seconds

export function TimedPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const t = useTranslations("TimedPopup");

  useEffect(() => {
    // Don't show if already dismissed this session
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      // Small delay so CSS transition runs after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 350);
  };

  const handleOpenForm = () => {
    dismiss();
    // Small delay so popup closes before dialog opens
    setTimeout(() => setFormOpen(true), 400);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Invisible trigger for EnquiryForm — controlled programmatically */}
      <EnquiryForm externalOpen={formOpen} onExternalOpenChange={setFormOpen}>
        {/* No visible child needed; form is opened via externalOpen */}
        <span />
      </EnquiryForm>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={dismiss}
      />

      {/* Popup Card */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md transition-all duration-350 ease-out ${
          isAnimating
            ? "translate-x-[-50%] translate-y-0 opacity-100"
            : "translate-x-[-50%] translate-y-8 opacity-0"
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Gradient Header */}
          <div className="bg-gradient-to-br from-[#123654] to-[#0a2440] px-6 py-5">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-500/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <div className="mt-0.5 w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-teal-400" />
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-1">
                  {t('freeConsultation')}
                </p>
                <h3 className="text-lg font-extrabold text-white leading-snug">
                  {t('heading')}
                </h3>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed">
                  {t('subheading')}
                </p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={dismiss}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white dark:bg-slate-950 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              <span>{t('timeEstimate')}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={dismiss}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                {t('noThanks')}
              </button>
              <Button
                onClick={handleOpenForm}
                className="h-9 px-5 rounded-xl bg-[#123654] hover:bg-[#0d2a42] text-white text-sm font-bold shadow-lg shadow-[#123654]/20 flex items-center gap-2"
              >
                {t('getPlan')}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
