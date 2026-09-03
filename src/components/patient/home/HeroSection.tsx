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

        {/* 3. Ambient Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300/20 blur-[120px] z-[2]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-teal-300/20 blur-[120px] z-[2]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Hero Card (Frosted Glass Container for High Readability) */}
          <div className="w-full lg:w-7/12 flex flex-col items-center sm:items-start text-center sm:text-left z-10">
            
            {/* Top Tagline Glass Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center text-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-sm border border-primary/20 bg-white/90 backdrop-blur-md max-w-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse hidden sm:block" />
              <span className="whitespace-normal leading-snug">{t('tagline')}</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18] sm:leading-[1.12] mb-2.5 sm:mb-4 transition-colors duration-500"
            >
              {t('titleLine1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-500">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-6 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-colors duration-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('pill1')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-colors duration-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('pill2')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-colors duration-500">
                <Clock className="w-4 h-4 text-primary dark:text-teal-400 shrink-0" />
                <span>{t('pill3')}</span>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-0 sm:mb-10 w-full max-w-xl mt-6 sm:mt-0"
            >
              <div className="flex-1 w-full">
                <EnquiryForm>
                  <Button size="lg" className="w-full text-sm sm:text-base h-14 sm:h-13 px-6 sm:px-8 rounded-2xl sm:rounded-full shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold active:scale-95 bg-emerald-600 hover:bg-emerald-500 text-white border-0">
                    {t('getFreePlan')}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </EnquiryForm>
              </div>
              <div className="flex-1 w-full">
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="w-full text-sm sm:text-base h-14 sm:h-13 px-6 sm:px-7 rounded-2xl sm:rounded-full glass-card hover:bg-white dark:hover:bg-slate-800 border-2 border-white/90 dark:border-slate-700 transition-all shadow-md font-bold text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/95" 
                >
                  <Link href="/hospitals">{t('exploreHospitals')}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sleek Frosted Glass Search Capsule */}
            <HeroSearchBar />
          </div>

          {/* Right Floating Glass Highlights (Shown on Tablet & Desktop) */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col gap-4 items-end justify-center">
            
            {/* Glass Highlight Card 1 (JCI & NABH Accreditation) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/80 dark:border-slate-700/80 flex items-center gap-3.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl max-w-sm w-full hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('card1Sub')}</p>
                <p className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{t('card1Title')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('card1Desc')}</p>
              </div>
            </motion.div>

            {/* Glass Highlight Card 2 (Success Rate & Volume) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/80 dark:border-slate-700/80 flex items-center gap-3.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl max-w-sm w-full hover:-translate-y-1 transition-all duration-300 -translate-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary dark:text-teal-400 shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('card2Sub')}</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{t('card2Title')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('card2Desc')}</p>
              </div>
            </motion.div>

            {/* Glass Highlight Card 3 (Verified Patient Review) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/80 dark:border-slate-700/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl max-w-sm w-full animate-float-delayed hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{t('card3Quote')}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>{t('card3Author')}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t('card3Proc')}</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
