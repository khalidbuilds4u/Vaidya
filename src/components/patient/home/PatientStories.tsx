"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Star, Quote, Play, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, MapPin, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

interface PatientStory {
  id: string;
  name: string;
  country: string;
  flag: string;
  treatment: string;
  specialty: string;
  hospital: string;
  city: string;
  doctor: string;
  image: string;
  videoDuration: string;
  rating: number;
  savings: string;
  recoveryTimeline: string;
  quote: string;
  fullStory: string;
}

const STORIES: PatientStory[] = [
  {
    id: '1',
    name: 'David & Helen Richardson',
    country: 'United Kingdom (London)',
    flag: '🇬🇧',
    treatment: 'Bilateral Robotic Knee Replacement',
    specialty: 'Orthopedics',
    hospital: 'Fortis Memorial Research Institute',
    city: 'Gurugram',
    doctor: 'Dr. Ashok Rajgopal',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    videoDuration: '3:45 min',
    rating: 5,
    savings: 'Saved £26,000 (75%)',
    recoveryTimeline: 'Walking without support on Day 3',
    quote: 'The NHS waitlist was over 18 months. With Asad Healthcare, I landed in Delhi on Monday, had robotic surgery on Wednesday, and was pain-free within weeks!',
    fullStory: 'David suffered from severe osteoarthritis in both knees for over 4 years. Facing long waiting times in the UK, he contacted Asad Healthcare. Within 48 hours, he received detailed medical opinions from 3 top orthopedic surgeons. From airport reception to a private recovery suite, the care exceeded five-star hospitality.'
  },
  {
    id: '2',
    name: 'Tariq Al-Mansoor',
    country: 'Oman (Muscat)',
    flag: '🇴🇲',
    treatment: 'Coronary Artery Bypass (CABG)',
    specialty: 'Cardiology',
    hospital: 'Medanta - The Medicity',
    city: 'Delhi NCR',
    doctor: 'Dr. Naresh Trehan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    videoDuration: '4:10 min',
    rating: 5,
    savings: 'Saved $42,000 vs USA',
    recoveryTimeline: 'Full discharge in 8 days',
    quote: 'The Arabic translator assigned to me was with my family every single hour. Dr. Trehan and his team are world legends. May God bless them.',
    fullStory: 'Tariq required an urgent quadruple heart bypass. Asad Healthcare coordinated the emergency medical visa within 24 hours. The surgery was performed using minimally invasive beating-heart techniques, resulting in rapid recovery and zero complications.'
  },
  {
    id: '3',
    name: 'Amina & Ibrahim Adeleke',
    country: 'Nigeria (Lagos)',
    flag: '🇳🇬',
    treatment: 'Advanced Pediatric Oncology Surgery',
    specialty: 'Oncology',
    hospital: 'Indraprastha Apollo Hospitals',
    city: 'New Delhi',
    doctor: 'Dr. Harit Chaturvedi',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    videoDuration: '5:20 min',
    rating: 5,
    savings: 'High Precision CyberKnife',
    recoveryTimeline: 'Cancer-Free at 6-Month Review',
    quote: 'We were told our daughter had no options back home. Apollo’s oncology team gave our child a second life with successful tumor resection.',
    fullStory: 'The Adeleke family flew to New Delhi for specialized neuro-oncology treatment. The combination of high-precision image-guided surgery and dedicated post-operative pediatric intensive care ensured complete tumor clearance.'
  },
  {
    id: '4',
    name: 'Elena & Sergey Voronov',
    country: 'Uzbekistan (Tashkent)',
    flag: '🇺🇿',
    treatment: 'Living Donor Liver Transplant',
    specialty: 'Organ Transplant',
    hospital: 'Max Super Speciality Hospital',
    city: 'New Delhi',
    doctor: 'Dr. Arvinder Singh Soin',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    videoDuration: '4:50 min',
    rating: 5,
    savings: 'Saved $110,000 vs Germany',
    recoveryTimeline: 'Donor and Recipient fully recovered',
    quote: 'From Russian-speaking patient coordinators to legal committee clearance in 5 days, everything was handled flawlessly. World-class transplant care.',
    fullStory: 'Facing end-stage liver disease, Sergey received a living-donor transplant with his son as the donor. The complex 12-hour surgery achieved a 100% success rate, supported by comprehensive post-transplant infection isolation suites.'
  },
  {
    id: '5',
    name: 'Grace Wanjiku',
    country: 'Kenya (Nairobi)',
    flag: '🇰🇪',
    treatment: 'Spine Decompression & Scoliosis Correction',
    specialty: 'Orthopedics',
    hospital: 'Manipal Hospitals',
    city: 'Bangalore',
    doctor: 'Dr. Sandeep Guleria',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    videoDuration: '3:15 min',
    rating: 5,
    savings: 'Saved $34,000',
    recoveryTimeline: 'Pain-free mobility restored',
    quote: 'I could not walk for more than 5 minutes due to nerve compression. Today I can stand straight and live without painkillers.',
    fullStory: 'Grace underwent minimally invasive robotic spine decompression. The state-of-the-art neuro-monitoring ensured zero nerve injury and she returned to Kenya fully rehabilitated within 3 weeks.'
  }
];

