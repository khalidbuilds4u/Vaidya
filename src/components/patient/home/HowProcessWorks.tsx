import { FileText, Stethoscope, Plane, HeartHandshake } from 'lucide-react';

const STEPS = [
  {
    title: 'Submit Enquiry',
    description: 'Share your medical reports and basic details through our secure platform.',
    icon: FileText,
  },
  {
    title: 'Get Treatment Plan',
    description: 'Our doctors review your case and provide an estimated cost and treatment plan.',
    icon: Stethoscope,
  },
  {
    title: 'Travel Planning',
    description: 'We assist with your medical visa, flight bookings, and accommodation.',
    icon: Plane,
  },
  {
    title: 'Treatment & Care',
    description: 'Receive world-class treatment with 24/7 support from a dedicated case manager.',
    icon: HeartHandshake,
  }
];

export function HowProcessWorks() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            A seamless, transparent journey from your initial enquiry to successful treatment and safe return home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary-foreground/20 z-0"></div>

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold tracking-widest text-primary-foreground/60 mb-2 uppercase">Step {index + 1}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
