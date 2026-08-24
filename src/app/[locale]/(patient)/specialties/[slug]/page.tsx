import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { ArrowRight, Stethoscope, Activity } from 'lucide-react';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/mockData';

const getSpecialtyDetails = (slug: string) => {
  // Format slug for display (e.g. 'cosmetic-surgery' -> 'Cosmetic Surgery')
  const decodedSlug = decodeURIComponent(slug).replace(/\s+/g, '-');
  const name = decodedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Map specific specialties to their highly relevant medical conditions
  const getConditionsForSpecialty = (specSlug: string, specName: string) => {
    switch(specSlug) {
      case 'cardiology':
        return [
          { name: 'Coronary Artery Disease', slug: 'coronary-artery-disease', description: 'Severe narrowing or blockage of the coronary arteries.' },
          { name: 'Arrhythmia', slug: 'arrhythmia', description: 'Irregular or abnormal heartbeat requiring intervention.' },
          { name: 'Heart Failure', slug: 'heart-failure', description: 'Chronic condition where the heart doesn\'t pump blood effectively.' }
        ];
      case 'orthopedics':
        return [
          { name: 'Osteoarthritis', slug: 'osteoarthritis', description: 'Degeneration of joint cartilage and underlying bone, most common in knees and hips.' },
          { name: 'Rheumatoid Arthritis', slug: 'rheumatoid-arthritis', description: 'Chronic inflammatory disorder affecting many joints, including those in the hands and feet.' },
          { name: 'Scoliosis', slug: 'scoliosis', description: 'A sideways curvature of the spine that occurs most often during the growth spurt just before puberty.' }
        ];
      case 'neurology':
        return [
          { name: 'Brain Tumor', slug: 'brain-tumor', description: 'A mass or growth of abnormal cells in the brain or close to it.' },
          { name: 'Epilepsy', slug: 'epilepsy', description: 'A neurological disorder marked by sudden recurrent episodes of sensory disturbance or seizures.' },
          { name: 'Parkinson\'s Disease', slug: 'parkinsons-disease', description: 'A progressive nervous system disorder that affects movement.' }
        ];
      case 'oncology':
        return [
          { name: 'Breast Cancer', slug: 'breast-cancer', description: 'Cancer that forms in the cells of the breasts.' },
          { name: 'Prostate Cancer', slug: 'prostate-cancer', description: 'Cancer that occurs in the prostate.' },
          { name: 'Lung Cancer', slug: 'lung-cancer', description: 'Cancer that begins in the lungs and most often occurs in people who smoke.' }
        ];
      case 'cosmetic-surgery':
        return [
          { name: 'Burn Reconstruction', slug: 'burn-reconstruction', description: 'Surgery to improve both the function and the cosmetic appearance of burn scars.' },
          { name: 'Cleft Lip and Palate', slug: 'cleft-lip-palate', description: 'Facial and oral malformations that occur very early in pregnancy.' },
          { name: 'Obesity (Post-Bariatric)', slug: 'post-bariatric', description: 'Excess skin removal following massive weight loss.' }
        ];
      case 'dental':
        return [
          { name: 'Severe Tooth Decay', slug: 'tooth-decay', description: 'Damage to a tooth\'s surface, or enamel.' },
          { name: 'Periodontal Disease', slug: 'periodontal-disease', description: 'A serious gum infection that damages the soft tissue and destroys the bone.' },
          { name: 'Tooth Loss', slug: 'tooth-loss', description: 'Total or partial loss of teeth requiring implants or dentures.' }
        ];
      default:
        return [
          { name: `Advanced ${specName} Disease`, slug: `advanced-${specSlug}-disease`, description: `Severe condition requiring expert ${specName.toLowerCase()} intervention.` },
          { name: `Chronic ${specName} Condition`, slug: `chronic-${specSlug}-condition`, description: `Long-term management and advanced treatment for ${specName.toLowerCase()} disorders.` },
          { name: `${specName} Trauma`, slug: `${specSlug}-trauma`, description: `Emergency or reconstructive care following severe ${specName.toLowerCase()} trauma.` }
        ];
    }
  };

  return {
    slug,
    name,
    overview: `${name} is a specialized branch of medicine dealing with specific aspects of healthcare. Our partner hospitals in India provide world-class ${name.toLowerCase()} treatments using state-of-the-art technology.`,
    popularTreatments: [
      { 
        name: `${name} Consultation`, 
        slug: 'consultation',
        image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop',
        description: `Comprehensive evaluation and diagnosis by top ${name} experts.`
      },
      { 
        name: 'Advanced Diagnostics', 
        slug: 'diagnostics',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
        description: `State-of-the-art diagnostic procedures for precise medical planning.`
      },
      { 
        name: 'Minimally Invasive Surgery', 
        slug: 'minimally-invasive-surgery',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop',
        description: `Advanced surgical techniques resulting in less pain and faster recovery.`
      },
      { 
        name: 'Complex Interventions', 
        slug: 'complex-interventions',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop',
        description: `High-precision complex procedures performed by highly experienced specialists.`
      },
    ],
    commonConditions: getConditionsForSpecialty(slug, name),
    topDoctors: MOCK_DOCTORS.slice(0, 3).map(d => ({
      slug: d.slug,
      name: d.name,
      specialty: name, // Dynamic specialty name
      qualifications: 'MBBS, MS',
      experience: d.experience,
      hospital: d.hospital,
      city: 'India',
      image: d.image,
      keyExpertise: ['Advanced Treatments', 'Complex Cases']
    })),
    topHospitals: MOCK_HOSPITALS.slice(0, 3).map(h => ({
      slug: h.slug,
      name: h.name,
      city: h.city,
      state: 'India',
      image: h.image,
      accreditations: h.accreditations,
      beds: h.beds,
      specialties: [name, ...h.specialties.slice(0, 2)],
      hasInternationalSupport: true
    }))
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const specialty = getSpecialtyDetails(resolvedParams.slug);
  return {
    title: `${specialty.name} Treatments & Top Doctors in India | AsadHealthcare`,
    description: `Discover top ${specialty.name} hospitals, doctors, and affordable treatments in India for international patients.`,
  };
}

import { prisma } from '@/lib/prisma';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;


export default async function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations('SpecialtyDetail');
  
  // Get mock specialty base data
  const specialty = getSpecialtyDetails(resolvedParams.slug);

  if (!specialty) {
    notFound();
  }

  // 1. Fetch specialty from DB to get translated name
  const dbSpecialty = await prisma.specialty.findUnique({
    where: { slug: resolvedParams.slug }
  });

  // 2. Fetch Doctors in this specialty from DB
  const realDoctors = await prisma.doctor.findMany({
    where: { specialty: { slug: resolvedParams.slug } },
    include: { hospital: { include: { city: true } }, specialty: true },
    take: 3
  });

  // 3. Fetch Hospitals that have doctors in this specialty from DB
  const realHospitals = await prisma.hospital.findMany({
    where: {
      doctors: {
        some: { specialty: { slug: resolvedParams.slug } }
      }
    },
    include: { city: true },
    take: 3
  });

  const dbConditions = await prisma.condition.findMany({
    where: { specialty: { slug: resolvedParams.slug } }
  });

  const dbTreatments = await prisma.treatment.findMany({
    where: { specialty: { slug: resolvedParams.slug } },
    take: 4
  });

  const translatedName = dbSpecialty ? getTranslation(dbSpecialty, 'name', locale) || specialty.name : specialty.name;

  // Map DB Treatments to UI format
  const displayTreatments = dbTreatments.length > 0 ? dbTreatments.map((t, idx) => {
    // Provide some varied placeholder images if we don't have real ones
    const images = [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop'
    ];
    return {
      isReal: true,
      slug: t.slug,
      name: getTranslation(t, 'name', locale) || t.name,
      description: getTranslation(t, 'description', locale) || t.description || `Specialized ${t.name} procedures at accredited hospitals in India.`,
      image: images[idx % images.length]
    };
  }) : [
    { name: t('mockTreatments.consultation.name', { name: translatedName }), slug: 'consultation', image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop', description: t('mockTreatments.consultation.desc', { name: translatedName }), isReal: false },
    { name: t('mockTreatments.diagnostics.name'), slug: 'diagnostics', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop', description: t('mockTreatments.diagnostics.desc'), isReal: false },
    { name: t('mockTreatments.surgery.name'), slug: 'surgery', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: t('mockTreatments.surgery.desc'), isReal: false },
    { name: t('mockTreatments.interventions.name'), slug: 'interventions', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: t('mockTreatments.interventions.desc'), isReal: false }
  ];

  // Map DB Doctors to DoctorCard props
  const topDoctors = realDoctors.length > 0 ? realDoctors.map(d => ({
    slug: d.slug,
    name: getTranslation(d, 'name', locale) || d.name,
    specialty: getTranslation(d.specialty, 'name', locale) || d.specialty.name,
    hospital: getTranslation(d.hospital, 'name', locale) || d.hospital.name,
    image: d.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070",
    city: getTranslation(d.hospital.city, 'name', locale) || 'India',
    qualifications: getTranslation(d, 'qualifications', locale) || 'Expert Specialist',
    experience: d.experienceYears ? `${d.experienceYears}` : '15+',
    keyExpertise: ['Specialized Care']
  })) : specialty.topDoctors;

  // Map DB Hospitals to HospitalCard props
  const topHospitals = realHospitals.length > 0 ? realHospitals.map(h => ({
    slug: h.slug,
    name: getTranslation(h, 'name', locale) || h.name,
    city: getTranslation(h.city, 'name', locale) || h.city.name,
    state: getTranslation(h.city, 'state', locale) || h.city.state || 'India',
    image: h.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072",
    accreditations: h.accreditations || ['NABH'],
    beds: h.beds || 500,
    specialties: [translatedName],
    hasInternationalSupport: h.internationalServices && h.internationalServices.length > 0
  })) : specialty.topHospitals;

  const dynamicConditions = dbConditions.length > 0 ? dbConditions : [
    { name: t('mockConditions.general1.name', { name: translatedName }), slug: 'general-1', description: t('mockConditions.general1.desc', { name: translatedName }) },
    { name: t('mockConditions.general2.name', { name: translatedName }), slug: 'general-2', description: t('mockConditions.general2.desc', { name: translatedName }) },
    { name: t('mockConditions.general3.name', { name: translatedName }), slug: 'general-3', description: t('mockConditions.general3.desc', { name: translatedName }) }
  ];

  // Define a mapping of specialty slugs to featured hero images
  const specialtyImages: Record<string, string> = {
    'cardiology': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2080&auto=format&fit=crop',
    'oncology': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop',
    'orthopedics': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
    'neurology': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop',
  };

  const mainImage = specialtyImages[specialty.slug] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Specialty Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-primary-foreground/80 font-medium tracking-wider uppercase text-sm">
                  {t('hero.tag')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('hero.inIndia', { name: translatedName })}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {dbSpecialty ? (getTranslation(dbSpecialty, 'description', locale) || t('hero.fallbackOverview', { name: translatedName })) : t('hero.fallbackOverview', { name: translatedName })}
              </p>
              
              <EnquiryForm>
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 text-md h-12">
                  {t('hero.getPlan')}
                </Button>
              </EnquiryForm>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 h-64 md:h-96">
                <img 
                  src={mainImage} 
                  alt={specialty.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-16">
            
            {/* Popular Treatments in this Specialty */}
            <section>
              <h2 className="text-2xl font-bold mb-6">{t('treatments.title', { name: dbSpecialty ? getTranslation(dbSpecialty, 'name', locale) || specialty.name : specialty.name })}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {displayTreatments.map(treatment => (
                  <Card key={treatment.slug} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200 flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={treatment.image} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-xl mb-2">{treatment.name}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                        {treatment.description}
                      </p>
                      {treatment.isReal ? (
                        <Button asChild className="w-full">
                          <Link href={`/${locale}/treatments/${treatment.slug}`}>{t('treatments.viewDetails')}</Link>
                        </Button>
                      ) : (
                        <EnquiryForm>
                          <Button variant="outline" className="w-full font-medium">Request Info</Button>
                        </EnquiryForm>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Doctors Section */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold">{t('doctors.title', { name: dbSpecialty ? getTranslation(dbSpecialty, 'name', locale) || specialty.name : specialty.name })}</h2>
                <Link href={`/${locale}/doctors`} className="text-primary hover:underline font-medium text-sm">{t('doctors.viewAll')}</Link>
              </div>
              <div className="space-y-6">
                {topDoctors.map(doctor => (
                  <DoctorCard key={doctor.slug} {...doctor} />
                ))}
              </div>
            </section>

            {/* Hospitals Section */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold">{t('hospitals.title', { name: dbSpecialty ? getTranslation(dbSpecialty, 'name', locale) || specialty.name : specialty.name })}</h2>
                <Link href={`/${locale}/hospitals`} className="text-primary hover:underline font-medium text-sm">{t('hospitals.viewAll')}</Link>
              </div>
              <div className="space-y-6">
                {topHospitals.map(hospital => (
                  <HospitalCard key={hospital.slug} {...hospital} />
                ))}
              </div>
            </section>
            
            <section className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{t('conditions.title')}</h2>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  {t('conditions.desc', { name: dbSpecialty ? getTranslation(dbSpecialty, 'name', locale) || specialty.name.toLowerCase() : specialty.name.toLowerCase() })}
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  {dynamicConditions.map((condition) => (
                    <Link key={condition.slug} href={`/${locale}/conditions/${condition.slug}`}>
                      <Card className="p-5 h-full hover:shadow-md transition-all border-slate-200 hover:border-primary group cursor-pointer flex flex-col">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{getTranslation(condition, 'name', locale) || condition.name}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{getTranslation(condition, 'description', locale) || condition.description}</p>
                        <span className="text-primary text-sm font-medium flex items-center gap-1 mt-auto pt-2">
                          {t('conditions.viewDetails')} <ArrowRight className="w-3 h-3" />
                        </span>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <Card className="p-6 border-slate-200 shadow-xl shadow-slate-200/40">
                <h3 className="text-xl font-bold mb-4">{t('sidebar.title')}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {t('sidebar.desc', { name: specialty.name.toLowerCase() })}
                </p>
                <EnquiryForm>
                  <Button className="w-full h-14 text-md">{t('sidebar.startJourney')}</Button>
                </EnquiryForm>
                <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                    {t('sidebar.noObligation')}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                    {t('sidebar.multipleQuotes')}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                    {t('sidebar.dedicatedManager')}
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
