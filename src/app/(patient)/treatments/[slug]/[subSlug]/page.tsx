import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { CheckCircle2, Clock, DollarSign, Activity, Microscope, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";


// Mock DB Fetch
const getSubTreatmentDetails = (slug: string, subSlug: string) => {
  const name = subSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const parentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    parentName,
    parentSlug: slug,
    name,
    minEstimate: 5000,
    maxEstimate: 7000,
    recoveryTime: '2-4 Weeks',
    hospitalStay: '3-4 Days',
    overview: `This specialized page covers ${name}. It is a specific variation or advanced technique of ${parentName}. Indian hospitals offer highly advanced facilities for this exact procedure, often utilizing state-of-the-art robotic technology or minimally invasive techniques for better outcomes.`,
    advantages: [
      'Faster recovery times compared to traditional methods',
      'Lower risk of post-operative complications',
      'Smaller incisions and less tissue damage',
      'Higher precision and implant longevity'
    ],
    suitableFor: [
      'Patients with severe joint degradation not responsive to medication',
      'Individuals looking for a permanent solution to mobility issues',
      'Those requiring advanced robotic-assisted precision'
    ]
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string, subSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subTreatment = getSubTreatmentDetails(resolvedParams.slug, resolvedParams.subSlug);
  return {
    title: `${subTreatment.name} in India - Advanced Treatment | AsadHealthcare`,
    description: `Specific details and cost estimates for ${subTreatment.name} in India.`,
  };
}

export default async function SubTreatmentDetailPage({ params }: { params: Promise<{ slug: string, subSlug: string }> }) {
  const resolvedParams = await params;
  const subTreatment = getSubTreatmentDetails(resolvedParams.slug, resolvedParams.subSlug);

  if (!subTreatment) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Sub-Treatment Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Link href={`/treatments/${subTreatment.parentSlug}`} className="text-primary-foreground/80 hover:text-white font-medium tracking-wider text-sm mb-4 inline-flex items-center">
              ← Back to {subTreatment.parentName}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-2">
              {subTreatment.name}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
              {subTreatment.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <EnquiryForm>
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 text-md h-12">
                  Get Cost Estimate for this specific procedure
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <DollarSign className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Est. Cost Range</p>
                <p className="font-bold text-lg">${subTreatment.minEstimate} - ${subTreatment.maxEstimate}</p>
              </Card>
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Recovery Time</p>
                <p className="font-bold text-lg">{subTreatment.recoveryTime}</p>
              </Card>
              <Card className="p-4 flex flex-col justify-center items-center text-center col-span-2 md:col-span-1">
                <Activity className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Hospital Stay</p>
                <p className="font-bold text-lg">{subTreatment.hospitalStay}</p>
              </Card>
            </div>

            {/* Why choose this sub-treatment? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Advantages of {subTreatment.name}</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {subTreatment.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-slate-700">{adv}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Who is it for? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Who is a good candidate?</h2>
              <ul className="space-y-4">
                {subTreatment.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0"></span>
                    <p className="text-slate-700">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-bold mb-2">Speak to a Specialist</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Not sure if {subTreatment.name} is the right choice for you? Share your reports, and our doctors will recommend the best approach.
                </p>
                <EnquiryForm>
                  <Button className="w-full h-12 text-md">Request Medical Opinion</Button>
                </EnquiryForm>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
