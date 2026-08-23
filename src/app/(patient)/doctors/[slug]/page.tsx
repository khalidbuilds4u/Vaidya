import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, CalendarDays, CheckCircle2, Share2, MessageCircle, Link as LinkIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export const revalidate = 3600;

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
      treatments: true,
    }
  });

  if (!doctor) notFound();

  const city = doctor.city || doctor.hospital.city;
  const experienceText = doctor.experienceYears ? `${doctor.experienceYears}+ Years of Experience` : 'Highly Experienced';
  const profileImage = doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="bg-slate-50 min-h-screen text-slate-600 pb-24 pt-8 font-sans selection:bg-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
          <span>/</span>
          <span className="text-slate-900">{doctor.name}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative overflow-hidden">
          {/* Subtle gradient background for the hero card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          {/* Left Side: Image + Info */}
          <div className="flex-1 w-full grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-6 gap-y-4 relative z-10">
            {/* Image */}
            <div className="row-span-1 lg:row-span-2 shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 sm:border-4 border-white">
                <img 
                  src={profileImage} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name, Badge, Specialty */}
            <div className="flex flex-col justify-center lg:justify-start lg:pt-2 space-y-2 lg:space-y-4">
              <div className="flex flex-col xl:flex-row xl:items-center items-start gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
                  {doctor.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm shrink-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" /> Profile Authorized
                </span>
              </div>
              
              <p className="text-sm sm:text-lg lg:text-xl text-slate-700 font-semibold">
                {doctor.specialty.name}
              </p>
            </div>

            {/* Location & Experience Details */}
            <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 flex flex-row flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-[12px] sm:text-sm text-slate-500 font-medium pt-3 border-t border-slate-100 lg:pt-0 lg:border-t-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span className="truncate max-w-[180px] sm:max-w-none">{doctor.hospital.name}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                {city.name}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                {experienceText}
              </div>
            </div>
          </div>

          {/* Right Side: Enquiry Form */}
          <div className="lg:max-w-xs w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 relative z-10 shrink-0 mt-2 lg:mt-0">
            <EnquiryForm>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6 h-12 text-sm transition-all shadow-md shadow-primary/20">
                Ask Asad Healthcare
              </Button>
            </EnquiryForm>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed text-center font-medium">
              Your enquiry is received by Asad Healthcare's care team and is not sent directly to the doctor.
            </p>
          </div>
        </div>

        {/* Two Column Layout for Profile Data and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (Left, 8 cols) */}
          <div className="lg:col-span-8 space-y-12 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            
            {/* About Doctor */}
            <section id="about" className="scroll-mt-32">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                About Doctor
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-[15px]">
                {doctor.biography ? (
                  <p className="whitespace-pre-wrap">{doctor.biography}</p>
                ) : (
                  <p>{doctor.name} is a highly experienced specialist.</p>
                )}
              </div>
            </section>

            {/* Medical Qualification */}
            {doctor.medicalQualifications.length > 0 && (
              <section id="qualifications" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Medical Qualification
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-600 text-[15px] marker:text-primary/60">
                  {doctor.medicalQualifications.map((q, idx) => (
                    <li key={idx} className="pl-2">{q}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Professional Experience */}
            {doctor.professionalExperience.length > 0 && (
              <section id="experience" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Professional Experience
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-600 text-[15px] marker:text-primary/60">
                  {doctor.professionalExperience.map((exp, idx) => (
                    <li key={idx} className="pl-2">{exp}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Special Interests (2 Columns) */}
            {doctor.specialInterests.length > 0 && (
              <section id="interests" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Special Interests
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-600 text-[15px] marker:text-primary/60">
                  {doctor.specialInterests.map((interest, idx) => (
                    <li key={idx} className="pl-2">{interest}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Career Highlights */}
            {doctor.careerHighlights.length > 0 && (
              <section id="highlights" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Career Highlights
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-600 text-[15px] leading-relaxed marker:text-primary/60">
                  {doctor.careerHighlights.map((highlight, idx) => (
                    <li key={idx} className="pl-2">{highlight}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Research & Fellowships (2 Columns) */}
            {doctor.researchFellowships.length > 0 && (
              <section id="research" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Research & Fellowships
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-600 text-[15px] marker:text-primary/60">
                  {doctor.researchFellowships.map((res, idx) => (
                    <li key={idx} className="pl-2">{res}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Awards & Recognition */}
            {doctor.awardsRecognitions.length > 0 && (
              <section id="awards" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Awards & Recognition
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-600 text-[15px] leading-relaxed marker:text-primary/60">
                  {doctor.awardsRecognitions.map((award, idx) => (
                    <li key={idx} className="pl-2">{award}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* All Treatments (2 Columns) */}
            {doctor.allTreatments.length > 0 && (
              <section id="treatments" className="scroll-mt-32">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  All Treatments
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-600 text-[15px] marker:text-primary/60">
                  {doctor.allTreatments.map((treatment, idx) => (
                    <li key={idx} className="pl-2">
                      {treatment}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            <div className="pt-8 mt-12 text-[11px] text-slate-400 border-t border-slate-100 max-w-3xl leading-relaxed">
              Authorization means that permission to publish this profile has been recorded. It does not mean that Asad Healthcare ranks, medically endorses or guarantees the services or outcomes of the doctor.
            </div>

          </div>

          {/* Right Column (Sidebar, 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  Table of Contents
                </h3>
                <nav className="space-y-3.5 flex flex-col font-medium">
                  <a href="#about" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">About Doctor</a>
                  {doctor.medicalQualifications.length > 0 && (
                    <a href="#qualifications" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Medical Qualification</a>
                  )}
                  {doctor.professionalExperience.length > 0 && (
                    <a href="#experience" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Professional Experience</a>
                  )}
                  {doctor.specialInterests.length > 0 && (
                    <a href="#interests" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Special Interests</a>
                  )}
                  {doctor.careerHighlights.length > 0 && (
                    <a href="#highlights" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Career Highlights</a>
                  )}
                  {doctor.researchFellowships.length > 0 && (
                    <a href="#research" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Research & Fellowships</a>
                  )}
                  {doctor.awardsRecognitions.length > 0 && (
                    <a href="#awards" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">Awards & Recognition</a>
                  )}
                  {doctor.allTreatments.length > 0 && (
                    <a href="#treatments" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">All Treatments</a>
                  )}
                </nav>
              </div>

              {/* Share Doctor */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  Share Doctor
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 font-bold py-3 rounded-xl hover:bg-green-100 transition-colors text-sm border border-green-100">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors text-sm border border-blue-100">
                    <Send className="w-4 h-4" /> Telegram
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-100 transition-colors text-sm border border-indigo-100">
                    Facebook
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm mt-2 shadow-md">
                    <LinkIcon className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
