import { Metadata } from "next"
import { ShieldCheck, HeartPulse, Globe2, Award, ArrowRight } from "lucide-react"
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

      {/* Our Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">{t('mission.title')}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {t('mission.p1')}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {t('mission.p2')}
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('mission.accredited')}</h4>
                  <p className="text-sm text-slate-500">{t('mission.accreditedDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('mission.global')}</h4>
                  <p className="text-sm text-slate-500">{t('mission.globalDesc')}</p>
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
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t('values.title')}</h2>
            <p className="text-slate-600">{t('values.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('values.transparencyTitle')}</h3>
              <p className="text-slate-600">{t('values.transparencyDesc')}</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-6">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('values.compassionTitle')}</h3>
              <p className="text-slate-600">{t('values.compassionDesc')}</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('values.excellenceTitle')}</h3>
              <p className="text-slate-600">{t('values.excellenceDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{t('cta.title')}</h2>
        <Link href="/contact-us">
          <Button size="lg" className="rounded-full px-8 h-14 text-base bg-primary hover:bg-teal-700">
            {t('cta.button')} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
