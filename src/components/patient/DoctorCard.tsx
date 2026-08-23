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
}: DoctorCardProps) {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-white/85 flex flex-col group relative overflow-hidden bg-white/95 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-4 items-center">
        
        {/* Doctor Image with Frosted Frame & Rating */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-sm relative group bg-slate-100">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-pill px-2 py-0.5 rounded-full flex items-center gap-1 bg-white/95 shadow-xs border border-white">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-800">{rating}</span>
          </div>
        </div>
        
        {/* Doctor Details */}
        <div className="flex-1 text-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 sm:gap-1.5 mb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                <Link href={`/doctors/${slug}`}>
                  {name}
                </Link>
              </h3>
              <p className="text-primary font-semibold text-xs sm:text-sm">{specialty}</p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">{qualifications}</p>
            </div>
            
            <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-[10px] sm:text-xs font-semibold text-slate-600 border border-slate-200/60 mt-1">
              {experience} Experience
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-[11px] sm:text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              <BriefcaseMedical className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{experience}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 max-w-full truncate">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{hospital}, {city}</span>
            </div>
          </div>

          {keyExpertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
              {keyExpertise.map((exp, idx) => (
                <span 
                  key={`${exp}-${idx}`} 
                  className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md bg-primary/5 text-primary border border-primary/10"
                >
                  {exp}
                </span>
              ))}
            </div>
          )}
          
          {/* Side-by-Side Responsive Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 mt-2">
            <Button 
              asChild 
              variant="outline" 
              className="w-full rounded-xl border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold h-10 text-xs sm:text-sm px-2 truncate"
            >
              <Link href={`/doctors/${slug}`}>View Profile</Link>
            </Button>
            <EnquiryForm>
              <Button className="w-full rounded-xl shadow-xs bg-gradient-to-r from-primary to-teal-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold h-10 text-xs sm:text-sm px-2 flex items-center justify-center gap-1">
                <span>Book Consult</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Button>
            </EnquiryForm>
          </div>

        </div>
      </div>
    </div>
  );
}
