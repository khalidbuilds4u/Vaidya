import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Plane, Building2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
  
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full group bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row flex-1">
        
        {/* Image Section */}
        <div className="w-full sm:w-[35%] lg:w-[40%] h-48 sm:h-auto relative overflow-hidden shrink-0">
          <Image 
            src={image || "/images/hospital-placeholder.jpg"}
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
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between bg-white overflow-hidden">
          <div className="mb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
              <Link href={`/hospitals/${slug}`} className="hover:text-[#0f5132] transition-colors">
                {name}
              </Link>
            </h3>
            
            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600">
                <MapPin className="h-3 w-3 mr-1 text-[#0f5132]" />
                <span className="truncate">{city}{state ? `, ${state}` : ''}</span>
              </div>
              
              <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600">
                <BedDouble className="h-3 w-3 mr-1 text-[#0f5132]" />
                {t('beds', { count: beds })}
              </div>

              {established && (
                <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600">
                  <Building2 className="h-3 w-3 mr-1 text-[#0f5132]" />
                  {t('estbIn', { year: established })}
                </div>
              )}
              
              {airportDistance && (
                <div className="flex items-center text-[10px] sm:text-[11px] font-medium text-slate-600">
                  <Plane className="h-3 w-3 mr-1 text-[#0f5132]" />
                  {t('kmFromAirport', { dist: airportDistance })}
                </div>
              )}
            </div>

            {/* Accreditation Badges - Horizontal */}
            <div className="flex flex-row flex-wrap items-center gap-1.5 mt-3">
              {accreditations.slice(0, 3).map((acc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center w-7 h-7 rounded-full border border-amber-400 bg-amber-50 text-[7px] font-extrabold text-amber-600 shadow-sm leading-none"
                  title={acc}
                >
                  {acc.substring(0, 4)}
                </div>
              ))}
            </div>

            {description && (
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex-1"></div>
          
          {/* Bottom Row: Actions */}
          <div className="flex flex-row items-center justify-start gap-1.5 sm:gap-2 w-full mt-2 pt-2">
            <EnquiryForm>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-md border-[#0f5132] text-[#0f5132] hover:bg-[#0f5132]/5 font-bold text-[9px] sm:text-[11px] px-2 sm:px-4 h-7 sm:h-8 whitespace-nowrap">
                {t('freeQuote')}
              </Button>
            </EnquiryForm>
            <Button asChild className="flex-1 sm:flex-none rounded-md bg-[#0f5132] hover:bg-[#0b3b24] text-white font-bold text-[9px] sm:text-[11px] px-2 sm:px-4 h-7 sm:h-8 whitespace-nowrap">
              <Link href={`/hospitals/${slug}`}>
                {t('viewProfile')}
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
