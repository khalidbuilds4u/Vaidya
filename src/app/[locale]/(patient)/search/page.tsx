import { prisma } from '@/lib/prisma';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { Search, MapPin, AlertCircle, Building2, Stethoscope, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';
  const city = typeof resolvedParams.city === 'string' ? resolvedParams.city.toLowerCase() : '';

  // Construct filters
  const cityFilterHospital = city ? { city: { name: { contains: city, mode: 'insensitive' as const } } } : {};
  const cityFilterDoctor = city ? {
    OR: [
      { city: { name: { contains: city, mode: 'insensitive' as const } } },
      { hospital: { city: { name: { contains: city, mode: 'insensitive' as const } } } }
    ]
  } : {};

  let hospitals = [];
  let doctors = [];

  if (q || city) {
    // Fetch Hospitals
    const rawHospitals = await prisma.hospital.findMany({
      where: {
        isPublished: true,
        ...(q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { specialties: { some: { name: { contains: q, mode: 'insensitive' } } } }
          ]
        } : {}),
        ...cityFilterHospital
      },
      include: {
        city: true,
        specialties: true
      }
    });

    hospitals = rawHospitals.map(h => ({
      slug: h.slug,
      name: h.name,
      description: h.description || '',
      city: h.city.name,
      image: h.imageUrl || '',
      accreditations: h.accreditations,
      beds: h.beds || 0,
      established: h.established || undefined,
      airportDistance: h.airportDistance || undefined,
      specialties: h.specialties.map(s => s.name),
      hasInternationalSupport: h.internationalServices && h.internationalServices.length > 0
    }));

    // Fetch Doctors
    const rawDoctors = await prisma.doctor.findMany({
      where: {
        isPublished: true,
        ...(q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { specialty: { name: { contains: q, mode: 'insensitive' } } }
          ]
        } : {}),
        ...cityFilterDoctor
      },
      include: {
        hospital: { include: { city: true } },
        specialty: true,
        city: true
      }
    });

    doctors = rawDoctors.map(d => ({
      slug: d.slug,
      name: d.name,
      specialty: d.specialty.name,
      qualifications: d.qualifications || undefined,
      experience: d.experienceYears ? `${d.experienceYears}+ Years` : '',
      hospital: d.hospital.name,
      city: d.city?.name || d.hospital.city.name,
      image: d.imageUrl || '',
      biography: d.biography || undefined
    }));
  }

  const hasResults = hospitals.length > 0 || doctors.length > 0;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* 1. Header Banner with Medical Discovery Network Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background Medical Discovery Image */}
        <div className="absolute inset-0 pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop" 
            alt="Search Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>

        {/* Luminous Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
              <Search className="w-3.5 h-3.5" />
              <span>Medical Network Search</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Search Results
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              {q && (
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white font-medium">
                  <Search className="w-3.5 h-3.5 text-teal-300" />
                  <span>Keyword: &ldquo;{q}&rdquo;</span>
                </div>
              )}
              {city && (
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-teal-300" />
                  <span>City: {city}</span>
                </div>
              )}
              {!q && !city && <span className="text-slate-300">Showing all accredited hospital providers and doctors</span>}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Results Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {!hasResults ? (
          <div className="text-center py-16 sm:py-20 glass-panel rounded-3xl border border-white/90 dark:border-slate-800 shadow-xl max-w-xl mx-auto p-6 sm:p-10 bg-white/95 dark:bg-slate-900/95 transition-colors duration-500">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary dark:text-teal-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">No Matching Results Found</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find specific hospitals or doctors for this search. Try using broader medical terms or contact our 24/7 care team.
            </p>
            <Button asChild size="lg" className="rounded-full shadow-md bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm px-6 h-11">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Home
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            
            {/* Hospitals Section */}
            {hospitals.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary dark:text-teal-400 font-semibold text-xs uppercase tracking-wider mb-1">
                      <Building2 className="w-4 h-4" />
                      <span>Accredited Hospitals</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{hospitals.length} Hospitals Found</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                  {hospitals.map(hospital => (
                    <HospitalCard 
                      key={hospital.slug}
                      {...hospital}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Doctors Section */}
            {doctors.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary dark:text-teal-400 font-semibold text-xs uppercase tracking-wider mb-1">
                      <Stethoscope className="w-4 h-4" />
                      <span>Specialist Doctors</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{doctors.length} Specialists Found</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                  {doctors.map(doctor => (
                    <DoctorCard 
                      key={doctor.slug}
                      {...doctor}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
