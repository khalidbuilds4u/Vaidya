import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Activity, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;


export const metadata: Metadata = {
  title: 'Medical Conditions & Diseases Guide | AsadHealthcare',
  description: 'Learn about common medical conditions, symptoms, causes, and the best treatment options available in India.',
};

import { prisma } from '@/lib/prisma';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export default async function ConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'common' });
  const dbConditions = await prisma.condition.findMany({ include: { specialty: true } });
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* 1. Header Banner with Medical Diagnostics Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background Diagnostics Image */}
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
            alt="Conditions Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>

        {/* Luminous Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Knowledge &amp; Care Pathways</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Medical Conditions &amp; Diseases Guide
          </h1>
          
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl mx-auto font-normal">
            Search for your diagnosis to understand causes, surgical protocols, and accredited hospital treatment pathways in India.
          </p>
          
          {/* Quick Search Capsule */}
          <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl max-w-xl mx-auto transition-colors duration-500">
            <Search className="h-4 w-4 text-primary dark:text-teal-400 ml-3 mr-1 shrink-0" />
            <Input 
              type="text" 
              placeholder="Search by diagnosis (e.g. Osteoarthritis, Brain Tumor)..." 
              className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Conditions Grid */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">Common Medical Conditions We Treat</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {dbConditions.map((condition) => (
            <Link key={condition.name} href={`/${locale}/conditions/${condition.slug}`}>
              <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between border border-white/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 cursor-pointer">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white transition-all shadow-xs shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-primary dark:text-teal-400 border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto truncate max-w-full transition-colors duration-500">
                      {getTranslation(condition.specialty, 'name', locale) || condition.specialty.name}
                    </span>
                  </div>
                  
                  <h3 className="text-sm sm:text-lg font-bold mb-1.5 sm:mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                    {getTranslation(condition, 'name', locale) || condition.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {getTranslation(condition, 'description', locale) || condition.description}
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
      </div>
    </div>
  );
}
