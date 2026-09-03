import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { CheckCircle2, Activity, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/mockData';
import {  getTranslation, getStrictTranslation  } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;


// Fallbacks if the DB doesn't have doctors/hospitals
const baseDoctors = MOCK_DOCTORS.slice(0, 3).map(d => ({
  slug: d.slug,
  name: d.name,
  specialty: d.specialty,
  hospital: d.hospital,
  image: d.image,
  city: 'Gurgaon',
  qualifications: 'MBBS, MS',
  experience: d.experience,
  keyExpertise: ['Specialized Care']
}));

const baseHospitals = MOCK_HOSPITALS.slice(0, 3).map(h => ({
  slug: h.slug,
  name: h.name,
  city: h.city,
  state: 'Haryana',
  image: h.image,
  accreditations: ['JCI', 'NABH'],
  beds: 500,
  specialties: ['General', 'Specialized'],
  hasInternationalSupport: true
}));

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const condition = await prisma.condition.findUnique({
    where: { slug: resolvedParams.slug },
  });
  if (!condition) return { title: 'Condition Not Found' };
  
  return {
    title: `${condition.name} Treatment in India - Top Doctors & Costs | AsadHealthcare`,
    description: `Complete guide to ${condition.name} treatment in India. Find causes, symptoms, diagnosis, and the best hospitals and surgeons.`,
  };
}

