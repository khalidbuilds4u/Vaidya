"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Star, Sparkles, Clock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export function HeroSection() {
  const router = useRouter();
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
      
      {/* 1. Full-Bleed Hospital Campus Background (Clearly Visible on All Screens) */}
      <div 
        className="absolute inset-0 bg-cover bg-center lg:bg-right bg-no-repeat pointer-events-none opacity-50 sm:opacity-65 lg:opacity-85 scale-100 sm:scale-105 transition-all duration-700"
        style={{
          backgroundImage: `url('/images/hero-hospital.jpg')`,
        }}
      />

      {/* 2. Frosted Gradient Overlay (Subtle on mobile so the hospital building is clearly seen) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/90 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/85 lg:to-transparent pointer-events-none" />

      {/* 3. Ambient Lighting */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 ambient-glow rounded-full -z-10 opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Hero Card (Frosted Glass Container for High Readability) */}
          <div className="w-full lg:w-7/12 flex flex-col items-start text-left z-10">
            
            {/* Top Tagline Glass Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-5 shadow-sm border border-primary/25 bg-white/95 backdrop-blur-md max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
              <span className="truncate">Where Global Trust Meets World-Class Healing</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.12] mb-2.5 sm:mb-4">
              World-Class Medical Care <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-600">
                In India, With Zero Hassle.
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-xs sm:text-base md:text-lg text-slate-700 mb-4 sm:mb-6 max-w-xl leading-relaxed font-medium">
              Direct access to JCI &amp; NABH accredited super-specialty hospitals, top surgeons, and full concierge support with savings up to 70%.
            </p>

            {/* Quick Trust Highlights Row on Mobile */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-6 text-[11px] sm:text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>JCI &amp; NABH Network</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>98.5% Success Rate</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>&lt; 24h Free Quote</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8 w-full sm:w-auto">
              <EnquiryForm>
                <Button size="lg" className="flex-1 sm:flex-none text-xs sm:text-base h-11 sm:h-13 px-5 sm:px-8 rounded-full shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold active:scale-95">
                  Get Free Plan
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                </Button>
              </EnquiryForm>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="flex-1 sm:flex-none text-xs sm:text-base h-11 sm:h-13 px-4 sm:px-7 rounded-full glass-card hover:bg-white border border-slate-300/80 transition-all shadow-xs font-semibold text-slate-800 bg-white/90" 
              >
                <Link href="/hospitals">Explore Hospitals</Link>
              </Button>
            </div>

            {/* Sleek Frosted Glass Search Capsule */}
            <div className="w-full max-w-xl glass-panel p-1.5 sm:p-2.5 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 relative z-20 shadow-[0_10px_35px_rgba(15,118,110,0.12)] bg-white/95 backdrop-blur-xl border border-white">
              <div className="flex items-center flex-1 px-3 sm:px-4 pl-3.5 sm:pl-5 py-1 sm:py-0 bg-slate-50/70 sm:bg-transparent rounded-xl sm:rounded-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 shrink-0" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Treatment, hospital, doctor..." 
                  className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-base h-9 sm:h-11 px-0 bg-transparent placeholder:text-slate-400 text-slate-900 font-medium"
                />
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-slate-200 mx-1"></div>
              
              <div className="flex items-center flex-1 px-3 sm:px-4 py-1 sm:py-0 bg-slate-50/70 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1.5 shrink-0" />
                <select 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent border-0 text-slate-800 font-semibold focus:ring-0 text-xs sm:text-base h-9 sm:h-11 cursor-pointer outline-none"
                >
                  <option value="">Any City (India)</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <Button 
                size="lg" 
                onClick={handleSearch} 
                className="w-full sm:w-auto rounded-xl sm:rounded-full h-10 sm:h-11 px-6 shadow-md hover:shadow-lg transition-all font-semibold shrink-0 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Right Floating Glass Highlights (Shown on Tablet & Desktop) */}
          <div className="hidden lg:flex w-full lg:w-5/12 flex-col gap-4 items-end justify-center">
            
            {/* Glass Highlight Card 1 (JCI & NABH Accreditation) */}
            <div className="glass-card p-5 rounded-3xl shadow-xl border border-white flex items-center gap-3.5 bg-white/95 max-w-sm w-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Accreditation</p>
                <p className="text-base font-extrabold text-slate-900 leading-tight">JCI &amp; NABH Certified Network</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Top 50+ Super-Specialty Hospitals</p>
              </div>
            </div>

            {/* Glass Highlight Card 2 (Success Rate & Volume) */}
            <div className="glass-card p-5 rounded-3xl shadow-xl border border-white flex items-center gap-3.5 bg-white/95 max-w-sm w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clinical Track Record</p>
                <p className="text-xl font-extrabold text-slate-900 leading-tight">98.5% Success Rate</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Over 15,000+ Successful Surgeries</p>
              </div>
            </div>

            {/* Glass Highlight Card 3 (Verified Patient Review) */}
            <div className="glass-card p-5 rounded-3xl shadow-xl border border-white animate-float-delayed bg-white/95 max-w-sm w-full">
              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">&ldquo;Exceptional hospital care &amp; seamless visa support&rdquo;</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <span>- David R., United Kingdom</span>
                <span className="text-emerald-600 font-bold">Knee Replacement</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
