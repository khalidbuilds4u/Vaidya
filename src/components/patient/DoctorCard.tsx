import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BriefcaseMedical, ArrowRight } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { useTranslations } from 'next-intl';

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
  qualifications,
  experience,
  hospital,
  city = "India",
  image,
  biography,
}: DoctorCardProps) {
  const t = useTranslations('Cards');
  
  // Use qualifications as the subtitle, fallback to specialty
  const subtitle = qualifications || specialty;

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 flex flex-col group relative bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-full p-4 sm:p-5 md:p-6">
      
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-6">
        
        {/* Image Section */}
        <Link href={`/doctors/${slug}`} className="w-full sm:w-40 md:w-48 lg:w-56 shrink-0 aspect-square sm:aspect-[4/5] md:aspect-auto sm:h-auto rounded-xl overflow-hidden bg-sky-50 relative block border border-slate-100">
          <img 
            src={(image && image.trim() !== "") ? image : "/images/doctor-fallback.png"} 
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
        </Link>
        
        {/* Right Content Section */}
        <div className="flex flex-col flex-1">
          {/* Title Row */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
              <Link href={`/doctors/${slug}`}>{name}</Link>
            </h3>
          </div>

          {/* Subtitle (Qualifications / Specialty) */}
          <p className="text-slate-800 font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            {subtitle}
          </p>

          {/* Biography */}
          {biography ? (
            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5 line-clamp-4">
              {biography}
            </p>
          ) : (
            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5 line-clamp-4">
              {t('highlyExperienced', { name, specialty: specialty.toLowerCase(), experience })}
            </p>
          )}

          {/* Spacer to push bottom section down */}
          <div className="flex-1"></div>

          {/* Bottom Area: Location, Experience, Actions */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mt-2">
            
            {/* Info Metrics */}
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 sm:gap-y-3">
              <div className="flex items-center text-[13px] sm:text-sm font-medium text-slate-700">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-slate-400" />
                {city}
              </div>
              {experience && (
                <div className="flex items-center text-[13px] sm:text-sm font-medium text-slate-700">
                  <BriefcaseMedical className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-slate-400" />
                  {experience} {t('experience')}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto mt-1 xl:mt-0">
              <EnquiryForm>
                <Button variant="outline" className="flex-1 sm:flex-none rounded-md border-primary text-primary hover:bg-primary/5 font-semibold text-xs sm:text-sm px-4 h-10">
                  {t('bookConsult')}
                </Button>
              </EnquiryForm>
              <Button asChild className="flex-1 sm:flex-none rounded-md bg-[#0f5132] hover:bg-[#0b3b24] text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 h-10">
                <Link href={`/doctors/${slug}`}>
                  {t('viewProfile')} <ArrowRight className="ml-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
