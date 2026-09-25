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
                  <Button size="lg" className="w-full text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-lg shadow-sm transition-all font-semibold bg-primary hover:bg-primary/90 text-white border-0">
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
                  className="w-full text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-7 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 transition-all font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-950" 
                >
                  <Link href="/hospitals">{t('exploreHospitals')}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sleek Frosted Glass Search Capsule */}
            <HeroSearchBar />
          </div>

          {/* Right Floating Highlights (Shown on Tablet & Desktop) */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col gap-4 items-end justify-center">
            
            {/* Highlight Card 1 (JCI & NABH Accreditation) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('card1Sub')}</p>
                <p className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{t('card1Title')}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{t('card1Desc')}</p>
              </div>
            </motion.div>

            {/* Highlight Card 2 (Success Rate & Volume) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900 max-w-sm w-full -translate-x-4"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('card2Sub')}</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{t('card2Title')}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{t('card2Desc')}</p>
              </div>
            </motion.div>

            {/* Highlight Card 3 (Verified Patient Review) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-sm w-full"
            >
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{t('card3Quote')}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                <span>{t('card3Author')}</span>
                <span className="text-primary font-bold">{t('card3Proc')}</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
