import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Users, Star, Activity } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SpecialtyStatsProps {
  specialtyName: string;
  statSuccessRate?: string | null;
  statPatients?: string | null;
  statHospitals?: string | null;
  statCostSavings?: string | null;
}

export function SpecialtyStats({ 
  specialtyName, 
  statSuccessRate, 
  statPatients, 
  statHospitals, 
  statCostSavings 
}: SpecialtyStatsProps) {
  // Using English text directly for now.
  const stats = [
    {
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      value: statSuccessRate || "98%",
      label: "Success Rate",
      description: "Highest clinical success rates globally"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: statPatients || "50,000+",
      label: "Global Patients",
      description: `Treated for ${specialtyName}`
    },
    {
      icon: <Activity className="w-8 h-8 text-rose-500" />,
      value: statHospitals || "100+",
      label: "JCI Hospitals",
      description: "Top accredited facilities"
    },
    {
      icon: <Star className="w-8 h-8 text-amber-400" />,
      value: statCostSavings || "70%",
      label: "Cost Savings",
      description: "Compared to US/UK prices"
    }
  ];

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Why Choose India for {specialtyName}?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
          India has emerged as the global capital for {specialtyName.toLowerCase()}, offering cutting-edge technology, world-renowned surgeons, and luxury care at a fraction of the cost.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-teal-400/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="font-bold text-primary dark:text-teal-400 mb-2">{stat.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
