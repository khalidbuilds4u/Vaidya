import { CheckCircle2, Award, Zap, DollarSign, Clock, Cpu, Languages } from 'lucide-react';

const REASONS = [
  {
    icon: Award,
    title: 'Top-Tier Surgeons',
    desc: 'Doctors trained in US/UK with decades of complex surgery expertise',
  },
  {
    icon: DollarSign,
    title: 'Up to 70% Cost Savings',
    desc: 'World-class procedures at a fraction of Western healthcare costs',
  },
  {
    icon: Clock,
    title: 'Zero Waiting Time',
    desc: 'Instant admissions and scheduled surgeries without delay',
  },
  {
    icon: Cpu,
    title: 'Robotic & AI Technology',
    desc: 'Latest Da Vinci surgical systems, CyberKnife, and PET-CT diagnostics',
  },
  {
    icon: Languages,
    title: 'Language Translators',
    desc: 'Arabic, Russian, French, and Swahili interpreters assigned to each case',
  },
  {
    icon: Zap,
    title: 'JCI & NABH Accredited',
    desc: 'Rigorous international safety standards and sterile infection control',
  },
];

export function WhyChooseIndia() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] ambient-glow rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] ambient-glow-secondary rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text & Glass Benefits Grid */}
          <div className="w-full lg:w-7/12 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Global Healthcare Destination
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Why Choose India for Your <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                  Medical Treatment?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                India has become the world&apos;s leading healthcare hub, combining renowned clinical excellence, ultra-modern robotic technology, and comprehensive patient hospitality.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {REASONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="glass-card p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 group hover:border-primary/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image with Glass Frame & Floating Elements */}
          <div className="w-full lg:w-5/12 relative z-10">
            <div className="relative glass-panel p-3 rounded-[2.5rem] shadow-2xl">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop" 
                  alt="State of the art surgical hospital"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">NABH & JCI Certified</span>
                  <p className="text-lg font-bold">Standard of Clinical Excellence</p>
                </div>
              </div>
            </div>
            
            {/* Floating Glass Highlight Card */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3.5 border border-white/90 animate-float">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                #1
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight">Fastest Growing Hub</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Over 2 Million International Patients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
