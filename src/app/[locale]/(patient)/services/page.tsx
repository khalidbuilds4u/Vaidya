import type { Metadata } from 'next';
import {
  HeartPulse, Plane, Hotel, Languages, ShieldCheck,
  CalendarCheck, FileText, Ambulance, Users, PhoneCall,
  ArrowRight, CheckCircle2, Sparkles, Clock,
  Stethoscope, FlaskConical, Pill, MessageCircle,
  ClipboardList, Star, BadgeCheck, Globe, Handshake,
  Home, Car, KeyRound, FilePen,
  PlaneLanding, PlaneTakeoff, HeartHandshake,
  Microscope, DoorOpen, Luggage, MessageSquare,
  ScanSearch, Building2, Receipt, CarFront,
  CalendarClock, ClipboardPlus, UserCheck,
  Route, Map, MessageSquareDot
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export const metadata: Metadata = {
  title: 'Our Services | Asad Healthcare – End-to-End Medical Tourism in India',
  description: 'Asad Healthcare provides complete medical tourism services for international patients traveling to India for treatment.',
};

type ServiceItem = {
  icon: React.ElementType;
  title: string;
  desc: string;
  bg: string;       // gradient background
  shadow: string;   // colored bottom-right shadow
  iconColor: string;
};

const preArrival: ServiceItem[] = [
  {
    icon: ScanSearch, title: 'Medical Case Assessment', desc: 'We collect your medical reports and understand your medical requirements before planning your treatment journey.',
    bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(236,72,153,0.3)', iconColor: '#be185d'
  },
  {
    icon: Building2, title: 'Doctor & Hospital Selection', desc: 'We help identify suitable hospitals and doctors based on your medical condition and treatment needs.',
    bg: 'linear-gradient(145deg,#e0e7ff,#c7d2fe)', shadow: 'rgba(99,102,241,0.3)', iconColor: '#4338ca'
  },
  {
    icon: Stethoscope, title: 'Medical Opinion', desc: 'We coordinate with doctors to obtain a preliminary medical opinion and understand the possible treatment approach.',
    bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)', iconColor: '#0f766e'
  },
  {
    icon: Receipt, title: 'Treatment Cost Estimate', desc: 'We help you understand the expected treatment cost and other major expenses before your journey.',
    bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(180,83,9,0.3)', iconColor: '#b45309'
  },
  {
    icon: CalendarCheck, title: 'Appointment Scheduling', desc: 'We arrange consultations, diagnostic tests, and hospital appointments according to your treatment plan.',
    bg: 'linear-gradient(145deg,#d1fae5,#6ee7b7)', shadow: 'rgba(4,120,87,0.3)', iconColor: '#047857'
  },
  {
    icon: ShieldCheck, title: 'Medical Visa Assistance', desc: 'We guide patients and attendants with the medical visa process and required hospital documents.',
    bg: 'linear-gradient(145deg,#f3e8ff,#d8b4fe)', shadow: 'rgba(126,34,206,0.3)', iconColor: '#7e22ce'
  },
  {
    icon: Plane, title: 'Flight & Travel Assistance', desc: 'We assist with travel planning and help coordinate your journey to India.',
    bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(3,105,161,0.3)', iconColor: '#0369a1'
  },
  {
    icon: Hotel, title: 'Accommodation Arrangement', desc: 'We help arrange suitable hotels, guest houses, or other accommodation close to the hospital.',
    bg: 'linear-gradient(145deg,#ffedd5,#fdba74)', shadow: 'rgba(194,65,12,0.3)', iconColor: '#c2410c'
  },
  {
    icon: CarFront, title: 'Airport Transfer Planning', desc: 'We can arrange airport pickup and transportation to your hotel or hospital.',
    bg: 'linear-gradient(145deg,#fee2e2,#fca5a5)', shadow: 'rgba(185,28,28,0.3)', iconColor: '#b91c1c'
  },
  {
    icon: ClipboardList, title: 'Personalized Treatment Plan', desc: 'We prepare a clear schedule for your consultations, tests, treatment, hospital visits, and other important arrangements.',
    bg: 'linear-gradient(145deg,#ecfccb,#bef264)', shadow: 'rgba(77,124,15,0.3)', iconColor: '#4d7c0f'
  },
];

