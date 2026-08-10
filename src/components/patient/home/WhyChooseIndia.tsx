import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const REASONS = [
  'Highly skilled doctors with international exposure',
  'JCI & NABH accredited state-of-the-art hospitals',
  'Cost-effective treatments saving up to 70%',
  'No waiting list for critical surgeries',
  'Advanced medical technology & robotic surgery',
  'English-speaking medical staff & dedicated translators',
];

export function WhyChooseIndia() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose India for Medical Treatment?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                India has emerged as one of the world's most preferred healthcare destinations. It offers a unique combination of world-class medical expertise, advanced technology, and significant cost savings compared to Western countries.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {REASONS.map((reason, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3 mt-0.5" />
                  <span className="text-slate-700 font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10">
            {/* Modern Dot Grid Background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(#0f766e_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[radial-gradient(#0f766e_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
            
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl -z-10 transform scale-105"></div>
            
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop')` }}
              />
            </div>
            
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="text-2xl font-bold">#1</span>
              </div>
              <div className="text-sm font-bold text-slate-800 leading-tight">
                Medical Destination<br/><span className="font-medium text-slate-500">in South Asia</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
