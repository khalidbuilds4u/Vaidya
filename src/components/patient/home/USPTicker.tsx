"use client";

import { Award, CheckCircle2, ShieldCheck, Clock, Sparkles } from "lucide-react";

const USP = [
  { text: "TOP INDIAN SURGEONS", icon: Award },
  { text: "SEAMLESS VISA SUPPORT", icon: CheckCircle2 },
  { text: "JCI & NABH ACCREDITED", icon: ShieldCheck },
  { text: "ZERO WAIT TIMES", icon: Clock },
  { text: "UP TO 70% COST SAVINGS", icon: Sparkles },
];

export function USPTicker() {
  // Duplicate array multiple times to ensure enough width for continuous scrolling
  const items = [...USP, ...USP, ...USP, ...USP];

  return (
    <div className="hidden md:flex w-full bg-[#F4FBFA] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-3 overflow-hidden relative z-10">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="animate-custom-marquee">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 pr-8">
              <Icon className="w-4 h-4 text-primary mr-2" />
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                {item.text}
              </span>
              <span className="text-primary/40 text-[8px] ml-8">●</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