const onArrival: ServiceItem[] = [
  {
    icon: PlaneLanding, title: 'Airport Pickup', desc: 'We welcome you at the airport and assist with your transfer to the hotel, guest house, or hospital.',
    bg: 'linear-gradient(145deg,#cffafe,#67e8f9)', shadow: 'rgba(14,116,144,0.3)', iconColor: '#0e7490'
  },
  {
    icon: KeyRound, title: 'Hotel & Accommodation Support', desc: 'We assist with check-in and help resolve basic accommodation-related requirements.',
    bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(146,64,14,0.3)', iconColor: '#92400e'
  },
  {
    icon: FilePen, title: 'Hospital Registration', desc: 'We assist patients with hospital registration, documentation, and admission formalities.',
    bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(29,78,216,0.3)', iconColor: '#1d4ed8'
  },
  {
    icon: Stethoscope, title: 'Doctor Consultation Assistance', desc: 'We accompany and assist patients during doctor consultations and help with communication.',
    bg: 'linear-gradient(145deg,#ccfbf1,#5eead4)', shadow: 'rgba(17,94,89,0.3)', iconColor: '#115e59'
  },
  {
    icon: Languages, title: 'Language Interpretation', desc: 'We provide language interpretation between patients and doctors or hospital staff to support clear communication.',
    bg: 'linear-gradient(145deg,#ede9fe,#c4b5fd)', shadow: 'rgba(109,40,217,0.3)', iconColor: '#6d28d9'
  },
  {
    icon: FlaskConical, title: 'Diagnostic Test Coordination', desc: 'We help coordinate blood tests, scans, imaging, and other investigations as advised by the doctor.',
    bg: 'linear-gradient(145deg,#fdf4ff,#e879f9)', shadow: 'rgba(162,28,175,0.25)', iconColor: '#a21caf'
  },
  {
    icon: HeartPulse, title: 'Treatment Coordination', desc: 'We coordinate with the hospital and concerned departments throughout the treatment process.',
    bg: 'linear-gradient(145deg,#fce7f3,#f472b6)', shadow: 'rgba(159,18,57,0.3)', iconColor: '#9f1239'
  },
  {
    icon: ClipboardPlus, title: 'Hospital Admission Support', desc: 'We assist patients and attendants with admission procedures and important hospital formalities.',
    bg: 'linear-gradient(145deg,#e0e7ff,#a5b4fc)', shadow: 'rgba(55,48,163,0.3)', iconColor: '#3730a3'
  },
  {
    icon: Users, title: 'Patient & Attendant Support', desc: 'We provide practical assistance to patients and their attendants during their stay in India.',
    bg: 'linear-gradient(145deg,#dcfce7,#86efac)', shadow: 'rgba(22,101,52,0.3)', iconColor: '#166534'
  },
  {
    icon: Car, title: 'Local Transportation', desc: 'We help coordinate transportation for hospital visits, diagnostic tests, accommodation, and other essential journeys.',
    bg: 'linear-gradient(145deg,#ffedd5,#fb923c)', shadow: 'rgba(154,52,18,0.3)', iconColor: '#9a3412'
  },
  {
    icon: Pill, title: 'Pharmacy & Medical Support', desc: 'We assist patients with understanding prescriptions and locating medicines or medical supplies when required.',
    bg: 'linear-gradient(145deg,#fee2e2,#f87171)', shadow: 'rgba(153,27,27,0.3)', iconColor: '#991b1b'
  },
  {
    icon: CalendarClock, title: 'Daily Coordination', desc: 'We stay connected with the patient and help coordinate important requirements throughout the medical journey.',
    bg: 'linear-gradient(145deg,#f3e8ff,#c084fc)', shadow: 'rgba(107,33,168,0.3)', iconColor: '#6b21a8'
  },
];

