import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Building2, Stethoscope, Plane, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Medical Hubs in India | AsadHealthcare',
  description: 'Explore the top cities in India for medical tourism, featuring world-class hospitals and connectivity.',
};

const CITIES = [
  {
    name: 'Delhi NCR & Gurgaon',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 45,
    description: 'The National Capital Region boasts India\'s highest concentration of JCI & NABH accredited super-specialty quaternary care hospitals with direct global connectivity.',
    topSpecialties: ['Cardiology', 'Oncology', 'Organ Transplant', 'Robotic Surgery'],
  },
  {
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 38,
    description: 'India\'s commercial capital is home to pioneering private medical institutions and distinguished surgeons in oncology, neurosurgery, and cosmetic procedures.',
    topSpecialties: ['Neurology', 'Orthopedics', 'Cosmetic Surgery', 'IVF'],
  },
  {
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 42,
    description: 'Celebrated as India\'s healthcare capital, Chennai attracts thousands of international patients annually for world-renowned cardiac and orthopedic care.',
    topSpecialties: ['Ophthalmology', 'Cardiac Surgery', 'Bone Marrow Transplant'],
  },
  {
    name: 'Bangalore & Hyderabad',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 35,
    description: 'Premier biotech and medical innovation centers leading robotic precision surgeries, genomic diagnostics, and minimally invasive transplant suites.',
    topSpecialties: ['Robotic Surgery', 'Gastroenterology', 'Liver Transplant'],
  }
];

export default function CitiesPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      
      {/* 1. Header Banner with Metropolis Skyline Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background Skyline Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Luminous Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
              <MapPin className="w-3.5 h-3.5" />
              <span>Medical Tourism Destinations</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Top Medical Hubs in India
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              India&apos;s major metropolitan cities feature world-class hospital clusters, international airport connectivity, luxury guest suites, and dedicated multilingual patient concierges.
            </p>
          </div>
        </div>
      </section>

      {/* 2. City Cards Grid */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CITIES.map((city) => (
            <div key={city.name} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/95 group flex flex-col justify-between">
              
              <div className="h-48 sm:h-60 overflow-hidden relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-1.5 text-teal-300 shrink-0" />
                    {city.name}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                    {city.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-5 py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center text-xs font-semibold text-slate-700">
                      <Building2 className="w-4 h-4 text-primary mr-1.5 shrink-0" />
                      <span>{city.hospitalsCount}+ Hospitals</span>
                    </div>
                    <div className="flex items-center text-xs font-semibold text-slate-700">
                      <Plane className="w-4 h-4 text-primary mr-1.5 shrink-0" />
                      <span>Intl Airport Link</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Clinical Specialties</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {city.topSpecialties.map(spec => (
                        <span key={spec} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md text-[11px] font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary">
                  <Link href={`/hospitals?city=${encodeURIComponent(city.name)}`} className="hover:underline flex items-center gap-1">
                    <span>Explore Hospitals in {city.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
