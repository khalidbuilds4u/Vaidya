import { FileText, Stethoscope, Plane, HeartHandshake } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Share Medical Reports',
    description: 'Submit your symptoms and diagnostic scans securely through our website or WhatsApp.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Free Medical Opinions',
    description: 'Top Indian doctors evaluate your case and provide comparative hospital quotes within 24 hours.',
    icon: Stethoscope,
  },
  {
    step: '03',
    title: 'Visa & Travel Concierge',
    description: 'Receive hospital visa invitation letters (VIL), airport pickup, and dedicated hotel accommodations.',
    icon: Plane,
  },
  {
    step: '04',
    title: 'Treatment & Recovery',
    description: 'Personal case manager and translator guide you from pre-op admission to post-discharge care.',
    icon: HeartHandshake,
  }
];

export function HowProcessWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
            Stress-Free Patient Journey
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From your first inquiry to arriving in India and returning home safely, we handle every detail with complete clinical transparency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title} 
                className="glass-card-dark rounded-3xl p-7 border border-white/15 hover:border-teal-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-teal-400/70 transition-colors font-mono">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-teal-400 flex items-center gap-1">
                  <span>Step {step.step}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">100% Free Service</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
