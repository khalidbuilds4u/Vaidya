import Link from 'next/link';
import { ArrowRight, Activity, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const POPULAR_CONDITIONS = [
  { 
    name: 'Coronary Artery Disease', 
    specialty: 'Cardiology', 
    description: 'Minimally invasive bypass grafting (CABG), angioplasty, and robotic heart surgery.',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
  },
  { 
    name: 'Osteoarthritis', 
    specialty: 'Orthopedics', 
    description: 'Robotic-assisted total knee & hip replacements with ultra-fast recovery protocols.',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
  },
  { 
    name: 'Brain Tumor & Epilepsy', 
    specialty: 'Neurology', 
    description: 'Advanced microsurgery, CyberKnife radiosurgery, and functional neuro-resection.',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
  },
  { 
    name: 'Breast & Prostate Cancer', 
    specialty: 'Oncology', 
    description: 'Targeted immunotherapy, precision radiation, and organ-preserving surgical oncology.',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
  }
];

export function PopularConditions() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-14 text-center items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Diagnosis &amp; Care
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Common Conditions We Treat
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Search by your specific diagnosis. Our hospital network specializes in advanced surgical and medical interventions for complex health challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_CONDITIONS.map((condition) => (
            <Link key={condition.name} href={`/conditions/${condition.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}>
              <div className="glass-card p-7 rounded-3xl h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden">
                
                {/* Top specialty badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${condition.badgeColor}`}>
                      {condition.specialty}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {condition.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {condition.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100/90 font-semibold text-sm text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/conditions">
            <Button size="lg" className="px-9 h-12 rounded-full font-semibold shadow-md hover:shadow-lg transition-all group">
              View All 50+ Medical Conditions
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
