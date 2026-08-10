"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Star } from 'lucide-react';
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
    <section className="relative bg-white pt-10 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white -z-10" />
      <div className="absolute -left-[20%] top-0 w-[40%] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-70 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 shadow-sm border border-primary/10">
              <ShieldCheck className="w-4 h-4" />
              JCI & NABH Accredited Network
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              World-Class Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">Treatment in India.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
              Connect with top accredited hospitals and expert doctors. We provide end-to-end assistance for international patients seeking premium, affordable healthcare.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
              <EnquiryForm>
                <Button size="lg" className="text-md h-14 px-8 w-full sm:w-auto shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.23)] hover:-translate-y-0.5 transition-all">
                  Get a Free Treatment Plan
                </Button>
              </EnquiryForm>
              <Button size="lg" variant="outline" className="text-md h-14 px-8 bg-white border-2 hover:bg-slate-50 hover:-translate-y-0.5 w-full sm:w-auto transition-all shadow-sm" render={<Link href="/hospitals" />}>
                Explore Hospitals
              </Button>
            </div>

            {/* Quick Search Bar */}
            <div className="w-full max-w-xl bg-white p-2 rounded-[2rem] sm:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col sm:flex-row items-center gap-1 sm:gap-1 relative z-20">
              <div className="flex items-center flex-1 w-full px-4 pl-6 pt-2 sm:pt-0">
                <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Treatment, hospital, or doctor..." 
                  className="border-0 focus-visible:ring-0 shadow-none text-base h-12 px-0 bg-transparent placeholder:text-slate-400"
                />
              </div>
              <div className="w-[90%] sm:w-px h-px sm:h-8 bg-slate-200 mx-auto sm:mx-1 my-1 sm:my-0"></div>
              <div className="flex items-center flex-1 w-full px-4 pb-2 sm:pb-0">
                <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <select 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent border-0 text-slate-600 focus:ring-0 text-base h-12 cursor-pointer outline-none"
                >
                  <option value="">Any City</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <Button size="lg" onClick={handleSearch} className="w-full sm:w-auto rounded-full h-12 px-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">Search</Button>
            </div>
          </div>

          {/* Right Image/Graphics */}
          <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            {/* Background Blob/Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
            
            <div className="relative w-full max-w-lg mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1974&auto=format&fit=crop" 
                alt="Modern Hospital Facility" 
                className="rounded-3xl shadow-2xl object-cover w-full h-auto aspect-[4/5] lg:aspect-auto lg:h-[550px] border-8 border-white"
              />
              
              {/* Floating Element 1 (Success Rate) */}
              <div className="absolute top-6 -left-4 sm:top-12 sm:-left-12 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 scale-90 sm:scale-100 origin-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase leading-tight">Success Rate</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">98.5%</p>
                </div>
              </div>

              {/* Floating Element 2 (Review) */}
              <div className="absolute bottom-12 -right-4 sm:bottom-24 sm:-right-8 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 scale-90 sm:scale-100 origin-right">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">"Exceptional care & support"</p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">- Sarah M., UK</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
