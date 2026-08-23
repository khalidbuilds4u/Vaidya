import { HeroSection } from '@/components/patient/home/HeroSection';
import { WhyChooseIndia } from '@/components/patient/home/WhyChooseIndia';
import { PopularSpecialties } from '@/components/patient/home/PopularSpecialties';
import { PopularConditions } from '@/components/patient/home/PopularConditions';
import { FeaturedHospitals } from '@/components/patient/home/FeaturedHospitals';
import { PatientStories } from '@/components/patient/home/PatientStories';
import { HowProcessWorks } from '@/components/patient/home/HowProcessWorks';
import { FAQSection } from '@/components/patient/home/FAQSection';
import { Building2, Award, HeartHandshake, Headphones } from 'lucide-react';

export const dynamic = "force-dynamic";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50/50">
      <HeroSection />

      {/* Floating Glassmorphic Stats Strip */}
      <section className="container mx-auto px-4 -mt-6 sm:-mt-10 lg:-mt-14 relative z-30">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(15,118,110,0.1)] border border-white/90 bg-white/95 backdrop-blur-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:divide-x lg:divide-slate-200/70">
            
            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 sm:bg-transparent rounded-2xl sm:rounded-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/20 shadow-sm">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">50+</div>
                <div className="text-slate-600 text-[11px] sm:text-xs lg:text-sm font-medium truncate">JCI &amp; NABH Hospitals</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 sm:bg-transparent rounded-2xl sm:rounded-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 text-teal-600 border border-teal-500/20 shadow-sm">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">500+</div>
                <div className="text-slate-600 text-[11px] sm:text-xs lg:text-sm font-medium truncate">Top Specialist Surgeons</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 sm:bg-transparent rounded-2xl sm:rounded-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20 shadow-sm">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">10,000+</div>
                <div className="text-slate-600 text-[11px] sm:text-xs lg:text-sm font-medium truncate">Global Patients</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 lg:px-4 bg-slate-50/60 sm:bg-transparent rounded-2xl sm:rounded-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-600 border border-indigo-500/20 shadow-sm">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">24/7</div>
                <div className="text-slate-600 text-[11px] sm:text-xs lg:text-sm font-medium truncate">Personal Coordinator</div>
              </div>
            </div>

          </div>
        </div>
      </section>

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
