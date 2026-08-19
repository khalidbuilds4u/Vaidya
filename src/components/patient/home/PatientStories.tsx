"use client";

import { useState } from 'react';
import { Star, Quote, Play, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, MapPin, Building2, Calendar, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);

  const filteredStories = activeFilter === 'All' 
    ? STORIES 
    : STORIES.filter(s => s.specialty.toLowerCase() === activeFilter.toLowerCase());

  const activeStory = filteredStories[currentIndex % filteredStories.length] || filteredStories[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/70 border-y border-slate-200/60">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[550px] h-[550px] ambient-glow rounded-full -z-10 opacity-70" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] ambient-glow-secondary rounded-full -z-10 opacity-70" />

      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              Verified Patient Journeys
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Real Stories. Real Healing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                Life-Changing Recoveries.
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Hear directly from international patients who trusted Asad Healthcare for their complex surgeries in India.
            </p>
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {SPECIALTY_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setCurrentIndex(0); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                    : 'glass-card text-slate-700 hover:text-primary hover:border-primary/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Patient Video & Story Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Visual Video Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-3.5 rounded-[2.5rem] shadow-2xl h-full flex flex-col">
              <div className="relative h-[360px] sm:h-[420px] w-full rounded-[2rem] overflow-hidden group">
                <img 
                  src={activeStory.image} 
                  alt={activeStory.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Play Button Trigger */}
                <button
                  onClick={() => setSelectedStory(activeStory)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-white/40"
                  aria-label="Play Patient Video Story"
                >
                  <Play className="w-7 h-7 fill-primary ml-1" />
                </button>

                {/* Top Badge: Country */}
                <div className="absolute top-4 left-4 glass-pill px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center gap-2 border border-white">
                  <span className="text-base">{activeStory.flag}</span>
                  <span className="text-xs font-bold text-slate-800">{activeStory.country}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg font-bold">{activeStory.name}</p>
                  <p className="text-xs text-teal-300 font-medium">{activeStory.treatment}</p>
                </div>
              </div>

              {/* Quick Highlight Stats Bar */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                <div className="glass-card p-3 rounded-2xl text-center border border-white/90">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Financial Benefit</p>
                  <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{activeStory.savings}</p>
                </div>
                <div className="glass-card p-3 rounded-2xl text-center border border-white/90">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Result</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">{activeStory.recoveryTimeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Glass Testimonial & Hospital Verification */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-6 right-6 w-24 h-24 text-primary/5 -rotate-12 pointer-events-none" />

              <div>
                {/* Hospital & Specialist Verification Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 px-3 py-1.5 rounded-full border border-slate-200/60">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span>{activeStory.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{activeStory.city}, India</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 ml-auto">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Hospital Case</span>
                  </div>
                </div>

                {/* Patient Quote */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  &ldquo;{activeStory.quote}&rdquo;
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  {activeStory.fullStory}
                </p>
              </div>

              {/* Bottom Surgeon Reference & Consultation Action */}
              <div className="pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Treating Super-Specialist</p>
                  <p className="text-base font-bold text-slate-900">{activeStory.doctor}</p>
                  <p className="text-xs text-primary font-medium">{activeStory.specialty}</p>
                </div>

                <div className="flex items-center gap-3">
                  <EnquiryForm>
                    <Button className="rounded-full shadow-md bg-primary hover:bg-primary/90 px-6 font-semibold h-11">
                      Consult Similar Doctor
                    </Button>
                  </EnquiryForm>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full glass-card hover:bg-white flex items-center justify-center text-slate-700 hover:text-primary transition-colors border border-slate-200"
                      aria-label="Previous Story"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full glass-card hover:bg-white flex items-center justify-center text-slate-700 hover:text-primary transition-colors border border-slate-200"
                      aria-label="Next Story"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredStories.map((story, idx) => {
            const isSelected = activeStory.id === story.id;
            return (
              <div
                key={story.id}
                onClick={() => setCurrentIndex(idx)}
                className={`glass-card p-3 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20 bg-white shadow-lg scale-102' 
                    : 'hover:border-primary/40 opacity-75 hover:opacity-100'
                }`}
              >
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0" 
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span>{story.flag}</span>
                    <p className="text-xs font-bold text-slate-900 truncate">{story.name.split('&')[0]}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{story.specialty}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Story Modal Dialog */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
          <DialogContent className="sm:max-w-[700px] glass-panel rounded-3xl p-6 border border-white shadow-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between pr-4">
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>{selectedStory.flag}</span>
                    <span>{selectedStory.name}&apos;s Treatment Journey</span>
                  </DialogTitle>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedStory.treatment} &bull; {selectedStory.hospital}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* Video Container Mock */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center mt-3 shadow-inner group">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.name} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 rounded-full text-xs font-bold text-white bg-black/40 border border-white/20">
                    Patient Testimonial ({selectedStory.videoDuration})
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-2xl border-2 border-white/40 mb-3 animate-pulse">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                  <p className="text-sm font-semibold">&ldquo;{selectedStory.quote}&rdquo;</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Treated by {selectedStory.doctor}</span>
                  <span className="text-emerald-400 font-bold">{selectedStory.savings}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-600">Want a free opinion for your case from {selectedStory.doctor}?</p>
              <EnquiryForm>
                <Button className="w-full sm:w-auto rounded-full font-semibold px-6 shadow-md bg-primary hover:bg-primary/90">
                  Request Consultation on WhatsApp
                </Button>
              </EnquiryForm>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </section>
  );
}
