import { Button } from '@/components/ui/button';
import { HeartPulse, Bone, Brain, Baby, Activity, Microscope, ScanHeart, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTranslation } from '@/lib/utils';

const SPECIALTIES = [
  { name: 'Cardiology', icon: HeartPulse, count: '120+ Doctors', color: 'from-rose-500/10 to-pink-500/10 text-rose-600' },
  { name: 'Oncology', icon: Microscope, count: '200+ Doctors', color: 'from-blue-500/10 to-cyan-500/10 text-blue-600' },
  { name: 'Orthopedics', icon: Bone, count: '150+ Doctors', color: 'from-amber-500/10 to-orange-500/10 text-amber-600' },
  { name: 'Neurology', icon: Brain, count: '85+ Doctors', color: 'from-purple-500/10 to-indigo-500/10 text-purple-600' },
  { name: 'Gastroenterology', icon: Activity, count: '110+ Doctors', color: 'from-emerald-500/10 to-green-500/10 text-emerald-600' },
  { name: 'Organ Transplant', icon: ScanHeart, count: '45+ Centers', color: 'from-teal-500/10 to-emerald-500/10 text-teal-600' },
  { name: 'Cosmetic Surgery', icon: Baby, count: '90+ Centers', color: 'from-pink-500/10 to-rose-500/10 text-pink-600' },
  { name: 'Dental', icon: Stethoscope, count: '300+ Doctors', color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600' },
  { name: 'IVF & Fertility', icon: Baby, count: '80+ Centers', color: 'from-pink-500/10 to-rose-500/10 text-pink-600' },
  { name: 'Bariatric Surgery', icon: Activity, count: '100+ Doctors', color: 'from-amber-500/10 to-orange-500/10 text-amber-600' },
  { name: 'Ophthalmology', icon: Microscope, count: '120+ Doctors', color: 'from-teal-500/10 to-emerald-500/10 text-teal-600' },
  { name: 'Urology', icon: Activity, count: '150+ Doctors', color: 'from-blue-500/10 to-cyan-500/10 text-blue-600' }
];

export async function PopularSpecialties() {
  const locale = await getLocale();
  const t = await getTranslations('Specialties');

  let dbSpecialties;
  let dbError = null;
  try {
    dbSpecialties = await prisma.specialty.findMany({
      take: 12,
      orderBy: { name: 'asc' }
    });
  } catch (e: any) {
    dbError = e.message || String(e);
    dbSpecialties = [];
  }

  const mergedSpecialties = dbSpecialties.map(dbSpec => {
    const defaultData = SPECIALTIES.find(s => s.name.toLowerCase() === dbSpec.name.toLowerCase()) || {
      icon: Activity,
      count: 'Explore Doctors',
      color: 'from-slate-500/10 to-gray-500/10 text-slate-600'
    };
    return {
      ...dbSpec,
      translatedName: getTranslation(dbSpec, 'name', locale),
      icon: defaultData.icon,
      count: defaultData.count,
      color: defaultData.color
    };
  });

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-slate-50/60 dark:bg-slate-900 transition-colors duration-500">
      {/* Subtle Ambient Orb */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[400px] ambient-glow rounded-full -z-10 opacity-50" />

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill dark:bg-primary/10 dark:border-primary/20 text-primary dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-500">
          {t('tag')}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 transition-colors duration-500">
          {t('title')}
        </h2>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-colors duration-500">
          {t('desc')}
        </p>
        
        {dbError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-8">
            DEBUG ERROR: {dbError}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 relative z-10">
          {mergedSpecialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link key={spec.id} href={`/specialties/${spec.slug}`}>
                <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center cursor-pointer h-full flex flex-col justify-between items-center group relative overflow-hidden bg-white/95 dark:bg-slate-900/95 border border-transparent dark:border-slate-800/80 hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                  
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs dark:opacity-80`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-primary dark:group-hover:text-teal-400 transition-colors mb-1">
                      {spec.translatedName}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t(`counts.${spec.count}`) || spec.count}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 w-full border-t border-slate-100 dark:border-slate-800 flex items-center justify-center text-xs font-semibold text-primary dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('view')}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center">
          <Link href={`/${locale}/treatments`}>
            <Button size="lg" className="px-6 sm:px-8 h-11 sm:h-12 rounded-xl sm:rounded-full font-semibold shadow-sm bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm group">
              <span>{t('browseAll')}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
