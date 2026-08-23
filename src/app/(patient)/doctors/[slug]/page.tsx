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
    <div className="bg-[#1C2621] min-h-screen text-slate-200 pb-24 pt-8 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-teal-400 transition-colors">Doctors</Link>
          <span>/</span>
          <span className="text-white">{doctor.name}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#24302A] rounded-2xl p-6 sm:p-10 shadow-lg border border-white/5 mb-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl overflow-hidden bg-white">
              <img 
                src={profileImage} 
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start gap-6 pt-2">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {doctor.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Profile Authorized
                </span>
              </div>
              
              <p className="text-xl text-slate-300 font-medium">
                {doctor.specialty.name}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400 pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  {doctor.hospital.name}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  {city.name}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                  {experienceText}
                </div>
              </div>
            </div>

            <div className="md:max-w-xs w-full">
              <EnquiryForm>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold rounded-lg px-6 h-12 text-sm transition-colors shadow-lg shadow-teal-500/20">
                  Ask Asad Healthcare about this Doctor
                </Button>
              </EnquiryForm>
              <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                Your enquiry is received by Asad Healthcare's care team and is not sent directly to the doctor. Appointments and availability remain subject to confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Profile Data and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (Left, 8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About Doctor */}
            <section id="about">
              <h2 className="text-2xl font-bold text-white mb-6">About Doctor</h2>
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-[15px]">
                {doctor.biography ? (
                  <p className="whitespace-pre-wrap">{doctor.biography}</p>
                ) : (
                  <p>{doctor.name} is a highly experienced specialist.</p>
                )}
              </div>
            </section>

            {/* Medical Qualification */}
            {doctor.medicalQualifications.length > 0 && (
              <section id="qualifications">
                <h2 className="text-2xl font-bold text-white mb-6">Medical Qualification</h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-300 text-[15px]">
                  {doctor.medicalQualifications.map((q, idx) => (
                    <li key={idx} className="pl-2">{q}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Professional Experience */}
            {doctor.professionalExperience.length > 0 && (
              <section id="experience">
                <h2 className="text-2xl font-bold text-white mb-6">Professional Experience</h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-300 text-[15px]">
                  {doctor.professionalExperience.map((exp, idx) => (
                    <li key={idx} className="pl-2">{exp}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Special Interests (2 Columns) */}
            {doctor.specialInterests.length > 0 && (
              <section id="interests">
                <h2 className="text-2xl font-bold text-white mb-6">Special Interests</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-300 text-[15px]">
                  {doctor.specialInterests.map((interest, idx) => (
                    <li key={idx} className="pl-2">{interest}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Career Highlights */}
            {doctor.careerHighlights.length > 0 && (
              <section id="highlights">
                <h2 className="text-2xl font-bold text-white mb-6">Career Highlights</h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-300 text-[15px] leading-relaxed">
                  {doctor.careerHighlights.map((highlight, idx) => (
                    <li key={idx} className="pl-2">{highlight}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Research & Fellowships (2 Columns) */}
            {doctor.researchFellowships.length > 0 && (
              <section id="research">
                <h2 className="text-2xl font-bold text-white mb-6">Research & Fellowships</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-300 text-[15px]">
                  {doctor.researchFellowships.map((res, idx) => (
                    <li key={idx} className="pl-2">{res}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Awards & Recognition */}
            {doctor.awardsRecognitions.length > 0 && (
              <section id="awards">
                <h2 className="text-2xl font-bold text-white mb-6">Awards & Recognition</h2>
                <ul className="space-y-3 list-disc pl-5 text-slate-300 text-[15px] leading-relaxed">
                  {doctor.awardsRecognitions.map((award, idx) => (
                    <li key={idx} className="pl-2">{award}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* All Treatments (2 Columns) */}
            {doctor.allTreatments.length > 0 && (
              <section id="treatments">
                <h2 className="text-2xl font-bold text-white mb-6">All Treatments</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 text-slate-300 text-[15px]">
                  {doctor.allTreatments.map((treatment, idx) => (
                    <li key={idx} className="pl-2">
                      {treatment}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            <div className="pt-8 text-xs text-slate-500 border-t border-white/10 max-w-3xl">
              Authorization means that permission to publish this profile has been recorded. It does not mean that Asad Healthcare ranks, medically endorses or guarantees the services or outcomes of the doctor.
            </div>

          </div>

          {/* Right Column (Sidebar, 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents */}
              <div className="bg-[#24302A] rounded-2xl p-6 border border-white/5 shadow-lg">
                <h3 className="text-base font-bold text-white mb-4">Table of Contents</h3>
                <nav className="space-y-3 flex flex-col">
                  <a href="#about" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">About Doctor</a>
                  {doctor.medicalQualifications.length > 0 && (
                    <a href="#qualifications" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">Medical Qualification</a>
                  )}
                  {doctor.professionalExperience.length > 0 && (
                    <a href="#experience" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">Professional Experience</a>
                  )}
                  {doctor.specialInterests.length > 0 && (
                    <a href="#interests" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">Special Interests</a>
                  )}
                  {doctor.careerHighlights.length > 0 && (
                    <a href="#highlights" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">Career Highlights</a>
                  )}
                  {doctor.researchFellowships.length > 0 && (
                    <a href="#research" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">Research & Fellowships</a>
                  )}
                  {doctor.awardsRecognitions.length > 0 && (
                    <a href="#awards" className="text-teal-400 font-medium text-sm transition-colors">Awards & Recognition</a>
                  )}
                  {doctor.allTreatments.length > 0 && (
                    <a href="#treatments" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">All Treatments</a>
                  )}
                </nav>
              </div>

              {/* Share Doctor */}
              <div className="bg-[#24302A] rounded-2xl p-6 border border-white/5 shadow-lg">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Share Doctor</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-[#25D366] font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-[#0088cc] font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                    <Send className="w-4 h-4" /> Telegram
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-[#1877F2] font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-[#1C2621] text-white font-medium py-2.5 rounded-xl hover:bg-[#1C2621]/80 transition-colors text-sm border border-white/10 mt-2">
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
