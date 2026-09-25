import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTranslation } from '@/lib/utils';
import { Activity, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'All Medical Specialties | AsadHealthcare',
  description: 'Explore all world-class medical specialties available at top hospitals in India.',
};

export const revalidate = 3600;

export default async function SpecialtiesDirectory({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Try to use a namespace if available, otherwise fallback to standard text.
  // Using 'TreatmentsPage' namespace as fallback since it might have generic translations.
  const t = await getTranslations('TreatmentsPage');

  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* 1. Header Banner */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
            alt="Specialties Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
              <Activity className="w-3.5 h-3.5" />
              <span>Specialties & Departments</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              All Medical Specialties
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal mb-6">
              Browse our comprehensive list of world-class medical specialties and departments.
            </p>

            <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl max-w-xl transition-colors duration-500">
              <Search className="h-4 w-4 text-primary dark:text-teal-400 ml-3 mr-1 shrink-0" />
              <Input 
                type="text" 
                placeholder="Search specialties..." 
                className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {specialties.map((spec) => {
            const fallbackImage = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop';
            const translatedName = getTranslation(spec, 'name', locale);
            return (
              <Link key={spec.id} href={`/${locale}/specialties/${spec.slug}`}>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-36 sm:h-44 relative border border-white/80 dark:border-slate-800 bg-slate-200">
                  <Image 
                    src={spec.imageUrl || fallbackImage} 
                    alt={translatedName} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-3.5 sm:p-5">
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-teal-300 transition-colors">{translatedName}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {specialties.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No specialties found.
          </div>
        )}
      </div>
    </div>
  );
}
