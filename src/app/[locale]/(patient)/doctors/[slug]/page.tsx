import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, Star, CalendarDays, CheckCircle2, ChevronRight, GraduationCap, Award, Scroll, Stethoscope, Zap, BookOpen, Globe, Share2, MessageCircle, Link as LinkIcon, Send, MessageSquare, Plane, ClipboardList, CalendarHeart, ShieldCheck, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { ShareButtons } from '@/components/patient/ShareButtons';
import { MobileTOC } from '@/components/patient/MobileTOC';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      {title}
    </div>
    <div className="flex-1 h-px bg-slate-100" />
  </div>
);

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

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations('DoctorDetail');
  
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

  // Fetch related doctors from the same specialty
  const relatedDoctors = await prisma.doctor.findMany({
    where: {
      specialtyId: doctor.specialtyId,
      id: { not: doctor.id },
    },
    include: {
      specialty: true,
    },
    take: 4,
  });

  const city = doctor.city || doctor.hospital.city;
  const experienceText = doctor.experienceYears ? t('experience', { years: doctor.experienceYears }) : t('highlyExperienced');
  const profileImage = doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop";

  const tocItems = [
    { id: 'about', label: t('about'), show: true },
    { id: 'qualifications', label: t('qualifications'), show: doctor.medicalQualifications.length > 0 },
    { id: 'experience', label: t('professionalExperience'), show: doctor.professionalExperience.length > 0 },
    { id: 'expertise', label: t('areasOfExpertise'), show: doctor.areasOfExpertise.length > 0 },
    { id: 'treatments', label: t('treatmentsAndProcedures'), show: doctor.allTreatments.length > 0 },
    { id: 'interests', label: t('specialInterests'), show: doctor.specialInterests.length > 0 },
    { id: 'fellowships', label: t('fellowshipsAndTraining'), show: doctor.fellowshipsAndTraining.length > 0 },
    { id: 'research', label: t('researchPublications'), show: doctor.researchPublications.length > 0 },
    { id: 'awards', label: t('awardsRecognitions'), show: doctor.awardsRecognitions.length > 0 },
    { id: 'memberships', label: t('professionalMemberships'), show: doctor.professionalMemberships.length > 0 },
    { id: 'why', label: t('whyChooseThisDoctor'), show: doctor.whyChooseThisDoctor.length > 0 },
    { id: 'international', label: "For International Patients", show: true },
    { id: 'whyChooseUs', label: t('whyChooseUs.title'), show: true },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-600 pb-24 pt-8 font-sans selection:bg-primary/20">
      
      {/* Mobile Floating TOC */}
      <MobileTOC items={tocItems} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">{t('breadcrumbs.home')}</Link>
          <span>/</span>
          <Link href={`/${locale}/doctors`} className="hover:text-primary transition-colors">{t('breadcrumbs.doctors')}</Link>
          <span>/</span>
          <span className="text-slate-900">{getTranslation(doctor, 'name', locale)}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#123654] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-700 mb-8 sm:mb-10 flex flex-col relative overflow-hidden">
          
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative z-10 w-full mb-10">
            {/* Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-slate-100 shadow-xl border-4 border-white/10 shrink-0 relative">
              <img 
                src={profileImage} 
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center space-y-3 lg:pt-2">
              <div className="flex flex-col xl:flex-row xl:items-center items-start gap-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                  {getTranslation(doctor, 'name', locale)}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> {t('authorized')}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2 flex-wrap">
                <span>{getTranslation(doctor.specialty, 'name', locale)}</span>
                <span className="text-slate-500">•</span>
                <span>{getTranslation(doctor.hospital, 'name', locale)}, {getTranslation(city, 'name', locale)}</span>
                <span className="text-slate-500">•</span>
                <span>JCI & NABH Accredited</span>
              </p>

              {/* Pill Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3 py-1.5 rounded-full border border-yellow-500/40 text-yellow-500 text-xs font-semibold bg-yellow-500/10">
                  {getTranslation(doctor.specialty, 'name', locale)}
                </span>
                <span className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-xs font-medium">
                  {experienceText}
                </span>
                <span className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-xs font-medium">
                  English • Hindi
                </span>
                <span className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-xs font-medium">
                  {getTranslation(city, 'name', locale)}
                </span>
              </div>
            </div>

            {/* Right Side: Enquiry CTA for Desktop */}
            <div className="hidden lg:block shrink-0 pt-2">
              <EnquiryForm>
                <Button className="w-full bg-white hover:bg-slate-100 text-[#123654] font-bold rounded-xl px-8 h-12 transition-all shadow-lg">
                  {t('askButton')}
                </Button>
              </EnquiryForm>
            </div>
          </div>



          {/* Key Trust Markers (Doctor Specific) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-2 border-t border-slate-700/50 relative z-10">
            
            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-sm font-medium text-slate-300 w-full">
                <span className="text-white font-bold block mb-2">Highly Experienced</span>
                <ul className="space-y-1.5 text-slate-400 text-xs">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">Thousands of successful cases</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">Board-certified specialist</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                <Stethoscope className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-sm font-medium text-slate-300 w-full">
                <span className="text-white font-bold block mb-2">Specialized Focus</span>
                <ul className="space-y-1.5 text-slate-400 text-xs">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">{getTranslation(doctor.specialty, 'name', locale)}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">Advanced surgical techniques</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-sm font-medium text-slate-300 w-full">
                <span className="text-white font-bold block mb-2">Proven Track Record</span>
                <ul className="space-y-1.5 text-slate-400 text-xs">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">High clinical success rates</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5"/> 
                    <span className="leading-tight">Patient-centered care</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Mobile Enquiry Button */}
          <div className="lg:hidden mt-8 pt-6 border-t border-slate-700/50 relative z-10">
            <EnquiryForm>
              <Button className="w-full bg-white hover:bg-slate-100 text-[#123654] font-bold rounded-xl px-6 h-12 transition-all shadow-lg">
                {t('askButton')}
              </Button>
            </EnquiryForm>
          </div>
        </div>

        {/* Two Column Layout for Profile Data and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (Left, 8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About Doctor */}
            <section id="about" className="scroll-mt-32">
              <SectionHeader title={t('about')} />
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-[15px]">
                {getTranslation(doctor, 'biography', locale) ? (
                  <p className="whitespace-pre-wrap">{getTranslation(doctor, 'biography', locale)}</p>
                ) : (
                  <p>{t('aboutFallback', { name: getTranslation(doctor, 'name', locale) })}</p>
                )}
              </div>
            </section>

            {/* Medical Qualification */}
            {doctor.medicalQualifications.length > 0 && (
              <section id="qualifications" className="scroll-mt-32">
                <SectionHeader title={t('qualifications')} />
                <div className="space-y-4">
                  {doctor.medicalQualifications.map((q, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                        <GraduationCap className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <span className="text-[15px] font-bold text-slate-900 leading-snug">{q}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Experience */}
            {doctor.professionalExperience.length > 0 && (
              <section id="experience" className="scroll-mt-32">
                <SectionHeader title={t('professionalExperience')} />
                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:inset-y-2 before:left-[11px] sm:before:left-[15px] before:w-px before:bg-slate-200">
                  {doctor.professionalExperience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Node */}
                      <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-[15px] font-semibold text-slate-800 leading-relaxed">{exp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Areas of Expertise */}
            {doctor.areasOfExpertise.length > 0 && (
              <section id="expertise" className="scroll-mt-32">
                <SectionHeader title={t('areasOfExpertise')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctor.areasOfExpertise.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[14px] font-semibold text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Treatments & Procedures */}
            {doctor.allTreatments.length > 0 && (
              <section id="treatments" className="scroll-mt-32">
                <SectionHeader title={t('treatmentsAndProcedures')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {doctor.allTreatments.map((treatment, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group">
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
                      <span className="text-[14px] font-medium text-slate-700 group-hover:text-primary transition-colors">{treatment}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Advanced Techniques and Special Interests */}
            {doctor.specialInterests.length > 0 && (
              <section id="interests" className="scroll-mt-32">
                <SectionHeader title={t('specialInterests')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctor.specialInterests.map((interest, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-[14px] font-semibold text-slate-700 leading-snug">{interest}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Fellowships and Professional Training */}
            {doctor.fellowshipsAndTraining.length > 0 && (
              <section id="fellowships" className="scroll-mt-32">
                <SectionHeader title={t('fellowshipsAndTraining')} />
                <div className="space-y-4">
                  {doctor.fellowshipsAndTraining.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-full bg-[#123654] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col pt-2">
                        <span className="text-[15px] font-semibold text-slate-800 leading-relaxed">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Research and Publications */}
            {doctor.researchPublications.length > 0 && (
              <section id="research" className="scroll-mt-32">
                <SectionHeader title={t('researchPublications')} />
                <div className="space-y-4">
                  {doctor.researchPublications.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-full bg-[#123654] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col pt-2">
                        <span className="text-[15px] font-semibold text-slate-800 leading-relaxed">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards & Recognition */}
            {doctor.awardsRecognitions.length > 0 && (
              <section id="awards" className="scroll-mt-32">
                <SectionHeader title={t('awardsRecognitions')} />
                <div className="space-y-4">
                  {doctor.awardsRecognitions.map((award, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-yellow-500/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 border border-yellow-100 group-hover:bg-yellow-100/50 transition-colors">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex flex-col pt-2">
                        <span className="text-[15px] font-semibold text-slate-800 leading-relaxed">{award}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Memberships */}
            {doctor.professionalMemberships.length > 0 && (
              <section id="memberships" className="scroll-mt-32">
                <SectionHeader title={t('professionalMemberships')} />
                <div className="flex flex-wrap gap-2.5">
                  {doctor.professionalMemberships.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full border border-primary/20 text-primary text-[13px] font-medium bg-white hover:bg-primary/5 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Why Choose This Doctor */}
            {doctor.whyChooseThisDoctor.length > 0 && (
              <section id="why" className="scroll-mt-32">
                <SectionHeader title={t('whyChooseThisDoctor')} />
                <div className="space-y-4">
                  {doctor.whyChooseThisDoctor.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-full bg-[#123654] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col pt-2">
                        <span className="text-[15px] font-semibold text-slate-800 leading-relaxed">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* For International Patients Section (Static) */}
            <section id="international" className="scroll-mt-32 mt-12">
              <SectionHeader title="For International Patients" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Virtual Consultation</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Online second opinion and pre-travel consultation before you book your journey to India.</p>
                </div>
                
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <Plane className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Medical Visa Support</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Invitation letters and full documentation assistance for your medical visa application.</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Transparent Cost Estimate</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Detailed treatment cost provided upfront. No hidden charges, no surprises on arrival.</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Stethoscope className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Post-Op Follow-Up</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Structured rehabilitation plan and remote follow-up care after you return home.</p>
                </div>
              </div>
            </section>


          </div>

          {/* Right Column (Sidebar, 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents (Desktop Only) */}
              <div className="hidden lg:block bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  {t('toc')}
                </h3>
                <nav className="space-y-3.5 flex flex-col font-medium">
                  {tocItems.filter(item => item.show).map(item => (
                    <a key={item.id} href={`#${item.id}`} className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>



              {/* Why Choose Us */}
              <div id="whyChooseUs" className="scroll-mt-32 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {t('whyChooseUs.title')}
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">
                  {t('whyChooseUs.subtitle')}
                </p>
                <div className="space-y-4">
                  {(t.raw('whyChooseUs.benefits') as string[]).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative h-40">
                  <img src="/images/hero-hospital.jpg" alt="Medical Care Support" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom CTA and Share Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 mb-12">
          
          <div className="lg:col-span-8 flex flex-col order-2 lg:order-1 justify-end">
            {/* Book Consultation Banner */}
            <div className="bg-[#123654] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg border border-slate-700">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                  Book a consultation with {getTranslation(doctor, 'name', locale)}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-300 font-medium">
                  In-person & virtual appointments available • {getTranslation(doctor.hospital, 'name', locale)}, {getTranslation(city, 'name', locale)}
                </p>
              </div>

              <EnquiryForm>
                <Button className="w-full md:w-auto bg-white hover:bg-slate-100 text-[#123654] font-bold rounded-xl px-6 h-12 transition-all shadow-lg shrink-0 gap-2">
                  <CalendarHeart className="w-4 h-4 text-red-500" /> Book Appointment
                </Button>
              </EnquiryForm>
            </div>
            
            <div className="pt-8 mt-8 text-[11px] text-slate-400 border-t border-slate-100 leading-relaxed">
              {t('disclaimer')}
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2">
            {/* Share Doctor */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm h-full flex flex-col">
              <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                {t('share.title')}
              </h3>
              <ShareButtons 
                whatsappText={t('share.whatsapp')}
                telegramText={t('share.telegram')}
                facebookText={t('share.facebook')}
                copyText={t('share.copy')}
                doctorName={getTranslation(doctor, 'name', locale)}
              />
            </div>
          </div>
        </div>



        {/* Related Doctors Section */}
        {relatedDoctors.length > 0 && (
          <div className="mt-10 sm:mt-12 mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 sm:mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              {t('related')}
            </h2>
            
            <div className="flex overflow-x-auto pb-2 -mx-6 px-6 sm:pb-0 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {relatedDoctors.map((rd) => (
                <Link 
                  href={`/${locale}/doctors/${rd.slug}`} 
                  key={rd.id} 
                  className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col items-center text-center min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm relative">
                    <img 
                      src={rd.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"} 
                      alt={getTranslation(rd, 'name', locale)} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{getTranslation(rd, 'name', locale)}</h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-primary/80 mb-3 line-clamp-1">{getTranslation(rd.specialty, 'name', locale)}</p>
                  
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500 mt-auto pt-3 border-t border-slate-200/60 w-full justify-center">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    {rd.experienceYears ? t('experienceShort', { years: rd.experienceYears }) : t('highlyExperienced')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