const postTreatment: ServiceItem[] = [
  {
    icon: DoorOpen, title: 'Discharge Assistance', desc: 'We assist patients with the discharge process and help them understand the necessary formalities.',
    bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)', iconColor: '#0f766e'
  },
  {
    icon: FileText, title: 'Medical Documents', desc: 'We help patients collect important documents such as discharge summaries, prescriptions, reports, and treatment records.',
    bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(30,64,175,0.3)', iconColor: '#1e40af'
  },
  {
    icon: PhoneCall, title: "Doctor's Follow-Up", desc: 'We coordinate follow-up consultations and help patients stay connected with their treating doctor.',
    bg: 'linear-gradient(145deg,#dcfce7,#86efac)', shadow: 'rgba(21,128,61,0.3)', iconColor: '#15803d'
  },
  {
    icon: Pill, title: 'Medication Guidance', desc: 'We help patients understand their prescriptions and instructions provided by the medical team.',
    bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(190,24,93,0.3)', iconColor: '#be185d'
  },
  {
    icon: HeartHandshake, title: 'Recovery & Aftercare', desc: 'We help coordinate recommended follow-up care and other post-treatment requirements.',
    bg: 'linear-gradient(145deg,#d1fae5,#34d399)', shadow: 'rgba(6,95,70,0.3)', iconColor: '#065f46'
  },
  {
    icon: Microscope, title: 'Final Medical Review', desc: 'We assist in coordinating the final consultation or medical review before the patient returns home, when advised.',
    bg: 'linear-gradient(145deg,#f3e8ff,#d8b4fe)', shadow: 'rgba(124,58,237,0.3)', iconColor: '#7c3aed'
  },
  {
    icon: Luggage, title: 'Travel Preparation', desc: "We help coordinate the patient's travel arrangements after completing the required treatment and medical formalities.",
    bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(2,132,199,0.3)', iconColor: '#0284c7'
  },
  {
    icon: PlaneTakeoff, title: 'Airport Transfer', desc: 'We can arrange transportation from the hotel or hospital to the airport for the return journey.',
    bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(217,119,6,0.3)', iconColor: '#d97706'
  },
  {
    icon: Home, title: 'Return Journey Support', desc: 'We help make the departure process smooth and organized so patients can return home comfortably.',
    bg: 'linear-gradient(145deg,#ecfccb,#a3e635)', shadow: 'rgba(101,163,13,0.3)', iconColor: '#65a30d'
  },
  {
    icon: MessageSquare, title: 'Continued Communication', desc: 'Our support can continue after you return home through communication and follow-up coordination with the hospital or doctor when required.',
    bg: 'linear-gradient(145deg,#e0e7ff,#a5b4fc)', shadow: 'rgba(79,70,229,0.3)', iconColor: '#4f46e5'
  },
];

