"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShieldCheck, Star, Sparkles, Clock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { m as motion } from 'framer-motion';
import { HeroSearchBar } from './HeroSearchBar';
import { CostSavingsWidget } from './CostSavingsWidget';

export function HeroSection() {
  const t = useTranslations('Hero');



  return (
    <section className="relative pt-6 pb-28 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-32 bg-slate-100 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-500">
      
      {/* Background Elements Wrapper (with overflow-hidden to prevent spillover) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 1. Vibrant High-Res Background Image */}
        <div className="absolute inset-0 scale-100 sm:scale-[1.02] transition-transform duration-1000">
          <Image 
            src="/images/hero-hospital-premium.jpg" 
            alt="Hospital Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>

        {/* 2. Light Left Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 lg:via-white/55 dark:from-slate-950/95 dark:via-slate-950/75 dark:lg:via-slate-950/55 to-transparent z-[1] transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 dark:from-slate-900/40 to-transparent z-[1] transition-colors duration-500" />

      </div>

      <div className="container mx-auto px-4 relative z-40">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Hero Card (Frosted Glass Container for High Readability) */}
          <div className="w-full lg:w-7/12 flex flex-col items-center sm:items-start text-center sm:text-left z-10">
            
            {/* Top Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center text-center gap-2 px-3 py-1 rounded-md text-slate-700 dark:text-slate-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-full"
            >
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
              <span className="whitespace-normal leading-snug">{t('tagline')}</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4 transition-colors duration-500"
            >
              {t('titleLine1')} <br className="hidden sm:inline" />
              <span className="text-primary">
                {t('titleLine2')}
              </span>
            </motion.h1>
            
            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs sm:text-base md:text-lg text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 max-w-xl leading-relaxed font-medium transition-colors duration-500"
            >
              {t('subtext')}
            </motion.p>

            {/* Quick Trust Highlights Row on Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hidden sm:flex flex-wrap items-center gap-4 sm:gap-6 mb-5 sm:mb-6 text-[12px] sm:text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{t('pill1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{t('pill2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{t('pill3')}</span>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-0 sm:mb-10 w-full max-w-xl mt-6 sm:mt-0"
            >
              <div className="flex-1 w-full">
                <EnquiryForm>
                  <Button size="lg" className="w-full text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-lg transition-all font-semibold bg-transparent hover:bg-primary/10 text-primary border-2 border-primary backdrop-blur-sm">
                    {t('getFreePlan')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </EnquiryForm>
              </div>
              <div className="flex-1 w-full">
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="w-full text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-7 rounded-lg hover:bg-slate-800/5 dark:hover:bg-white/5 border-2 border-slate-800 dark:border-white transition-all font-semibold text-slate-900 dark:text-white bg-transparent backdrop-blur-sm" 
                >
                  <Link href="/hospitals">{t('exploreHospitals')}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sleek Frosted Glass Search Capsule */}
            <HeroSearchBar />
          </div>

          {/* Right Floating Cost Estimator */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col items-end justify-center" style={{ perspective: "1000px" }}>
             <motion.div
               initial={{ opacity: 0, rotateY: 15, x: 40 }}
               animate={{ opacity: 1, rotateY: 0, x: 0 }}
               transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.2 }}
               className="w-full max-w-sm"
             >
               <CostSavingsWidget />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
