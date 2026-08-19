"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { LanguageSwitcher } from '@/components/patient/LanguageSwitcher';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_20px_rgba(15,118,110,0.04)] transition-all duration-300">
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
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <Link href="/hospitals" className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            Hospitals
          </Link>
          <Link href="/doctors" className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            Doctors
          </Link>
          <Link href="/treatments" className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            Treatments
          </Link>
          <Link href="/cities" className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            Cities
          </Link>
          <Link href="/medical-travel" className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-primary/5 transition-all">
            Medical Travel
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          
          <a 
            href="tel:+919451187513" 
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-primary transition-all bg-slate-100/80 hover:bg-primary/10 px-3.5 py-2 rounded-full border border-slate-200/60 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>+91 94511 87513</span>
          </a>
          
          <EnquiryForm>
            <Button className="hidden sm:inline-flex rounded-full px-5 shadow-[0_4px_16px_rgba(15,118,110,0.35)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.45)] hover:-translate-y-0.5 hover:bg-primary/90 transition-all shrink-0">
              Get Treatment Plan
            </Button>
          </EnquiryForm>

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
            <Link href="/hospitals" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>Hospitals</Link>
            <Link href="/doctors" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>Doctors</Link>
            <Link href="/treatments" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>Treatments</Link>
            <Link href="/cities" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>Cities</Link>
            <Link href="/medical-travel" className="py-2.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" onClick={closeMenu}>Medical Travel</Link>
            <a 
              href="tel:+919451187513" 
              className="py-2.5 px-3 rounded-lg bg-primary/5 text-primary font-semibold flex items-center gap-2 mt-2" 
              onClick={closeMenu}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: +91 94511 87513</span>
            </a>
          </nav>
          <div className="pt-2">
            <EnquiryForm>
              <Button className="w-full rounded-full shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:bg-primary/90">
                Get Treatment Plan
              </Button>
            </EnquiryForm>
          </div>
        </div>
      )}
    </header>
  );
}
