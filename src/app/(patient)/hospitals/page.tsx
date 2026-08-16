import { Metadata } from 'next';
import { HospitalCard } from '@/components/patient/HospitalCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { MOCK_HOSPITALS } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Top Accredited Hospitals in India | AsadHealthcare',
  description: 'Discover and compare the best JCI and NABH accredited hospitals in India for international patients.',
};



export default function HospitalsDirectory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Discover Top Hospitals in India
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Compare internationally accredited hospitals providing world-class medical facilities and dedicated support for international patients.
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
                <label className="text-sm font-medium mb-2 block">Search Hospitals</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Name or keyword" className="pl-8 bg-white" />
                </div>
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
              
              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Specialty</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Specialties</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="oncology">Oncology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurology">Neurology</option>
                </select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Hospital List */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">{MOCK_HOSPITALS.length} Hospitals Found</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="border-0 bg-transparent font-medium cursor-pointer focus:ring-0">
                <option>Recommended</option>
                <option>Most Reviews</option>
                <option>Most Beds</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {MOCK_HOSPITALS.map((hospital) => (
              <HospitalCard key={hospital.slug} {...hospital} />
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
