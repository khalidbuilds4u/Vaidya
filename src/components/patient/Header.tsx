"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Stethoscope, Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { LanguageSwitcher } from '@/components/patient/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Navigation');

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_20px_rgba(15,118,110,0.04)] transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2.5 group" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-teal-500/20 flex items-center justify-center border border-primary/20 shadow-sm group-hover:scale-105 transition-transform">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl tracking-tight leading-none">
                <span className="font-extrabold text-slate-900">Asad</span>
                <span className="font-semibold text-primary ml-1">Healthcare</span>
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-semibold text-primary/90 tracking-tight block mt-0.5">
                Global Trust • World-Class Healing
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-wrap items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium">
          <Link href="/" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap">
            {t('home')}
          </Link>
          <Link href="/hospitals" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            {t('hospitals')}
          </Link>
          <Link href="/doctors" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            {t('doctors')}
          </Link>
          <Link href="/treatments" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            {t('procedures')}
          </Link>
          <Link href="/patient-stories" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap">
            {t('patientStories')}
          </Link>
          <Link href="/services" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            {t('services')}
          </Link>
          <Link href="/blogs" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            {t('blogs')}
          </Link>
          <Link href="/about-us" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap">
            {t('aboutUs')}
          </Link>
          <Link href="/contact-us" className="px-2 xl:px-3 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap">
            {t('contactUs')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-2xl p-5 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="pb-2 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Where Global Trust Meets World-Class Healing</span>
          </div>
          <nav className="flex flex-col gap-1 text-base font-medium">
            <Link href="/" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('home')}</Link>
            <Link href="/hospitals" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('hospitals')}</Link>
            <Link href="/doctors" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('doctors')}</Link>
            <Link href="/treatments" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('procedures')}</Link>
            <Link href="/patient-stories" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('patientStories')}</Link>
            <Link href="/services" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('services')}</Link>
            <Link href="/blogs" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('blogs')}</Link>
            <Link href="/about-us" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('aboutUs')}</Link>
            <Link href="/contact-us" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>{t('contactUs')}</Link>
            <a 
              href="tel:+919918053077" 
              className="py-2.5 px-3 rounded-lg bg-primary/5 text-primary font-semibold flex items-center gap-2 mt-2" 
              onClick={closeMenu}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('callHelpline', { number: '+91 99180 53077' })}</span>
            </a>
          </nav>
          <div className="pt-2">
            <EnquiryForm>
              <Button className="w-full rounded-full shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:bg-primary/90">
                {t('getTreatmentPlan')}
              </Button>
            </EnquiryForm>
          </div>
        </div>
      )}
    </motion.header>
  );
}
