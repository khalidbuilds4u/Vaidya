"use client";

import Link from 'next/link';
import { Stethoscope, ShieldCheck, PhoneCall, Headphones, Clock, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-2 border-primary/40 relative overflow-hidden pt-10 sm:pt-14 pb-20 sm:pb-10">
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Branding & Trust Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-8 mb-8 border-b border-slate-800/80 gap-5">
          <div className="space-y-2 max-w-xl">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-teal-300 flex items-center justify-center border border-teal-500/30 shadow-inner">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <span className="text-2xl tracking-tight leading-none block">
                  <span className="font-extrabold text-white">Asad</span>
                  <span className="font-semibold text-teal-400 ml-1">Healthcare</span>
                </span>
                <span className="text-[11px] font-medium text-teal-300/80 tracking-wide block mt-0.5">
                  {t('tagline')}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
              {t('desc')}
            </p>
          </div>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{t('badges.nabh')}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Headphones className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{t('badges.support')}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('badges.free')}</span>
            </div>
          </div>
        </div>

        {/* Multi-Column Horizontal Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Column 1: Discover */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              {t('discover.title')}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/hospitals" className="hover:text-teal-300 transition-colors">{t('discover.hospitals')}</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-300 transition-colors">{t('discover.doctors')}</Link></li>
              <li><Link href="/treatments" className="hover:text-teal-300 transition-colors">{t('discover.treatments')}</Link></li>
              <li><Link href="/gallery" className="hover:text-teal-300 transition-colors">{t('discover.gallery')}</Link></li>
              <li><Link href="/specialties" className="hover:text-teal-300 transition-colors">{t('discover.specialties')}</Link></li>
              <li><Link href="/conditions" className="hover:text-teal-300 transition-colors">{t('discover.conditions')}</Link></li>
              <li><Link href="/cities" className="hover:text-teal-300 transition-colors">{t('discover.cities')}</Link></li>
            </ul>
          </div>

          {/* Column 2: Patient Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              {t('support.title')}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/medical-travel" className="hover:text-teal-300 transition-colors">{t('support.visa')}</Link></li>
              <li><Link href="/medical-travel#accommodation" className="hover:text-teal-300 transition-colors">{t('support.accommodation')}</Link></li>
              <li><Link href="/medical-travel#interpreters" className="hover:text-teal-300 transition-colors">{t('support.interpreters')}</Link></li>
              <li><Link href="/medical-travel" className="hover:text-teal-300 transition-colors">{t('support.airport')}</Link></li>
              <li><Link href="/search" className="hover:text-teal-300 transition-colors">{t('support.search')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Helpline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              {t('contact.title')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a 
                  href="tel:+919451187513" 
                  className="font-bold text-white hover:text-teal-300 transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>+91 94511 87513</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/919451187513" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t('contact.whatsapp')}</span>
                </a>
              </li>
              <li className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{t('contact.responseTime')}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              {t('legal.title')}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-teal-300 transition-colors">{t('legal.privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-teal-300 transition-colors">{t('legal.terms')}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-teal-300 transition-colors">{t('legal.disclaimer')}</Link></li>
              <li><Link href="/medical-travel" className="hover:text-teal-300 transition-colors">{t('legal.safety')}</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <p className="text-center sm:text-right text-[11px] text-slate-500">
            {t('certified')}
          </p>
        </div>
      </div>
    </footer>
  );
}
