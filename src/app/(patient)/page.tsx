import Link from 'next/link';
import { HeroSection } from '@/components/patient/home/HeroSection';
import { WhyChooseIndia } from '@/components/patient/home/WhyChooseIndia';
import { PopularSpecialties } from '@/components/patient/home/PopularSpecialties';
import { PopularConditions } from '@/components/patient/home/PopularConditions';
import { FeaturedHospitals } from '@/components/patient/home/FeaturedHospitals';
import { HowProcessWorks } from '@/components/patient/home/HowProcessWorks';
import { FAQSection } from '@/components/patient/home/FAQSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Stats / Trust Banner */}
      <section className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-primary-foreground/80 text-sm">JCI Accredited Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-primary-foreground/80 text-sm">Top Surgeons & Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10k+</div>
              <div className="text-primary-foreground/80 text-sm">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-primary-foreground/80 text-sm">Patient Support</div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseIndia />
      <PopularSpecialties />
      <PopularConditions />
      <FeaturedHospitals />
      <HowProcessWorks />
      <FAQSection />

    </div>
  );
}
