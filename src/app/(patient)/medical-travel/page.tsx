import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { FadeIn, StaggerContainer } from '@/components/ui/FadeIn';
import { Plane, Hotel, MessageCircle, FileText, CheckCircle2, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Travel & Visa Assistance | AsadHealthcare',
  description: 'Complete end-to-end medical travel assistance including visa letters, airport pickup, accommodation, and language interpreters in India.',
};

export default function MedicalTravelPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Hero Section with Crystal-Clear International Medical Travel Backdrop */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* International Travel High-Resolution Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')`,
          }}
        />

        {/* Directional Teal & Slate Gradient Mask for 100% Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 h-[calc(100vh-8rem)] min-h-[600px] flex items-center">
          <FadeIn className="max-w-3xl" direction="up" delay={0.1}>
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0 animate-pulse" />
              <span>Complete Concierge &amp; Visa Assistance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-white">
              Seamless Medical Travel <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
                To India, From Day One.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl">
              Focus on your health while we take care of the entire logistics. From express medical visas (VIL) and airport transfers to private patient accommodations, our dedicated concierge ensures a stress-free recovery journey.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <EnquiryForm>
                <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-[0_8px_25px_rgba(15,118,110,0.5)] transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 w-full sm:w-auto">
                  <span>Request Travel Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </EnquiryForm>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Visa Assistance Deep-Dive */}
      <div className="container mx-auto px-4 mt-12 sm:mt-16">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center mb-16 sm:mb-24">
            <div className="lg:w-1/2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-primary shadow-xs">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-2">
                Fast-Track Approval
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-4">
                Medical Visa (Med Visa) Assistance
              </h2>
              <p className="text-xs sm:text-base text-slate-600 mb-6 leading-relaxed">
                Traveling for medical treatment requires an official Indian Medical Visa (e-Med Visa). We fast-track this process by coordinating directly with accredited hospitals to issue government-recognized documentation within 24 to 48 hours.
              </p>
              
              <ul className="space-y-3 sm:space-y-3.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Official Visa Invitation Letter (VIL) on hospital letterhead.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Medical Attendant Visa (MED-X) coverage for up to 2 family members.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Assistance with hospital-backed visa extensions if treatment requires longer recovery.</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/80 group">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop" 
                  alt="Medical Visa Documentation" 
                  className="w-full object-cover h-[280px] sm:h-[380px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm sm:text-base">Guaranteed Fast Documentation</p>
                  <p className="text-[11px] sm:text-xs text-teal-300 font-medium">E-Medical Visa turnaround within 48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3. Concierge Services Grid */}
        <FadeIn direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
              360-Degree Care
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              End-to-End Concierge Services
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            <FadeIn direction="up">
              <div className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/95 group h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">Airport Pickup &amp; Transfer</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  You will be greeted directly at the terminal by our representative holding a personalized placard, followed by private ambulance or sanitised cab transfer to your hospital or hotel.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up">
              <div id="accommodation" className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/95 group h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Hotel className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">Hotel &amp; Stay Arrangement</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  We arrange comfortable, hygienically vetted guest apartments and 4/5-star hotels within walking distance of the hospital, catering to your dietary needs and attendant comfort.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up">
              <div id="interpreters" className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/95 group h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">Multilingual Interpreters</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Language is never an obstacle. Dedicated native-speaking translators (Arabic, Russian, French, Bengali, Swahili) accompany you during all medical consultations and ward visits.
                </p>
              </div>
            </FadeIn>

          </StaggerContainer>
        </FadeIn>

      </div>
    </div>
  );
}
