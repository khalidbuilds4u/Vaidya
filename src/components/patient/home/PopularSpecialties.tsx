import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Bone, Brain, Baby, Activity, Microscope, ScanHeart, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const SPECIALTIES = [
  { name: 'Cardiology', icon: HeartPulse, count: '120+ Doctors' },
  { name: 'Orthopedics', icon: Bone, count: '150+ Doctors' },
  { name: 'Neurology', icon: Brain, count: '85+ Doctors' },
  { name: 'Oncology', icon: Microscope, count: '200+ Doctors' },
  { name: 'Organ Transplant', icon: ScanHeart, count: '45+ Centers' },
  { name: 'IVF & Fertility', icon: Baby, count: '90+ Centers' },
  { name: 'Gastroenterology', icon: Activity, count: '110+ Doctors' },
  { name: 'General Surgery', icon: Stethoscope, count: '300+ Doctors' },
];

export function PopularSpecialties() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Medical Specialties</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
          Find world-class treatment across every major medical specialty. Our network includes India's top surgical and medical experts.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SPECIALTIES.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link key={spec.name} href={`/specialties/${spec.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-center items-center border-slate-200 hover:border-primary/30 bg-white">
                  <div className="p-4 rounded-full bg-slate-50 mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-slate-500 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors mb-1">{spec.name}</h3>
                  <p className="text-xs text-slate-500">{spec.count}</p>
                </Card>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/specialties">
            <Button size="lg" className="px-8 rounded-full">
              View All Specialties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
