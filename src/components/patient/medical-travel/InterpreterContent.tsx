"use client";

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Languages, Ear, Speech, BookOpen, Stethoscope, DoorOpen, Users, Headphones } from 'lucide-react';

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

export function InterpreterContent() {
  const t = useTranslations('MedicalTravel');

  const interpreterSteps = [
    { icon: Languages, titleKey: 'interpreters.step1Title', descKey: 'interpreters.step1Desc' },
    { icon: Ear, titleKey: 'interpreters.step2Title', descKey: 'interpreters.step2Desc' },
    { icon: Speech, titleKey: 'interpreters.step3Title', descKey: 'interpreters.step3Desc' },
    { icon: BookOpen, titleKey: 'interpreters.step4Title', descKey: 'interpreters.step4Desc' },
    { icon: Stethoscope, titleKey: 'interpreters.step5Title', descKey: 'interpreters.step5Desc' },
    { icon: DoorOpen, titleKey: 'interpreters.step6Title', descKey: 'interpreters.step6Desc' },
    { icon: Users, titleKey: 'interpreters.step7Title', descKey: 'interpreters.step7Desc' },
    { icon: Headphones, titleKey: 'interpreters.step8Title', descKey: 'interpreters.step8Desc' },
  ];

  return (
    <section id="interpreters" className="relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden min-h-[60vh]">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Languages className="w-4 h-4" />
            <span>{t('interpreters.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {t('interpreters.subtitle')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {t('interpreters.desc')}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {interpreterSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpVariant}
              className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/60 hover:border-teal-900/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-colors border border-slate-700/50 group-hover:border-teal-400">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-100 group-hover:text-white leading-snug">
                {t(step.titleKey as any).replace(/^\d+\.\s*/, '')}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t(step.descKey as any)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
