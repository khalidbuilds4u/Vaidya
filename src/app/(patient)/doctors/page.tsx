import { Metadata } from 'next';
import { Search, MapPin, Filter, Star, Award, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MOCK_DOCTORS } from '@/lib/mockData';
import { DoctorCard } from '@/components/patient/DoctorCard';

export const metadata: Metadata = {
  title: 'Top Medical Specialists in India | Vaidya',
  description: 'Find and consult with India\'s top doctors, surgeons, and medical specialists.',
};

export default function DoctorsDirectory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Find Top Doctors in India
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Consult with highly experienced surgeons and medical experts across specialized fields, trusted by thousands of international patients.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-slate-50 p-6 rounded-xl border sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search Doctors</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Name or keyword" className="pl-8 bg-white" />
                </div>
              </div>
              
              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Specialty</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Specialties</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="oncology">Oncology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurology">Neurology</option>
                  <option value="transplant">Organ Transplant</option>
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">City</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Cities</option>
                  <option value="delhi">New Delhi</option>
                  <option value="gurgaon">Gurgaon</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                </select>
              </div>

              {/* Hospital Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Hospital</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Hospitals</option>
                  <option value="apollo">Apollo Hospitals</option>
                  <option value="medanta">Medanta</option>
                  <option value="fortis">Fortis Healthcare</option>
                </select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Doctor List */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">{MOCK_DOCTORS.length} Doctors Found</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="border-0 bg-transparent font-medium cursor-pointer focus:ring-0">
                <option>Recommended</option>
                <option>Most Experience</option>
                <option>Most Reviewed</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {MOCK_DOCTORS.map((doctor) => (
              <DoctorCard 
                key={doctor.slug} 
                slug={doctor.slug}
                name={doctor.name}
                specialty={doctor.specialty}
                qualifications="MBBS, MS" // Mock default
                experience={doctor.experience}
                hospital={doctor.hospital}
                city="India" // Mock default
                image={doctor.image}
                keyExpertise={[doctor.specialty, "Advanced Surgery"]}
              />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="px-8">Load More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
