import { HeroSection } from '@/components/patient/home/HeroSection';
import dynamic from 'next/dynamic';

const WhyChooseIndia = dynamic(() => import('@/components/patient/home/WhyChooseIndia').then(mod => mod.WhyChooseIndia));
const PopularSpecialties = dynamic(() => import('@/components/patient/home/PopularSpecialties').then(mod => mod.PopularSpecialties));
const PopularConditions = dynamic(() => import('@/components/patient/home/PopularConditions').then(mod => mod.PopularConditions));
const FeaturedHospitals = dynamic(() => import('@/components/patient/home/FeaturedHospitals').then(mod => mod.FeaturedHospitals));
const PatientStories = dynamic(() => import('@/components/patient/home/PatientStories').then(mod => mod.PatientStories));
const HowProcessWorks = dynamic(() => import('@/components/patient/home/HowProcessWorks').then(mod => mod.HowProcessWorks));
const FAQSection = dynamic(() => import('@/components/patient/home/FAQSection').then(mod => mod.FAQSection));
const TrustTicker = dynamic(() => import('@/components/patient/home/TrustTicker').then(mod => mod.TrustTicker));
import { Building2, Award, HeartHandshake, Headphones } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { MobileSearch } from '@/components/patient/home/MobileSearch';

export const revalidate = 3600;


export default async function Home() {
  const t = await getTranslations('Stats');
  
  // TEMPORARY CACHE BUSTING
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/', 'layout');

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500">
      <HeroSection />

      {/* Floating Glassmorphic Stats Strip */}
      <section className="container mx-auto px-4 -mt-6 sm:-mt-10 lg:-mt-14 relative z-30">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(15,118,110,0.1)] border border-white/90 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl transition-colors duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:divide-x lg:divide-slate-200/70 dark:lg:divide-slate-700/70">
            
            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 dark:bg-transparent sm:bg-transparent rounded-2xl sm:rounded-none transition-colors duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary dark:text-teal-400 border border-primary/20 dark:border-teal-400/20 shadow-sm">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">50+</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs lg:text-sm font-medium truncate transition-colors duration-500">{t('hospitals')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 dark:bg-transparent sm:bg-transparent rounded-2xl sm:rounded-none transition-colors duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 text-teal-600 border border-teal-500/20 shadow-sm">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">500+</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs lg:text-sm font-medium truncate transition-colors duration-500">{t('surgeons')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 dark:bg-transparent sm:bg-transparent rounded-2xl sm:rounded-none transition-colors duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20 shadow-sm">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">10,000+</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs lg:text-sm font-medium truncate transition-colors duration-500">{t('patients')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 dark:bg-transparent sm:bg-transparent rounded-2xl sm:rounded-none transition-colors duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-600 border border-indigo-500/20 shadow-sm">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">24/7</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs lg:text-sm font-medium truncate transition-colors duration-500">{t('coordinator')}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TrustTicker />

      <MobileSearch />

      <WhyChooseIndia />
      <PopularSpecialties />
      <PopularConditions />
      <FeaturedHospitals />
      <PatientStories />
      <HowProcessWorks />
      <FAQSection />

    </div>
  );
}
