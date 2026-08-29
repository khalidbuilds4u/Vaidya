"use client";

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { PlaneLanding, PlaneTakeoff, Car, MapPin, HeartHandshake, Users, CalendarClock, Navigation, Plane } from 'lucide-react';

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

export function AirportTransferContent() {
  const t = useTranslations('MedicalTravel');

  const airportSteps = [
    { icon: PlaneLanding, titleKey: 'airportTransfer.step1Title', descKey: 'airportTransfer.step1Desc' },
    { icon: PlaneTakeoff, titleKey: 'airportTransfer.step2Title', descKey: 'airportTransfer.step2Desc' },
    { icon: Car, titleKey: 'airportTransfer.step3Title', descKey: 'airportTransfer.step3Desc' },
    { icon: MapPin, titleKey: 'airportTransfer.step4Title', descKey: 'airportTransfer.step4Desc' },
    { icon: HeartHandshake, titleKey: 'airportTransfer.step5Title', descKey: 'airportTransfer.step5Desc' },
    { icon: Users, titleKey: 'airportTransfer.step6Title', descKey: 'airportTransfer.step6Desc' },
    { icon: CalendarClock, titleKey: 'airportTransfer.step7Title', descKey: 'airportTransfer.step7Desc' },
    { icon: Navigation, titleKey: 'airportTransfer.step8Title', descKey: 'airportTransfer.step8Desc' },
  ];

  return (
    <div id="airport-transfer" className="container mx-auto px-4 py-24 sm:py-32 relative min-h-[60vh]">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-6 transition-colors duration-500">
          <Plane className="w-4 h-4" />
          <span>{t('airportTransfer.title')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors duration-500">
          {t('airportTransfer.subtitle')}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors duration-500">
          {t('airportTransfer.desc')}
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Central Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-100 via-teal-100 to-transparent -translate-x-1/2 rounded-full" />
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-col gap-8 md:gap-16"
        >
          {airportSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Node (Center) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-emerald-500 text-white items-center justify-center z-10 shadow-lg shadow-emerald-500/20 transition-colors duration-500">
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mb-[-1rem] z-10 shadow-sm border border-emerald-100 dark:border-emerald-500/20 transition-colors duration-500">
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className="bg-white dark:bg-slate-900/95 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 hover:border-emerald-100 dark:hover:border-emerald-900/50 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] transition-all duration-300">
                    <div className="text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-2 tracking-widest uppercase transition-colors duration-500">
                      Step {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                      {t(step.titleKey as any).replace(/^\d+\.\s*/, '')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors duration-500">
                      {t(step.descKey as any)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
