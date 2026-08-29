import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Building2, Stethoscope, Plane, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600;


export const metadata: Metadata = {
  title: 'Top Medical Hubs in India | AsadHealthcare',
  description: 'Explore the top cities in India for medical tourism, featuring world-class hospitals and connectivity.',
};


export default async function CitiesPage() {
  const cities = await prisma.city.findMany({
    include: {
      hospitals: {
        include: {
          specialties: true,
          doctors: { include: { specialty: true } }
        }
      },
      doctors: { include: { specialty: true } }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* 1. Header Banner */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop"
            alt="Medical Hubs in India"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
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
              India's major metropolitan cities feature world-class hospital clusters, international airport connectivity, luxury guest suites, and dedicated multilingual patient concierges.
            </p>
          </div>
        </div>
      </section>

      {/* 2. City Cards Grid */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cities.map((city) => {
            const defaultImage = "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop";
            const hospitalsCount = city.hospitals.length;
            const topSpecialties = Array.from(new Set([
              ...city.hospitals.flatMap(h => h.specialties.map(s => s.name)),
              ...city.hospitals.flatMap(h => h.doctors.map(d => d.specialty.name)),
              ...city.doctors.map(d => d.specialty.name)
            ])).slice(0, 4);

            return (
              <div key={city.id} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/95 dark:bg-slate-900/95 group flex flex-col justify-between">
                <div className="h-48 sm:h-60 overflow-hidden relative">
                  <Image 
                    src={city.imageUrl || defaultImage} 
                    alt={city.name}
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                      <MapPin className="w-5 h-5 mr-1.5 text-teal-300 shrink-0" />
                      {city.name}, {city.country}
                    </h2>
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-3">
                      {city.description || `${city.name} is a premier healthcare destination offering world-class medical facilities and top-tier specialists.`}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-5 py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <Building2 className="w-4 h-4 text-primary dark:text-teal-400 mr-1.5 shrink-0" />
                        <span>{hospitalsCount} Hospitals</span>
                      </div>
                      <div className="flex items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <Plane className="w-4 h-4 text-primary dark:text-teal-400 mr-1.5 shrink-0" />
                        <span>Intl Airport Link</span>
                      </div>
                    </div>

                    {topSpecialties.length > 0 && (
                      <div>
                        <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Clinical Specialties</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {topSpecialties.map(spec => (
                            <span key={spec} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors duration-500">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary dark:text-teal-400">
                    <Link href={`/hospitals?city=${city.slug}`} className="hover:underline flex items-center gap-1">
                      <span>Explore Hospitals in {city.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
