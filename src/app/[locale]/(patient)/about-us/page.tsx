import { Metadata } from "next"
import { ShieldCheck, HeartPulse, Globe2, Award, ArrowRight, CheckCircle2, Stethoscope, Building2, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Asad Healthcare | Medical Tourism in India",
  description: "Learn about Asad Healthcare, our mission, our values, and our commitment to bringing world-class healthcare to international patients.",
}

export default async function AboutUsPage() {
  const t = await getTranslations('AboutUs');
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
            {t('hero.tag')}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {t('hero.title1')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('hero.desc')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          {t('intro.desc')}
        </p>
      </section>

      {/* What We Do */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t('whatWeDo.title')}</h2>
            <p className="text-slate-600 text-lg">{t('whatWeDo.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[0,1,2,3,4,5,6,7,8,9].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
                <span className="font-medium text-slate-800">{t(`whatWeDo.list.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Healthcare Network */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full order-2 lg:order-1">
            <Image 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop" 
              alt="Healthcare Network" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-3xl shadow-2xl relative z-10 object-cover" 
            />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-teal-100 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">{t('network.title')}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t('network.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold mb-4">{t('approach.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[0,1,2,3].map((i) => (
              <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors">
                <h3 className="text-lg font-bold text-teal-400 mb-3">{t(`approach.items.${i}.title`)}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t(`approach.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t('whyChooseUs.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[0,1,2,3].map((i) => (
              <div key={i} className="flex gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center shrink-0 text-teal-600">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t(`whyChooseUs.items.${i}.title`)}</h3>
                  <p className="text-slate-600 leading-relaxed">{t(`whyChooseUs.items.${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statements (Mission, Vision, Commitment) */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100 hover:shadow-xl transition-shadow">
            <Globe2 className="w-12 h-12 text-teal-600 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('statements.mission.title')}</h3>
            <p className="text-slate-700 leading-relaxed">{t('statements.mission.desc')}</p>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-shadow">
            <HeartPulse className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('statements.vision.title')}</h3>
            <p className="text-slate-700 leading-relaxed">{t('statements.vision.desc')}</p>
          </div>
          
          <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-purple-600 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('statements.commitment.title')}</h3>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t('statements.commitment.desc1')}</p>
              <p>{t('statements.commitment.desc2')}</p>
              <p>{t('statements.commitment.desc3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 border-t border-slate-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{t('cta.title')}</h2>
          <Link href="/contact-us">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all">
              {t('cta.button')} <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
