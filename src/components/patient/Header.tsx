"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, Menu, X, PhoneCall } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { LanguageSwitcher } from '@/components/patient/LanguageSwitcher';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl tracking-tight">
              <span className="font-extrabold text-slate-900">Asad</span>
              <span className="font-semibold text-primary">Healthcare</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/hospitals" className="relative group transition-colors hover:text-primary py-2">
            Hospitals
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/doctors" className="relative group transition-colors hover:text-primary py-2">
            Doctors
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/treatments" className="relative group transition-colors hover:text-primary py-2">
            Treatments
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/cities" className="relative group transition-colors hover:text-primary py-2">
            Cities
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/medical-travel" className="relative group transition-colors hover:text-primary py-2">
            Medical Travel
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          
          <a 
            href="tel:+919451187513" 
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-primary transition-colors bg-slate-50 hover:bg-primary/5 px-3 py-1.5 rounded-full border border-slate-200/80"
          >
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>+91 94511 87513</span>
          </a>
          
          <EnquiryForm>
            <Button className="hidden sm:inline-flex shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.23)] hover:bg-primary/90 transition-all shrink-0">
              Get Treatment Plan
            </Button>
          </EnquiryForm>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <Link href="/hospitals" className="py-2 border-b border-slate-100" onClick={closeMenu}>Hospitals</Link>
            <Link href="/doctors" className="py-2 border-b border-slate-100" onClick={closeMenu}>Doctors</Link>
            <Link href="/treatments" className="py-2 border-b border-slate-100" onClick={closeMenu}>Treatments</Link>
            <Link href="/cities" className="py-2 border-b border-slate-100" onClick={closeMenu}>Cities</Link>
            <Link href="/medical-travel" className="py-2 border-b border-slate-100" onClick={closeMenu}>Medical Travel</Link>
            <a 
              href="tel:+919451187513" 
              className="py-2 border-b border-slate-100 flex items-center gap-2 text-primary font-semibold" 
              onClick={closeMenu}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: +91 94511 87513</span>
            </a>
          </nav>
          <div className="pt-2">
            <EnquiryForm>
              <Button className="w-full shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:bg-primary/90">
                Get Treatment Plan
              </Button>
            </EnquiryForm>
          </div>
        </div>
      )}
    </header>
  );
}
