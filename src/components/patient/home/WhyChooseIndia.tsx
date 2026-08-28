"use client";

import { useState, useEffect } from 'react';
import { Award, Zap, DollarSign, Clock, Cpu, Languages, ChevronRight, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const REASONS = [
  {
    icon: Award,
    title: 'Top-Tier Surgeons',
    desc: 'Doctors trained in US/UK with decades of complex surgery expertise',
  },
  {
    icon: DollarSign,
    title: 'Up to 70% Cost Savings',
    desc: 'World-class procedures at a fraction of Western healthcare costs',
  },
  {
    icon: Clock,
    title: 'Zero Waiting Time',
    desc: 'Instant admissions and scheduled surgeries without delay',
  },
  {
    icon: Cpu,
    title: 'Robotic & AI Technology',
    desc: 'Latest Da Vinci surgical systems, CyberKnife, and PET-CT diagnostics',
  },
  {
    icon: Languages,
    title: 'Language Translators',
    desc: 'Arabic, Russian, French, and Swahili interpreters assigned to each case',
  },
  {
    icon: Zap,
    title: 'JCI & NABH Accredited',
    desc: 'Rigorous international safety standards and sterile infection control',
  },
];

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    tag: 'JCI & NABH Accredited',
    title: 'World-Class Hospital Infrastructure',
    subtitle: 'Over 50+ super-speciality partner hospitals across India'
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
    tag: 'Robotic Precision',
    title: 'Next-Gen Da Vinci Surgical Suites',
    subtitle: 'Minimally invasive operations with rapid 48-hour recovery'
  },
  {
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop',
    tag: '5-Star Hospitality',
    title: 'Private International Patient Suites',
    subtitle: 'Dedicated family lounges, room service & 24/7 care nurses'
  },
  {
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop',
    tag: 'Clinical Excellence',
    title: 'Internationally Trained Specialists',
    subtitle: 'Surgeons with Harvard, UK NHS & Cleveland Clinic fellowships'
  }
];

export function WhyChooseIndia() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations('WhyChoose');

  // Generate localized REASONS dynamically
  const localizedReasons = [
    { icon: Award, title: t('reasons.surgeons.title'), desc: t('reasons.surgeons.desc') },
    { icon: DollarSign, title: t('reasons.savings.title'), desc: t('reasons.savings.desc') },
    { icon: Clock, title: t('reasons.zeroWait.title'), desc: t('reasons.zeroWait.desc') },
    { icon: Cpu, title: t('reasons.robotic.title'), desc: t('reasons.robotic.desc') },
    { icon: Languages, title: t('reasons.language.title'), desc: t('reasons.language.desc') },
    { icon: Zap, title: t('reasons.jci.title'), desc: t('reasons.jci.desc') }
  ];

  // Auto-advance slides every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-white">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[10%] right-[-5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] ambient-glow rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] ambient-glow-secondary rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          
          {/* Left Text & Glass Benefits Grid */}
          <div className="w-full lg:w-7/12 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {t('tag')}
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
                {t('title1')} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                  {t('title2')}
                </span>
              </h2>
              <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t('desc')}
              </p>
            </motion.div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-4 -mx-4 px-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {localizedReasons.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-[85vw] shrink-0 snap-start sm:w-auto glass-card p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 group hover:border-primary/40 bg-white/90"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Interactive Animated Image Slideshow Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 relative z-10 mt-2 lg:mt-0"
          >
            <div className="relative glass-panel p-2.5 sm:p-3 rounded-2xl sm:rounded-[2.5rem] shadow-2xl bg-white/95 border border-white">
              
              {/* Slideshow Image Container */}
              <div className="relative h-[280px] sm:h-[380px] lg:h-[450px] w-full rounded-xl sm:rounded-[2rem] overflow-hidden group">
                
                {SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Directional Gradient Shadow for Crisp Typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />
                    
                    {/* Top Slide Tag */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20">
                      <span className="glass-pill px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-black/40 backdrop-blur-md border border-white/20 shadow-sm">
                        {slide.tag}
                      </span>
                    </div>

                    {/* Bottom Crisp Slide Caption (Zero Collision) */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 z-20 text-white">
                      <p className="text-sm sm:text-lg font-bold leading-tight drop-shadow-sm">
                        {slide.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-teal-300 font-medium mt-1 drop-shadow-xs">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Slideshow Navigation Dots & Arrows */}
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentSlide(dotIdx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === currentSlide ? 'w-5 bg-teal-400' : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
            
            {/* Clean Floating Trust Badge Positioned with Zero Overlap */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 glass-card px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-white bg-white/95 animate-float z-30">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-teal-600 text-white flex items-center justify-center font-extrabold text-sm sm:text-base shadow-sm shrink-0">
                #1
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-extrabold text-slate-900 leading-tight">{t('hub.title')}</p>
                <p className="text-[10px] text-slate-500 font-medium">{t('hub.subtitle')}</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
