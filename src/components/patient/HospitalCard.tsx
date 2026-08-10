import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Award, BedDouble, Stethoscope } from 'lucide-react';

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
    <Card className="overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200 hover:border-primary/20 flex flex-col h-full">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-56 md:h-auto bg-slate-100 relative overflow-hidden group">
          <Image 
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:hidden" />
          {hasInternationalSupport && (
            <Badge className="absolute top-4 left-4 bg-primary text-white border-0 shadow-md">
              International Patient Care
            </Badge>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-900">
                <Link href={`/hospitals/${slug}`} className="hover:text-primary transition-colors">
                  {name}
                </Link>
              </h3>
            </div>
            
            <div className="flex items-center text-sm text-slate-500 mb-5">
              <MapPin className="h-4 w-4 mr-1 text-slate-400" />
              {city}, {state}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex items-center text-sm">
                <BedDouble className="h-4 w-4 mr-1 text-primary" />
                <span>{beds} Beds</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="flex items-center text-sm">
                <Award className="h-4 w-4 mr-1 text-primary" />
                <span>{accreditations.join(', ')}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2 flex items-center">
                <Stethoscope className="h-4 w-4 mr-1" />
                Key Specialties
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties?.slice(0, 3).map((specialty, idx) => (
                  <Badge key={`${specialty}-${idx}`} variant="secondary" className="font-normal bg-slate-100">
                    {specialty}
                  </Badge>
                ))}
                {specialties && specialties.length > 3 && (
                  <Badge variant="secondary" className="font-normal bg-slate-100">
                    +{specialties.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-2">
            <Button render={<Link href={`/hospitals/${slug}`} />} variant="outline" className="flex-1">
              View Profile
            </Button>
            <Button className="flex-1">Request Assistance</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
