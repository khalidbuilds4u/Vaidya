import { Metadata } from "next"
import { ShieldCheck, HeartPulse, Globe2, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "About Asad Healthcare | Medical Tourism in India",
  description: "Learn about Asad Healthcare, our mission, our values, and our commitment to bringing world-class healthcare to international patients.",
}

export default function AboutUsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-5 h-5" />
            Global Trust, World-Class Healing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Bridging Borders for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Better Healthcare.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We are India's premier medical tourism facilitator, connecting international patients with accredited hospitals, renowned surgeons, and a seamless recovery experience.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              At Asad Healthcare, our mission is to eliminate the geographical barriers to high-quality medical treatment. We believe that every patient deserves access to the best healthcare facilities in the world, regardless of where they live.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              By partnering with JCI and NABH accredited hospitals across India, we ensure that you receive world-class care at a fraction of the cost, complete with dedicated concierge support from the moment you land until you safely return home.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Accredited</h4>
                  <p className="text-sm text-slate-500">JCI & NABH Hospitals</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Global</h4>
                  <p className="text-sm text-slate-500">50+ Countries Served</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop" 
              alt="Medical Team" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-3xl shadow-2xl relative z-10 object-cover" 
            />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-teal-100 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Why Choose Us?</h2>
            <p className="text-slate-600">We don't just connect you to a hospital; we walk with you through every step of your healing journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency</h3>
              <p className="text-slate-600">No hidden fees, no surprise costs. We provide clear treatment estimates and honest medical opinions directly from senior surgeons.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-6">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compassion</h3>
              <p className="text-slate-600">Medical travel can be daunting. Our concierge team acts as your local family in India, ensuring your absolute comfort and peace of mind.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">We rigorously vet our partner hospitals to ensure they maintain the highest international standards in clinical excellence and technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Ready to start your journey?</h2>
        <Link href="/contact-us">
          <Button size="lg" className="rounded-full px-8 h-14 text-base bg-primary hover:bg-teal-700">
            Contact Our Medical Team <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
