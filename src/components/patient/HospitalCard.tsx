import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Plane, Building2, ArrowRight } from 'lucide-react';
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
        <div className="w-full md:w-[35%] h-48 sm:h-56 md:h-auto relative overflow-hidden shrink-0">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
          {hasInternationalSupport && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm border border-white/20">
              {t('internationalPatientCare')}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
              <Link href={`/hospitals/${slug}`} className="hover:text-primary transition-colors">
                {name}
              </Link>
            </h3>
            
            {description && (
              <p className="text-sm text-slate-600 line-clamp-3 mb-5 leading-relaxed">
                {description}
              </p>
            )}

            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
              <div className="flex items-center text-sm font-medium text-slate-700">
                <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                {city}{state ? `, ${state}` : `, ${t('india', { fallback: 'India' })}`}
              </div>
              
              {established && (
                <div className="flex items-center text-sm font-medium text-slate-700">
                  <Building2 className="h-4 w-4 mr-1.5 text-primary" />
                  {t('estbIn', { year: established })}
                </div>
              )}
              
              {airportDistance && (
                <div className="flex items-center text-sm font-medium text-slate-700">
                  <Plane className="h-4 w-4 mr-1.5 text-primary" />
                  {t('kmFromAirport', { dist: airportDistance })}
                </div>
              )}

              <div className="flex items-center text-sm font-medium text-slate-700">
                <BedDouble className="h-4 w-4 mr-1.5 text-primary" />
                {t('beds', { count: beds })}
              </div>
            </div>
          </div>
          
          {/* Bottom Row: Accreditations & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {accreditations.map((acc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-50 text-[9px] font-bold text-amber-700 shadow-sm"
                  title={acc}
                >
                  {acc.substring(0, 4)}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <EnquiryForm>
                <Button variant="outline" className="flex-1 sm:flex-none rounded-md border-primary text-primary hover:bg-primary/5 font-semibold px-4 h-10">
                  {t('freeQuote')}
                </Button>
              </EnquiryForm>
              <Button asChild className="flex-1 sm:flex-none rounded-md bg-[#0f5132] hover:bg-[#0b3b24] text-white font-semibold px-6 h-10">
                <Link href={`/hospitals/${slug}`}>
                  {t('viewProfile')} <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
