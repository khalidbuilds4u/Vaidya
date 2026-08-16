import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MapPin, Building2, Stethoscope, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Medical Hubs in India | AsadHealthcare',
  description: 'Explore the top cities in India for medical tourism, featuring world-class hospitals and connectivity.',
};

const CITIES = [
  {
    name: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 45,
    description: 'The National Capital Region boasts India\'s largest concentration of JCI accredited super-specialty hospitals and excellent international connectivity.',
    topSpecialties: ['Cardiology', 'Oncology', 'Organ Transplant'],
  },
  {
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 38,
    description: 'India\'s financial capital is home to pioneering medical institutions and leading specialists, particularly in complex surgeries.',
    topSpecialties: ['Neurology', 'Orthopedics', 'Cosmetic Surgery'],
  },
  {
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 42,
    description: 'Known as India\'s health capital, Chennai attracts the highest number of health tourists for its advanced yet cost-effective medical care.',
    topSpecialties: ['Ophthalmology', 'Cardiac Surgery', 'Fertility'],
  },
  {
    name: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2070&auto=format&fit=crop',
    hospitalsCount: 35,
    description: 'The Silicon Valley of India integrates cutting-edge technology with healthcare, offering world-class robotic and precision surgeries.',
    topSpecialties: ['Robotic Surgery', 'Gastroenterology', 'Neurology'],
  }
];

export default function CitiesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Top Medical Hubs in India
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              India's major metropolitan cities offer world-class medical infrastructure, seamless international connectivity, and dedicated patient support ecosystems.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-8">
          {CITIES.map((city) => (
            <Card key={city.name} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    {city.name}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {city.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-slate-700">
                    <Building2 className="w-4 h-4 text-primary mr-2 shrink-0" />
                    <span className="font-medium">{city.hospitalsCount}+ Accredited Hospitals</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <Plane className="w-4 h-4 text-primary mr-2 shrink-0" />
                    <span className="font-medium">Direct Int'l Flights</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {city.topSpecialties.map(spec => (
                      <span key={spec} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
