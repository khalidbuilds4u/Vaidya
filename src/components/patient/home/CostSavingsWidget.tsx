"use client";

import { useState } from "react";
import { Calculator, TrendingDown, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { m as motion, AnimatePresence } from "framer-motion";

const TREATMENTS = [
  { id: "knee", name: "Knee Replacement", usCost: 35000, inCost: 6500 },
  { id: "heart", name: "Heart Bypass (CABG)", usCost: 120000, inCost: 7500 },
  { id: "ivf", name: "IVF Treatment", usCost: 15000, inCost: 3500 },
  { id: "spine", name: "Spinal Fusion", usCost: 110000, inCost: 9000 },
  { id: "dental", name: "Dental Implants (Full)", usCost: 34000, inCost: 6000 },
];

export function CostSavingsWidget() {
  const [selected, setSelected] = useState(TREATMENTS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const savings = selected.usCost - selected.inCost;
  const savingsPercent = Math.round((savings / selected.usCost) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Estimate Your Savings</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">US vs India Costs</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-5">
        
        {/* Custom Select */}
        <div className="relative">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Select Procedure</label>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              {selected.name}
            </span>
            <span className="text-slate-400 text-xs">▼</span>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                {TREATMENTS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSelected(t); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0 font-medium text-slate-700 dark:text-slate-300"
                  >
                    {t.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cost Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">US/UK Avg Cost</p>
            <p className="text-lg font-bold text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600">{formatCurrency(selected.usCost)}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">India Cost (Est.)</p>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(selected.inCost)}</p>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Savings</p>
              <p className="text-sm font-bold text-white">{formatCurrency(savings)}</p>
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {savingsPercent}%
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl mt-1">
          Get Exact Quote
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
