import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const POPULAR_CONDITIONS = [
  { 
    name: 'Coronary Artery Disease', 
    specialty: 'Cardiology', 
    description: 'Minimally invasive bypass grafting (CABG), angioplasty, and robotic heart surgery.',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
  },
  { 
    name: 'Osteoarthritis', 
    specialty: 'Orthopedics', 
    description: 'Robotic-assisted total knee & hip replacements with ultra-fast recovery protocols.',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
  },
  { 
    name: 'Brain Tumor & Epilepsy', 
    specialty: 'Neurology', 
    description: 'Advanced microsurgery, CyberKnife radiosurgery, and functional neuro-resection.',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
  },
  { 
    name: 'Breast & Prostate Cancer', 
    specialty: 'Oncology', 
    description: 'Targeted immunotherapy, precision radiation, and organ-preserving surgical oncology.',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
  }
];

export function PopularConditions() {
  const t = useTranslations('Conditions');

  const localizedConditions = [
    { 
      name: t('items.c1.name'), 
      specialty: t('items.c1.specialty'), 
      description: t('items.c1.desc'),
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
    },
    { 
      name: t('items.c2.name'), 
      specialty: t('items.c2.specialty'), 
      description: t('items.c2.desc'),
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
    },
    { 
      name: t('items.c3.name'), 
      specialty: t('items.c3.specialty'), 
      description: t('items.c3.desc'),
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
    },
    { 
      name: t('items.c4.name'), 
      specialty: t('items.c4.specialty'), 
      description: t('items.c4.desc'),
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-8 sm:mb-12 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
            {t('tag')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t('title')}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {localizedConditions.map((condition) => (
            <Link key={condition.name} href={`/conditions/${condition.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}>
              <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-white/95">
                
                {/* Top specialty badge */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                      <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${condition.badgeColor}`}>
                      {condition.specialty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {condition.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {condition.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 font-semibold text-xs sm:text-sm text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('explore')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/conditions">
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
