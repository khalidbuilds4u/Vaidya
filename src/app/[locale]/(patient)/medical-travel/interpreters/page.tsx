import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Languages, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { InterpreterContent } from '@/components/patient/medical-travel/InterpreterContent';

export const metadata: Metadata = {
  title: 'Language Interpreters | AsadHealthcare',
  description: 'Professional medical language interpreters.',
};

export default async function InterpretersPage() {
  const t = await getTranslations('MedicalTravel');
  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden text-white border-b border-teal-900/40 z-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              <Languages className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>Language Interpreters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-white">
              Clear Communication <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
                At Every Step
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl">
              {t('interpreters.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <EnquiryForm>
                <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-[0_8px_25px_rgba(15,118,110,0.5)] transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2">
                  <span>{t('hero.requestBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>
      <InterpreterContent />
    </div>
  );
}