const SPECIALTY_FILTERS = ['All', 'Orthopedics', 'Cardiology', 'Oncology', 'Organ Transplant'];

export function PatientStories() {
  const t = useTranslations('PatientStories');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);

  const localizedFilters = [
    { key: 'All', label: t('filters.All') },
    { key: 'Orthopedics', label: t('filters.Orthopedics') },
    { key: 'Cardiology', label: t('filters.Cardiology') },
    { key: 'Oncology', label: t('filters.Oncology') },
    { key: 'Organ Transplant', label: t('filters.Organ Transplant') }
  ];

  const localizedStories = STORIES.map((s, idx) => ({
    ...s,
    name: t(`patients.${idx}.name`),
    country: t(`patients.${idx}.country`),
    specialty: t(`patients.${idx}.spec`),
    treatment: t(`reviews.${idx}.treatment`),
    hospital: t(`reviews.${idx}.hospital`),
    quote: t(`reviews.${idx}.quote`),
    fullStory: t(`reviews.${idx}.text`),
    savings: t(`reviews.${idx}.savings`),
    recoveryTimeline: t(`reviews.${idx}.recovery`)
  }));

  const filteredStories = activeFilter === 'All' 
    ? localizedStories 
    : localizedStories.filter(s => s.specialty.toLowerCase() === activeFilter.toLowerCase() || s.specialty === t(`filters.${activeFilter}`));

  const activeStory = filteredStories[currentIndex % filteredStories.length] || filteredStories[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50/70 dark:bg-slate-900 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors duration-500">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] ambient-glow rounded-full -z-10 opacity-70" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] ambient-glow-secondary rounded-full -z-10 opacity-70" />

      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill dark:bg-primary/10 dark:border-primary/20 text-primary dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-500">
              <Sparkles className="w-3.5 h-3.5 text-primary dark:text-teal-400" />
              {t('tag')}
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">
              {t('title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600 dark:from-teal-400 dark:to-emerald-400">
                {t('subtitle')}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg mt-2 leading-relaxed transition-colors duration-500">
              {t('desc')}
            </p>
          </div>

          {/* Specialty Filter Pills with horizontal scroll on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {localizedFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => { setActiveFilter(filter.key); setCurrentIndex(0); }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                  activeFilter === filter.key
                    ? 'bg-primary dark:bg-teal-600 text-white shadow-md shadow-primary/25 scale-105'
                    : 'glass-card text-slate-700 dark:text-slate-300 dark:bg-slate-900/50 dark:border-slate-800/80 hover:text-primary dark:hover:text-teal-400 hover:border-primary/30 dark:hover:border-teal-400/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Patient Video & Story Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12">
          
          {/* Left Column: Visual Video Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-3 sm:p-3.5 rounded-2xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl h-full flex flex-col dark:bg-slate-900/90 dark:border-slate-800/80 transition-colors duration-500">
              <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] w-full rounded-xl sm:rounded-[2rem] overflow-hidden group">
                <Image 
                  src={activeStory.image} 
                  alt={activeStory.name} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                
                {/* Play Button Trigger */}
                <button
                  onClick={() => setSelectedStory(activeStory)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-white/40"
                  aria-label="Play Patient Video Story"
                >
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-primary ml-1" />
                </button>

                {/* Top Badge: Country */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 glass-pill px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center gap-1.5 sm:gap-2 border border-white">
                  <span className="text-sm sm:text-base">{activeStory.flag}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800">{activeStory.country}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-bold truncate">{activeStory.name}</p>
                  <p className="text-xs text-teal-300 font-medium truncate">{activeStory.treatment}</p>
                </div>
              </div>

              {/* Quick Highlight Stats Bar */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 pt-1 sm:pt-2">
                <div className="glass-card p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center border border-white/90 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/90 transition-colors duration-500">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('stats.financial')}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{activeStory.savings}</p>
                </div>
                <div className="glass-card p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center border border-white/90 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/90 transition-colors duration-500">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('stats.clinical')}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 truncate transition-colors duration-500">{activeStory.recoveryTimeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Glass Testimonial */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="glass-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2.5rem] border border-white dark:border-slate-800/80 shadow-xl h-full flex flex-col justify-between relative overflow-hidden bg-white/95 dark:bg-slate-900/95 transition-colors duration-500">
              
              <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 text-primary/5 dark:text-teal-400/5 -rotate-12 pointer-events-none" />

              <div>
                {/* Hospital & Specialist Verification Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-200/70 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 transition-colors">
                    <Building2 className="w-3.5 h-3.5 text-primary dark:text-teal-400 shrink-0" />
                    <span className="truncate">{activeStory.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-primary dark:text-teal-400 shrink-0" />
                    <span>{activeStory.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-500/20 transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('stats.verified')}</span>
                  </div>
                </div>

                {/* Patient Quote */}
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-4 sm:mb-6 transition-colors duration-500">
                  &ldquo;{activeStory.quote}&rdquo;
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 transition-colors duration-500">
                  {activeStory.fullStory}
                </p>
              </div>

              {/* Bottom Surgeon Reference & Consultation Action */}
              <div className="pt-4 sm:pt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('doctor.treating')}</p>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white transition-colors">{activeStory.doctor}</p>
                  <p className="text-xs text-primary dark:text-teal-400 font-medium">{activeStory.specialty}</p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <EnquiryForm>
                    <Button className="flex-1 sm:flex-none rounded-full shadow-md bg-primary hover:bg-primary/90 dark:bg-teal-600 dark:hover:bg-teal-500 px-5 sm:px-6 font-semibold h-10 sm:h-11 text-xs sm:text-sm">
                      {t('doctor.consult')}
                    </Button>
                  </EnquiryForm>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-400 transition-colors border border-slate-200 dark:border-slate-700"
                      aria-label="Previous Story"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-400 transition-colors border border-slate-200 dark:border-slate-700"
                      aria-label="Next Story"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {filteredStories.map((story, idx) => {
            const isSelected = activeStory.id === story.id;
            return (
              <div
                key={story.id}
                onClick={() => setCurrentIndex(idx)}
                className={`glass-card p-2.5 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20 bg-white dark:bg-slate-900 shadow-md sm:shadow-lg scale-102' 
                    : 'hover:border-primary/40 dark:hover:border-teal-400/40 opacity-80 hover:opacity-100 bg-white/80 dark:bg-slate-900/80 dark:border-slate-800'
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden relative shrink-0">
                  <Image 
                    src={story.image} 
                    alt={story.name}
                    fill
                    sizes="48px"
                    className="object-cover" 
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{story.flag}</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate transition-colors">{story.name.split('&')[0]}</p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">{story.specialty}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Story Modal Dialog */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
          <DialogContent className="sm:max-w-[700px] glass-panel rounded-3xl p-4 sm:p-6 border border-white dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 transition-colors">
            <DialogHeader>
              <div className="flex items-center justify-between pr-4">
                <div>
                  <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{selectedStory.flag}</span>
                    <span>{t('modal.journey', { name: selectedStory.name.split('&')[0].trim() })}</span>
                  </DialogTitle>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {selectedStory.treatment} &bull; {selectedStory.hospital}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* Video Container Mock */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center mt-2 shadow-inner group">
              <Image 
                src={selectedStory.image} 
                alt={selectedStory.name} 
                fill
                sizes="(max-width: 700px) 100vw, 700px"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white bg-black/40 border border-white/20">
                    {t('modal.testimonial', { duration: selectedStory.videoDuration })}
                  </span>
                </div>
                
                <div className="text-center px-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-2xl border-2 border-white/40 mb-2 animate-pulse">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-1" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold line-clamp-2">&ldquo;{selectedStory.quote}&rdquo;</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="truncate">{t('modal.treatedBy', { doctor: selectedStory.doctor })}</span>
                  <span className="text-emerald-400 font-bold shrink-0">{selectedStory.savings}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">{t('modal.wantFreeOpinion', { doctor: selectedStory.doctor })}</p>
              <EnquiryForm>
                <Button className="w-full sm:w-auto rounded-full font-semibold px-6 shadow-md bg-primary hover:bg-primary/90 dark:bg-teal-600 dark:hover:bg-teal-500 h-10 text-xs sm:text-sm">
                  {t('modal.requestConsult')}
                </Button>
              </EnquiryForm>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </section>
  );
}
