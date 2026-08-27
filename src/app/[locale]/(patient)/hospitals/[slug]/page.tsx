import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  const heroImage = hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop";

  const tocItems = [
    { id: 'about', label: t('about'), show: !!hospital.description },
    { id: 'premium-facilities', label: t('premiumFacilities'), show: (getTranslation(hospital, 'premiumFacilities', locale) || hospital.premiumFacilities)?.length > 0 },
    { id: 'specialities', label: t('multiSpecialties'), show: (getTranslation(hospital, 'multiSpecialties', locale) || hospital.multiSpecialties)?.length > 0 },
    { id: 'technologies', label: t('technologies'), show: (getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies)?.length > 0 },
    { id: 'connectivity', label: t('connectivity'), show: (getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation)?.length > 0 },
    { id: 'excellence', label: t('excellence'), show: (getTranslation(hospital, 'excellenceInCare', locale) || hospital.excellenceInCare)?.length > 0 },
    { id: 'facilities', label: t('facilities'), show: (getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities) && Object.keys((getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities)).length > 0 },
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
          <Link href={`/${locale}/hospitals`} className="hover:text-primary transition-colors">{t('breadcrumbs.hospitals')}</Link>
          <span>/</span>
          <span className="text-slate-900">{getTranslation(hospital, 'name', locale)}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#123654] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-700 mb-8 sm:mb-10 flex flex-col relative overflow-hidden">
          
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left relative z-10 w-full mb-6">
            {/* Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden bg-white shadow-xl border-4 border-white/20 shrink-0 relative">
              <img 
                src={heroImage} 
                alt={hospital.name}
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col items-center lg:items-start justify-center space-y-3 lg:pt-2">
              <div className="flex flex-col xl:flex-row xl:items-center items-center lg:items-start gap-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                  {getTranslation(hospital, 'name', locale)}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> {t('overview.title') || "Verified"}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 font-medium flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <span><MapPin className="w-4 h-4 inline-block mr-1" /> {getTranslation(hospital.city, 'name', locale)}, {hospital.city.country}</span>
                {hospital.established && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>{t('overview.established')}: {hospital.established}</span>
                  </>
                )}
              </p>

              {/* Pill Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-2">
                {hospital.beds && (
                  <span className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5" /> {hospital.beds} {t('overview.beds')}
                  </span>
                )}
                {hospital.airportDistance && (
                  <span className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" /> {hospital.airportDistance} km
                  </span>
                )}
                {hospital.accreditations && hospital.accreditations.slice(0, 2).map((acc, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full border border-yellow-500/40 text-yellow-500 text-xs font-semibold bg-yellow-500/10">
                    {acc}
                  </span>
                ))}
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
          
          {/* Action Bottom Bar (Highlights) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-2 border-t border-slate-700/50 relative z-10 w-full">
            
            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-sm font-medium text-slate-300 w-full">
                <span className="text-white font-bold block mb-1">Premium Facilities</span>
                <span className="text-slate-400 text-xs leading-relaxed block">State-of-the-art infrastructure & medical technology.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-sm font-medium text-slate-300 w-full">
                <span className="text-white font-bold block mb-1">Multi-Speciality Care</span>
                <span className="text-slate-400 text-xs leading-relaxed block">Comprehensive treatment across all disciplines.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 lg:mt-12">
          
          {/* Main Content (Left, 8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About Hospital */}
            {hospital.description && (
              <section id="about" className="scroll-mt-32">
                <SectionHeader title={t('about')} />
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-[15px]">
                  <p className="whitespace-pre-wrap">
                    {getTranslation(hospital, 'description', locale) || `${getTranslation(hospital, 'name', locale)} is a premier healthcare institution located in ${getTranslation(hospital.city, 'name', locale)}. Equipped with state-of-the-art medical technology and staffed by internationally trained specialists, the hospital offers comprehensive medical care across various disciplines.`}
                  </p>
                </div>
              </section>
            )}

            {/* Premium Facilities */}
            {(getTranslation(hospital, 'premiumFacilities', locale) || hospital.premiumFacilities) && (getTranslation(hospital, 'premiumFacilities', locale) || hospital.premiumFacilities).length > 0 && (
              <section id="premium-facilities" className="scroll-mt-32">
                <SectionHeader title={t('premiumFacilities')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {(getTranslation(hospital, 'premiumFacilities', locale) || hospital.premiumFacilities).map((facility: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed pt-2">{facility}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Multi Speciality Services */}
            {(getTranslation(hospital, 'multiSpecialties', locale) || hospital.multiSpecialties) && (getTranslation(hospital, 'multiSpecialties', locale) || hospital.multiSpecialties).length > 0 && (
              <section id="specialities" className="scroll-mt-32">
                <SectionHeader title={t('multiSpecialties')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {(getTranslation(hospital, 'multiSpecialties', locale) || hospital.multiSpecialties).map((spec: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                        <Stethoscope className="w-5 h-5 text-teal-500" />
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">{spec}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Advanced Medical Technologies */}
            {(getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies) && (getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies).length > 0 && (
              <section id="technologies" className="scroll-mt-32">
                <SectionHeader title={t('technologies')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {(getTranslation(hospital, 'advancedTechnologies', locale) || hospital.advancedTechnologies).map((tech: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <p className="text-slate-700 font-medium leading-relaxed">{tech}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Connectivity & Location */}
            {(getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation) && (getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation).length > 0 && (
              <section id="connectivity" className="scroll-mt-32">
                <SectionHeader title={t('connectivity')} />
                <div className="space-y-4 mt-6">
                  {(getTranslation(hospital, 'connectivityLocation', locale) || hospital.connectivityLocation).map((item: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                      <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0 mt-2" />
                      <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Excellence in Patient Care */}
            {(getTranslation(hospital, 'excellenceInCare', locale) || hospital.excellenceInCare) && (getTranslation(hospital, 'excellenceInCare', locale) || hospital.excellenceInCare).length > 0 && (
              <section id="excellence" className="scroll-mt-32">
                <SectionHeader title={t('excellence')} />
                <div className="space-y-4 mt-6">
                  {(getTranslation(hospital, 'excellenceInCare', locale) || hospital.excellenceInCare).map((item: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                      <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0 mt-2" />
                      <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hospital Facilities Cards */}
            {(getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities) && typeof (getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities) === 'object' && Object.keys((getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities)).length > 0 && (
              <section id="facilities" className="scroll-mt-32">
                <SectionHeader title={t('facilities')} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {Object.entries((getTranslation(hospital, 'hospitalFacilities', locale) || hospital.hospitalFacilities) as Record<string, string[]>).map(([category, items], idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <div className="bg-slate-50 py-4 px-5 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-base">{category}</h3>
                      </div>
                      <ul className="p-5 space-y-3 flex-1">
                        {Array.isArray(items) ? items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></div>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        )) : (
                          <li className="text-sm text-slate-600 leading-relaxed">{String(items)}</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
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

              {/* Ask Asad Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('askButton')}</h3>
                <p className="text-sm text-slate-500 mb-6">Get a personalized treatment plan and cost estimate.</p>
                
                <EnquiryForm>
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all">
                    Request Consultation
                  </Button>
                </EnquiryForm>
              </div>

              {/* Why Choose Us / Value Prop Card */}
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 sm:p-8 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6">International Patient Care</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Visa Assistance</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">Medical visa invitation letters</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Airport Transfers</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">Complimentary pickup & drop</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Language Interpreters</h4>
                        <p className="text-xs text-teal-100 mt-0.5 opacity-90">Dedicated translators</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Share Hospital */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col h-full">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
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


      </div>
    </div>
  );
}
