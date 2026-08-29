import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Plane, Hotel, MessageCircle, FileText, CheckCircle2, ShieldCheck, ArrowRight, Info, FileSignature, Files, Users, ClipboardList, Clock, ListChecks, Building, MapPin, HeartHandshake, Calendar, CheckSquare, Car, CalendarPlus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Medical Travel & Visa Assistance | AsadHealthcare',
  description: 'Complete end-to-end medical travel assistance including visa letters, airport pickup, accommodation, and language interpreters in India.',
};

export default async function MedicalTravelPage() {
  const t = await getTranslations('MedicalTravel');
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Hero Section */}
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0 animate-pulse" />
              <span>{t('hero.tag')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-white">
              {t('hero.title1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
                {t('hero.title2')}
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl">
              {t('hero.desc')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <EnquiryForm>
                <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-[0_8px_25px_rgba(15,118,110,0.5)] transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 w-full sm:w-auto">
                  <span>{t('hero.requestBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visa Assistance Process (8 Steps) */}
      <div className="container mx-auto px-4 mt-16 sm:mt-24 mb-16 sm:mb-24">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" />
            <span>{t('visa.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('visa.subtitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t('visa.desc')}
          </p>
        </div>

        {/* 8-Point Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Info, titleKey: 'visa.step1Title', descKey: 'visa.step1Desc' },
            { icon: FileSignature, titleKey: 'visa.step2Title', descKey: 'visa.step2Desc' },
            { icon: Files, titleKey: 'visa.step3Title', descKey: 'visa.step3Desc' },
            { icon: Users, titleKey: 'visa.step4Title', descKey: 'visa.step4Desc' },
            { icon: ClipboardList, titleKey: 'visa.step5Title', descKey: 'visa.step5Desc' },
            { icon: Clock, titleKey: 'visa.step6Title', descKey: 'visa.step6Desc' },
            { icon: ListChecks, titleKey: 'visa.step7Title', descKey: 'visa.step7Desc' },
            { icon: ShieldCheck, titleKey: 'visa.step8Title', descKey: 'visa.step8Desc' },
          ].map((step, idx) => (
            <div key={idx} className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/90 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/95 group relative overflow-hidden flex flex-col h-full">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-2 text-slate-900 leading-tight">
                {t(step.titleKey as any)}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t(step.descKey as any)}
              </p>
            </div>
          ))}
        </div>

      {/* 3. Concierge Services Grid */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-24 mt-16 sm:mt-24 border-t border-teal-900/30 overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-900/20 rounded-[100%] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
              {t('concierge.tag')}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t('concierge.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{t('concierge.pickupTitle')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('concierge.pickupDesc')}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <Hotel className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{t('concierge.hotelTitle')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('concierge.hotelDesc')}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{t('concierge.interpreterTitle')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('concierge.interpreterDesc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Accommodation & Stay Process (8 Steps) */}
      <div id="accommodation" className="container mx-auto px-4 mt-16 sm:mt-24 mb-16 sm:mb-24">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Hotel className="w-4 h-4" />
            <span>{t('accommodation.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('accommodation.subtitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t('accommodation.desc')}
          </p>
        </div>

        {/* 8-Point Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Building, titleKey: 'accommodation.step1Title', descKey: 'accommodation.step1Desc' },
            { icon: MapPin, titleKey: 'accommodation.step2Title', descKey: 'accommodation.step2Desc' },
            { icon: HeartHandshake, titleKey: 'accommodation.step3Title', descKey: 'accommodation.step3Desc' },
            { icon: Calendar, titleKey: 'accommodation.step4Title', descKey: 'accommodation.step4Desc' },
            { icon: CheckSquare, titleKey: 'accommodation.step5Title', descKey: 'accommodation.step5Desc' },
            { icon: Car, titleKey: 'accommodation.step6Title', descKey: 'accommodation.step6Desc' },
            { icon: Users, titleKey: 'accommodation.step7Title', descKey: 'accommodation.step7Desc' },
            { icon: CalendarPlus, titleKey: 'accommodation.step8Title', descKey: 'accommodation.step8Desc' },
          ].map((step, idx) => (
            <div key={idx} className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/90 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/95 group relative overflow-hidden flex flex-col h-full">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-2 text-slate-900 leading-tight">
                {t(step.titleKey as any)}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t(step.descKey as any)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
