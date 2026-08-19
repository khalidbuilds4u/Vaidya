import { Button } from '@/components/ui/button';
import { HeartPulse, Bone, Brain, Baby, Activity, Microscope, ScanHeart, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SPECIALTIES = [
  { name: 'Cardiology', icon: HeartPulse, count: '120+ Doctors', color: 'from-rose-500/10 to-pink-500/10 text-rose-600' },
  { name: 'Orthopedics', icon: Bone, count: '150+ Doctors', color: 'from-amber-500/10 to-orange-500/10 text-amber-600' },
  { name: 'Neurology', icon: Brain, count: '85+ Doctors', color: 'from-purple-500/10 to-indigo-500/10 text-purple-600' },
  { name: 'Oncology', icon: Microscope, count: '200+ Doctors', color: 'from-blue-500/10 to-cyan-500/10 text-blue-600' },
  { name: 'Organ Transplant', icon: ScanHeart, count: '45+ Centers', color: 'from-teal-500/10 to-emerald-500/10 text-teal-600' },
  { name: 'IVF & Fertility', icon: Baby, count: '90+ Centers', color: 'from-pink-500/10 to-rose-500/10 text-pink-600' },
  { name: 'Gastroenterology', icon: Activity, count: '110+ Doctors', color: 'from-emerald-500/10 to-green-500/10 text-emerald-600' },
  { name: 'General Surgery', icon: Stethoscope, count: '300+ Doctors', color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600' },
];

export function PopularSpecialties() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/60">
      {/* Subtle Ambient Orb */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] ambient-glow rounded-full -z-10 opacity-70" />

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
          Specialized Excellence
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Explore by Medical Specialty
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          Comprehensive care across all major clinical departments. Consult with India&apos;s most distinguished surgeons and medical teams.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SPECIALTIES.map((spec) => {
            const Icon = spec.icon;
            const slug = spec.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <Link key={spec.name} href={`/specialties/${slug}`}>
                <div className="glass-card p-6 rounded-3xl text-center cursor-pointer h-full flex flex-col justify-between items-center group relative overflow-hidden">
                  
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-primary transition-colors mb-1.5">
                      {spec.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">{spec.count}</p>
                  </div>

                  <div className="mt-4 pt-3 w-full border-t border-slate-100/80 flex items-center justify-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-14 text-center">
          <Link href="/treatments">
            <Button size="lg" className="px-9 h-12 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
              Browse All Treatments &amp; Procedures
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
