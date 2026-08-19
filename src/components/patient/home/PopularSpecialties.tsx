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
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-slate-50/60">
      {/* Subtle Ambient Orb */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[400px] ambient-glow rounded-full -z-10 opacity-50" />

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
          Specialized Excellence
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Explore by Medical Specialty
        </h2>
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Comprehensive care across all major clinical departments. Consult with India&apos;s most distinguished surgeons and medical teams.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {SPECIALTIES.map((spec) => {
            const Icon = spec.icon;
            const slug = spec.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <Link key={spec.name} href={`/specialties/${slug}`}>
                <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center cursor-pointer h-full flex flex-col justify-between items-center group relative overflow-hidden bg-white/95">
                  
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary transition-colors mb-1">
                      {spec.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-500">{spec.count}</p>
                  </div>

                  <div className="mt-3 pt-2.5 w-full border-t border-slate-100 flex items-center justify-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/treatments">
            <Button size="lg" className="px-6 sm:px-8 h-11 sm:h-12 rounded-xl sm:rounded-full font-semibold shadow-sm bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm group">
              <span>Browse All Treatments &amp; Procedures</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
