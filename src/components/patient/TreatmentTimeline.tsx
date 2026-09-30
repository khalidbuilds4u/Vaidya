import React from 'react';
import { Card } from '@/components/ui/card';
import { PlaneTakeoff, HeartPulse, Stethoscope, PlaneLanding } from 'lucide-react';

interface TimelineProps {
  hospitalStay: string;
  recoveryTime: string;
  preOpPrep: string[];
  postOpCare: string[];
}

export function TreatmentTimeline({ hospitalStay, recoveryTime, preOpPrep, postOpCare }: TimelineProps) {
  const steps = [
    {
      title: "Arrival & Pre-Op",
      icon: <PlaneLanding className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      description: "Initial consultation and diagnostic tests.",
      bullets: preOpPrep
    },
    {
      title: "The Procedure",
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      color: "bg-primary",
      description: `Surgery and immediate post-op care. Stay in hospital: ${hospitalStay}`,
      bullets: []
    },
    {
      title: "Recovery in India",
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
      description: `Rehabilitation and follow-ups. Estimated time: ${recoveryTime}`,
      bullets: postOpCare
    },
    {
      title: "Safe Return",
      icon: <PlaneTakeoff className="w-6 h-6 text-white" />,
      color: "bg-teal-600",
      description: "Final clearance from doctor and journey back home.",
      bullets: ["Fit-to-fly certificate provided", "Ongoing online consultations"]
    }
  ];

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold dark:text-white mb-8">Patient Journey Timeline</h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-8 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6 group">
              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center ${step.color} shadow-lg shadow-${step.color}/20 transform transition-transform group-hover:scale-110 duration-300`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <Card className="flex-1 p-5 md:p-6 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-teal-400/50 transition-colors shadow-sm">
                <h4 className="text-lg md:text-xl font-bold dark:text-white mb-2">{step.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium mb-3">{step.description}</p>
                
                {step.bullets && step.bullets.length > 0 && (
                  <ul className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 dark:bg-teal-400/60 mt-1.5 mr-3 shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
