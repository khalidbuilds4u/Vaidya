import { HeroSection } from '@/components/patient/home/HeroSection';
import { WhyChooseIndia } from '@/components/patient/home/WhyChooseIndia';
import { PopularSpecialties } from '@/components/patient/home/PopularSpecialties';
import { PopularConditions } from '@/components/patient/home/PopularConditions';
import { FeaturedHospitals } from '@/components/patient/home/FeaturedHospitals';
import { PatientStories } from '@/components/patient/home/PatientStories';
import { HowProcessWorks } from '@/components/patient/home/HowProcessWorks';
import { FAQSection } from '@/components/patient/home/FAQSection';
import { Building2, Award, HeartHandshake, Headphones } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50/50">
      <HeroSection />

      {/* Floating Glassmorphic Stats Strip */}
      <section className="container mx-auto px-4 -mt-10 sm:-mt-14 relative z-30">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,118,110,0.1)] border border-white/90">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70">
            <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/20 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">50+</div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">JCI & NABH Hospitals</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 text-teal-600 border border-teal-500/20 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">500+</div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">Top Specialist Surgeons</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20 shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">10,000+</div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">International Patients</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-600 border border-indigo-500/20 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">24/7</div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">Personal Care Manager</div>
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
