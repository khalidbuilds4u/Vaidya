import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Activity, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;


export const metadata: Metadata = {
  title: 'Medical Conditions & Diseases Guide | AsadHealthcare',
  description: 'Learn about common medical conditions, symptoms, causes, and the best treatment options available in India.',
};

const MOCK_CONDITIONS = [
  { name: 'Coronary Artery Disease', specialty: 'Cardiology', description: 'Narrowing or blockage of the coronary arteries requiring bypass surgery or stenting.' },
  { name: 'Arrhythmia', specialty: 'Cardiology', description: 'Irregular or abnormal heartbeat treated with EP studies and catheter ablation.' },
  { name: 'Heart Failure', specialty: 'Cardiology', description: 'Weakened cardiac pumping capacity managed via LVAD implantation or heart transplant.' },
  { name: 'Osteoarthritis', specialty: 'Orthopedics', description: 'Degeneration of joint cartilage treated with robotic total knee and hip replacements.' },
  { name: 'Rheumatoid Arthritis', specialty: 'Orthopedics', description: 'Chronic autoimmune joint disorder managed through biologic therapies and reconstruction.' },
  { name: 'Brain Tumor & Glioma', specialty: 'Neurology', description: 'Abnormal cranial growths resected via CyberKnife radiosurgery and micro-craniotomy.' },
  { name: 'Epilepsy & Seizures', specialty: 'Neurology', description: 'Neurological episodes treated with video-EEG mapping and functional neuro-resection.' },
  { name: 'Breast Cancer', specialty: 'Oncology', description: 'Malignancies treated with oncoplastic surgery, targeted immunotherapy, and radiation.' },
  { name: 'Prostate Cancer', specialty: 'Oncology', description: 'Urological tumors addressed through Da Vinci robotic prostatectomy.' },
];

export default function ConditionsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      
      {/* 1. Header Banner with Medical Diagnostics Backdrop */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        
        {/* Background Diagnostics Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35 sm:opacity-45 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Luminous Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-lg">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Knowledge &amp; Care Pathways</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Medical Conditions &amp; Diseases Guide
          </h1>
          
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl mx-auto font-normal">
            Search for your diagnosis to understand causes, surgical protocols, and accredited hospital treatment pathways in India.
          </p>
          
          {/* Quick Search Capsule */}
          <div className="glass-panel p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-white shadow-xl max-w-xl mx-auto">
            <Search className="h-4 w-4 text-primary ml-3 mr-1 shrink-0" />
            <Input 
              type="text" 
              placeholder="Search by diagnosis (e.g. Osteoarthritis, Brain Tumor)..." 
              className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 bg-transparent placeholder:text-slate-400"
            />
            <Button size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Conditions Grid */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">Common Medical Conditions We Treat</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_CONDITIONS.map((condition) => (
            <Link key={condition.name} href={`/conditions/${condition.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}>
              <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between border border-white/90 bg-white/95 cursor-pointer">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xs">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-primary border border-slate-200/60">
                      {condition.specialty}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {condition.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {condition.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 font-semibold text-xs sm:text-sm text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
