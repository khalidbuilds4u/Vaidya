"use client";

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, ShieldCheck, Info, FileSignature, Files, Users, ClipboardList, Clock, ListChecks, Building, MapPin, HeartHandshake, Calendar, CheckSquare, Car, CalendarPlus, Languages, Ear, Speech, BookOpen, Stethoscope, DoorOpen, Headphones, PlaneLanding, PlaneTakeoff, Navigation, CalendarClock, Map, ArrowRight, Plane, Hotel } from 'lucide-react';

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

export function MedicalTravelContent() {
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
    <>
      {/* 2. Medical Visa Assistance (Numbered Process Layout) */}
      <div id="visa" className="scroll-mt-28 container mx-auto px-4 mt-20 mb-24 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm text-teal-600 border border-teal-100 text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" />
            <span>{t('visa.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            {t('visa.subtitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
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
              className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(15,118,110,0.08)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Giant Background Number */}
              <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-slate-50/80 group-hover:text-teal-50/80 transition-colors leading-none z-0 pointer-events-none select-none">
                {idx + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm border border-teal-100/50">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 leading-tight">
                  {t(step.titleKey as any)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {t(step.descKey as any)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. Accommodation & Stay (Sticky Split-View Layout) */}
      <div id="accommodation" className="scroll-mt-28 container mx-auto px-4 py-20 border-t border-slate-200/60 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Sticky Left Intro */}
          <div className="lg:w-1/3">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="lg:sticky lg:top-36"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                <Hotel className="w-4 h-4" />
                <span>{t('accommodation.title')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                {t('accommodation.subtitle')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
                {t('accommodation.desc')}
              </p>
              
              {/* Optional Decoration */}
              <div className="hidden lg:block w-32 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full opacity-50" />
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
                  className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-5 sm:gap-6 items-start hover:shadow-md transition-shadow group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform border border-blue-100/50">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                      {t(step.titleKey as any).replace(/^\d+\.\s*/, '')}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {t(step.descKey as any)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Language Interpreters (Dark Premium Layout) */}
      <section id="interpreters" className="scroll-mt-24 relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden">
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

      {/* 5. Airport Transfer Services (Journey Timeline Layout) */}
      <div id="airport-transfer" className="scroll-mt-28 container mx-auto px-4 py-24 sm:py-32 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-6">
            <Plane className="w-4 h-4" />
            <span>{t('airportTransfer.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            {t('airportTransfer.subtitle')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
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
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-slate-50 bg-emerald-500 text-white items-center justify-center z-10 shadow-lg shadow-emerald-500/20">
                    <step.icon className="w-5 h-5" />
                  </div>

                  {/* Mobile Icon */}
                  <div className="md:hidden w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mb-[-1rem] z-10 shadow-sm border border-emerald-100">
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-emerald-100 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] transition-all duration-300">
                      <div className="text-emerald-600 text-sm font-bold mb-2 tracking-widest uppercase">
                        Step {idx + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight">
                        {t(step.titleKey as any).replace(/^\d+\.\s*/, '')}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-medium">
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
    </>
  );
}
