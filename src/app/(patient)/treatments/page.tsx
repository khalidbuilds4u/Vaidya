import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Stethoscope, HeartPulse, Brain, Bone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Treatments & Procedures in India | AsadHealthcare',
  description: 'Explore world-class medical treatments, surgeries, and procedures available at top hospitals in India with estimated cost guides.',
};

// Seed Data for Development
const MOCK_TREATMENTS = [
  {
    slug: 'knee-replacement',
    name: 'Knee Replacement Surgery',
    specialty: 'Orthopedics',
    icon: Bone,
    minEstimate: 4500,
    maxEstimate: 6500,
    recoveryTime: '2-3 Weeks',
    description: 'A surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.',
  },
  {
    slug: 'coronary-artery-bypass',
    name: 'Coronary Artery Bypass Grafting (CABG)',
    specialty: 'Cardiology',
    icon: HeartPulse,
    minEstimate: 5500,
    maxEstimate: 8000,
    recoveryTime: '4-6 Weeks',
    description: 'A type of surgery that improves blood flow to the heart used for people who have severe coronary heart disease.',
  },
  {
    slug: 'brain-tumor-surgery',
    name: 'Brain Tumor Surgery',
    specialty: 'Neurology',
    icon: Brain,
    minEstimate: 6000,
    maxEstimate: 9500,
    recoveryTime: '4-8 Weeks',
    description: 'Advanced neurosurgery techniques to remove abnormal growths in the brain with minimal impact on healthy tissue.',
  }
];

export default function TreatmentsDirectory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Treatments & Estimated Costs
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore comprehensive guides, estimated costs, and world-class specialists for various medical procedures available in India.
        </p>
        
        <div className="bg-white p-2 rounded-xl shadow-sm border flex items-center max-w-2xl mx-auto">
          <Search className="h-5 w-5 text-muted-foreground ml-3 mr-2" />
          <Input 
            type="text" 
            placeholder="Search for a treatment or procedure..." 
            className="border-0 focus-visible:ring-0 shadow-none text-base h-12"
          />
          <Button size="default" className="rounded-lg h-10 px-6">Search</Button>
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Specialty</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Cardiology', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2080&auto=format&fit=crop' },
            { name: 'Oncology', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Orthopedics', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
            { name: 'Neurology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop' },
            { name: 'Gastroenterology', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Organ Transplant', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Cosmetic Surgery', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
            { name: 'Dental', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop' }
          ].map(spec => (
            <Link key={spec.name} href={`/specialties/${spec.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200 group cursor-pointer h-40 relative">
                <img 
                  src={spec.image} 
                  alt={spec.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <h3 className="font-bold text-white text-lg group-hover:text-primary-foreground transition-colors">{spec.name}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Treatments */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Popular Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TREATMENTS.map((treatment) => {
            const Icon = treatment.icon;
            return (
              <Card key={treatment.slug} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{treatment.specialty}</p>
                      <h3 className="text-xl font-bold leading-tight">
                        <Link href={`/treatments/${treatment.slug}`} className="hover:text-primary transition-colors">
                          {treatment.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {treatment.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <span className="font-semibold text-slate-900">${treatment.minEstimate} - ${treatment.maxEstimate}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Recovery:</span>
                      <span className="font-medium text-slate-700">{treatment.recoveryTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 border-t flex justify-between items-center group cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  <span className="font-medium">View Treatment Guide</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
