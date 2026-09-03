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

import {  getTranslation, getStrictTranslation  } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { getCachedTreatments } from '@/lib/api';

export const revalidate = 3600;


function getIconForSpecialty(specialtyName: string) {
  const name = specialtyName.toLowerCase();
  if (name.includes('orthopedic')) return Bone;
  if (name.includes('cardio')) return HeartPulse;
  if (name.includes('neuro') || name.includes('brain')) return Brain;
  return Stethoscope;
}


export default async function TreatmentsDirectory({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('TreatmentsPage');

  const allTreatments = await getCachedTreatments();
  // We only show 6 on the main treatments page, ordered by name (or you could sort manually)
  const dbTreatments = allTreatments
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* 1. Header Banner with Robotic Surgery & Theater Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background High-Tech Surgery Image */}
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
            alt="Treatments Background" 
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
              <Activity className="w-3.5 h-3.5" />
              <span>{t('tag')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal mb-6">
              {t('desc')}
            </p>

            {/* Quick Search Capsule */}
            <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl max-w-xl transition-colors duration-500">
              <Search className="h-4 w-4 text-primary dark:text-teal-400 ml-3 mr-1 shrink-0" />
              <Input 
                type="text" 
                placeholder={t('search.placeholder')} 
                className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
                {t('search.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        
        {/* Specialties Grid */}
        <div className="mb-14 sm:mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t('browse.title')}</h2>
            <Link href={`/${locale}/specialties`} className="text-xs sm:text-sm font-semibold text-primary dark:text-teal-400 hover:underline">{t('browse.viewAll')}</Link>
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
              <Link key={spec.name} href={`/${locale}/specialties/${spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-36 sm:h-44 relative border border-white/80 dark:border-slate-800">
                  <Image 
                    src={spec.image} 
                    alt={t(`specialties.${spec.name as keyof typeof t}`)} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-3.5 sm:p-5">
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-teal-300 transition-colors">{t(`specialties.${spec.name as keyof typeof t}`)}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Treatments */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('popular.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {dbTreatments.map((treatment) => {
              const Icon = getIconForSpecialty(treatment.specialty?.name || "");
              return (
                <div key={treatment.slug} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between h-full bg-white/95 dark:bg-slate-900/95 border border-white/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-5 sm:p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary dark:text-teal-400 shrink-0">
                        {/* <Icon className="w-6 h-6" /> */}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary dark:text-teal-400">{getTranslation(treatment.specialty, 'name', locale) || t('popular.general')}</p>
                        <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900 dark:text-white">
                          <Link href={`/${locale}/treatments/${treatment.slug}`} className="hover:text-primary dark:hover:text-teal-400 transition-colors">
                            {getTranslation(treatment, 'name', locale)}
                          </Link>
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-3">
                      {getTranslation(treatment, 'description', locale)}
                    </p>
                    
                    <div className="space-y-2 py-3 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                      <div className="flex justify-between pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                        <span className="text-slate-500 dark:text-slate-400">{t('popular.estPackage')}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {treatment.minEstimate ? `$${treatment.minEstimate} - $${treatment.maxEstimate || ''}` : t('popular.customQuote')}
                        </span>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span className="text-slate-500 dark:text-slate-400">{t('popular.recovery')}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{getTranslation(treatment, 'recovery', locale) || t('popular.varies')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/${locale}/treatments/${treatment.slug}`}
                    className="bg-slate-50/90 dark:bg-slate-950 p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:bg-primary dark:hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <span>{t('popular.viewOptions')}</span>
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
