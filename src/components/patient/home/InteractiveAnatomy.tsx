"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Brain, Heart, Bone, Activity, Stethoscope } from 'lucide-react';

const BODY_PARTS = [
  {
    id: 'neurology',
    label: 'Neurology & Neurosurgery',
    x: 50,
    y: 10,
    icon: Brain,
    slug: 'neurology',
    stats: '50+ Specialists'
  },
  {
    id: 'cardiology',
    label: 'Cardiology & Cardiac Surgery',
    x: 55,
    y: 28,
    icon: Heart,
    slug: 'cardiology',
    stats: '120+ Specialists'
  },
  {
    id: 'gastroenterology',
    label: 'Gastroenterology',
    x: 48,
    y: 42,
    icon: Activity,
    slug: 'gastroenterology',
    stats: '40+ Specialists'
  },
  {
    id: 'orthopedics',
    label: 'Orthopedics & Spine',
    x: 35,
    y: 55,
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
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Explore by Anatomy
          </h2>
          <p className="text-slate-400 text-lg">
            Hover over the body to find leading specialists for your specific condition.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          {/* Interactive Body Area */}
          <div className="relative w-[300px] h-[600px] lg:w-[400px] lg:h-[700px]">
            {/* Base Body Silhouette (Abstract SVG) */}
            <svg 
              viewBox="0 0 100 200" 
              className="w-full h-full drop-shadow-2xl opacity-40"
              preserveAspectRatio="xMidYMid meet"
            >
              <path 
                d="M50 5 C45 5 40 10 40 15 C40 20 45 23 50 23 C55 23 60 20 60 15 C60 10 55 5 50 5 Z M35 25 C25 25 15 30 15 45 L20 100 L30 100 L35 60 L40 100 L40 190 L50 190 L50 100 L50 190 L60 190 L60 100 L65 60 L70 100 L80 100 L85 45 C85 30 75 25 65 25 L35 25 Z" 
                fill="currentColor" 
                className="text-slate-700"
              />
            </svg>

            {/* Glowing Hotspots */}
            {BODY_PARTS.map((part) => (
              <div 
                key={part.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => router.push(`/specialties/${part.slug}`)}
              >
                {/* Pulse Ring */}
                <div className={`absolute inset-0 rounded-full w-12 h-12 -ml-6 -mt-6 animate-ping opacity-20 ${hoveredPart === part.id ? 'bg-primary' : 'bg-teal-500/50'}`} />
                
                {/* Core Dot */}
                <div className={`relative w-4 h-4 rounded-full border-2 border-slate-900 shadow-[0_0_15px_rgba(20,184,166,0.6)] transition-all duration-300 ${hoveredPart === part.id ? 'bg-primary scale-150' : 'bg-teal-400'}`} />
                
                {/* Glassmorphic Tooltip */}
                <AnimatePresence>
                  {hoveredPart === part.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-8 top-1/2 -translate-y-1/2 w-64 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl z-50 pointer-events-none"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <part.icon className="w-5 h-5 text-teal-400" />
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
            <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-slate-800">
              <Stethoscope className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Targeted Expertise</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our network encompasses the finest medical minds in India. From complex neurosurgeries to advanced cardiac interventions, find the exact specialist you need.
              </p>
              <button 
                onClick={() => router.push('/specialties')}
                className="w-full py-4 rounded-xl bg-primary hover:bg-teal-400 text-slate-950 font-bold transition-all duration-300"
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
