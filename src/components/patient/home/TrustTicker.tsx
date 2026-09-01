"use client";

import { ShieldCheck, HeartPulse, Clock, Sparkles, CheckCircle2, Award } from "lucide-react";

const TRUST_POINTS = [
  { text: "JCI & NABH Accredited", icon: ShieldCheck },
  { text: "Zero Wait Times", icon: Clock },
  { text: "Up to 70% Cost Savings", icon: Sparkles },
  { text: "Dedicated Translators", icon: HeartPulse },
  { text: "Top Indian Surgeons", icon: Award },
  { text: "Seamless Visa Support", icon: CheckCircle2 },
];

export function TrustTicker() {
  // Duplicate array multiple times to ensure the marquee spans ultra-wide monitors
  const items = [...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS];

  return (
    <div className="w-full bg-emerald-500/5 dark:bg-teal-500/10 border-y border-emerald-500/10 dark:border-teal-500/20 py-3 sm:py-4 overflow-hidden flex relative mt-8 sm:mt-12 lg:mt-16 z-20">
      
      {/* Inline styles for the marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 45s linear infinite;
        }
      `}} />

      {/* Gradient edges for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused] cursor-default">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-2.5 px-6 sm:px-10"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-teal-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap uppercase tracking-wider">
                {item.text}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 dark:bg-teal-500/40 ml-6 sm:ml-10 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
