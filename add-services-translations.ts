import 'dotenv/config';
import { buildTranslations } from './src/lib/translator';
import * as fs from 'fs';

const servicesEn = {
  meta: {
    title: "Our Services | Asad Healthcare – End-to-End Medical Tourism in India",
    description: "Asad Healthcare provides complete medical tourism services for international patients traveling to India for treatment."
  },
  hero: {
    badge: "End-to-End Medical Tourism Support",
    heading1: "Our",
    heading2: "Services",
    p1: "At Asad Healthcare, we provide end-to-end support for international patients seeking medical treatment in India. From planning your journey to returning home, we help coordinate the important details of your medical trip.",
    p2: "Our services are designed to make the healthcare journey simple, comfortable, transparent, and well organized. We coordinate with hospitals, doctors, patients, and attendants to ensure smooth communication and better support.",
    p3: "We assist with medical coordination, interpretation, travel arrangements, accommodation, hospital visits, documentation, and local support according to each patient's needs.",
    tagline: "Your health is your priority. We take care of the coordination.",
    cta: "Get Free Consultation",
    ctaSecondary: "Talk to Our Team"
  },
  nav: {
    preArrival: "Pre-Arrival",
    during: "During Treatment",
    post: "Post-Treatment",
    why: "Why Choose Us"
  },
  phases: {
    pre: { label: "Pre-Arrival Services" },
    on: { label: "On-Arrival & During Treatment" },
    post: { label: "Post-Treatment & Departure" },
    servicesCount: "{count} Services"
  },
  preArrival: [
    { title: "Medical Case Assessment", desc: "We collect your medical reports and understand your medical requirements before planning your treatment journey." },
    { title: "Doctor & Hospital Selection", desc: "We help identify suitable hospitals and doctors based on your medical condition and treatment needs." },
    { title: "Medical Opinion", desc: "We coordinate with doctors to obtain a preliminary medical opinion and understand the possible treatment approach." },
    { title: "Treatment Cost Estimate", desc: "We help you understand the expected treatment cost and other major expenses before your journey." },
    { title: "Appointment Scheduling", desc: "We arrange consultations, diagnostic tests, and hospital appointments according to your treatment plan." },
    { title: "Medical Visa Assistance", desc: "We guide patients and attendants with the medical visa process and required hospital documents." },
    { title: "Flight & Travel Assistance", desc: "We assist with travel planning and help coordinate your journey to India." },
    { title: "Accommodation Arrangement", desc: "We help arrange suitable hotels, guest houses, or other accommodation close to the hospital." },
    { title: "Airport Transfer Planning", desc: "We can arrange airport pickup and transportation to your hotel or hospital." },
    { title: "Personalized Treatment Plan", desc: "We prepare a clear schedule for your consultations, tests, treatment, hospital visits, and other important arrangements." }
  ],
  onArrival: [
    { title: "Airport Pickup", desc: "We welcome you at the airport and assist with your transfer to the hotel, guest house, or hospital." },
    { title: "Hotel & Accommodation Support", desc: "We assist with check-in and help resolve basic accommodation-related requirements." },
    { title: "Hospital Registration", desc: "We assist patients with hospital registration, documentation, and admission formalities." },
    { title: "Doctor Consultation Assistance", desc: "We accompany and assist patients during doctor consultations and help with communication." },
    { title: "Language Interpretation", desc: "We provide language interpretation between patients and doctors or hospital staff to support clear communication." },
    { title: "Diagnostic Test Coordination", desc: "We help coordinate blood tests, scans, imaging, and other investigations as advised by the doctor." },
    { title: "Treatment Coordination", desc: "We coordinate with the hospital and concerned departments throughout the treatment process." },
    { title: "Hospital Admission Support", desc: "We assist patients and attendants with admission procedures and important hospital formalities." },
    { title: "Patient & Attendant Support", desc: "We provide practical assistance to patients and their attendants during their stay in India." },
    { title: "Local Transportation", desc: "We help coordinate transportation for hospital visits, diagnostic tests, accommodation, and other essential journeys." },
    { title: "Pharmacy & Medical Support", desc: "We assist patients with understanding prescriptions and locating medicines or medical supplies when required." },
    { title: "Daily Coordination", desc: "We stay connected with the patient and help coordinate important requirements throughout the medical journey." }
  ],
  postTreatment: [
    { title: "Discharge Assistance", desc: "We assist patients with the discharge process and help them understand the necessary formalities." },
    { title: "Medical Documents", desc: "We help patients collect important documents such as discharge summaries, prescriptions, reports, and treatment records." },
    { title: "Doctor's Follow-Up", desc: "We coordinate follow-up consultations and help patients stay connected with their treating doctor." },
    { title: "Medication Guidance", desc: "We help patients understand their prescriptions and instructions provided by the medical team." },
    { title: "Recovery & Aftercare", desc: "We help coordinate recommended follow-up care and other post-treatment requirements." },
    { title: "Final Medical Review", desc: "We assist in coordinating the final consultation or medical review before the patient returns home, when advised." },
    { title: "Travel Preparation", desc: "We help coordinate the patient's travel arrangements after completing the required treatment and medical formalities." },
    { title: "Airport Transfer", desc: "We can arrange transportation from the hotel or hospital to the airport for the return journey." },
    { title: "Return Journey Support", desc: "We help make the departure process smooth and organized so patients can return home comfortably." },
    { title: "Continued Communication", desc: "Our support can continue after you return home through communication and follow-up coordination with the hospital or doctor when required." }
  ],
  whyChoose: {
    badge: "Why Choose Us",
    heading: "Why Choose Asad Healthcare",
    subheading: "Thousands of international patients have trusted us with their medical journey. Here is what makes us different.",
    items: [
      { title: "Personalized Patient Support", desc: "Every patient is different. We provide personalized assistance based on your medical needs, preferences, and treatment plan." },
      { title: "Experienced Medical Coordination", desc: "We coordinate with hospitals, doctors, and healthcare teams to help make your treatment journey smooth and well organized." },
      { title: "Professional Language Interpretation", desc: "We help bridge the language gap between international patients and healthcare professionals for clear and comfortable communication." },
      { title: "End-to-End Assistance", desc: "From your first enquiry and hospital appointment to treatment, discharge, and return home, we support you throughout your journey." },
      { title: "Trusted Hospital Coordination", desc: "We assist patients in connecting with suitable hospitals and medical specialists according to their treatment requirements." },
      { title: "Transparent & Clear Communication", desc: "We provide clear information about appointments, treatment coordination, estimated costs, and important arrangements." },
      { title: "Travel & Local Assistance", desc: "We help coordinate accommodation, airport transfers, local transportation, and other essential arrangements during your stay in India." },
      { title: "Support Beyond Treatment", desc: "Our assistance can continue after you return home through follow-up coordination and communication with the hospital or doctor when required." }
    ]
  },
  freeBanner: {
    badge: "Zero Hidden Charges",
    heading: "100% Free for Patients",
    desc: "Our consultation and concierge coordination services are completely free of charge for patients. All treatment fees are settled directly with the hospital. We are compensated by our hospital partners, you pay nothing extra."
  },
  cta: {
    badge: "Response within 24 hours",
    heading: "Ready to Start Your Medical Journey?",
    desc: "Share your medical reports and requirements with us today. Our team will respond within 24 hours with a personalised treatment plan and cost estimate.",
    cta: "Get Free Treatment Plan",
    ctaSecondary: "WhatsApp Us Now"
  }
};

