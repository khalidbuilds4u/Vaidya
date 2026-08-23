import { Metadata } from 'next';
import { Search, Filter, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600;


export const metadata: Metadata = {
  title: 'Top Medical Specialists in India | AsadHealthcare',
  description: 'Find and consult with India\'s top doctors, surgeons, and medical specialists.',
};


export default async function DoctorsDirectory({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; city?: string; specialty?: string }>;
}) {
  const { search, city, specialty } = await searchParams;

  const whereClause: any = {};
  if (search) {
    whereClause.name = { contains: search, mode: 'insensitive' };
  }
  if (city) {
    whereClause.hospital = { city: { slug: city } };
  }
  if (specialty) {
    whereClause.specialty = { slug: specialty };
  }

  const doctors = await prisma.doctor.findMany({
    where: whereClause,
    include: {
      hospital: {
        include: { city: true }
      },
      specialty: true,
    }
  });

  const cities = await prisma.city.findMany({ orderBy: { name: 'asc' } });
  const specialties = await prisma.specialty.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Leading Clinical Specialists</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Find Top Doctors & Surgeons in India
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Consult with internationally trained surgeons, department directors, and pioneers in complex surgeries trusted by thousands of global patients.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/90 shadow-lg lg:sticky lg:top-24 bg-white/95">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                <Filter className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold text-slate-900">Filter Specialists</h2>
              </div>
              
              <form method="GET" action="/doctors" className="space-y-4 sm:space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Search Doctor</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input name="search" defaultValue={search || ""} type="text" placeholder="Name or keyword..." className="pl-9 glass-input rounded-xl h-10 text-xs sm:text-sm" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Specialty</label>
                  <select name="specialty" defaultValue={specialty || ""} className="flex h-10 w-full items-center justify-between rounded-xl glass-input px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">All Specialties</option>
                    {specialties.map(s => (
                      <option key={s.id} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">City</label>
                  <select name="city" defaultValue={city || ""} className="flex h-10 w-full items-center justify-between rounded-xl glass-input px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">All Cities</option>
                    {cities.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <Button type="submit" className="w-full rounded-xl sm:rounded-full shadow-xs bg-primary hover:bg-primary/90 h-10 text-xs sm:text-sm font-semibold text-white">
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>

          {/* Doctor List */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="font-bold text-base sm:text-lg text-slate-900">{doctors.length} Specialists Available</h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="text-slate-500">Sort by:</span>
                <select className="border-0 bg-transparent font-semibold text-primary cursor-pointer focus:ring-0 text-xs sm:text-sm">
                  <option>Recommended</option>
                  <option>Most Experience</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {doctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  slug={doctor.slug}
                  name={doctor.name}
                  specialty={doctor.specialty.name}
                  qualifications={doctor.qualifications || "MBBS, MS"}
                  experience={`${doctor.experienceYears || 15}+ Years`}
                  hospital={doctor.hospital.name}
                  city={doctor.hospital.city.name}
                  image={doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"}
                  keyExpertise={[doctor.specialty.name, "Advanced Care"]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
