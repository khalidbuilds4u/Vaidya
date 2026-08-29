"use client";

import { m as motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, ShieldCheck, Info, FileSignature, Files, Users, ClipboardList, Clock, ListChecks } from 'lucide-react';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function MedicalVisaContent() {
  const t = useTranslations('MedicalTravel');

  const visaSteps = [
    { icon: Info, titleKey: 'visa.step1Title', descKey: 'visa.step1Desc' },
    { icon: FileSignature, titleKey: 'visa.step2Title', descKey: 'visa.step2Desc' },
    { icon: Files, titleKey: 'visa.step3Title', descKey: 'visa.step3Desc' },
    { icon: Users, titleKey: 'visa.step4Title', descKey: 'visa.step4Desc' },
    { icon: ClipboardList, titleKey: 'visa.step5Title', descKey: 'visa.step5Desc' },
    { icon: Clock, titleKey: 'visa.step6Title', descKey: 'visa.step6Desc' },
    { icon: ListChecks, titleKey: 'visa.step7Title', descKey: 'visa.step7Desc' },
    { icon: ShieldCheck, titleKey: 'visa.step8Title', descKey: 'visa.step8Desc' },
  ];

  return (
    <div id="visa" className="container mx-auto px-4 py-20 mb-24 relative min-h-[60vh]">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/95 shadow-sm text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900 text-xs font-bold uppercase tracking-wider mb-4 transition-colors duration-500">
          <FileText className="w-4 h-4" />
          <span>{t('visa.title')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight transition-colors duration-500">
          {t('visa.subtitle')}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors duration-500">
          {t('visa.desc')}
        </p>
      </motion.div>

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {visaSteps.map((step, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUpVariant}
            className="bg-white dark:bg-slate-900/95 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(15,118,110,0.08)] transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm border border-teal-100/50 dark:border-teal-500/20">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                {t(step.titleKey as any)}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium transition-colors duration-500">
                {t(step.descKey as any)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
