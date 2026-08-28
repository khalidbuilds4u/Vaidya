"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Star, Sparkles, Clock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { motion } from 'framer-motion';

export function HeroSection() {
  const router = useRouter();
  const t = useTranslations('Hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim() && !searchCity) return;
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (searchCity) params.append('city', searchCity);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative pt-6 pb-28 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-slate-100 border-b border-slate-200/80">
      
      {/* 1. Vibrant High-Res Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-100 sm:scale-[1.02] transition-transform duration-1000"
        style={{
          backgroundImage: `url('/images/hero-hospital-premium.jpg')`,
        }}
      />

      {/* 2. Light Left Gradient Overlay (keeps left text area crisp white) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 lg:via-white/55 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-[1]" />

      {/* 3. Ambient Glowing Orbs (Soft, light-toned) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300/20 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-teal-300/20 blur-[120px] pointer-events-none z-[2]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Hero Card (Frosted Glass Container for High Readability) */}
          <div className="w-full lg:w-7/12 flex flex-col items-start text-left z-10">
            
            {/* Top Tagline Glass Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-5 shadow-sm border border-primary/20 bg-white/90 backdrop-blur-md max-w-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
              <span className="truncate">{t('tagline')}</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.12] mb-2.5 sm:mb-4"
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
              className="text-xs sm:text-base md:text-lg text-slate-700 mb-4 sm:mb-6 max-w-xl leading-relaxed font-medium"
            >
              {t('subtext')}
            </motion.p>

            {/* Quick Trust Highlights Row on Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-6 text-[11px] sm:text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('pill1')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('pill2')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{t('pill3')}</span>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-0 sm:mb-10 w-full max-w-xl mt-14 sm:mt-0"
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
                  className="w-full text-sm sm:text-base h-14 sm:h-13 px-6 sm:px-7 rounded-2xl sm:rounded-full glass-card hover:bg-white border-2 border-white/90 transition-all shadow-md font-bold text-slate-800 bg-white/95" 
                >
                  <Link href="/hospitals">{t('exploreHospitals')}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sleek Frosted Glass Search Capsule */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden sm:flex w-full max-w-xl p-2 sm:p-2.5 rounded-2xl sm:rounded-full flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 relative z-20 shadow-[0_10px_40px_rgba(15,118,110,0.15)] bg-white/90 backdrop-blur-xl border border-white"
            >
              <div className="flex items-center flex-1 px-3 sm:px-4 pl-3.5 sm:pl-5 py-1 sm:py-0 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 shrink-0" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('searchPlaceholder')}
                  className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-base h-9 sm:h-11 px-0 bg-transparent placeholder:text-slate-400 text-slate-900 font-medium"
                />
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-slate-200 mx-1"></div>
              
              <div className="flex items-center flex-1 px-3 sm:px-4 py-1 sm:py-0 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1.5 shrink-0" />
                <select 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent border-0 text-slate-800 font-semibold focus:ring-0 text-xs sm:text-base h-9 sm:h-11 cursor-pointer outline-none"
                >
                  <option value="" className="text-slate-900">{t('anyCity')}</option>
                  <option value="New Delhi" className="text-slate-900">New Delhi</option>
                  <option value="Mumbai" className="text-slate-900">Mumbai</option>
                  <option value="Chennai" className="text-slate-900">Chennai</option>
                  <option value="Bangalore" className="text-slate-900">Bangalore</option>
                  <option value="Hyderabad" className="text-slate-900">Hyderabad</option>
                </select>
              </div>

              <Button 
                size="lg" 
                onClick={handleSearch} 
                className="w-full sm:w-auto rounded-xl sm:rounded-full h-10 sm:h-11 px-8 shadow-[0_4px_14px_rgba(15,118,110,0.5)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.7)] transition-all font-bold shrink-0 bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm"
              >
                {t('searchButton')}
              </Button>
            </motion.div>
          </div>

          {/* Right Floating Glass Highlights (Shown on Tablet & Desktop) */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col gap-4 items-end justify-center">
            
            {/* Glass Highlight Card 1 (JCI & NABH Accreditation) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 bg-white/85 backdrop-blur-xl max-w-sm w-full hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('card1Sub')}</p>
                <p className="text-base font-extrabold text-slate-900 leading-tight">{t('card1Title')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('card1Desc')}</p>
              </div>
            </motion.div>

            {/* Glass Highlight Card 2 (Success Rate & Volume) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 bg-white/85 backdrop-blur-xl max-w-sm w-full hover:-translate-y-1 transition-transform duration-300 -translate-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('card2Sub')}</p>
                <p className="text-xl font-extrabold text-slate-900 leading-tight">{t('card2Title')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('card2Desc')}</p>
              </div>
            </motion.div>

            {/* Glass Highlight Card 3 (Verified Patient Review) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 bg-white/85 backdrop-blur-xl max-w-sm w-full animate-float-delayed hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">{t('card3Quote')}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <span>{t('card3Author')}</span>
                <span className="text-emerald-600 font-bold">{t('card3Proc')}</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
