"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Plane, Building2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { m as motion } from 'framer-motion';

export interface HospitalCardProps {
  slug: string;
  name: string;
  description?: string;
  city: string;
  state?: string;
  image: string;
  accreditations: string[];
  beds: number;
  established?: number;
  airportDistance?: number;
  specialties?: string[];
  hasInternationalSupport?: boolean;
}

export function HospitalCard({
  slug,
  name,
  description,
  city,
  state,
  image,
  accreditations,
  beds,
  established,
  airportDistance,
  hasInternationalSupport = true
}: HospitalCardProps) {
  const t = useTranslations('HospitalCard');
  const [imgError, setImgError] = useState(false);
  
  const displayImage = (!image || image.trim() === "" || imgError) 
    ? "/images/hospital-placeholder.jpg" 
    : image;
  
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-full group bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row flex-1">
        
        {/* Image Section */}
        <div className="w-full sm:w-[35%] lg:w-[40%] h-48 sm:h-auto relative overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
          <Image 
            src={displayImage}
            onError={() => setImgError(true)}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
          {hasInternationalSupport && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold text-white bg-black/60 backdrop-blur-sm shadow-sm">
              {t('internationalPatientCare')}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-500">
          <div className="mb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2 transition-colors">
              <Link href={`/hospitals/${slug}`} className="hover:text-primary dark:hover:text-teal-400 transition-colors">
                {name}
              </Link>
            </h3>
            
            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <MapPin className="h-3 w-3 mr-1 text-primary dark:text-teal-500" />
                <span className="truncate">{city}{state ? `, ${state}` : ''}</span>
              </div>
              
              <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <BedDouble className="h-3 w-3 mr-1 text-primary dark:text-teal-500" />
                {t('beds', { count: beds })}
              </div>

              {established && (
                <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  <Building2 className="h-3 w-3 mr-1 text-primary dark:text-teal-500" />
                  {t('estbIn', { year: established })}
                </div>
              )}
              
              {airportDistance && (
                <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  <Plane className="h-3 w-3 mr-1 text-primary dark:text-teal-500" />
                  {t('kmFromAirport', { dist: airportDistance })}
                </div>
              )}
            </div>

            {/* Accreditation Badges - Horizontal */}
            <div className="flex flex-row flex-wrap items-center gap-1.5 mt-3">
              {accreditations.slice(0, 3).map((acc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center w-7 h-7 rounded-full border border-amber-400 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10 text-[7px] font-extrabold text-amber-600 dark:text-amber-500 shadow-sm leading-none"
                  title={acc}
                >
                  {acc.substring(0, 4)}
                </div>
              ))}
            </div>

            {description && (
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-3 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex-1"></div>
          
          {/* Bottom Row: Actions */}
          <div className="flex flex-row items-center justify-start gap-1.5 sm:gap-2 w-full mt-2 pt-2">
            <EnquiryForm>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-md border-primary dark:border-teal-600 text-primary dark:text-teal-400 hover:bg-primary/5 dark:hover:bg-teal-900/30 font-bold text-[9px] sm:text-[11px] px-2 sm:px-4 h-7 sm:h-8 whitespace-nowrap">
                {t('freeQuote')}
              </Button>
            </EnquiryForm>
            <Button asChild className="flex-1 sm:flex-none rounded-md bg-primary hover:bg-primary/90 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-[9px] sm:text-[11px] px-2 sm:px-4 h-7 sm:h-8 whitespace-nowrap border-0">
              <Link href={`/hospitals/${slug}`}>
                {t('viewProfile')}
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
