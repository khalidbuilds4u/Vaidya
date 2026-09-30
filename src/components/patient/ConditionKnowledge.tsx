import React from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Stethoscope, FileSearch, ShieldCheck } from 'lucide-react';

interface ConditionKnowledgeProps {
  causesAndSymptoms?: string[];
  diagnosis?: string[];
  treatmentOptions?: string[];
}

export function ConditionKnowledge({ causesAndSymptoms, diagnosis, treatmentOptions }: ConditionKnowledgeProps) {
  if (!causesAndSymptoms?.length && !diagnosis?.length && !treatmentOptions?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
      {/* Symptoms & Causes */}
      {causesAndSymptoms && causesAndSymptoms.length > 0 && (
        <Card className="p-8 bg-white dark:bg-slate-900 border-t-4 border-t-rose-500 shadow-lg shadow-rose-500/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-rose-100 dark:bg-rose-950 rounded-xl text-rose-600 dark:text-rose-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Common Symptoms</h3>
          </div>
          <ul className="space-y-4">
            {causesAndSymptoms.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 mr-3 shrink-0"></span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Diagnosis */}
      {diagnosis && diagnosis.length > 0 && (
        <Card className="p-8 bg-white dark:bg-slate-900 border-t-4 border-t-blue-500 shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-xl text-blue-600 dark:text-blue-400">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">How it is Diagnosed</h3>
          </div>
          <ul className="space-y-4">
            {diagnosis.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-3 shrink-0"></span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Treatment Options */}
      {treatmentOptions && treatmentOptions.length > 0 && (
        <Card className="p-8 bg-white dark:bg-slate-900 border-t-4 border-t-emerald-500 shadow-lg shadow-emerald-500/5 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 rounded-xl text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Available Treatment Options</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {treatmentOptions.map((item, i) => (
              <div key={i} className="flex items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <Stethoscope className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
