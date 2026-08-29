import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FileText, Hotel, Languages, Plane, ArrowRight, ShieldCheck } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Medical Travel & Patient Support | AsadHealthcare',
  description: 'Complete end-to-end medical travel assistance including visa letters, airport pickup, accommodation, and language interpreters in India.',
};

export default async function MedicalTravelHubPage() {
  const t = await getTranslations('MedicalTravel');

  const services = [
    {
      title: t('visa.title'),
      desc: t('visa.desc'),
      href: '/medical-travel/visa',
      icon: FileText,
      color: 'teal',
      bgClass: 'bg-teal-50 text-teal-600',
      borderClass: 'group-hover:border-teal-200',
      shadowClass: 'group-hover:shadow-teal-900/10'
    },
    {
      title: t('accommodation.title'),
      desc: t('accommodation.desc'),
      href: '/medical-travel/accommodation',
      icon: Hotel,
      color: 'blue',
      bgClass: 'bg-blue-50 text-blue-600',
      borderClass: 'group-hover:border-blue-200',
      shadowClass: 'group-hover:shadow-blue-900/10'
    },
    {
      title: t('interpreters.title'),
      desc: t('interpreters.desc'),
      href: '/medical-travel/interpreters',
      icon: Languages,
      color: 'indigo',
      bgClass: 'bg-indigo-50 text-indigo-600',
      borderClass: 'group-hover:border-indigo-200',
      shadowClass: 'group-hover:shadow-indigo-900/10'
    },
    {
      title: t('airportTransfer.title'),
      desc: t('airportTransfer.desc'),
      href: '/medical-travel/airport-transfer',
      icon: Plane,
      color: 'emerald',
      bgClass: 'bg-emerald-50 text-emerald-600',
      borderClass: 'group-hover:border-emerald-200',
      shadowClass: 'group-hover:shadow-emerald-900/10'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Hub Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />

        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0 animate-pulse" />
              <span>Patient Support Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-white">
              {t('hero.title1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
                {t('hero.title2')}
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl mx-auto">
              {t('hero.desc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <EnquiryForm>
                <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-[0_8px_25px_rgba(15,118,110,0.5)] transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                  <span>{t('hero.requestBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <Link key={idx} href={service.href} className={`group bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 ${service.shadowClass} ${service.borderClass} relative overflow-hidden flex flex-col items-start`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.bgClass}`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                {service.desc}
              </p>
              
              <div className="mt-auto flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all">
                Explore Service <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
