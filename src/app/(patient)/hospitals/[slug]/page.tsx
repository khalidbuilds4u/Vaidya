import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, CalendarDays, Plane, BedDouble, Search, ChevronRight, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/patient/EnquiryForm';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hospital = await prisma.hospital.findUnique({ where: { slug } });
  
  if (!hospital) return { title: 'Hospital Not Found' };
  
  return {
    title: `${hospital.name} | Asad Healthcare`,
    description: hospital.description?.slice(0, 160) || `World-class medical treatments at ${hospital.name}.`,
  };
}

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: {
      city: true,
      specialties: true
    }
  });

  if (!hospital) notFound();

  const heroImage = hospital.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop";

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb and Search */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/hospitals" className="hover:text-primary transition-colors">Hospitals</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">{hospital.name}</span>
        </div>
        
        {/* Simple Search Bar Simulation */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search hospitals, doctors, or specializations..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hospital Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 bg-white h-[300px] sm:h-[400px] md:h-[500px]">
              <img 
                src={heroImage}
                alt={hospital.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {hospital.name}
            </h1>

            {/* About Hospital */}
            <section id="about" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">About Hospital</h2>
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed">
                <p>
                  {hospital.description || `${hospital.name} is a premier healthcare institution located in ${hospital.city.name}. Equipped with state-of-the-art medical technology and staffed by internationally trained specialists, the hospital offers comprehensive medical care across various disciplines.`}
                </p>
              </div>
            </section>

            {/* Premium Facilities */}
            {hospital.premiumFacilities && hospital.premiumFacilities.length > 0 && (
              <section id="premium-facilities" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Premium Facilities during Hospital Stay</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {hospital.premiumFacilities.map((facility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-slate-600 leading-relaxed text-sm">{facility}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Multi Speciality Services */}
            {hospital.specialties && hospital.specialties.length > 0 && (
              <section id="specialities" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Multi Speciality Services</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                  {hospital.specialties.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="text-slate-600 text-sm font-medium">{spec.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Advanced Medical Technologies */}
            {hospital.advancedTechnologies && hospital.advancedTechnologies.length > 0 && (
              <section id="technologies" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Advanced Medical Technologies</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {hospital.advancedTechnologies.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                      <span className="text-slate-600 text-sm">{tech}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Connectivity & Location */}
            {hospital.connectivityLocation && hospital.connectivityLocation.length > 0 && (
              <section id="connectivity" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Connectivity & Location</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {hospital.connectivityLocation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Excellence in Patient Care */}
            {hospital.excellenceInCare && hospital.excellenceInCare.length > 0 && (
              <section id="excellence" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Excellence in patient care</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {hospital.excellenceInCare.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Hospital Facilities Cards */}
            {hospital.hospitalFacilities && typeof hospital.hospitalFacilities === 'object' && Object.keys(hospital.hospitalFacilities).length > 0 && (
              <section id="facilities" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Hospital Facilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(hospital.hospitalFacilities as Record<string, string[]>).map(([category, items], idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col h-full">
                      <div className="bg-teal-500 py-3 px-4 text-center">
                        <h3 className="text-white font-bold text-sm tracking-wide">{category}</h3>
                      </div>
                      <ul className="p-5 space-y-3 flex-1 bg-slate-50/50">
                        {Array.isArray(items) ? items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                            <svg className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                            <span>{item}</span>
                          </li>
                        )) : (
                          <li className="text-sm text-slate-600">{String(items)}</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              
              {/* Hospital Overview Card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-6">
                <h3 className="text-lg font-bold text-primary mb-6">Hospital Overview</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{hospital.city.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{hospital.city.country}</div>
                    </div>
                  </div>
                  {hospital.established && (
                    <div className="flex gap-4">
                      <CalendarDays className="w-5 h-5 text-teal-500 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Established</div>
                        <div className="text-xs text-slate-500 mt-0.5">{hospital.established}</div>
                      </div>
                    </div>
                  )}
                  {hospital.airportDistance && (
                    <div className="flex gap-4">
                      <Plane className="w-5 h-5 text-teal-500 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Airport</div>
                        <div className="text-xs text-slate-500 mt-0.5">{hospital.airportDistance} km</div>
                      </div>
                    </div>
                  )}
                  {hospital.beds && (
                    <div className="flex gap-4">
                      <BedDouble className="w-5 h-5 text-teal-500 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Beds</div>
                        <div className="text-xs text-slate-500 mt-0.5">{hospital.beds}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ask Vaidya Button */}
              <EnquiryForm>
                <Button className="w-full rounded-xl h-14 bg-teal-500 hover:bg-teal-600 text-white font-bold text-base shadow-sm hover:shadow-md transition-all">
                  Ask Vaidya about this Hospital
                </Button>
              </EnquiryForm>

              {/* Address Card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-500 mb-2">Hospital Address</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {hospital.address || `${hospital.name}, ${hospital.city.name}, ${hospital.city.country}`}
                </p>
              </div>

              {/* Table of Contents Card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 hidden md:block">
                <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Table of Contents</h3>
                <nav className="flex flex-col space-y-3">
                  <a href="#about" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">About Hospital</a>
                  {hospital.premiumFacilities && hospital.premiumFacilities.length > 0 && <a href="#premium-facilities" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Premium Facilities during Hospital Stay</a>}
                  {hospital.specialties && hospital.specialties.length > 0 && <a href="#specialities" className="text-sm font-medium text-primary">Multi Speciality Services</a>}
                  {hospital.advancedTechnologies && hospital.advancedTechnologies.length > 0 && <a href="#technologies" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Advanced Medical Technologies</a>}
                  {hospital.connectivityLocation && hospital.connectivityLocation.length > 0 && <a href="#connectivity" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Connectivity & Location</a>}
                  {hospital.excellenceInCare && hospital.excellenceInCare.length > 0 && <a href="#excellence" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Excellence in patient care</a>}
                  {hospital.hospitalFacilities && Object.keys(hospital.hospitalFacilities).length > 0 && <a href="#facilities" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Hospital Facilities</a>}
                </nav>
              </div>

              {/* Share Card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Share Hospital</h3>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-center gap-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full justify-center gap-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Telegram
                  </Button>
                  <Button variant="outline" className="w-full justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
