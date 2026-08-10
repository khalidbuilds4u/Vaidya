import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/mockData';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';
  const city = typeof resolvedParams.city === 'string' ? resolvedParams.city.toLowerCase() : '';

  // Filter Hospitals
  const filteredHospitals = MOCK_HOSPITALS.filter(hospital => {
    const matchesQuery = !q || 
      hospital.name.toLowerCase().includes(q) || 
      hospital.specialties.some(s => s.toLowerCase().includes(q));
      
    const matchesCity = !city || hospital.city.toLowerCase().includes(city);
    
    return matchesQuery && matchesCity;
  });

  // Filter Doctors
  const filteredDoctors = MOCK_DOCTORS.filter(doctor => {
    const matchesQuery = !q || 
      doctor.name.toLowerCase().includes(q) || 
      doctor.specialty.toLowerCase().includes(q);
      
    const matchesCity = !city || doctor.hospital.toLowerCase().includes(city);
      
    return matchesQuery && matchesCity;
  });

  const hasResults = filteredHospitals.length > 0 || filteredDoctors.length > 0;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Results</h1>
          <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
            {q && (
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Search className="w-4 h-4" />
                <span>"{q}"</span>
              </div>
            )}
            {city && (
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>{city}</span>
              </div>
            )}
            {!q && !city && <span>Showing all providers</span>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!hasResults ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">No results found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              We couldn't find any hospitals or doctors matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button render={<Link href="/" />} size="lg" className="rounded-full shadow-md">
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Hospitals Section */}
            {filteredHospitals.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Hospitals</h2>
                    <p className="text-slate-500">Found {filteredHospitals.length} matching hospitals</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Specialist Doctors</h2>
                    <p className="text-slate-500">Found {filteredDoctors.length} matching doctors</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
