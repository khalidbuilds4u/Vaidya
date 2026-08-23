import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Search, Stethoscope, HeartPulse, Brain, Bone, ArrowRight, Activity, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Treatments & Procedures in India | AsadHealthcare',
  description: 'Explore world-class medical treatments, surgeries, and procedures available at top hospitals in India with estimated cost guides.',
};

import { prisma } from '@/lib/prisma';

export const revalidate = 3600;


function getIconForSpecialty(specialtyName: string) {
  const name = specialtyName.toLowerCase();
  if (name.includes('orthopedic')) return Bone;
  if (name.includes('cardio')) return HeartPulse;
  if (name.includes('neuro') || name.includes('brain')) return Brain;
  return Stethoscope;
}


export default async function TreatmentsDirectory() {
  const dbTreatments = await prisma.treatment.findMany({
    include: { specialty: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      
      {/* 1. Header Banner with Robotic Surgery & Theater Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background High-Tech Surgery Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop')`,
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
              <Activity className="w-3.5 h-3.5" />
              <span>Advanced Clinical Procedures</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Medical Treatments &amp; Cost Estimates
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal mb-6">
              Compare transparent surgical packages, recovery timelines, and accredited hospital quotes in India with savings up to 70%.
            </p>

            {/* Quick Search Capsule */}
            <div className="glass-panel p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-white shadow-xl max-w-xl">
              <Search className="h-4 w-4 text-primary ml-3 mr-1 shrink-0" />
              <Input 
                type="text" 
                placeholder="Search treatments, surgeries, procedures..." 
                className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 bg-transparent placeholder:text-slate-400"
              />
              <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        
        {/* Specialties Grid */}
        <div className="mb-14 sm:mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Browse by Medical Specialty</h2>
            <Link href="/specialties" className="text-xs sm:text-sm font-semibold text-primary hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { name: 'Cardiology', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2080&auto=format&fit=crop' },
              { name: 'Oncology', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Orthopedics', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
              { name: 'Neurology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop' },
              { name: 'Gastroenterology', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Organ Transplant', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Cosmetic Surgery', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Dental', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop' },
              { name: 'IVF & Fertility', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Bariatric Surgery', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Ophthalmology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
              { name: 'Urology', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' }
            ].map(spec => (
              <Link key={spec.name} href={`/specialties/${spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-36 sm:h-44 relative border border-white/80">
                  <Image 
                    src={spec.image} 
                    alt={spec.name} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-3.5 sm:p-5">
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-teal-300 transition-colors">{spec.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Treatments */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Popular Surgical Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {dbTreatments.map((treatment) => {
              const Icon = getIconForSpecialty(treatment.specialty?.name || "");
              return (
                <div key={treatment.slug} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between h-full bg-white/95 border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-5 sm:p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
                        {/* <Icon className="w-6 h-6" /> */}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary">{treatment.specialty?.name || "General"}</p>
                        <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900">
                          <Link href={`/treatments/${treatment.slug}`} className="hover:text-primary transition-colors">
                            {treatment.name}
                          </Link>
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-3">
                      {treatment.description}
                    </p>
                    
                    <div className="space-y-2 py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                      <div className="flex justify-between pb-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500">Est. Package:</span>
                        <span className="font-bold text-emerald-600">
                          {treatment.minEstimate ? `$${treatment.minEstimate} - $${treatment.maxEstimate || ''}` : 'Custom Quote'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span className="text-slate-500">Recovery:</span>
                        <span className="font-semibold text-slate-800">{treatment.recovery || 'Varies'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/treatments/${treatment.slug}`}
                    className="bg-slate-50/90 p-3.5 sm:p-4 border-t border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <span>View Treatment &amp; Doctor Options</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
