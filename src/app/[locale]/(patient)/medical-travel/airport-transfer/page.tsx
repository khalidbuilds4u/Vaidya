import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Plane, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { AirportTransferContent } from '@/components/patient/medical-travel/AirportTransferContent';

export const metadata: Metadata = {
  title: 'Airport Transfer Services | AsadHealthcare',
  description: 'Safe and reliable airport transfers for international patients.',
};

export default async function AirportTransferPage() {
  const t = await getTranslations('MedicalTravel');
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-slate-950 text-white border-b border-emerald-900/40">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20 sm:opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              <Plane className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Airport Transfer Services</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-white">
              Safe & Reliable <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Transport to Hospital
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl">
              {t('airportTransfer.desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <EnquiryForm>
                <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-[0_8px_25px_rgba(16,185,129,0.5)] transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2">
                  <span>{t('hero.requestBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>
      <AirportTransferContent />
    </div>
  );
}
