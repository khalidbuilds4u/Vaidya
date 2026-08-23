import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, Stethoscope, BriefcaseMedical, CheckCircle2, CalendarDays, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export const dynamic = "force-dynamic";



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await prisma.doctor.findUnique({ where: { slug } });
  
  if (!doctor) return { title: 'Doctor Not Found' };
  
  return {
    title: `${doctor.name} - ${doctor.qualifications} | Asad Healthcare`,
    description: doctor.biography?.slice(0, 160) || `Book a consultation with ${doctor.name}.`,
  };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: {
      hospital: {
        include: { city: true }
      },
      specialty: true,
      city: true,
    }
  });

  if (!doctor) notFound();

  // Determine primary city
  const city = doctor.city || doctor.hospital.city;
  const experienceText = doctor.experienceYears ? `${doctor.experienceYears}+ Years Experience` : 'Highly Experienced';
  const profileImage = doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
          <span>/</span>
          <span className="text-slate-900">{doctor.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Header Card */}
            <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left">
                {/* Image */}
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-md">
                    <img 
                      src={profileImage} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                      {doctor.specialty.name}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {doctor.name}
                    </h1>
                    {doctor.qualifications && (
                      <p className="text-sm font-semibold text-slate-500 mt-1">
                        {doctor.qualifications}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-600">
                      <BriefcaseMedical className="w-4 h-4 text-primary" />
                      {experienceText}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-600">
                      <MapPin className="w-4 h-4 text-primary" />
                      {city.name}, {city.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" /> Professional Overview
              </h2>
              <div className="prose prose-slate max-w-none">
                {doctor.biography ? (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {doctor.biography}
                  </p>
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    {doctor.name} is a highly respected specialist in {doctor.specialty.name} based in {city.name}. 
                    With {experienceText.toLowerCase()} of clinical practice, they have developed a strong reputation 
                    for delivering exceptional patient outcomes and compassionate care. They are currently practicing at {doctor.hospital.name}.
                  </p>
                )}
              </div>
            </div>

            {/* Hospital Affiliation */}
            <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" /> Hospital Affiliation
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                  <img 
                    src={doctor.hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop"} 
                    alt={doctor.hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{doctor.hospital.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-slate-500 font-medium mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {doctor.hospital.city.name}, {doctor.hospital.city.country}
                  </div>
                  <Link href={`/hospitals/${doctor.hospital.slug}`}>
                    <Button variant="outline" size="sm" className="rounded-xl font-semibold hover:bg-slate-200">
                      View Hospital Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Lead Capture Card */}
              <div className="glass-panel bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 border border-primary/20 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">Book Consultation</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Request an appointment or tele-consultation with {doctor.name}. Our care team will coordinate everything for you.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Priority Appointment Scheduling</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Medical Record Review</span>
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
                      Book Appointment
                    </span>
                  </Button>
                </EnquiryForm>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Usually responds within 24 hours</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
