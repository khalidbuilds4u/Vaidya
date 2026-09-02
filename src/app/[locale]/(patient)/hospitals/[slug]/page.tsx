import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, CalendarDays, Plane, BedDouble, Search, ChevronRight, CheckCircle2, Building2, ShieldCheck, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { ShareButtons } from '@/components/patient/ShareButtons';
import { MobileTOC } from '@/components/patient/MobileTOC';
import { auth } from '@/lib/auth';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-teal-400 bg-primary/5 dark:bg-primary/10 shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-teal-400" />
      {title}
    </div>
    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
  </div>
);

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

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations('HospitalDetail');
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';
  
  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: {
      city: true,
      specialties: true
    }
  });

  if (!hospital) notFound();
  if (!hospital.isPublished && !isAdmin) notFound();

  // Fetch related hospitals from the same city
  const relatedHospitals = await prisma.hospital.findMany({
    where: {
      cityId: hospital.cityId,
      id: { not: hospital.id },
      isPublished: true,
    },
    include: {
      city: true,
    },
    take: 4,
  });

  const heroImage = hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop";

  const tocItems = [
    { id: 'about', label: t('about'), show: !!hospital.description },
    { id: 'key-highlights', label: t('keyHighlights'), show: (getTranslation(hospital, 'keyHighlights', locale) || hospital.keyHighlights)?.length > 0 },
    { id: 'specialities', label: t('specialities'), show: (getTranslation(hospital, 'specialitiesAndCentres', locale) || hospital.specialitiesAndCentres)?.length > 0 },
    { id: 'technologies', label: t('technologies'), show: (getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies)?.length > 0 },
    { id: 'infrastructure', label: t('infrastructure'), show: (getTranslation(hospital, 'infrastructureAndFacilities', locale) || hospital.infrastructureAndFacilities)?.length > 0 },
    { id: 'patient-care', label: t('patientCare'), show: (getTranslation(hospital, 'patientCare', locale) || hospital.patientCare)?.length > 0 },
    { id: 'international-services', label: t('internationalServices'), show: (getTranslation(hospital, 'internationalServices', locale) || hospital.internationalServices)?.length > 0 },
    { id: 'connectivity', label: t('connectivity'), show: (getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation)?.length > 0 },
    { id: 'why-choose', label: t('whyChoose'), show: (getTranslation(hospital, 'whyChooseThisHospital', locale) || hospital.whyChooseThisHospital)?.length > 0 },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-600 dark:text-slate-400 pb-24 pt-8 font-sans selection:bg-primary/20 transition-colors duration-500">
      
      {/* Mobile Floating TOC */}
      <MobileTOC items={tocItems} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          <Link href={`/${locale}`} className="hover:text-primary dark:hover:text-teal-400 transition-colors">{t('breadcrumbs.home')}</Link>
          <span>/</span>
          <Link href={`/${locale}/hospitals`} className="hover:text-primary dark:hover:text-teal-400 transition-colors">{t('breadcrumbs.hospitals')}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{getTranslation(hospital, 'name', locale)}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#123654] text-white rounded-3xl shadow-xl border border-slate-700 mb-8 sm:mb-10 flex flex-col relative overflow-hidden min-h-[400px] lg:min-h-[480px]">
          
          {/* Background Image with Gradient Overlay */}
          <div className="absolute top-0 right-0 h-full w-full lg:w-2/3 z-0">
            <Image 
              src={heroImage} 
              alt={hospital.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center lg:object-right opacity-60"
            />
            {/* Gradient to ensure smooth blending with the left solid blue area */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#123654] via-[#123654]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123654] via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full justify-between flex-1">
            
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full mb-10">
              
              {/* Info */}
              <div className="flex-1 flex flex-col space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4" /> {t('verifiedHospital')}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-[1.1]">
                  {getTranslation(hospital, 'name', locale)}
                </h1>
                
                <p className="text-base sm:text-lg text-slate-300 font-medium flex items-center gap-2 flex-wrap">
                  <MapPin className="w-5 h-5 text-teal-400" /> 
                  <span>{getTranslation(hospital.city, 'name', locale)}, {hospital.city.country}</span>
                  {hospital.established && (
                    <>
                      <span className="text-slate-500 mx-2">•</span>
                      <span>{t('overview.established')}: {hospital.established}</span>
                    </>
                  )}
                </p>

                {/* Pill Badges */}
                <div className="flex flex-wrap gap-2.5 pt-3">
                  {hospital.beds && (
                    <span className="px-3.5 py-2 rounded-full border border-white/20 bg-white/5 text-slate-200 text-xs font-medium flex items-center gap-2 backdrop-blur-md">
                      <BedDouble className="w-4 h-4 text-teal-400" /> {hospital.beds} {t('overview.beds')}
                    </span>
                  )}
                  {hospital.airportDistance && (
                    <span className="px-3.5 py-2 rounded-full border border-white/20 bg-white/5 text-slate-200 text-xs font-medium flex items-center gap-2 backdrop-blur-md">
                      <Plane className="w-4 h-4 text-teal-400" /> {hospital.airportDistance} km
                    </span>
                  )}
                  {hospital.specialties && hospital.specialties.length > 0 ? (
                    hospital.specialties.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="px-3.5 py-2 rounded-full border border-blue-400/30 text-blue-400 text-xs font-bold bg-blue-500/10 backdrop-blur-md">
                        {getTranslation(spec, 'name', locale)}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="px-3.5 py-2 rounded-full border border-blue-400/30 text-blue-400 text-xs font-bold bg-blue-500/10 backdrop-blur-md">
                        {t('emergency247')}
                      </span>
                      <span className="px-3.5 py-2 rounded-full border border-purple-400/30 text-purple-400 text-xs font-bold bg-purple-500/10 backdrop-blur-md">
                        {t('worldClassCare')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side: Enquiry CTA */}
              <div className="shrink-0 w-full lg:w-auto flex justify-start lg:justify-end mt-4 lg:mt-0">
                <EnquiryForm>
                  <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl h-12 transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]">
                    {t('bookConsultation')}
                  </Button>
                </EnquiryForm>
              </div>
            </div>
            
            {/* Action Bottom Bar (Highlights) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full mt-auto">
              
              <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-sm font-medium text-slate-300 w-full">
                  <span className="text-white font-bold text-base block mb-1">{t('highlights.premium.title')}</span>
                  <span className="text-slate-400 text-[13px] leading-relaxed block">{t('highlights.premium.desc')}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm font-medium text-slate-300 w-full">
                  <span className="text-white font-bold text-base block mb-1">{t('highlights.multiSpeciality.title')}</span>
                  <span className="text-slate-400 text-[13px] leading-relaxed block">{t('highlights.multiSpeciality.desc')}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm hidden lg:flex">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-sm font-medium text-slate-300 w-full">
                  <span className="text-white font-bold text-base block mb-1">{t('highlights.globalStandard.title')}</span>
                  <span className="text-slate-400 text-[13px] leading-relaxed block">{t('highlights.globalStandard.desc')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 lg:mt-12">
          
          {/* Main Content (Left, 8 cols) */}
          <div className="lg:col-span-8 space-y-12 pb-10">
            {/* 1. About */}
            {hospital.description && (
              <div id="about" className="scroll-mt-32">
                <SectionHeader title={t('about')} />
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: getTranslation(hospital, 'description', locale) || '' }}
                />
              </div>
            )}

            {/* 2. Key Highlights */}
            {(getTranslation(hospital, 'keyHighlights', locale) || hospital.keyHighlights)?.length > 0 && (
              <div id="key-highlights" className="scroll-mt-32">
                <SectionHeader title={t('keyHighlights')} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'keyHighlights', locale) || hospital.keyHighlights).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-900/95 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Specialities & Centres of Excellence */}
            {(getTranslation(hospital, 'specialitiesAndCentres', locale) || hospital.specialitiesAndCentres)?.length > 0 && (
              <div id="specialities" className="scroll-mt-32">
                <SectionHeader title={t('specialities')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'specialitiesAndCentres', locale) || hospital.specialitiesAndCentres).map((spec: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-sm hover:border-teal-500/30 dark:hover:border-teal-500/50 transition-colors duration-500">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Advanced Medical Technology */}
            {(getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies)?.length > 0 && (
              <div id="technologies" className="scroll-mt-32">
                <SectionHeader title={t('technologies')} />
                <ul className="grid grid-cols-1 gap-3">
                  {(getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies).map((tech: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                      <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. Infrastructure & Hospital Facilities */}
            {(getTranslation(hospital, 'infrastructureAndFacilities', locale) || hospital.infrastructureAndFacilities)?.length > 0 && (
              <div id="infrastructure" className="scroll-mt-32">
                <SectionHeader title={t('infrastructure')} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'infrastructureAndFacilities', locale) || hospital.infrastructureAndFacilities).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-900/95 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 6. Patient Care */}
            {(getTranslation(hospital, 'patientCare', locale) || hospital.patientCare)?.length > 0 && (
              <div id="patient-care" className="scroll-mt-32">
                <SectionHeader title={t('patientCare')} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'patientCare', locale) || hospital.patientCare).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-500/30 dark:hover:border-teal-500/50 transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 7. International Patient Services */}
            {(getTranslation(hospital, 'internationalServices', locale) || hospital.internationalServices)?.length > 0 && (
              <div id="international-services" className="scroll-mt-32">
                <SectionHeader title={t('internationalServices')} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'internationalServices', locale) || hospital.internationalServices).map((service: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-sm hover:border-teal-500/30 dark:hover:border-teal-500/50 transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Plane className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 8. Location & Connectivity */}
            {(getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation)?.length > 0 && (
              <div id="connectivity" className="scroll-mt-32">
                <SectionHeader title={t('connectivity')} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation).map((loc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-sm transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 pt-1 leading-relaxed">{loc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 9. Why Choose This Hospital */}
            {(getTranslation(hospital, 'whyChooseThisHospital', locale) || hospital.whyChooseThisHospital)?.length > 0 && (
              <div id="why-choose" className="scroll-mt-32">
                <SectionHeader title={t('whyChoose')} />
                <ul className="grid grid-cols-1 gap-3">
                  {(getTranslation(hospital, 'whyChooseThisHospital', locale) || hospital.whyChooseThisHospital).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 shadow-sm border-l-4 border-l-teal-500 transition-colors duration-500">
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar, 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents (Desktop Only) */}
              <div className="hidden lg:block bg-white dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-500">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  {t('toc')}
                </h3>
                <nav className="space-y-3.5 flex flex-col font-medium">
                  {tocItems.filter(item => item.show).map(item => (
                    <a key={item.id} href={`#${item.id}`} className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-teal-400 hover:translate-x-1 transition-all">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Ask Asad Form Card */}
              <div className="bg-white dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors duration-500">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('askButton')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Get a personalized treatment plan and cost estimate.</p>
                
                <EnquiryForm>
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all">
                    {t('requestConsultation')}
                  </Button>
                </EnquiryForm>
              </div>

              {/* Why Choose Us / Value Prop Card */}
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 sm:p-8 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6">{t('internationalCare.title')}</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{t('internationalCare.visa.title')}</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">{t('internationalCare.visa.desc')}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{t('internationalCare.airport.title')}</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">{t('internationalCare.airport.desc')}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{t('internationalCare.language.title')}</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">{t('internationalCare.language.desc')}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Share Hospital */}
              <div className="bg-white dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full transition-colors duration-500">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  {t('share.title')}
                </h3>
                <ShareButtons 
                  whatsappText={t('share.whatsapp') || "WhatsApp"}
                  telegramText={t('share.telegram') || "Telegram"}
                  facebookText={t('share.facebook') || "Facebook"}
                  copyText={t('share.copy') || "Copy Link"}
                  doctorName={getTranslation(hospital, 'name', locale)}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Related Hospitals Section */}
        {relatedHospitals.length > 0 && (
          <div className="mt-10 sm:mt-12 mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-6 sm:mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-primary dark:bg-teal-400 rounded-full"></div>
              {t('related')}
            </h2>
            
            <div className="flex overflow-x-auto pb-2 -mx-6 px-6 sm:pb-0 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {relatedHospitals.map((rh) => (
                <Link 
                  href={`/${locale}/hospitals/${rh.slug}`} 
                  key={rh.id} 
                  className="group bg-white dark:bg-slate-900/95 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-teal-400/40 hover:shadow-lg transition-all flex flex-col min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 relative">
                    <Image 
                      src={(rh.imageUrl && rh.imageUrl.trim() !== "") ? rh.imageUrl : "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop"} 
                      alt={getTranslation(rh, 'name', locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors line-clamp-1">{getTranslation(rh, 'name', locale)}</h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-primary dark:text-teal-400" />
                    {getTranslation(rh.city, 'name', locale)}
                  </p>
                  
                  <div className="flex flex-col gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-auto pt-3 border-t border-slate-200/60 dark:border-slate-800/60 w-full transition-colors duration-500">
                    {rh.beds && (
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{t('bedsCount', { count: rh.beds })}</span>
                      </div>
                    )}
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