const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

// Flatten all translatable strings
function flattenForTranslation(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      result[key] = v;
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'string') result[`${key}.${i}`] = item;
        else if (typeof item === 'object') {
          Object.entries(item as any).forEach(([ik, iv]) => {
            if (typeof iv === 'string') result[`${key}.${i}.${ik}`] = iv as string;
          });
        }
      });
    } else if (typeof v === 'object' && v !== null) {
      Object.assign(result, flattenForTranslation(v, key));
    }
  }
  return result;
}

async function main() {
  // 1. Add English to en.json
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  en.Services = servicesEn;
  fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
  console.log('✓ Added Services to en.json');

  // 2. Translate and add to each locale
  const flatEn = flattenForTranslation(servicesEn);
  const allKeys = Object.keys(flatEn);
  console.log(`Total keys to translate: ${allKeys.length}`);

  for (const lang of locales) {
    console.log(`\nTranslating Services for ${lang}...`);
    const trans = await buildTranslations(flatEn, null);
    // buildTranslations returns {lang: {key: value}} structure
    // But we need a different approach - translate the whole object
    const translated = await translateObject(servicesEn, lang);
    
    const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
    content.Services = translated;
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }

  console.log('\nAll done!');
}

import { translateText } from './src/lib/translator';

async function translateObject(obj: any, lang: string): Promise<any> {
  if (typeof obj === 'string') {
    const result = await translateText(obj, lang);
    await new Promise(r => setTimeout(r, 100));
    return result || obj;
  }
  if (Array.isArray(obj)) {
    const results = [];
    for (const item of obj) {
      results.push(await translateObject(item, lang));
    }
    return results;
  }
  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = await translateObject(v, lang);
    }
    return result;
  }
  return obj;
}

main().catch(console.error);
