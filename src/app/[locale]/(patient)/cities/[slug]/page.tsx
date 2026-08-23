import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, Building2, Stethoscope, BriefcaseMedical, CheckCircle2, ChevronRight, Activity, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HospitalCard } from '@/components/patient/HospitalCard';

export const revalidate = 3600;



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = await prisma.city.findUnique({ where: { slug } });
  
  if (!city) return { title: 'City Not Found' };
  
  return {
    title: `Medical Tourism in ${city.name}, ${city.country} | Asad Healthcare`,
    description: city.description?.slice(0, 160) || `Explore top hospitals and medical treatments in ${city.name}, ${city.country}.`,
  };
}

export default async function CityProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const city = await prisma.city.findUnique({
    where: { slug },
    include: {
      hospitals: {
        include: {
          doctors: true
        }
      },
      doctors: {
        include: { specialty: true, hospital: true }
      }
    }
  });

  if (!city) notFound();

  // Premium Placeholder Logic
  const heroImage = city.imageUrl || "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop";

  // Calculate some stats for the city
  const totalHospitals = city.hospitals.length;
  const totalBeds = city.hospitals.reduce((acc, h) => acc + (h.beds || 0), 0);
  const totalSpecialists = city.hospitals.reduce((acc, h) => acc + h.doctors.length, 0) + city.doctors.length;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden bg-slate-900">
        <img 
          src={heroImage}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12 sm:pb-16">
            <div className="max-w-4xl text-center mx-auto">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="glass-pill bg-teal-500/20 text-teal-100 border-teal-500/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md uppercase tracking-wider">
                  Top Healthcare Destination
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight drop-shadow-md">
                Medical Tourism in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-200">{city.name}</span>
              </h1>
              
              <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed line-clamp-2 mb-8">
                {city.state ? `${city.state}, ` : ""}{city.country}
              </p>

              {/* Quick City Stats (Floating in Hero) */}
              <div className="inline-flex flex-wrap justify-center gap-4 sm:gap-8 glass-panel bg-white/10 border-white/20 px-6 sm:px-10 py-4 rounded-3xl backdrop-blur-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalHospitals}+</div>
                  <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wider">Hospitals</div>
                </div>
                <div className="w-px h-8 bg-white/20 my-auto"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalBeds}+</div>
                  <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wider">Beds</div>
                </div>
                <div className="w-px h-8 bg-white/20 my-auto"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalSpecialists}+</div>
                  <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wider">Specialists</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* About the City */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Healthcare in {city.name}</h2>
            <div className="prose prose-slate max-w-none mx-auto text-left sm:text-center">
              <p className="text-slate-600 leading-relaxed sm:text-lg">
                {city.description || `${city.name} is one of the most prominent hubs for medical tourism in ${city.country}. Known for its world-class medical infrastructure, renowned specialists, and cost-effective treatments, the city attracts thousands of international patients every year. With deep expertise in complex surgeries, organ transplants, and advanced diagnostics, ${city.name} offers unparalleled healthcare services.`}
              </p>
            </div>
          </div>

          {/* Hospitals in this City */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Top Hospitals in {city.name}</h2>
                <p className="text-slate-500 mt-2">Internationally accredited institutions delivering excellence.</p>
              </div>
              <Link href={`/hospitals?city=${slug}`} className="hidden sm:flex text-sm font-semibold text-primary hover:text-teal-700 items-center gap-1">
                View All Hospitals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {city.hospitals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {city.hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    slug={hospital.slug}
                    name={hospital.name}
                    city={city.name}
                    state={city.state || city.country}
                    image={hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop"}
                    accreditations={hospital.accreditations}
                    beds={hospital.beds || 500}
                    specialties={[]} // Optional: Fetch top 3 specialties of doctors in this hospital if needed
                    hasInternationalSupport={hospital.internationalServices.length > 0}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No Hospitals Listed Yet</h3>
                <p className="text-slate-500 mt-1">We are currently updating our partner network for {city.name}.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
