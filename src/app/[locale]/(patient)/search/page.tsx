import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/mockData';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { Search, MapPin, AlertCircle, Sparkles, Building2, Stethoscope, ArrowLeft } from 'lucide-react';
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

  // Synonym map for common patient search terms to medical specialties
  const SYNONYM_MAP: Record<string, string[]> = {
    'heart': ['cardiology', 'cardiac', 'cardiovascular'],
    'cancer': ['oncology', 'tumor'],
    'brain': ['neurology', 'neurosurgeon', 'neuro'],
    'bone': ['orthopedics', 'orthopaedic', 'joint', 'spine'],
    'kidney': ['nephrology', 'renal', 'urology'],
    'liver': ['hepatology', 'transplant'],
    'stomach': ['gastroenterology', 'gastric'],
    'lung': ['pulmonology', 'respiratory'],
    'eye': ['ophthalmology', 'vision'],
    'skin': ['dermatology'],
    'child': ['pediatrics', 'paediatrics'],
    'women': ['gynecology', 'maternity', 'ivf'],
  };

  // Helper to check if search query matches any synonyms
  const getSearchTerms = (query: string): string[] => {
    const terms = [query];
    for (const [key, values] of Object.entries(SYNONYM_MAP)) {
      if (key.includes(query) || values.some(v => v.includes(query) || query.includes(v))) {
        terms.push(key, ...values);
      }
    }
    return terms;
  };

  const searchTerms = q ? getSearchTerms(q) : [];

  // Filter Hospitals
  const filteredHospitals = MOCK_HOSPITALS.filter(hospital => {
    const matchesQuery = !q || searchTerms.some(term => 
      hospital.name.toLowerCase().includes(term) || 
      hospital.specialties.some(s => s.toLowerCase().includes(term))
    );
      
    const matchesCity = !city || hospital.city.toLowerCase().includes(city);
    
    return matchesQuery && matchesCity;
  });

  // Filter Doctors
  const filteredDoctors = MOCK_DOCTORS.filter(doctor => {
    const matchesQuery = !q || searchTerms.some(term => 
      doctor.name.toLowerCase().includes(term) || 
      doctor.specialty.toLowerCase().includes(term)
    );
      
    const matchesCity = !city || doctor.hospital.toLowerCase().includes(city);
      
    return matchesQuery && matchesCity;
  });

  const hasResults = filteredHospitals.length > 0 || filteredDoctors.length > 0;

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
            {filteredHospitals.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary dark:text-teal-400 font-semibold text-xs uppercase tracking-wider mb-1">
                      <Building2 className="w-4 h-4" />
                      <span>Accredited Hospitals</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{filteredHospitals.length} Hospitals Found</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                  {filteredHospitals.map(hospital => (
                    <HospitalCard 
                      key={hospital.slug}
                      {...hospital}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Doctors Section */}
            {filteredDoctors.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary dark:text-teal-400 font-semibold text-xs uppercase tracking-wider mb-1">
                      <Stethoscope className="w-4 h-4" />
                      <span>Specialist Doctors</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{filteredDoctors.length} Specialists Found</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                  {filteredDoctors.map(doctor => (
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
