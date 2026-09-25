"use client";

import { FileText, Stethoscope, Plane, HeartHandshake } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { m as motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Share Medical Reports',
    description: 'Submit your symptoms and diagnostic scans securely through our website or WhatsApp.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Free Medical Opinions',
    description: 'Top Indian doctors evaluate your case and provide comparative hospital quotes within 24 hours.',
    icon: Stethoscope,
  },
  {
    step: '03',
    title: 'Visa & Travel Concierge',
    description: 'Receive hospital visa invitation letters (VIL), airport pickup, and dedicated hotel accommodations.',
    icon: Plane,
  },
  {
    step: '04',
    title: 'Treatment & Recovery',
    description: 'Personal case manager and translator guide you from pre-op admission to post-discharge care.',
    icon: HeartHandshake,
  }
];

export function HowProcessWorks() {
  const t = useTranslations('Process');

  const localizedSteps = [
    {
      step: '01',
      title: t('steps.step1.title'),
      description: t('steps.step1.desc'),
      icon: FileText,
    },
    {
      step: '02',
      title: t('steps.step2.title'),
      description: t('steps.step2.desc'),
      icon: Stethoscope,
    },
    {
      step: '03',
      title: t('steps.step3.title'),
      description: t('steps.step3.desc'),
      icon: Plane,
    },
    {
      step: '04',
      title: t('steps.step4.title'),
      description: t('steps.step4.desc'),
      icon: HeartHandshake,
    }
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-900 text-white">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
            {t('tag')}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-white">
            {t('title')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {t('desc')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {localizedSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-700 hover:border-slate-600 transition-colors duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-primary border border-slate-600">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-slate-600 group-hover:text-teal-400/70 transition-colors font-mono">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-teal-300 transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10 text-xs font-semibold text-teal-400 flex items-center gap-1">
                  <span>{t('stepPrefix')} {step.step}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{t('freeTag')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Support Banner */}
        <div className="mt-12 sm:mt-16 mx-auto max-w-4xl bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 text-center">
          <p className="text-teal-50 text-base sm:text-lg lg:text-xl font-medium tracking-wide leading-relaxed relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400 shrink-0" />
            <span>{t('supportBanner')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
