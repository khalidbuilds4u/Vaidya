import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
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
    <div className="glass-card rounded-3xl overflow-hidden border border-white/80 flex flex-col h-full group">
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Image Section with Glass Badge */}
        <div className="w-full md:w-5/12 h-60 md:h-auto bg-slate-100 relative overflow-hidden">
          <Image 
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent md:hidden" />
          
          {hasInternationalSupport && (
            <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full text-[11px] font-bold text-primary bg-white/90 backdrop-blur-md shadow-md border border-white/90">
              International Patient Care
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1.5">
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                <Link href={`/hospitals/${slug}`} className="hover:text-primary transition-colors">
                  {name}
                </Link>
              </h3>
            </div>
            
            <div className="flex items-center text-xs sm:text-sm text-slate-500 font-medium mb-4">
              <MapPin className="h-4 w-4 mr-1.5 text-primary/70 shrink-0" />
              {city}, {state}
            </div>

            <div className="flex flex-wrap items-center gap-3 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 mb-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-primary" />
                <span>{beds} Beds</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-primary" />
                <span>{accreditations.join(', ')}</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5" />
                Key Specialties
              </div>
              <div className="flex flex-wrap gap-1.5">
                {specialties?.slice(0, 3).map((specialty, idx) => (
                  <span 
                    key={`${specialty}-${idx}`} 
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                  >
                    {specialty}
                  </span>
                ))}
                {specialties && specialties.length > 3 && (
                  <span className="text-xs font-medium px-2 py-1 rounded-lg bg-primary/5 text-primary">
                    +{specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 pt-5 border-t border-slate-100/90 mt-5">
            <Button render={<Link href={`/hospitals/${slug}`} />} variant="outline" className="flex-1 rounded-full border-slate-200 hover:bg-slate-50">
              View Profile
            </Button>
            <EnquiryForm>
              <Button className="flex-1 rounded-full shadow-md bg-primary hover:bg-primary/90">
                Get Quote
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </EnquiryForm>
          </div>
        </div>
      </div>
    </div>
  );
}
