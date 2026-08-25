import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Plane, Building2 } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { useTranslations } from 'next-intl';

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
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Image Section */}
        <div className="w-full md:w-[35%] lg:w-[40%] h-48 sm:h-56 md:h-auto relative overflow-hidden shrink-0">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
          {hasInternationalSupport && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-medium text-white bg-black/60 backdrop-blur-sm">
              {t('internationalPatientCare')}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-white">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
              <Link href={`/hospitals/${slug}`} className="hover:text-[#0f5132] transition-colors">
                {name}
              </Link>
            </h3>
            
            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[#0f5132]" />
                {city}{state ? `, ${state}` : `, ${t('india', { fallback: 'India' })}`}
              </div>
              
              <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600">
                <BedDouble className="h-4 w-4 mr-1.5 text-[#0f5132]" />
                {t('beds', { count: beds })}
              </div>

              {established && (
                <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600">
                  <Building2 className="h-4 w-4 mr-1.5 text-[#0f5132]" />
                  {t('estbIn', { year: established })}
                </div>
              )}
              
              {airportDistance && (
                <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600">
                  <Plane className="h-4 w-4 mr-1.5 text-[#0f5132]" />
                  {t('kmFromAirport', { dist: airportDistance })}
                </div>
              )}
            </div>

            {description && (
              <p className="text-[13px] sm:text-sm text-slate-600 line-clamp-3 mt-4 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex-1"></div>
          
          {/* Bottom Row: Accreditations & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
            
            {/* Accreditation Badges - Stacked Vertically */}
            <div className="flex flex-col gap-2">
              {accreditations.slice(0, 3).map((acc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-amber-400 bg-white text-[9px] font-bold text-amber-500 shadow-sm"
                  title={acc}
                >
                  {acc.substring(0, 4)}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <EnquiryForm>
                <Button variant="outline" className="flex-1 sm:flex-none rounded-md border-[#0f5132] text-[#0f5132] hover:bg-[#0f5132]/5 font-semibold text-xs sm:text-sm px-4 sm:px-5 h-9 sm:h-10">
                  {t('freeQuote')}
                </Button>
              </EnquiryForm>
              <Button asChild className="flex-1 sm:flex-none rounded-md bg-[#0f5132] hover:bg-[#0b3b24] text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 h-9 sm:h-10">
                <Link href={`/hospitals/${slug}`}>
                  {t('viewProfile')}
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
