import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Plane, Hotel, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Travel & Visa Assistance | AsadHealthcare',
  description: 'Complete end-to-end medical travel assistance including visa letters, airport pickup, accommodation, and language interpreters.',
};

export default function MedicalTravelPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Seamless Medical Travel to India
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8">
              Focus on your health while we take care of the logistics. From medical visas to airport transfers and comfortable stays, our dedicated care team ensures a hassle-free journey.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <EnquiryForm>
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 font-semibold">
                  Request Travel Assistance
                </Button>
              </EnquiryForm>
              <a
                href="https://wa.me/919451187513"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-white/10 hover:bg-white/20 text-white border border-white/30 h-11 px-6 gap-2"
              >
                <span>WhatsApp: +91 94511 87513</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        
        {/* Visa Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <div className="lg:w-1/2">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Medical Visa Assistance</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Traveling for medical treatment requires a specific Medical Visa (Med Visa). We simplify this process by coordinating directly with the hospital and the Indian Embassy in your country.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-slate-700">Providing the official Visa Invitation Letter (VIL) from the hospital.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-slate-700">Guidance on required medical documentation and financial proofs.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-slate-700">Assistance with visa extensions if your treatment requires a longer stay.</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop" 
              alt="Medical Visa Assistance" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </div>
        </div>

        {/* Services Grid */}
        <h2 className="text-3xl font-bold text-center mb-12">End-to-End Concierge Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <Card className="p-8 border-t-4 border-t-primary hover:shadow-lg transition-shadow">
            <Plane className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Airport Transfers</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              You will be greeted at the airport by our representative holding a placard with your name, ensuring a safe and comfortable transfer directly to your hospital or hotel.
            </p>
          </Card>

          <Card id="accommodation" className="p-8 border-t-4 border-t-primary hover:shadow-lg transition-shadow">
            <Hotel className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Accommodation</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              We arrange comfortable stays near the hospital for you and your attendants. Options range from budget-friendly guest houses to luxury 5-star hotels, depending on your preference.
            </p>
          </Card>

          <Card id="interpreters" className="p-8 border-t-4 border-t-primary hover:shadow-lg transition-shadow">
            <MessageCircle className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Language Interpreters</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Language should never be a barrier to healthcare. We provide professional interpreters (Arabic, French, Russian, Swahili, etc.) to accompany you during all medical consultations.
            </p>
          </Card>

        </div>

      </div>
    </div>
  );
}
