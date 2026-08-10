import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PopularConditions() {
  const popularConditions = [
    { 
      name: 'Coronary Artery Disease', 
      specialty: 'Cardiology', 
      description: 'Find top-rated treatments for blocked arteries and heart disease.',
    },
    { 
      name: 'Osteoarthritis', 
      specialty: 'Orthopedics', 
      description: 'Explore advanced joint replacement solutions for severe arthritis.',
    },
    { 
      name: 'Brain Tumor', 
      specialty: 'Neurology', 
      description: 'Connect with leading neurosurgeons for complex tumor removals.',
    },
    { 
      name: 'Breast Cancer', 
      specialty: 'Oncology', 
      description: 'Access comprehensive cancer care, from surgery to targeted therapy.',
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-12 text-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Conditions We Treat</h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Search by your specific diagnosis. Our network of internationally accredited hospitals provides world-class care for complex medical conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularConditions.map((condition) => (
            <Link key={condition.name} href={`/conditions/${condition.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col border-slate-200 hover:border-primary/30 cursor-pointer bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm font-medium text-primary">{condition.specialty}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{condition.name}</h3>
                <p className="text-slate-600 leading-relaxed flex-1">{condition.description}</p>
                <div className="mt-6 font-medium text-primary flex items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/conditions">
            <Button size="lg" className="px-8 rounded-full group">
              View All Conditions
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