export default async function ConditionDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations('Hero'); // Using common namespace for simple strings
  const tc = await getTranslations('ConditionDetail');
  
  // 1. Fetch condition from DB
  const condition = await prisma.condition.findUnique({
    where: { slug: resolvedParams.slug },
    include: { specialty: true }
  });

  if (!condition) {
    notFound();
  }

  // 2. Fetch Doctors in this specialty from DB
  const realDoctors = await prisma.doctor.findMany({
    where: { specialtyId: condition.specialtyId },
    include: { hospital: { include: { city: true } }, specialty: true },
    take: 3
  });

  // 3. Fetch Hospitals that have doctors in this specialty from DB
  const realHospitals = await prisma.hospital.findMany({
    where: {
      doctors: {
        some: { specialtyId: condition.specialtyId }
      }
    },
    include: { city: true },
    take: 3
  });

  // Map DB Doctors to DoctorCard props
  const topDoctors = realDoctors.length > 0 ? realDoctors.map(d => ({
    slug: d.slug,
    name: getTranslation(d, 'name', locale) || d.name,
    specialty: getTranslation(d.specialty, 'name', locale) || d.specialty.name,
    hospital: getTranslation(d.hospital, 'name', locale) || d.hospital.name,
    image: d.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070",
    city: getTranslation(d.hospital.city, 'name', locale) || 'India',
    qualifications: getTranslation(d, 'qualifications', locale) || undefined,
    experience: d.experienceYears ? `${d.experienceYears}+` : '',
    biography: getStrictTranslation(d, 'biography', locale) || undefined,
    keyExpertise: ['Specialized Care']
  })) : baseDoctors;

  // Map DB Hospitals to HospitalCard props
  const topHospitals = realHospitals.length > 0 ? realHospitals.map(h => ({
    slug: h.slug,
    name: getTranslation(h, 'name', locale) || h.name,
    city: getTranslation(h.city, 'name', locale) || h.city.name,
    state: getTranslation(h.city, 'state', locale) || h.city.state || 'India',
    image: h.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072",
    accreditations: h.accreditations || ['NABH'],
    beds: h.beds || 500,
    specialties: [getTranslation(condition.specialty, 'name', locale) || condition.specialty.name],
    hasInternationalSupport: h.internationalServices && h.internationalServices.length > 0
  })) : baseHospitals;

  // Find related treatments for this specialty
  const relatedTreatments = await prisma.treatment.findMany({
    where: { specialtyId: condition.specialtyId },
    take: 4
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      {/* Condition Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-2/3">
              <span className="text-primary-foreground/80 font-medium tracking-wider uppercase text-sm mb-4 block">
                {getTranslation(condition.specialty, 'name', locale)} Condition
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {getTranslation(condition, 'name', locale) || condition.name}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl">
                {getTranslation(condition, 'description', locale) || condition.description || `Comprehensive guide to ${condition.name} treatment, symptoms, and diagnosis in India.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <EnquiryForm>
                  <span className="inline-block cursor-pointer">
                    <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 text-md h-12">
                      {t('getFreePlan')}
                    </Button>
                  </span>
                </EnquiryForm>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Causes & Symptoms */}
            {condition.causesAndSymptoms && condition.causesAndSymptoms.length > 0 && (
              <section className="bg-white dark:bg-slate-900/95 p-8 rounded-2xl shadow-sm border dark:border-slate-800 transition-colors duration-500">
                <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-white">
                  <Activity className="w-6 h-6 text-primary dark:text-teal-400 mr-3" />
                  {tc('causes')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{tc('causesDesc')}</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {condition.causesAndSymptoms.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary dark:text-teal-400 shrink-0 mr-3 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Diagnosis */}
            {condition.diagnosis && condition.diagnosis.length > 0 && (
              <section className="bg-white dark:bg-slate-900/95 p-8 rounded-2xl shadow-sm border dark:border-slate-800 transition-colors duration-500">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">{tc('diagnosis')}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{tc('diagnosisDesc', { name: getTranslation(condition, 'name', locale) || condition.name })}</p>
                <ul className="space-y-4">
                  {condition.diagnosis.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-teal-400 mr-4 shrink-0"></div>
                      <span className="font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Treatment Options */}
            {condition.treatmentOptions && condition.treatmentOptions.length > 0 && (
              <section className="bg-white dark:bg-slate-900/95 p-8 rounded-2xl shadow-sm border dark:border-slate-800 transition-colors duration-500">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">{tc('treatments')}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{tc('treatmentsDesc')}</p>
                <ul className="space-y-3">
                  {condition.treatmentOptions.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mr-3 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Treatments linking */}
            {relatedTreatments.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">{tc('relatedProcedures', { name: getTranslation(condition.specialty, 'name', locale) })}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedTreatments.map((treatment) => (
                    <Link key={treatment.slug} href={`/${locale}/treatments/${treatment.slug}`}>
                      <Card className="p-5 h-full hover:shadow-md transition-all border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-teal-400 bg-white dark:bg-slate-900/95 group cursor-pointer flex flex-col">
                        <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">{getTranslation(treatment, 'name', locale)}</h3>
                        <span className="text-primary dark:text-teal-400 text-sm font-medium flex items-center gap-1 mt-auto pt-4">
                          {tc('viewDetails')} <ArrowRight className="w-4 h-4" />
                        </span>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Doctors Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 dark:text-white">{tc('topSpecialists', { name: getTranslation(condition, 'name', locale) || condition.name })}</h2>
              <div className="space-y-6">
                {topDoctors.map(doctor => (
                  <DoctorCard key={doctor.slug} {...doctor} />
                ))}
              </div>
            </section>

            {/* Hospitals Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 dark:text-white">{tc('bestHospitals', { name: getTranslation(condition.specialty, 'name', locale) })}</h2>
              <div className="space-y-6">
                {topHospitals.map(hospital => (
                  <HospitalCard key={hospital.slug} {...hospital} />
                ))}
              </div>
            </section>

            {/* FAQs */}
            {condition.faqs && (condition.faqs as any[]).length > 0 && (
              <section className="pt-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">{tc('faqs')}</h2>
                <div className="space-y-4">
                  {(condition.faqs as any[]).map((faqRaw: any, idx: number) => {
                    const faq = faqRaw as { question: string, answer: string };
                    return (
                      <Card key={idx} className="p-6 dark:bg-slate-900/95 dark:border-slate-800 transition-colors duration-500">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">{faq.question}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}
            
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6 border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 transition-colors duration-500">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{tc('needOpinion')}</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {tc('shareReports')}
                </p>
                <EnquiryForm>
                  <span className="inline-block cursor-pointer w-full">
                    <Button className="w-full h-12 text-md">{tc('requestOpinion')}</Button>
                  </span>
                </EnquiryForm>
                <p className="text-xs text-center text-muted-foreground mt-4 flex justify-center items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-green-600 dark:text-green-400" />
                  {tc('freeConfidential')}
                </p>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
