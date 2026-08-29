"use client";

import { m as motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Hotel, Building, MapPin, HeartHandshake, Calendar, CheckSquare, Car, Users, CalendarPlus } from 'lucide-react';

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

export function AccommodationContent() {
  const t = useTranslations('MedicalTravel');

  const accommodationSteps = [
    { icon: Building, titleKey: 'accommodation.step1Title', descKey: 'accommodation.step1Desc' },
    { icon: MapPin, titleKey: 'accommodation.step2Title', descKey: 'accommodation.step2Desc' },
    { icon: HeartHandshake, titleKey: 'accommodation.step3Title', descKey: 'accommodation.step3Desc' },
    { icon: Calendar, titleKey: 'accommodation.step4Title', descKey: 'accommodation.step4Desc' },
    { icon: CheckSquare, titleKey: 'accommodation.step5Title', descKey: 'accommodation.step5Desc' },
    { icon: Car, titleKey: 'accommodation.step6Title', descKey: 'accommodation.step6Desc' },
    { icon: Users, titleKey: 'accommodation.step7Title', descKey: 'accommodation.step7Desc' },
    { icon: CalendarPlus, titleKey: 'accommodation.step8Title', descKey: 'accommodation.step8Desc' },
  ];

  return (
    <div id="accommodation" className="container mx-auto px-4 py-20 relative min-h-[60vh]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Sticky Left Intro */}
        <div className="lg:w-1/3">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="lg:sticky lg:top-36"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6 border border-teal-100 dark:border-teal-500/20 transition-colors duration-500">
              <Hotel className="w-4 h-4" />
              <span>{t('accommodation.title')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1] transition-colors duration-500">
              {t('accommodation.subtitle')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 transition-colors duration-500">
              {t('accommodation.desc')}
            </p>
            
            {/* Optional Decoration */}
            <div className="hidden lg:block w-32 h-1 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full opacity-50" />
          </motion.div>
        </div>

        {/* Right Scrolling Stack */}
        <div className="lg:w-2/3">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            {accommodationSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                className="bg-white dark:bg-slate-900/95 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-5 sm:gap-6 items-start hover:shadow-md transition-all duration-300 group hover:border-teal-100 dark:hover:border-teal-900/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform border border-teal-100/50 dark:border-teal-500/20">
                  <step.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white transition-colors duration-500">
                    {t(step.titleKey as any).replace(/^\d+\.\s*/, '')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed transition-colors duration-500">
                    {t(step.descKey as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
