import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface CostComparisonProps {
  minEstimate: number;
  maxEstimate: number;
  currency?: string;
}

export function CostComparison({ minEstimate, maxEstimate, currency = '$' }: CostComparisonProps) {
  // Calculate approximate costs for US/UK (typically 4x to 8x more expensive)
  const usMinEstimate = minEstimate * 5;
  const usMaxEstimate = maxEstimate * 6;
  const savingsPercent = Math.round(((usMaxEstimate - maxEstimate) / usMaxEstimate) * 100);

  return (
    <div className="my-10 relative">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-teal-400/10 dark:from-primary/5 dark:to-teal-400/5 rounded-3xl transform -rotate-1 scale-105 -z-10 blur-xl"></div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* US/UK Cost Card */}
        <Card className="flex-1 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80">
          <div className="flex flex-col h-full">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Cost in US/UK</span>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {currency}{usMinEstimate.toLocaleString()} - {currency}{usMaxEstimate.toLocaleString()}
            </div>
            
            <div className="space-y-4 mt-auto">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Long waiting periods (months)</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Extremely high out-of-pocket expenses</span>
              </div>
            </div>
          </div>
        </Card>

        {/* India Cost Card (Highlighted) */}
        <Card className="flex-1 p-6 sm:p-8 bg-white dark:bg-slate-950 border-primary/50 dark:border-teal-400/50 shadow-xl shadow-primary/10 relative overflow-hidden ring-1 ring-primary/20">
          {/* Highlight Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-teal-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
            Save up to {savingsPercent}%
          </div>
          
          <div className="flex flex-col h-full z-10 relative">
            <span className="text-sm font-semibold text-primary dark:text-teal-400 uppercase tracking-wider mb-2">Cost in India</span>
            <div className="text-4xl font-black text-slate-900 dark:text-white mb-6">
              {currency}{minEstimate.toLocaleString()} - {currency}{maxEstimate.toLocaleString()}
            </div>
            
            <div className="space-y-4 mt-auto">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">JCI/NABH Accredited Hospitals</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Zero waiting time</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Top global surgeons & luxury care</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
