"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Star, Sparkles, Clock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

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
    <section className="relative pt-6 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-slate-100 border-b border-slate-200/80">
      
      {/* 1. Vibrant High-Res Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-100 sm:scale-[1.02] transition-transform duration-1000"
        style={{
          backgroundImage: `url('/images/hero-hospital-premium.jpg')`,
        }}
      />

      {/* 2. Very Subtle Dark/Vignette Overlay (Lets the vibrancy shine through but ensures text is readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/10 pointer-events-none" />

      {/* 3. Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Hero Card (Frosted Glass Container for High Readability) */}
          <div className="w-full lg:w-7/12 flex flex-col items-start text-left z-10">
            
            {/* Top Tagline Glass Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-5 shadow-lg border border-white/20 bg-black/30 backdrop-blur-md max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
              <span className="truncate">{t('tagline')}</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.12] mb-2.5 sm:mb-4 drop-shadow-md">
              {t('titleLine1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
                {t('titleLine2')}
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-xs sm:text-base md:text-lg text-slate-100 mb-4 sm:mb-6 max-w-xl leading-relaxed font-medium drop-shadow-sm">
              {t('subtext')}
            </p>

            {/* Quick Trust Highlights Row on Mobile */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-6 text-[11px] sm:text-xs font-semibold text-white">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('pill1')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('pill2')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('pill3')}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8 w-full sm:w-auto">
              <EnquiryForm>
                <Button size="lg" className="flex-1 sm:flex-none text-xs sm:text-base h-11 sm:h-13 px-5 sm:px-8 rounded-full shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold active:scale-95">
                  {t('getFreePlan')}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                </Button>
              </EnquiryForm>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="flex-1 sm:flex-none text-xs sm:text-base h-11 sm:h-13 px-4 sm:px-7 rounded-full glass-card hover:bg-white border border-slate-300/80 transition-all shadow-xs font-semibold text-slate-800 bg-white/90" 
              >
                <Link href="/hospitals">{t('exploreHospitals')}</Link>
              </Button>
            </div>

            {/* Sleek Frosted Glass Search Capsule */}
            <div className="w-full max-w-xl p-1.5 sm:p-2.5 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 relative z-20 shadow-[0_8px_32px_rgba(0,0,0,0.15)] bg-white/10 backdrop-blur-2xl border border-white/30">
              <div className="flex items-center flex-1 px-3 sm:px-4 pl-3.5 sm:pl-5 py-1 sm:py-0 bg-white/40 sm:bg-transparent rounded-xl sm:rounded-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2 shrink-0" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('searchPlaceholder')}
                  className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-base h-9 sm:h-11 px-0 bg-transparent placeholder:text-white/80 text-white font-medium"
                />
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20 mx-1"></div>
              
              <div className="flex items-center flex-1 px-3 sm:px-4 py-1 sm:py-0 bg-white/40 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-1.5 shrink-0" />
                <select 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent border-0 text-white font-semibold focus:ring-0 text-xs sm:text-base h-9 sm:h-11 cursor-pointer outline-none appearance-none"
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
            </div>
          </div>

          {/* Right Floating Glass Highlights (Shown on Tablet & Desktop) */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col gap-4 items-end justify-center">
            
            {/* Glass Highlight Card 1 (JCI & NABH Accreditation) */}
            <div className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 flex items-center gap-3.5 bg-white/20 backdrop-blur-2xl max-w-sm w-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white/30 border border-white/40 flex items-center justify-center shrink-0 text-white shadow-inner backdrop-blur-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{t('card1Sub')}</p>
                <p className="text-base font-extrabold text-white leading-tight">{t('card1Title')}</p>
                <p className="text-[11px] text-white/90 mt-0.5">{t('card1Desc')}</p>
              </div>
            </div>

            {/* Glass Highlight Card 2 (Success Rate & Volume) */}
            <div className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 flex items-center gap-3.5 bg-white/20 backdrop-blur-2xl max-w-sm w-full hover:-translate-y-1 transition-transform duration-300 -translate-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/30 border border-white/40 flex items-center justify-center shrink-0 text-white shadow-inner backdrop-blur-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{t('card2Sub')}</p>
                <p className="text-xl font-extrabold text-white leading-tight">{t('card2Title')}</p>
                <p className="text-[11px] text-white/90 mt-0.5">{t('card2Desc')}</p>
              </div>
            </div>

            {/* Glass Highlight Card 3 (Verified Patient Review) */}
            <div className="p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 bg-white/20 backdrop-blur-2xl max-w-sm w-full animate-float-delayed hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300 drop-shadow-sm" />
                ))}
              </div>
              <p className="text-sm font-bold text-white leading-snug drop-shadow-sm">{t('card3Quote')}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[11px] text-white/90 font-medium">
                <span>{t('card3Author')}</span>
                <span className="text-amber-300 font-bold drop-shadow-sm">{t('card3Proc')}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
