import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BriefcaseMedical, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
    <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/85 flex flex-col group relative overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        
        {/* Doctor Image with Frosted Frame & Rating */}
        <div className="relative mx-auto sm:mx-0 shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md relative group">
            <Image 
              src={image} 
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 glass-pill px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-white/95 shadow-sm border border-white">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-800">{rating}</span>
          </div>
        </div>
        
        {/* Doctor Details */}
        <div className="flex-1 text-center sm:text-left w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                <Link href={`/doctors/${slug}`}>
                  {name}
                </Link>
              </h3>
              <p className="text-primary font-semibold text-sm">{specialty}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{qualifications}</p>
            </div>
            
            <div className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-100/80 text-xs font-semibold text-slate-600 border border-slate-200/60">
              {experience} Experience
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-100">
              <BriefcaseMedical className="h-3.5 w-3.5 text-primary" />
              <span>{experience}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-100">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{hospital}, {city}</span>
            </div>
          </div>

          {keyExpertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5 justify-center sm:justify-start">
              {keyExpertise.map((exp, idx) => (
                <span 
                  key={`${exp}-${idx}`} 
                  className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-primary/5 text-primary border border-primary/10"
                >
                  {exp}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100/90 mt-2">
            <Button render={<Link href={`/doctors/${slug}`} />} variant="outline" className="flex-1 rounded-full border-slate-200 hover:bg-slate-50">
              View Doctor Profile
            </Button>
            <EnquiryForm>
              <Button className="flex-1 rounded-full shadow-md bg-primary hover:bg-primary/90">
                Book Consultation
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </EnquiryForm>
          </div>
        </div>
      </div>
    </div>
  );
}
