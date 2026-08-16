import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Search, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Medical Conditions & Diseases Guide | AsadHealthcare',
  description: 'Learn about common medical conditions, symptoms, causes, and the best treatment options available in India.',
};

const MOCK_CONDITIONS = [
  { name: 'Coronary Artery Disease', specialty: 'Cardiology', description: 'Narrowing or blockage of the coronary arteries.' },
  { name: 'Arrhythmia', specialty: 'Cardiology', description: 'Irregular or abnormal heartbeat.' },
  { name: 'Heart Failure', specialty: 'Cardiology', description: 'The heart does not pump blood as well as it should.' },
  { name: 'Osteoarthritis', specialty: 'Orthopedics', description: 'Degeneration of joint cartilage and the underlying bone.' },
  { name: 'Rheumatoid Arthritis', specialty: 'Orthopedics', description: 'A chronic inflammatory disorder affecting many joints.' },
  { name: 'Brain Tumor', specialty: 'Neurology', description: 'A mass or growth of abnormal cells in your brain.' },
  { name: 'Epilepsy', specialty: 'Neurology', description: 'A neurological disorder marked by sudden recurrent episodes of sensory disturbance.' },
  { name: 'Breast Cancer', specialty: 'Oncology', description: 'Cancer that forms in the cells of the breasts.' },
  { name: 'Prostate Cancer', specialty: 'Oncology', description: 'Cancer that occurs in the prostate.' },
];

export default function ConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Medical Conditions Guide
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Search for a specific disease or condition to understand its symptoms, causes, and the advanced treatment options available through our hospital network.
          </p>
          
          <div className="bg-white rounded-xl p-2 flex items-center shadow-lg max-w-2xl mx-auto">
            <Search className="h-5 w-5 text-muted-foreground ml-3 mr-2" />
            <Input 
              type="text" 
              placeholder="Search for a condition (e.g., Arrhythmia)..." 
              className="border-0 focus-visible:ring-0 shadow-none text-base h-12 text-slate-900"
            />
            <Button size="default" className="rounded-lg h-10 px-6">Search</Button>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Common Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONDITIONS.map((condition) => (
            <Link key={condition.name} href={`/conditions/${condition.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="p-6 hover:shadow-lg transition-all group h-full flex flex-col border-slate-200 hover:border-primary cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-primary">{condition.specialty}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{condition.name}</h3>
                <p className="text-slate-600 leading-relaxed flex-1">{condition.description}</p>
                <div className="mt-6 font-medium text-primary flex items-center gap-2">
                  View Treatments <span>&rarr;</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
