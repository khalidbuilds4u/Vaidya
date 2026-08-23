import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { CheckCircle2, Clock, DollarSign, HeartPulse, Activity, ArrowRight, ChevronDown, Check, Info } from 'lucide-react';
import Link from 'next/link';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';
import { getTranslation } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;


// Map mockData for Treatment Page schema
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

// Mock DB Fetch based on slug
const getTreatmentDetails = (slug: string) => {
  if (slug === 'coronary-artery-bypass') {
    return {
      name: 'Coronary Artery Bypass Grafting (CABG)',
      specialty: 'Cardiology',
      minEstimate: 5500,
      maxEstimate: 8000,
      currency: 'USD',
      recoveryTime: '4-6 Weeks',
      hospitalStay: '7-10 Days',
      overview: 'CABG is a type of surgery that improves blood flow to the heart. It is used for people who have severe coronary heart disease.',
      treatsConditions: [
        { name: 'Coronary Artery Disease', slug: 'coronary-artery-disease', description: 'Severe narrowing or blockage of the coronary arteries.' },
        { name: 'Heart Attack (Myocardial Infarction)', slug: 'heart-attack', description: 'A medical emergency where blood flow to the heart is abruptly cut off.' },
        { name: 'Severe Angina', slug: 'severe-angina', description: 'Chest pain caused by reduced blood flow to the heart muscle.' }
      ],
      causesAndSymptoms: [
        "Severe chest pain or discomfort (angina) that limits daily activities",
        "Shortness of breath, especially with physical exertion",
        "Fatigue and weakness due to reduced oxygen supply",
        "History of heart attacks or high risk of future cardiac events"
      ],
      diagnosis: [
        "Electrocardiogram (ECG) to measure the electrical activity of the heart",
        "Echocardiogram to evaluate heart muscle function and valve operation",
        "Coronary Angiography (Cardiac Catheterization) to locate blockages"
      ],
      preOpPrep: [
        "Comprehensive cardiac evaluation and blood tests",
        "Adjusting medications such as stopping blood thinners",
        "Fasting for at least 8 hours before the surgery"
      ],
      postOpCare: [
        "1-2 days in the Intensive Care Unit (ICU) for close monitoring",
        "Cardiac rehabilitation program starts within a week",
        "Strict adherence to prescribed medications and lifestyle changes",
        "Gradual return to normal activities over 6-8 weeks"
      ],
      faqs: [
        { question: "How long does a CABG surgery take?", answer: "The surgery typically takes 3 to 6 hours, depending on how many arteries need to be bypassed." },
        { question: "Will I need to change my lifestyle after surgery?", answer: "Yes. Surgery treats the symptoms but doesn't cure the underlying disease. A heart-healthy diet, exercise, and quitting smoking are essential." }
      ],
      procedureDetails: [
        'General anesthesia is administered.',
        'Surgeon takes a healthy blood vessel from another part of the body.',
        'The vessel is attached above and below the blocked artery.',
        'Blood flow is redirected around the blockage.',
        'The chest is closed and the patient is moved to the ICU.'
      ],
      risks: ['Bleeding', 'Infection', 'Irregular heart rhythms'],
      subTreatments: [
        { slug: 'off-pump-cabg', name: 'Off-Pump CABG (Beating Heart)', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: 'Surgery performed while the heart is still beating, without using a heart-lung machine.' },
        { slug: 'minimally-invasive-cabg', name: 'Minimally Invasive CABG', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'Performed through smaller incisions rather than opening the chest.' }
      ],
      topDoctors: baseDoctors,
      topHospitals: baseHospitals
    };
  }

  if (slug === 'brain-tumor-surgery') {
    return {
      name: 'Brain Tumor Surgery',
      specialty: 'Neurology',
      minEstimate: 6000,
      maxEstimate: 9500,
      currency: 'USD',
      recoveryTime: '4-8 Weeks',
      hospitalStay: '5-10 Days',
      overview: 'Advanced neurosurgery techniques to remove abnormal growths in the brain with minimal impact on healthy tissue.',
      treatsConditions: [
        { name: 'Brain Tumor', slug: 'brain-tumor', description: 'Abnormal growths of cells in the brain, which can be benign or malignant.' },
        { name: 'Glioblastoma', slug: 'glioblastoma', description: 'An aggressive type of cancer that can occur in the brain or spinal cord.' },
        { name: 'Meningioma', slug: 'meningioma', description: 'A tumor that arises from the meninges, the membranes that surround your brain.' }
      ],
      causesAndSymptoms: [
        "New onset or change in pattern of headaches",
        "Unexplained nausea or vomiting",
        "Vision problems, such as blurred vision or double vision",
        "Gradual loss of sensation or movement in an arm or a leg",
        "Difficulty with balance or speech"
      ],
      diagnosis: [
        "Neurological exam to test vision, hearing, balance, and coordination",
        "MRI (Magnetic Resonance Imaging) to create detailed images of the brain",
        "CT (Computerized Tomography) scan as an alternative imaging method",
        "Biopsy to collect and test a sample of abnormal tissue"
      ],
      preOpPrep: [
        "Detailed functional MRI to map critical brain areas before surgery",
        "Cessation of certain medications or supplements that increase bleeding risk",
        "Pre-operative consultation with anesthesiologist and neurosurgeon"
      ],
      postOpCare: [
        "Observation in the neuro-intensive care unit (ICU)",
        "Monitoring for signs of swelling or neurological changes",
        "Physical, occupational, or speech therapy if brain function was affected",
        "Follow-up imaging to ensure complete tumor removal"
      ],
      faqs: [
        { question: "Will I need chemotherapy or radiation after surgery?", answer: "This depends entirely on the type and grade of the tumor, which is determined after the biopsy. Many malignant tumors require post-operative treatments." },
        { question: "Will my head be shaved?", answer: "Modern neurosurgery often requires only a small section of hair to be shaved along the incision line, though this varies by the exact location." }
      ],
      procedureDetails: [
        'Patient is anesthetized and the head is secured.',
        'A craniotomy is performed to access the brain.',
        'The tumor is carefully removed using microsurgical techniques.',
        'The bone flap is replaced and secured.',
        'The scalp is sutured closed.'
      ],
      risks: ['Bleeding', 'Seizures', 'Neurological deficits'],
      subTreatments: [
        { slug: 'craniotomy', name: 'Awake Craniotomy', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop', description: 'Surgery performed while the patient is awake to map brain functions.' },
        { slug: 'endoscopic-surgery', name: 'Endoscopic Brain Surgery', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop', description: 'Removal of tumors through the nose without opening the skull.' }
      ],
      topDoctors: baseDoctors,
      topHospitals: baseHospitals
    };
  }

  if (slug === 'knee-replacement') {
    return {
      name: 'Knee Replacement Surgery',
      specialty: 'Orthopedics',
      minEstimate: 4500,
      maxEstimate: 6500,
      currency: 'USD',
      recoveryTime: '2-3 Weeks',
      hospitalStay: '5-7 Days',
      overview: 'Knee replacement, also known as knee arthroplasty, is a surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.',
      treatsConditions: [
        { name: 'Osteoarthritis', slug: 'osteoarthritis', description: 'Severe pain and stiffness caused by wear-and-tear arthritis.' },
        { name: 'Rheumatoid Arthritis', slug: 'rheumatoid-arthritis', description: 'Chronic joint inflammation that leads to cartilage loss.' },
        { name: 'Post-Traumatic Arthritis', slug: 'post-traumatic-arthritis', description: 'Arthritis resulting from a severe knee injury or fracture.' }
      ],
      causesAndSymptoms: [
        "Severe joint pain or stiffness that limits everyday activities like walking or climbing stairs",
        "Chronic knee inflammation and swelling that doesn't improve with rest or medications",
        "Knee deformity, such as bowing in or out of the joint",
        "Failure of conservative treatments like physical therapy or cortisone injections"
      ],
      diagnosis: [
        "X-Rays to determine the extent of bone damage and joint space narrowing",
        "MRI scans for detailed views of soft tissues, meniscus, and ligaments",
        "Blood tests to rule out specific types of inflammatory or rheumatoid arthritis"
      ],
      preOpPrep: [
        "Complete physical examination to ensure surgical fitness",
        "Adjusting current medications (e.g., stopping blood thinners temporarily)",
        "Preparing your home for recovery (installing grab bars, arranging a ground-floor recovery area)"
      ],
      postOpCare: [
        "Physical therapy begins within 24 hours of surgery to restore movement",
        "Use of walking aids (walker or crutches) is required for 2-4 weeks",
        "Strict wound care and monitoring for signs of deep vein thrombosis (DVT)",
        "Gradual return to normal activities and driving over 4-6 weeks"
      ],
      faqs: [
        { question: "How long does a knee replacement implant last?", answer: "Modern knee replacements are highly durable. Research shows that over 85% of implants continue to function well 20 years after the surgery, depending on the patient's activity level and weight." },
        { question: "Is the surgery painful?", answer: "You will receive anesthesia during the surgery so you won't feel pain. Post-surgery pain is managed effectively with a combination of intravenous and oral medications, allowing you to begin physical therapy comfortably." },
        { question: "When can I return to sports?", answer: "Low-impact sports like swimming, cycling, and golf can usually be resumed after 3-6 months. High-impact sports like jogging or heavy weightlifting are generally discouraged to prevent premature wear of the implant." }
      ],
      procedureDetails: [
        'Anesthesia is administered (general or spinal).',
        'The surgeon removes damaged cartilage and bone from the knee joint.',
        'Metal implants are positioned to recreate the surface of the joint.',
        'A medical-grade plastic spacer is inserted between the metal components.',
        'The incision is closed and bandaged.'
      ],
      risks: ['Infection', 'Blood clots', 'Nerve damage', 'Implant loosening over time'],
      subTreatments: [
        { slug: 'total-knee-replacement', name: 'Total Knee Replacement (TKR)', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop', description: 'Complete replacement of all three compartments of the knee joint with artificial implants.' },
        { slug: 'partial-knee-replacement', name: 'Partial Knee Replacement (PKR)', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop', description: 'Replacement of only the damaged compartment of the knee, preserving healthy bone and ligaments.' },
        { slug: 'robotic-knee-replacement', name: 'Robotic-Assisted Knee Replacement', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'Highly precise surgery using robotic arms for perfect implant alignment and faster recovery.' },
        { slug: 'bilateral-knee-replacement', name: 'Bilateral Knee Replacement', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop', description: 'Simultaneous or staged replacement of both knees in a single or consecutive surgical sessions.' }
      ],
      topDoctors: baseDoctors,
      topHospitals: baseHospitals
    };
  }

  // Default fallback (e.g. any other slug)
  return {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    specialty: 'Medical Procedure',
    minEstimate: 4500,
    maxEstimate: 6500,
    currency: 'USD',
    recoveryTime: '2-3 Weeks',
    hospitalStay: '3-5 Days',
    overview: `This is a comprehensive procedure for ${slug.split('-').join(' ')}. Our top hospitals provide the best care for this treatment.`,
    treatsConditions: [
      { name: `Common ${slug.split('-')[0]} Condition`, slug: `common-${slug.split('-')[0]}-condition`, description: 'This treatment effectively manages or cures this condition.' }
    ],
    causesAndSymptoms: ["Symptoms specific to the condition requiring this treatment."],
    diagnosis: ["Standard diagnostic imaging and lab tests."],
    preOpPrep: ["Standard pre-operative assessments."],
    postOpCare: ["Standard post-operative recovery protocols."],
    faqs: [{ question: "How long does recovery take?", answer: "Recovery varies by patient but typically takes a few weeks." }],
    procedureDetails: [
      'Anesthesia is administered.',
      'The surgical site is prepared and incisions are made.',
      'The specific medical intervention is performed.',
      'Implants or corrections are verified.',
      'The incision is closed and bandaged.'
    ],
    risks: ['Infection', 'Blood clots', 'Nerve damage'],
    subTreatments: [
      { slug: 'standard-procedure', name: `Standard ${slug.split('-').join(' ')}`, image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: 'The traditional and most common approach to this surgery.' },
      { slug: 'advanced-procedure', name: `Advanced ${slug.split('-').join(' ')}`, image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'Utilizes the latest robotic or minimally invasive technology.' }
    ],
    topDoctors: baseDoctors,
    topHospitals: baseHospitals
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const treatment = getTreatmentDetails(resolvedParams.slug);
  return {
    title: `${treatment.name} in India - Top Doctors & Costs | AsadHealthcare`,
    description: `Complete guide to ${treatment.name} in India. Compare costs, recovery times, top hospitals, and the best surgeons.`,
  };
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations('TreatmentDetail');
  
  // 1. Fetch real treatment from DB
  const dbTreatment = await prisma.treatment.findUnique({
    where: { slug: resolvedParams.slug },
    include: { specialty: true }
  });

  if (!dbTreatment) {
    notFound();
  }

  // 2. Fetch Doctors in this specialty from DB
  const realDoctors = await prisma.doctor.findMany({
    where: { specialtyId: dbTreatment.specialtyId },
    include: { hospital: true, specialty: true },
    take: 3
  });

  // 3. Fetch Hospitals that have doctors in this specialty from DB
  const realHospitals = await prisma.hospital.findMany({
    where: {
      doctors: {
        some: { specialtyId: dbTreatment.specialtyId }
      }
    },
    include: { city: true },
    take: 3
  });

  // Map DB Doctors to DoctorCard props
  const dbTopDoctors = realDoctors.length > 0 ? realDoctors.map(d => ({
    slug: d.slug,
    name: d.name,
    specialty: d.specialty.name,
    hospital: d.hospital.name,
    image: d.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070",
    city: 'India',
    qualifications: d.qualifications || 'Expert Specialist',
    experience: d.experienceYears ? `${d.experienceYears}+ Years` : '15+ Years',
    keyExpertise: ['Specialized Care']
  })) : baseDoctors;

  // Map DB Hospitals to HospitalCard props
  const dbTopHospitals = realHospitals.length > 0 ? realHospitals.map(h => ({
    slug: h.slug,
    name: h.name,
    city: h.city.name,
    state: h.city.state || 'India',
    image: h.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072",
    accreditations: h.accreditations || ['NABH'],
    beds: h.beds || 500,
    specialties: [dbTreatment.specialty.name],
    hasInternationalSupport: h.internationalServices && h.internationalServices.length > 0
  })) : baseHospitals;

  // Get rich mock content but override with real DB data
  const baseTreatment = getTreatmentDetails(resolvedParams.slug);
  const treatment = {
    ...baseTreatment,
    name: dbTreatment.name,
    specialty: dbTreatment.specialty.name,
    minEstimate: dbTreatment.minEstimate || baseTreatment.minEstimate,
    maxEstimate: dbTreatment.maxEstimate || baseTreatment.maxEstimate,
    overview: dbTreatment.overview || dbTreatment.description || baseTreatment.overview,
    recoveryTime: dbTreatment.recovery || baseTreatment.recoveryTime,
    risks: dbTreatment.risks ? dbTreatment.risks.split('\n') : baseTreatment.risks,
    
    causesAndSymptoms: dbTreatment.causesAndSymptoms?.length > 0 ? dbTreatment.causesAndSymptoms : baseTreatment.causesAndSymptoms,
    diagnosis: dbTreatment.diagnosis?.length > 0 ? dbTreatment.diagnosis : baseTreatment.diagnosis,
    preOpPrep: dbTreatment.preOpPrep?.length > 0 ? dbTreatment.preOpPrep : baseTreatment.preOpPrep,
    postOpCare: dbTreatment.postOpCare?.length > 0 ? dbTreatment.postOpCare : baseTreatment.postOpCare,
    procedureDetails: dbTreatment.procedureDetails?.length > 0 ? dbTreatment.procedureDetails : baseTreatment.procedureDetails,
    faqs: (dbTreatment.faqs && Array.isArray(dbTreatment.faqs) && dbTreatment.faqs.length > 0) ? dbTreatment.faqs : baseTreatment.faqs,
    
    topDoctors: dbTopDoctors,
    topHospitals: dbTopHospitals,
  };

  // Fallback image if main image is not defined
  const mainImage = (treatment as any).image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Treatment Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <span className="text-primary-foreground/80 font-medium tracking-wider uppercase text-sm mb-4 block">
                {getTranslation(dbTreatment.specialty, 'name', locale)}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('hero.inIndia', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {getTranslation(dbTreatment, 'overview', locale) || baseTreatment.overview}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <EnquiryForm>
                  <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 text-md h-12">
                    {t('hero.getEstimate')}
                  </Button>
                </EnquiryForm>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 h-64 md:h-96 relative">
                <Image 
                  src={mainImage} 
                  alt={treatment.name} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <DollarSign className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">{t('stats.estCost')}</p>
                <p className="font-bold text-lg">${treatment.minEstimate} - ${treatment.maxEstimate}</p>
              </Card>
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">{t('stats.recovery')}</p>
                <p className="font-bold text-lg">{treatment.recoveryTime}</p>
              </Card>
              <Card className="p-4 flex flex-col justify-center items-center text-center col-span-2 md:col-span-1">
                <Activity className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">{t('stats.hospitalStay')}</p>
                <p className="font-bold text-lg">{treatment.hospitalStay}</p>
              </Card>
            </div>

            {/* Exhaustive Medical Knowledge */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('required.title', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}</h2>
                <p className="text-slate-600 mb-4">{t('required.desc')}</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {treatment.causesAndSymptoms?.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                      <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">{t('diagnosis.title')}</h2>
                <p className="text-slate-600 mb-4">{t('diagnosis.desc')}</p>
                <ul className="space-y-3">
                  {treatment.diagnosis?.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </section>

            {/* Conditions Treated */}
            {(treatment as any).treatsConditions && (treatment as any).treatsConditions.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{t('conditions.title')}</h2>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  {t('conditions.desc', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(treatment as any).treatsConditions.map((condition: any) => (
                    <Link key={condition.slug} href={`/${locale}/conditions/${condition.slug}`}>
                      <Card className="p-5 h-full hover:shadow-md transition-all border-slate-200 hover:border-primary group cursor-pointer flex flex-col">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{condition.name}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{condition.description}</p>
                        <span className="text-primary text-sm font-medium flex items-center gap-1">
                          {t('conditions.readMore')} <ArrowRight className="w-3 h-3" />
                        </span>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Sub-Treatments */}
            {treatment.subTreatments && treatment.subTreatments.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">{t('types.title', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {treatment.subTreatments.map((sub, idx) => (
                    <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200 flex flex-col h-full">
                      {sub.image && (
                        <div className="h-40 overflow-hidden relative border-b border-slate-100">
                          <Image 
                            src={sub.image} 
                            alt={sub.name} 
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-lg mb-2">{sub.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">{sub.description}</p>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/${locale}/treatments/${resolvedParams.slug}/${sub.slug}`}>{t('types.viewDetails')}</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Procedure Details */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <HeartPulse className="w-6 h-6 text-primary mr-3" />
                {t('procedure.title')}
              </h2>
              <ul className="space-y-4">
                {treatment.procedureDetails.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 pt-1">{step}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recovery & Post-Op */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('postOp.prepTitle')}</h2>
                <ul className="space-y-3">
                  {treatment.preOpPrep?.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">{t('postOp.recoveryTitle')}</h2>
                <ul className="space-y-3">
                  {treatment.postOpCare?.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </section>

            {/* Doctors Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">{t('doctors.title', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}</h2>
              <div className="space-y-6">
                {treatment.topDoctors.map(doctor => (
                  <DoctorCard key={doctor.slug} {...doctor} />
                ))}
              </div>
            </section>

            {/* Hospitals Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">{t('hospitals.title', { name: getTranslation(dbTreatment, 'name', locale) || baseTreatment.name })}</h2>
              <div className="space-y-6">
                {treatment.topHospitals.map(hospital => (
                  <HospitalCard key={hospital.slug} {...hospital} />
                ))}
              </div>
            </section>

            {/* FAQs */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <section className="pt-8">
                <h2 className="text-2xl font-bold mb-6">{t('faqs.title')}</h2>
                <div className="space-y-4">
                  {treatment.faqs.map((faqRaw: any, idx: number) => {
                    const faq = faqRaw as { question: string, answer: string };
                    return (
                      <Card key={idx} className="p-6">
                        <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
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
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-bold mb-2">{t('sidebar.helpTitle')}</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {t('sidebar.helpDesc')}
                </p>
                <EnquiryForm>
                  <Button className="w-full h-12 text-md">{t('sidebar.requestOpinion')}</Button>
                </EnquiryForm>
                <p className="text-xs text-center text-muted-foreground mt-4 flex justify-center items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" />
                  {t('sidebar.freeConfidential')}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4 border-b pb-2">{t('sidebar.risksTitle')}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {treatment.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                      {risk}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  {t('sidebar.risksDisclaimer')}
                </p>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
