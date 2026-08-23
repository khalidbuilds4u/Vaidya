"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BriefcaseMedical, Star, ArrowRight } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export interface DoctorCardProps {
  slug: string;
  name: string;
  specialty: string;
  qualifications?: string;
  experience: string;
  hospital: string;
  city?: string;
  image: string;
  keyExpertise?: string[];
  rating?: number;
  surgeries?: number;
  biography?: string;
}

export function DoctorCard({
  slug,
  name,
  specialty,
  qualifications = "MBBS, MS",
  experience,
  hospital,
  city = "India",
  image,
  keyExpertise = [],
  rating = 4.9,
  biography,
}: DoctorCardProps) {
  return (
    <Link href={`/doctors/${slug}`} className="block">
      <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/60 flex flex-col group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Large Inset Image at Top */}
        <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden bg-slate-100 relative mb-4">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 px-1 sm:px-2">
          
          {/* Title Row */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-200/60 bg-emerald-50 text-emerald-700 text-[10px] font-bold shadow-sm">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              Profile Authorized
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-slate-800 font-semibold text-sm sm:text-base mb-3">
            {specialty}
          </p>

          {/* Biography */}
          {biography ? (
            <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
              {biography}
            </p>
          ) : (
            <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
              {name} is a highly experienced {specialty.toLowerCase()} with {experience} of experience. They have successfully performed numerous complex procedures and are trusted by thousands of global patients.
            </p>
          )}

          {/* Footer (Hospital & Experience) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-tight">{hospital}, {city}</span>
            </div>
            <div className="flex items-start gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
              <BriefcaseMedical className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-tight">{experience} Experience</span>
            </div>
          </div>

          {/* View Profile Button (Left Aligned) */}
          <div className="mt-auto flex justify-start pt-2 border-t border-slate-100">
            <Button 
              asChild 
              variant="outline" 
              className="mt-4 rounded-lg border-primary text-primary hover:bg-primary/5 hover:text-primary font-bold h-10 px-6"
            >
              <div>View Profile</div>
            </Button>
          </div>

        </div>
      </div>
    </Link>
  );
}
