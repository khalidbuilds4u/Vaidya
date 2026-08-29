import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTranslation } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

const COLORS = [
  'bg-rose-500/10 text-rose-700 border-rose-500/20',
  'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'bg-purple-500/10 text-purple-700 border-purple-500/20',
  'bg-blue-500/10 text-blue-700 border-blue-500/20',
  'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
];

export async function PopularConditions() {
  const t = await getTranslations('Conditions');
  const locale = await getLocale();

  let conditions: any[] = [];
  try {
    conditions = await prisma.condition.findMany({
      take: 4,
      include: { specialty: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-8 sm:mb-12 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill dark:bg-primary/10 dark:border-primary/20 text-primary dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-500">
            {t('tag')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 transition-colors duration-500">
            {t('title')}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors duration-500">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {conditions.map((condition, i) => {
            const badgeColor = COLORS[i % COLORS.length];
            const name = getTranslation(condition, 'name', locale);
            const description = getTranslation(condition, 'description', locale) || '';
            const specialtyName = condition.specialty ? getTranslation(condition.specialty, 'name', locale) : '';
            
            return (
            <Link key={condition.id} href={`/${locale}/conditions/${condition.slug}`}>
              <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-white/95 dark:bg-slate-900/95 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 border border-white/90 dark:border-slate-800/80">
                
                {/* Top specialty badge */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    {specialtyName && (
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto truncate max-w-full ${badgeColor} dark:opacity-80`}>
                        {specialtyName}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                    {name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {description}
                  </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 font-semibold text-[11px] sm:text-sm text-primary dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 h-3.5 ml-auto sm:ml-0" />
                </div>
              </div>
            </Link>
          )})}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href={`/${locale}/conditions`}>
            <Button size="lg" className="px-6 sm:px-8 h-11 sm:h-12 rounded-xl sm:rounded-full font-semibold shadow-sm bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm group">
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
