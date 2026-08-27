import type { Metadata } from 'next';
import { 
  HeartPulse, Plane, Hotel, Languages, ShieldCheck, 
  CalendarCheck, FileText, Ambulance, Users, PhoneCall,
  ArrowRight, CheckCircle2, Sparkles, Clock
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export const metadata: Metadata = {
  title: 'Our Services | Asad Healthcare – End-to-End Medical Tourism in India',
  description: 'Asad Healthcare provides complete medical tourism services including hospital coordination, medical visa support, airport transfers, accommodation, language interpreters, and 24/7 patient support in India.',
};

const services = [
  {
    icon: HeartPulse,
    colorClass: 'from-rose-500/20 to-pink-500/10 border-rose-500/20 text-rose-600',
    title: 'Hospital Coordination',
    desc: 'We connect you with JCI & NABH accredited hospitals best suited to your medical condition, and manage all paperwork and communication on your behalf.',
    points: ['Hospital shortlisting', 'Medical opinion in 48hrs', 'Direct coordination with specialists'],
  },
  {
    icon: CalendarCheck,
    colorClass: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-600',
    title: 'Doctor Appointments',
    desc: 'We arrange consultations with the most suitable specialist surgeons and doctors based on your diagnosis, reducing wait times to near zero.',
    points: ['Specialist matching', 'Priority scheduling', 'Second opinion arrangements'],
  },
  {
    icon: FileText,
    colorClass: 'from-blue-500/20 to-indigo-500/10 border-blue-500/20 text-blue-600',
    title: 'Treatment Cost Estimates',
    desc: 'Share your medical reports and we provide detailed, transparent cost estimates from top hospitals — helping you plan your budget with confidence.',
    points: ['Free cost estimate', 'Multiple hospital quotes', 'Transparent pricing'],
  },
  {
    icon: ShieldCheck,
    colorClass: 'from-violet-500/20 to-purple-500/10 border-violet-500/20 text-violet-600',
    title: 'Medical Visa Assistance',
    desc: 'We arrange official Hospital Invitation Letters (VIL) so you can obtain an Indian Medical e-Visa within 48-72 hours — for you and up to 2 attendants.',
    points: ['Official hospital invitation letter', 'Attendant visa support', 'Emergency visa fast-track'],
  },
  {
    icon: Plane,
    colorClass: 'from-sky-500/20 to-cyan-500/10 border-sky-500/20 text-sky-600',
    title: 'Airport Transfer & Reception',
    desc: 'Our representative meets you at the airport terminal with a personalised name board and escorts you safely to your hospital or hotel accommodation.',
    points: ['Personalised airport pickup', 'SIM card provided', 'Currency exchange assistance'],
  },
  {
    icon: Hotel,
    colorClass: 'from-amber-500/20 to-yellow-500/10 border-amber-500/20 text-amber-600',
    title: 'Accommodation & Stay',
    desc: 'We arrange comfortable and affordable guest houses, serviced apartments, or hotels near your hospital — suitable for both patients and their attendants.',
    points: ['Budget to premium options', 'Near hospital location', 'Meal & laundry arrangements'],
  },
  {
    icon: Languages,
    colorClass: 'from-teal-500/20 to-emerald-500/10 border-teal-500/20 text-teal-600',
    title: 'Language Interpreters',
    desc: 'We assign a dedicated interpreter throughout your hospital stay in Arabic, French, Russian, Bangla, Swahili, and other languages — ensuring nothing is lost in translation.',
    points: ['Arabic, French, Russian & more', 'Present during consultations', 'Hospital admission support'],
  },
  {
    icon: Users,
    colorClass: 'from-orange-500/20 to-red-500/10 border-orange-500/20 text-orange-600',
    title: 'Personal Patient Coordinator',
    desc: 'Your dedicated coordinator is your single point of contact from Day 1 to discharge — managing schedules, answering questions, and ensuring a smooth experience.',
    points: ['24/7 availability on WhatsApp', 'End-to-end journey management', 'Post-treatment follow-up'],
  },
  {
    icon: Ambulance,
    colorClass: 'from-red-500/20 to-rose-500/10 border-red-500/20 text-red-600',
    title: 'Emergency & Urgent Care',
    desc: 'In case of emergencies, our team coordinates immediate hospital transfers, emergency visa processing, and urgent specialist consultations round the clock.',
    points: ['24/7 emergency response', 'Emergency visa fast-track', 'Immediate hospital coordination'],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-teal-50 to-emerald-50 border-b border-slate-200/60 pt-16 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-300/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-emerald-300/10 blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>End-to-End Medical Tourism Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-500">
              Services
            </span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            From your first consultation to your safe return home — we handle every aspect of your medical journey to India so you can focus entirely on your health and recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-50">
              <Link href="/contact-us">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Everything Handled for You</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              Our dedicated concierge team manages all logistics so you experience world-class care with zero stress.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.colorClass} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  <ul className="mt-3 space-y-1">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free for Patients Banner */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-teal-50 to-emerald-50 border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">100% Free for Patients 🎉</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Our consultation and concierge coordination services are completely <strong>free of charge</strong> for patients. All treatment fees are settled directly with the hospital. We are compensated by our hospital partners — you pay <strong>nothing extra</strong>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Clock className="w-3.5 h-3.5" />
            <span>Response within 24 hours</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">Ready to Start Your Medical Journey?</h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8">
            Share your medical reports and requirements with us today. Our team will get back to you within 24 hours with a personalised treatment plan and cost estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                Get Free Treatment Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-300">
              <a href="https://wa.me/919451187513" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                WhatsApp Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
