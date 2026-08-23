import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, BedDouble, Stethoscope, Award, CheckCircle2, ChevronRight, Activity, CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { DoctorCard } from '@/components/patient/DoctorCard';

export const revalidate = 3600;



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hospital = await prisma.hospital.findUnique({ where: { slug } });
  
  if (!hospital) return { title: 'Hospital Not Found' };
  
  return {
    title: `${hospital.name} | Asad Healthcare`,
    description: hospital.description?.slice(0, 160) || `World-class medical treatments at ${hospital.name}.`,
  };
}

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: {
      city: true,
      doctors: {
        include: { specialty: true }
      },
      treatments: true
    }
  });

  if (!hospital) notFound();

  // Premium Placeholder Logic
  const heroImage = hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop";

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden bg-slate-900">
        <img 
          src={heroImage}
          alt={hospital.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12 sm:pb-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="glass-pill bg-white/10 text-white border-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {hospital.city.name}, {hospital.city.country}
                </span>
                {hospital.internationalServices.length > 0 && (
                  <span className="glass-pill bg-teal-500/20 text-teal-100 border-teal-500/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                    International Patient Center
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight drop-shadow-md">
                {hospital.name}
              </h1>
              
              <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed line-clamp-2">
                {hospital.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 backdrop-blur-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center sm:text-left">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{hospital.beds || "500+"}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Total Beds</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{hospital.icuBeds || "120+"}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">ICU Beds</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{hospital.doctors.length || "100+"}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Specialists</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{hospital.accreditations.length || "3"}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Awards</div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">About {hospital.name}</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  {hospital.description || `${hospital.name} is a premier healthcare institution located in ${hospital.city.name}. Equipped with state-of-the-art medical technology and staffed by internationally trained specialists, the hospital offers comprehensive medical care across various disciplines. Dedicated to providing world-class treatment, they maintain strict international standards of hygiene, patient care, and clinical excellence.`}
                </p>
              </div>

              {hospital.accreditations.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Accreditations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.accreditations.map((acc, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Affiliated Doctors */}
            {hospital.doctors.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Top Specialists</h2>
                  <Link href="/doctors" className="text-sm font-semibold text-primary hover:text-teal-700 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      slug={doctor.slug}
                      name={doctor.name}
                      specialty={doctor.specialty.name}
                      qualifications={doctor.qualifications || ""}
                      experience={`${doctor.experienceYears || 10}+ Years`}
                      hospital={hospital.name}
                      city={hospital.city.name}
                      image={doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"}
                    />
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Lead Capture Card */}
              <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 border border-primary/20 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">Get a Treatment Quote</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Connect with our international patient care team to get a free personalized treatment plan and cost estimate at {hospital.name}.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Free Medical Case Review</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Visa & Logistics Assistance</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Dedicated Care Coordinator</span>
                  </div>
                </div>

                <EnquiryForm>
                  <Button className="w-full rounded-2xl h-12 shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-teal-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-base transition-all group-hover:shadow-primary/40 relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <CalendarDays className="w-5 h-5" />
                      Request Free Quote
                    </span>
                  </Button>
                </EnquiryForm>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Usually responds within 24 hours</p>
                </div>
              </div>

              {/* International Services */}
              {hospital.internationalServices.length > 0 && (
                <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                    <Award className="w-5 h-5 text-teal-400" /> 
                    International Patient Services
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {hospital.internationalServices.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <ArrowRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
