"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Star, Sparkles, Clock, ArrowRight, Building2 } from 'lucide-react';
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
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-slate-200/80">
      
      {/* 1. Crystal-Clear Real Super-Specialty Hospital Campus Image */}
      <div 
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-hospital.jpg')`,
        }}
      />

      {/* 2. Frosted Luminous Gradient Mask (Keeps the hospital building crisp on the right while ensuring 100% text readability on the left) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/20 lg:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30 pointer-events-none" />

      {/* 3. Subtle Ambient Teal Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] ambient-glow rounded-full -z-10 opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text & Search Card (Glassmorphic Container) */}
          <div className="w-full lg:w-7/12 flex flex-col items-start text-left z-10">
            
            {/* Glass Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-primary text-xs sm:text-sm font-semibold mb-6 shadow-sm border border-primary/20 bg-white/90 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span>India&apos;s Premier Medical Travel Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-slate-700 font-normal">JCI &amp; NABH Accredited</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              World-Class Medical Care <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-600">
                In India, With Zero Hassle.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-xl leading-relaxed font-medium">
              Direct access to internationally accredited super-specialty hospitals, top surgeons, and full concierge support with savings up to 70%.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <EnquiryForm>
                <Button size="lg" className="text-md h-14 px-8 w-full sm:w-auto rounded-full shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] hover:-translate-y-0.5 transition-all font-semibold">
                  Get a Free Treatment Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </EnquiryForm>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-md h-14 px-8 rounded-full glass-card hover:bg-white border border-slate-300/80 hover:-translate-y-0.5 w-full sm:w-auto transition-all shadow-sm font-semibold text-slate-800 bg-white/90" 
                render={<Link href="/hospitals" />}
              >
                Explore Hospitals
              </Button>
            </div>

            {/* Frosted Glass Search Capsule */}
            <div className="w-full max-w-xl glass-panel p-2.5 rounded-[2rem] sm:rounded-full flex flex-col sm:flex-row items-center gap-2 relative z-20 transition-all duration-300 shadow-[0_12px_40px_rgba(15,118,110,0.12)] bg-white/90 backdrop-blur-xl border border-white">
              <div className="flex items-center flex-1 w-full px-4 pl-5 pt-2 sm:pt-0">
                <Search className="w-5 h-5 text-primary mr-2.5 shrink-0" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Treatment, hospital, or doctor..." 
                  className="border-0 focus-visible:ring-0 shadow-none text-base h-11 px-0 bg-transparent placeholder:text-slate-400 text-slate-900 font-medium"
                />
              </div>
              <div className="w-[90%] sm:w-px h-px sm:h-8 bg-slate-200 mx-auto sm:mx-1 my-1 sm:my-0"></div>
              <div className="flex items-center flex-1 w-full px-4 pb-2 sm:pb-0">
                <MapPin className="w-5 h-5 text-primary mr-2 shrink-0" />
                <select 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent border-0 text-slate-800 font-semibold focus:ring-0 text-base h-11 cursor-pointer outline-none"
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
                className="w-full sm:w-auto rounded-full h-11 px-7 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 font-semibold shrink-0"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Right Floating Glass Badges & Highlights */}
          <div className="w-full lg:w-5/12 relative flex flex-col gap-4 items-center lg:items-end justify-center mt-6 lg:mt-0">
            
            {/* Glass Highlight Card 1 (JCI & NABH Accreditation) */}
            <div className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl border border-white flex items-center gap-4 animate-float bg-white/95 max-w-sm w-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-inner text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Accreditation</p>
                <p className="text-base font-extrabold text-slate-900 leading-tight">JCI &amp; NABH Certified Network</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Top 50+ Super-Specialty Hospitals</p>
              </div>
            </div>

            {/* Glass Highlight Card 2 (Success Rate & Volume) */}
            <div className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl border border-white flex items-center gap-4 bg-white/95 max-w-sm w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-inner text-primary">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clinical Track Record</p>
                <p className="text-xl font-extrabold text-slate-900 leading-tight">98.5% Success Rate</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Over 15,000+ Successful Surgeries</p>
              </div>
            </div>

            {/* Glass Highlight Card 3 (Verified Patient Review) */}
            <div className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl border border-white animate-float-delayed bg-white/95 max-w-sm w-full">
              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">&ldquo;Exceptional hospital care &amp; seamless visa support&rdquo;</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <span>- David R., United Kingdom</span>
                <span className="text-emerald-600 font-bold">Knee Replacement</span>
              </div>
            </div>

            {/* Quick response pill */}
            <div className="glass-pill px-4 py-2 rounded-full shadow-md border border-white flex items-center gap-2 bg-white/95">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-slate-800">Average Quote Time: &lt; 24 hrs</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
