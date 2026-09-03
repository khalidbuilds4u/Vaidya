import type { Metadata } from 'next';
import {
  HeartPulse, Plane, Hotel, Languages, ShieldCheck,
  CalendarCheck, FileText, Ambulance, Users, PhoneCall,
  ArrowRight, CheckCircle2, Sparkles, Clock,
  Stethoscope, FlaskConical, Pill, MessageCircle,
  ClipboardList, Star, BadgeCheck, Globe, Handshake,
  Home, Car, KeyRound, FilePen,
  PlaneLanding, PlaneTakeoff, HeartHandshake,
  Microscope, DoorOpen, Luggage, MessageSquare,
  ScanSearch, Building2, Receipt, CarFront,
  CalendarClock, ClipboardPlus, UserCheck,
  Route, Map, MessageSquareDot
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

// Icon arrays — in the same order as the translation arrays
const preArrivalIcons = [
  ScanSearch, Building2, Stethoscope, Receipt, CalendarCheck,
  ShieldCheck, Plane, Hotel, CarFront, ClipboardList,
];
const onArrivalIcons = [
  PlaneLanding, KeyRound, FilePen, Stethoscope, Languages,
  FlaskConical, HeartPulse, ClipboardPlus, Users, Car, Pill, CalendarClock,
];
const postTreatmentIcons = [
  DoorOpen, FileText, PhoneCall, Pill, HeartHandshake,
  Microscope, Luggage, PlaneTakeoff, Home, MessageSquare,
];
const whyChooseIcons = [
  UserCheck, HeartPulse, Languages, Route, BadgeCheck,
  MessageSquareDot, Map, HeartHandshake,
];

// Style data (non-translatable)
const preArrivalStyles = [
  { bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(236,72,153,0.3)', iconColor: '#be185d' },
  { bg: 'linear-gradient(145deg,#e0e7ff,#c7d2fe)', shadow: 'rgba(99,102,241,0.3)', iconColor: '#4338ca' },
  { bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)', iconColor: '#0f766e' },
  { bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(180,83,9,0.3)', iconColor: '#b45309' },
  { bg: 'linear-gradient(145deg,#d1fae5,#6ee7b7)', shadow: 'rgba(4,120,87,0.3)', iconColor: '#047857' },
  { bg: 'linear-gradient(145deg,#f3e8ff,#d8b4fe)', shadow: 'rgba(126,34,206,0.3)', iconColor: '#7e22ce' },
  { bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(3,105,161,0.3)', iconColor: '#0369a1' },
  { bg: 'linear-gradient(145deg,#ffedd5,#fdba74)', shadow: 'rgba(194,65,12,0.3)', iconColor: '#c2410c' },
  { bg: 'linear-gradient(145deg,#fee2e2,#fca5a5)', shadow: 'rgba(185,28,28,0.3)', iconColor: '#b91c1c' },
  { bg: 'linear-gradient(145deg,#ecfccb,#bef264)', shadow: 'rgba(77,124,15,0.3)', iconColor: '#4d7c0f' },
];
const onArrivalStyles = [
  { bg: 'linear-gradient(145deg,#cffafe,#67e8f9)', shadow: 'rgba(14,116,144,0.3)', iconColor: '#0e7490' },
  { bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(146,64,14,0.3)', iconColor: '#92400e' },
  { bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(29,78,216,0.3)', iconColor: '#1d4ed8' },
  { bg: 'linear-gradient(145deg,#ccfbf1,#5eead4)', shadow: 'rgba(17,94,89,0.3)', iconColor: '#115e59' },
  { bg: 'linear-gradient(145deg,#ede9fe,#c4b5fd)', shadow: 'rgba(109,40,217,0.3)', iconColor: '#6d28d9' },
  { bg: 'linear-gradient(145deg,#fdf4ff,#e879f9)', shadow: 'rgba(162,28,175,0.25)', iconColor: '#a21caf' },
  { bg: 'linear-gradient(145deg,#fce7f3,#f472b6)', shadow: 'rgba(159,18,57,0.3)', iconColor: '#9f1239' },
  { bg: 'linear-gradient(145deg,#e0e7ff,#a5b4fc)', shadow: 'rgba(55,48,163,0.3)', iconColor: '#3730a3' },
  { bg: 'linear-gradient(145deg,#dcfce7,#86efac)', shadow: 'rgba(22,101,52,0.3)', iconColor: '#166534' },
  { bg: 'linear-gradient(145deg,#ffedd5,#fb923c)', shadow: 'rgba(154,52,18,0.3)', iconColor: '#9a3412' },
  { bg: 'linear-gradient(145deg,#fee2e2,#f87171)', shadow: 'rgba(153,27,27,0.3)', iconColor: '#991b1b' },
  { bg: 'linear-gradient(145deg,#f3e8ff,#c084fc)', shadow: 'rgba(107,33,168,0.3)', iconColor: '#6b21a8' },
];
const postTreatmentStyles = [
  { bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)', iconColor: '#0f766e' },
  { bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(30,64,175,0.3)', iconColor: '#1e40af' },
  { bg: 'linear-gradient(145deg,#dcfce7,#86efac)', shadow: 'rgba(21,128,61,0.3)', iconColor: '#15803d' },
  { bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(190,24,93,0.3)', iconColor: '#be185d' },
  { bg: 'linear-gradient(145deg,#d1fae5,#34d399)', shadow: 'rgba(6,95,70,0.3)', iconColor: '#065f46' },
  { bg: 'linear-gradient(145deg,#f3e8ff,#d8b4fe)', shadow: 'rgba(124,58,237,0.3)', iconColor: '#7c3aed' },
  { bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(2,132,199,0.3)', iconColor: '#0284c7' },
  { bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(217,119,6,0.3)', iconColor: '#d97706' },
  { bg: 'linear-gradient(145deg,#ecfccb,#a3e635)', shadow: 'rgba(101,163,13,0.3)', iconColor: '#65a30d' },
  { bg: 'linear-gradient(145deg,#e0e7ff,#a5b4fc)', shadow: 'rgba(79,70,229,0.3)', iconColor: '#4f46e5' },
];
const whyChooseStyles = [
  { color: '#0f766e', bg: 'linear-gradient(145deg,#ccfbf1,#6ee7d8)', shadow: 'rgba(15,118,110,0.3)' },
  { color: '#be185d', bg: 'linear-gradient(145deg,#fce7f3,#f9a8d4)', shadow: 'rgba(190,24,93,0.3)' },
  { color: '#6d28d9', bg: 'linear-gradient(145deg,#ede9fe,#c4b5fd)', shadow: 'rgba(109,40,217,0.3)' },
  { color: '#1d4ed8', bg: 'linear-gradient(145deg,#dbeafe,#93c5fd)', shadow: 'rgba(29,78,216,0.3)' },
  { color: '#047857', bg: 'linear-gradient(145deg,#d1fae5,#6ee7b7)', shadow: 'rgba(4,120,87,0.3)' },
  { color: '#b45309', bg: 'linear-gradient(145deg,#fef3c7,#fcd34d)', shadow: 'rgba(180,83,9,0.3)' },
  { color: '#0369a1', bg: 'linear-gradient(145deg,#e0f2fe,#7dd3fc)', shadow: 'rgba(3,105,161,0.3)' },
  { color: '#c2410c', bg: 'linear-gradient(145deg,#ffedd5,#fdba74)', shadow: 'rgba(194,65,12,0.3)' },
];

type CardProps = {
  icon: React.ElementType;
  title: string;
  desc: string;
  bg: string;
  shadow: string;
  iconColor: string;
};

function ServiceCard({ icon: Icon, title, desc, bg, shadow, iconColor }: CardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900/95 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-teal-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative transition-colors duration-500"
        style={{
          background: bg,
          boxShadow: `4px 4px 10px ${shadow}, -3px -3px 7px rgba(255,255,255,0.9), inset 0 1px 1px rgba(255,255,255,0.7)`,
          border: '1px solid rgba(255,255,255,0.7)',
        }}
      >
        <Icon className="w-7 h-7 drop-shadow-sm transition-colors duration-500" style={{ color: iconColor }} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug mb-1.5 transition-colors duration-500">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-500">{desc}</p>
    </div>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  const preArrivalItems = t.raw('preArrival') as { title: string; desc: string }[];
  const onArrivalItems = t.raw('onArrival') as { title: string; desc: string }[];
  const postTreatmentItems = t.raw('postTreatment') as { title: string; desc: string }[];
  const whyChooseItems = t.raw('whyChoose.items') as { title: string; desc: string }[];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

      {/* Hero */}
      <section className="relative bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-teal-950/20 dark:via-slate-950 dark:to-emerald-950/20 pointer-events-none transition-colors duration-500" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-200/20 dark:bg-teal-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-emerald-200/20 dark:bg-emerald-500/10 blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 dark:bg-teal-400/10 border border-primary/15 dark:border-teal-400/20 text-primary dark:text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-6 transition-colors duration-500">
            <Sparkles className="w-3 h-3 animate-pulse" /><span>{t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.12] mb-6 transition-colors duration-500">
            {t('hero.heading1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-emerald-500">{t('hero.heading2')}</span>
          </h1>
          <div className="max-w-3xl space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 transition-colors duration-500">
            <p>{t('hero.p1')}</p>
            <p>{t('hero.p2')}</p>
            <p>{t('hero.p3')}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-100 pt-1">{t('hero.tagline')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                {t('hero.cta')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
              <Link href="/contact-us">{t('hero.ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Phase Nav */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <a href="#pre" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20"><span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400" />{t('nav.preArrival')}</a>
            <a href="#on" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-primary dark:text-teal-300 bg-primary/5 dark:bg-teal-500/10 border-primary/20 dark:border-teal-500/20"><span className="w-2 h-2 rounded-full bg-primary dark:bg-teal-400" />{t('nav.during')}</a>
            <a href="#post" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"><span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />{t('nav.post')}</a>
            <a href="#why" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20"><Star className="w-3 h-3 fill-amber-500 text-amber-500" />{t('nav.why')}</a>
          </div>
        </div>
      </div>

      {/* Service Phases */}
      <div className="container mx-auto px-4 max-w-6xl py-12 sm:py-16 space-y-20">

        <section id="pre">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 transition-colors duration-500">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 dark:bg-violet-400" />
              <span className="text-sm font-extrabold text-violet-700 dark:text-violet-300">{t('phases.pre.label')}</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-200 dark:from-violet-500/20 to-transparent transition-colors duration-500" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{preArrivalItems.length} {t('nav.preArrival')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {preArrivalItems.map((s, i) => (
              <ServiceCard key={i} icon={preArrivalIcons[i]} title={s.title} desc={s.desc} {...preArrivalStyles[i]} />
            ))}
          </div>
        </section>

        <section id="on">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/5 dark:bg-teal-500/10 border border-primary/20 dark:border-teal-500/20 transition-colors duration-500">
              <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-teal-400" />
              <span className="text-sm font-extrabold text-primary dark:text-teal-300">{t('phases.on.label')}</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-teal-200 dark:from-teal-500/20 to-transparent transition-colors duration-500" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{onArrivalItems.length} {t('nav.during')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {onArrivalItems.map((s, i) => (
              <ServiceCard key={i} icon={onArrivalIcons[i]} title={s.title} desc={s.desc} {...onArrivalStyles[i]} />
            ))}
          </div>
        </section>

        <section id="post">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">{t('phases.post.label')}</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 dark:from-emerald-500/20 to-transparent transition-colors duration-500" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">{postTreatmentItems.length} {t('nav.post')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {postTreatmentItems.map((s, i) => (
              <ServiceCard key={i} icon={postTreatmentIcons[i]} title={s.title} desc={s.desc} {...postTreatmentStyles[i]} />
            ))}
          </div>
        </section>
      </div>

      {/* Why Choose */}
      <section id="why" className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-16 sm:py-20 transition-colors duration-500">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-4 transition-colors duration-500">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />{t('whyChoose.badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 transition-colors duration-500">{t('whyChoose.heading')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto transition-colors duration-500">{t('whyChoose.subheading')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseItems.map((w, i) => {
              const Icon = whyChooseIcons[i];
              const style = whyChooseStyles[i];
              return (
                <div key={i} className="group bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900/95 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-teal-400/50 hover:-translate-y-1.5 transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500"
                    style={{
                      background: style.bg,
                      boxShadow: `4px 4px 10px ${style.shadow}, -3px -3px 7px rgba(255,255,255,0.9), inset 0 1px 1px rgba(255,255,255,0.7)`,
                      border: '1px solid rgba(255,255,255,0.7)',
                    }}
                  >
                    <Icon className="w-6 h-6 drop-shadow-sm transition-colors duration-500" style={{ color: style.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 leading-snug transition-colors duration-500">{w.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-500">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Banner */}
      <section className="bg-gradient-to-r from-primary via-teal-600 to-emerald-600 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-[11px] font-bold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3 h-3" />{t('freeBanner.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{t('freeBanner.heading')}</h2>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{t('freeBanner.desc')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-5 transition-colors duration-500">
            <Clock className="w-3 h-3" />{t('cta.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 transition-colors duration-500">{t('cta.heading')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mb-8 leading-relaxed transition-colors duration-500">{t('cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EnquiryForm>
              <Button size="lg" className="rounded-full px-8 shadow-[0_8px_25px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.45)] transition-all font-semibold">
                {t('cta.cta')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </EnquiryForm>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
              <a href="https://wa.me/919918053077" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />{t('cta.ctaSecondary')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
