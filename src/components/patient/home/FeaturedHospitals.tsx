import { HospitalCard } from '@/components/patient/HospitalCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';

import { prisma } from '@/lib/prisma';

export async function FeaturedHospitals() {
  const featuredHospitals = await prisma.hospital.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      city: true,
      specialties: true
    }
  });
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-slate-50/70">
      {/* Background Glow */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] ambient-glow rounded-full -z-10 opacity-50" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-8 sm:mb-12 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
            Accredited Centers
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Featured Partner Hospitals
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            We collaborate with India&apos;s leading JCI &amp; NABH accredited institutions with dedicated international patient suites and multilingual support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {featuredHospitals.map((hospital) => (
            <HospitalCard 
              key={hospital.id} 
              slug={hospital.slug}
              name={hospital.name}
              city={hospital.city.name}
              state={hospital.city.state || undefined}
              image={hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop"}
              accreditations={hospital.accreditations}
              beds={hospital.beds || 0}
              specialties={hospital.specialties.map(s => s.name)}
              hasInternationalSupport={hospital.internationalServices.length > 0}
            />
          ))}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/hospitals">
            <Button size="lg" className="px-6 sm:px-8 h-11 sm:h-12 rounded-xl sm:rounded-full font-semibold shadow-sm bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm group">
              <span>Explore All 50+ Accredited Hospitals</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
