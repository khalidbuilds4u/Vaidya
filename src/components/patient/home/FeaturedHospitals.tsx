import { HospitalCard } from '@/components/patient/HospitalCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';

export function FeaturedHospitals() {
  const featuredHospitals = MOCK_HOSPITALS.slice(0, 3);
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-12 text-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Hospitals</h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            We partner with India's highest-rated JCI and NABH accredited hospitals to ensure you receive the safest and most advanced medical care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHospitals.map((hospital) => (
            <HospitalCard key={hospital.slug} {...hospital} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/hospitals">
            <Button size="lg" className="px-8 rounded-full group">
              View All Hospitals
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
