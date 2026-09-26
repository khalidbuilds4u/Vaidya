"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Brain, Heart, Bone, Activity, Stethoscope } from 'lucide-react';

const BODY_PARTS = [
  {
    id: 'neurology',
    label: 'Neurology & Neurosurgery',
    x: 50,
    y: 8, // Head area
    icon: Brain,
    slug: 'neurology',
    stats: '50+ Specialists'
  },
  {
    id: 'cardiology',
    label: 'Cardiology & Cardiac Surgery',
    x: 52,
    y: 45, // Heart area
    icon: Heart,
    slug: 'cardiology',
    stats: '120+ Specialists'
  },
  {
    id: 'gastroenterology',
    label: 'Gastroenterology',
    x: 43,
    y: 65, // Liver/Stomach area
    icon: Activity,
    slug: 'gastroenterology',
    stats: '40+ Specialists'
  },
  {
    id: 'orthopedics',
    label: 'Orthopedics & Spine',
    x: 25,
    y: 40, // Shoulder joint area
    icon: Bone,
    slug: 'orthopedics',
    stats: '80+ Specialists'
  }
];

export default function InteractiveAnatomy() {
  const t = useTranslations();
  const router = useRouter();
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0a0f16] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Explore by Anatomy
          </h2>
          <p className="text-slate-400 text-lg">
            Hover over the holographic model to find leading specialists for your specific condition.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
          {/* Interactive Body Area */}
          <div className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black/50">
            {/* Real High-Tech Image Background */}
            <Image 
              src="/images/anatomy-explorer.jpg" 
              alt="Interactive Human Anatomy" 
              fill 
              className="object-cover opacity-80 mix-blend-screen"
            />
            
            {/* Overlay Gradient for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent pointer-events-none" />

            {/* Glowing Hotspots */}
            {BODY_PARTS.map((part) => (
              <div 
                key={part.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => router.push(`/specialties/${part.slug}`)}
              >
                {/* Pulse Ring */}
                <div className={`absolute inset-0 rounded-full w-12 h-12 -ml-6 -mt-6 animate-ping opacity-30 ${hoveredPart === part.id ? 'bg-teal-400' : 'bg-teal-500/50'}`} />
                
                {/* Core Dot */}
                <div className={`relative w-4 h-4 rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(45,212,191,0.8)] transition-all duration-300 ${hoveredPart === part.id ? 'bg-teal-300 scale-150' : 'bg-teal-500/80'}`} />
                
                {/* Glassmorphic Tooltip */}
                <AnimatePresence>
                  {hoveredPart === part.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-8 top-1/2 -translate-y-1/2 w-64 p-4 rounded-2xl bg-[#0f172a]/80 backdrop-blur-2xl border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.15)] z-50 pointer-events-none"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/30">
                          <part.icon className="w-5 h-5 text-teal-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{part.label}</h4>
                          <p className="text-xs text-teal-400 font-medium mt-0.5">{part.stats}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Quick Info / Call to action panel */}
          <div className="lg:w-1/3 w-full space-y-6">
            <div className="bg-[#0f172a]/50 backdrop-blur-md rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <Stethoscope className="w-10 h-10 text-teal-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Targeted Expertise</h3>
              <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                Our network encompasses the finest medical minds in India. From complex neurosurgeries to advanced cardiac interventions, find the exact specialist you need.
              </p>
              <button 
                onClick={() => router.push('/specialties')}
                className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold transition-all duration-300 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
              >
                View All Specialties
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
