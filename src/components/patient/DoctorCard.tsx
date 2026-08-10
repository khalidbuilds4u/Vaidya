import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Stethoscope, BriefcaseMedical } from 'lucide-react';
import Image from 'next/image';

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
  rating = 4.8,
  surgeries
}: DoctorCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200 hover:border-primary/20 p-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Doctor Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-4 border-slate-100 mx-auto sm:mx-0 relative group">
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                <Link href={`/doctors/${slug}`} className="hover:text-primary transition-colors">
                  {name}
                </Link>
              </h3>
              <p className="text-primary font-medium mb-1">{specialty}</p>
              <p className="text-sm text-slate-500 mb-4">{qualifications}</p>
            </div>
            <Button render={<Link href={`/doctors/${slug}`} />} variant="outline" className="w-full sm:w-auto shadow-sm hover:bg-slate-50 transition-colors">
              View Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
            <div className="flex items-center justify-center sm:justify-start text-slate-700">
              <BriefcaseMedical className="h-4 w-4 mr-2 text-primary/70" />
              {experience} Experience
            </div>
            <div className="flex items-center justify-center sm:justify-start text-slate-700">
              <MapPin className="h-4 w-4 mr-2 text-primary/70" />
              {hospital}, {city}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {keyExpertise.map((exp, idx) => (
                <Badge key={`${exp}-${idx}`} variant="outline" className="text-xs bg-slate-50">
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-6 mt-2 border-t border-slate-50 sm:border-0 sm:pt-4 sm:mt-auto">
            <Button render={<Link href={`/doctors/${slug}`} />} variant="outline" className="flex-1 sm:flex-none">
              View Profile
            </Button>
            <Button className="flex-1 sm:flex-none px-8">Book Consultation</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