const whyChoose = [
  { icon: UserCheck, title: 'Personalized Patient Support', color: '#0f766e', bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)', desc: 'Every patient is different. We provide personalized assistance based on your medical needs, preferences, and treatment plan.' },
  { icon: HeartPulse, title: 'Experienced Medical Coordination', color: '#be185d', bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(190,24,93,0.3)', desc: 'We coordinate with hospitals, doctors, and healthcare teams to help make your treatment journey smooth and well organized.' },
  { icon: Languages, title: 'Professional Language Interpretation', color: '#6d28d9', bg: 'linear-gradient(145deg,#ede9fe,#c4b5fd)', shadow: 'rgba(109,40,217,0.3)', desc: 'We help bridge the language gap between international patients and healthcare professionals for clear and comfortable communication.' },
  { icon: Route, title: 'End-to-End Assistance', color: '#1d4ed8', bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(29,78,216,0.3)', desc: 'From your first enquiry and hospital appointment to treatment, discharge, and return home, we support you throughout your journey.' },
  { icon: BadgeCheck, title: 'Trusted Hospital Coordination', color: '#047857', bg: 'linear-gradient(145deg,#d1fae5,#6ee7b7)', shadow: 'rgba(4,120,87,0.3)', desc: 'We assist patients in connecting with suitable hospitals and medical specialists according to their treatment requirements.' },
  { icon: MessageSquareDot, title: 'Transparent & Clear Communication', color: '#b45309', bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(180,83,9,0.3)', desc: 'We provide clear information about appointments, treatment coordination, estimated costs, and important arrangements.' },
  { icon: Map, title: 'Travel & Local Assistance', color: '#0369a1', bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(3,105,161,0.3)', desc: 'We help coordinate accommodation, airport transfers, local transportation, and other essential arrangements during your stay in India.' },
  { icon: HeartHandshake, title: 'Support Beyond Treatment', color: '#c2410c', bg: 'linear-gradient(145deg,#ffedd5,#fdba74)', shadow: 'rgba(194,65,12,0.3)', desc: 'Our assistance can continue after you return home through follow-up coordination and communication with the hospital or doctor when required.' },
];

type CardProps = { icon: React.ElementType; title: string; desc: string; bg: string; shadow: string; iconColor: string };

function ServiceCard({ icon: Icon, title, desc, bg, shadow, iconColor }: CardProps) {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
        style={{
          background: bg,
          boxShadow: `4px 4px 10px ${shadow}, -3px -3px 7px rgba(255,255,255,0.9), inset 0 1px 1px rgba(255,255,255,0.7)`,
          border: '1px solid rgba(255,255,255,0.7)',
        }}
      >
        <Icon className="w-7 h-7 drop-shadow-sm" style={{ color: iconColor }} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-1.5">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-200/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-emerald-200/20 blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3 animate-pulse" /><span>End-to-End Medical Tourism Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-500">Services</span>
          </h1>
          <div className="max-w-3xl space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            <p>At <strong className="text-slate-800">Asad Healthcare</strong>, we provide end-to-end support for international patients seeking medical treatment in India. From planning your journey to returning home, we help coordinate the important details of your medical trip.</p>
            <p>Our services are designed to make the healthcare journey simple, comfortable, transparent, and well organized. We coordinate with hospitals, doctors, patients, and attendants to ensure smooth communication and better support.</p>
            <p>We assist with medical coordination, interpretation, travel arrangements, accommodation, hospital visits, documentation, and local support according to each patient's needs.</p>
            <p className="font-semibold text-slate-800 pt-1">Your health is your priority. We take care of the coordination.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-200 text-slate-700 hover:bg-slate-50">
              <Link href="/contact-us">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Phase Nav */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <a href="#pre" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-violet-700 bg-violet-50 border-violet-200"><span className="w-2 h-2 rounded-full bg-violet-500" />Pre-Arrival</a>
            <a href="#on" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-primary bg-primary/5 border-primary/20"><span className="w-2 h-2 rounded-full bg-primary" />During Treatment</a>
            <a href="#post" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-emerald-700 bg-emerald-50 border-emerald-200"><span className="w-2 h-2 rounded-full bg-emerald-500" />Post-Treatment</a>
            <a href="#why" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-amber-700 bg-amber-50 border-amber-200"><Star className="w-3 h-3 fill-amber-500 text-amber-500" />Why Choose Us</a>
          </div>
        </div>
      </div>

      {/* Service Phases */}
      <div className="container mx-auto px-4 max-w-6xl py-12 sm:py-16 space-y-20">

        <section id="pre">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-50 border border-violet-200">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              <span className="text-sm font-extrabold text-violet-700">Pre-Arrival Services</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{preArrival.length} Services</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {preArrival.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </section>

        <section id="on">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/5 border border-primary/20">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-sm font-extrabold text-primary">On-Arrival & During Treatment</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-teal-200 to-transparent" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{onArrival.length} Services</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {onArrival.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </section>

        <section id="post">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-extrabold text-emerald-700">Post-Treatment & Departure</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{postTreatment.length} Services</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {postTreatment.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </section>
      </div>

      {/* Why Choose */}
      <section id="why" className="bg-white border-t border-slate-100 py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold uppercase tracking-wider mb-4">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Why Choose Asad Healthcare</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">Thousands of international patients have trusted us with their medical journey. Here is what makes us different.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChoose.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="group bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: w.bg,
                      boxShadow: `4px 4px 10px ${w.shadow}, -3px -3px 7px rgba(255,255,255,0.9), inset 0 1px 1px rgba(255,255,255,0.7)`,
                      border: '1px solid rgba(255,255,255,0.7)',
                    }}
                  >
                    <Icon className="w-6 h-6 drop-shadow-sm" style={{ color: w.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug">{w.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Banner */}
      <section className="bg-gradient-to-r from-primary via-teal-600 to-emerald-600 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-[11px] font-bold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3 h-3" />Zero Hidden Charges
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">100% Free for Patients</h2>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our consultation and concierge coordination services are completely <strong className="text-white">free of charge</strong> for patients. All treatment fees are settled directly with the hospital. We are compensated by our hospital partners, you pay <strong className="text-white">nothing extra</strong>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-5">
            <Clock className="w-3 h-3" />Response within 24 hours
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Ready to Start Your Medical Journey?</h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed">Share your medical reports and requirements with us today. Our team will respond within 24 hours with a personalised treatment plan and cost estimate.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                Get Free Treatment Plan <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-200">
              <a href="https://wa.me/919918053077" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />WhatsApp Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
