import Link from 'next/link';
import { Stethoscope, ShieldCheck, PhoneCall, Headphones, Clock, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/90 relative overflow-hidden pb-28 md:pb-14 pt-14">
      <div className="container mx-auto px-4">
        
        {/* Top Branding & Trust Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-10 mb-10 border-b border-slate-200/80 gap-6">
          <div className="space-y-2 max-w-xl">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-2xl tracking-tight">
                <span className="font-extrabold text-slate-900">Asad</span>
                <span className="font-semibold text-primary ml-1">Healthcare</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              Your premier international patient partner for world-class, affordable medical surgery in India. Connecting you directly with JCI &amp; NABH accredited hospital networks.
            </p>
          </div>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">NABH &amp; JCI Hospitals</span>
            </div>
            <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white/80">
              <Headphones className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-bold text-slate-800">24/7 International Desk</span>
            </div>
            <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white/80">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-bold text-slate-800">100% Free Consultation</span>
            </div>
          </div>
        </div>

        {/* Multi-Column Horizontal Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Discover */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Discover
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/hospitals" className="hover:text-primary transition-colors">Accredited Hospitals</Link></li>
              <li><Link href="/doctors" className="hover:text-primary transition-colors">Specialist Surgeons</Link></li>
              <li><Link href="/treatments" className="hover:text-primary transition-colors">Treatments &amp; Costs</Link></li>
              <li><Link href="/specialties" className="hover:text-primary transition-colors">Medical Specialties</Link></li>
              <li><Link href="/conditions" className="hover:text-primary transition-colors">Conditions Guide</Link></li>
              <li><Link href="/cities" className="hover:text-primary transition-colors">Medical Cities in India</Link></li>
            </ul>
          </div>

          {/* Column 2: Patient Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Patient Support
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/medical-travel" className="hover:text-primary transition-colors">Medical Visa (Med Visa)</Link></li>
              <li><Link href="/medical-travel#accommodation" className="hover:text-primary transition-colors">Accommodation &amp; Stay</Link></li>
              <li><Link href="/medical-travel#interpreters" className="hover:text-primary transition-colors">Language Interpreters</Link></li>
              <li><Link href="/medical-travel" className="hover:text-primary transition-colors">Airport Concierge Transfer</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search Healthcare Providers</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Helpline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              24/7 Helpline
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a 
                  href="tel:+919451187513" 
                  className="font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>+91 94511 87513</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/919451187513" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>WhatsApp Consultation</span>
                </a>
              </li>
              <li className="text-xs text-slate-500 flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Response Time: Under 24 Hours</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Legal &amp; Privacy
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Medical Disclaimer</Link></li>
              <li><Link href="/medical-travel" className="hover:text-primary transition-colors">Patient Safety Guidelines</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AsadHealthcare. All rights reserved.</p>
          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Certified partner network with top JCI &amp; NABH accredited hospital systems across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
