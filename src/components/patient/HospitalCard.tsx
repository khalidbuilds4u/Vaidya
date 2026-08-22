import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Award, BedDouble, Stethoscope, ArrowRight } from 'lucide-react';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export interface HospitalCardProps {
  slug: string;
  name: string;
  city: string;
  state?: string;
  image: string;
  accreditations: string[];
  beds: number;
  specialties: string[];
  hasInternationalSupport?: boolean;
}

export function HospitalCard({
  slug,
  name,
  city,
  state = "India",
  image,
  accreditations,
  beds,
  specialties = [],
  hasInternationalSupport = true
}: HospitalCardProps) {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/80 flex flex-col h-full group bg-white/95 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Image Section with Glass Badge */}
        <div className="w-full md:w-5/12 h-48 sm:h-60 md:h-auto bg-slate-100 relative overflow-hidden shrink-0">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent md:hidden" />
          
          {hasInternationalSupport && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 glass-pill px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold text-primary bg-white/95 backdrop-blur-md shadow-sm border border-white/90">
              International Patient Care
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                <Link href={`/hospitals/${slug}`} className="hover:text-primary transition-colors">
                  {name}
                </Link>
              </h3>
            </div>
            
            <div className="flex items-center text-xs sm:text-sm text-slate-500 font-medium mb-3 sm:mb-4">
              <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70 shrink-0" />
              {city}, {state}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 px-2.5 sm:px-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-3 sm:mb-4 text-[11px] sm:text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{beds} Beds</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 truncate">
                <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{accreditations.join(', ')}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Stethoscope className="h-3 w-3" />
                Key Specialties
              </div>
              <div className="flex flex-wrap gap-1">
                {specialties?.slice(0, 3).map((specialty, idx) => (
                  <span 
                    key={`${specialty}-${idx}`} 
                    className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                  >
                    {specialty}
                  </span>
                ))}
                {specialties && specialties.length > 3 && (
                  <span className="text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-md bg-primary/5 text-primary">
                    +{specialties.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Side-by-Side Responsive Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3.5 sm:pt-4 border-t border-slate-100 mt-4">
            <Button 
              render={<Link href={`/hospitals/${slug}`} />} 
              variant="outline" 
              className="w-full rounded-xl border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold h-10 text-xs sm:text-sm px-2 truncate"
            >
              View Profile
            </Button>
            <EnquiryForm>
              <Button className="w-full rounded-xl shadow-xs bg-gradient-to-r from-primary to-teal-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold h-10 text-xs sm:text-sm px-2 flex items-center justify-center gap-1">
                <span>Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Button>
            </EnquiryForm>
          </div>

        </div>
      </div>
    </div>
  );
}
