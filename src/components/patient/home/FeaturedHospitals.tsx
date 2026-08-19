import { HospitalCard } from '@/components/patient/HospitalCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';

export function FeaturedHospitals() {
  const featuredHospitals = MOCK_HOSPITALS.slice(0, 3);
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/70">
      {/* Background Glow */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] ambient-glow rounded-full -z-10 opacity-60" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-14 text-center items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Accredited Centers
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Featured Partner Hospitals
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            We collaborate with India&apos;s leading JCI &amp; NABH accredited institutions with dedicated international patient suites and multilingual support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredHospitals.map((hospital) => (
            <HospitalCard key={hospital.slug} {...hospital} />
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link href="/hospitals">
            <Button size="lg" className="px-9 h-12 rounded-full font-semibold shadow-md hover:shadow-lg transition-all group">
              Explore All 50+ Accredited Hospitals
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
