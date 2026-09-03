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

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'AboutUs' });
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-slate-950 text-white border-b border-teal-900/40">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Image 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
            alt="About Us Background" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>
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
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors duration-500">
          {t('intro.desc')}
        </p>
      </section>

      {/* What We Do */}
      <section className="bg-white dark:bg-slate-900 py-20 border-y border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-500">{t('whatWeDo.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg transition-colors duration-500">{t('whatWeDo.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[0,1,2,3,4,5,6,7,8,9].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200">{t(`whatWeDo.list.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Healthcare Network */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-white dark:bg-slate-900/95 rounded-[2.5rem] p-6 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-[0_20px_80px_rgba(0,0,0,0.07)] transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Content - Spans 5 columns */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider mb-6 text-sm shadow-sm transition-colors duration-500">
                <Building2 className="w-4 h-4" />
                {t('network.globalStandards')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-500">{t('network.title')}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 transition-colors duration-500">
                {t('network.desc')}
              </p>
              
              {/* Small visual anchors to give the text side more presence */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('network.accredited')}</div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('network.specialists')}</div>
                </div>
              </div>
            </div>

            {/* Image Content - Spans 7 columns */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop" 
                  alt="Healthcare Network" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
            </div>
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
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-500">{t('whyChooseUs.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[0,1,2,3].map((i) => (
              <div key={i} className="flex gap-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center shrink-0 text-teal-600 dark:text-teal-400 transition-colors duration-500">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">{t(`whyChooseUs.items.${i}.title`)}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500">{t(`whyChooseUs.items.${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statements (Mission, Vision, Commitment) */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-teal-50 dark:bg-teal-900/20 p-8 sm:p-10 rounded-[2rem] border border-teal-100 dark:border-teal-800/50 hover:shadow-xl dark:shadow-none transition-all duration-300 h-full flex flex-col justify-center">
            <Globe2 className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-6 transition-colors duration-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">{t('statements.mission.title')}</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg transition-colors duration-500">{t('statements.mission.desc')}</p>
          </div>
          
          {/* Vision Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 sm:p-10 rounded-[2rem] border border-blue-100 dark:border-blue-800/50 hover:shadow-xl dark:shadow-none transition-all duration-300 h-full flex flex-col justify-center">
            <HeartPulse className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-6 transition-colors duration-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">{t('statements.vision.title')}</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg transition-colors duration-500">{t('statements.vision.desc')}</p>
          </div>
          
          {/* Commitment Card - Spans full width */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-8 sm:p-12 rounded-[2rem] border border-purple-100 dark:border-purple-800/50 hover:shadow-xl dark:shadow-none transition-all duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            <div className="shrink-0 bg-white dark:bg-purple-500/10 p-4 rounded-2xl shadow-sm transition-colors duration-500">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-500">{t('statements.commitment.title')}</h3>
              <div className="space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed text-lg transition-colors duration-500">
                <p>{t('statements.commitment.desc1')}</p>
                <p>{t('statements.commitment.desc2')}</p>
                <p>{t('statements.commitment.desc3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-slate-950 py-20 border-t border-slate-100 dark:border-slate-800 text-center transition-colors duration-500">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-500">{t('cta.title')}</h2>
          <Link href="/contact-us">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-teal-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-lg hover:shadow-xl transition-all">
              {t('cta.button')} <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
