import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Activity, ArrowRight, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Medical Procedures & Treatments | AsadHealthcare',
  description: 'Explore our comprehensive list of medical procedures, surgeries, and treatments available at world-class hospitals.',
};

import { prisma } from '@/lib/prisma';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export default async function TreatmentsPage(props: { params: Promise<{ locale: string }>, searchParams: Promise<{ specialty?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'common' });
  
  const specialtySlug = searchParams.specialty;

  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  const dbTreatments = await prisma.treatment.findMany({ 
    where: specialtySlug ? { specialty: { slug: specialtySlug } } : undefined,
    include: { specialty: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
            alt="Treatments Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
            <Activity className="w-3.5 h-3.5" />
            <span>Advanced Procedures</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Medical Procedures &amp; Surgeries
          </h1>
          
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl mx-auto font-normal">
            Explore world-class medical treatments, advanced surgeries, and specialized care pathways available for international patients.
          </p>
          
          <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl max-w-xl mx-auto transition-colors duration-500">
            <Search className="h-4 w-4 text-primary dark:text-teal-400 ml-3 mr-1 shrink-0" />
            <Input 
              type="text" 
              placeholder="Search by procedure (e.g. Knee Replacement)..." 
              className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
              Search
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Specialty Filter */}
        <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm mr-2">
              <Filter className="w-4 h-4" />
              Filter by Specialty:
            </div>
            <Link 
              href={`/${locale}/treatments`}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm border ${
                !specialtySlug 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-primary/50'
              }`}
            >
              All Procedures
            </Link>
            {specialties.map(spec => (
              <Link 
                key={spec.slug}
                href={`/${locale}/treatments?specialty=${spec.slug}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm border ${
                  specialtySlug === spec.slug 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {getTranslation(spec, 'name', locale) || spec.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Procedures Grid */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
          {specialtySlug 
            ? `${specialties.find(s => s.slug === specialtySlug)?.name || 'Filtered'} Procedures` 
            : 'All Medical Procedures'}
        </h2>
        
        {dbTreatments.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">No procedures found for this specialty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {dbTreatments.map((treatment) => (
              <Link key={treatment.id} href={`/${locale}/treatments/${treatment.slug}`}>
                <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between border border-white/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 cursor-pointer">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white transition-all shadow-xs shrink-0">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      {treatment.specialty && (
                        <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-primary dark:text-teal-400 border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto truncate max-w-full transition-colors duration-500">
                          {getTranslation(treatment.specialty, 'name', locale) || treatment.specialty.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-sm sm:text-lg font-bold mb-1.5 sm:mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                      {getTranslation(treatment, 'name', locale) || treatment.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {getTranslation(treatment, 'description', locale) || treatment.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 font-semibold text-[11px] sm:text-sm text-primary dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto sm:ml-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
