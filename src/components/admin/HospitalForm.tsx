"use client";

import { Building2, Save } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import { DynamicListInput } from "@/components/admin/forms/DynamicListInput";

type HospitalFormProps = {
  initialData?: {
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    imageUrl: string | null;
    cityId: string;
    beds: number | null;
    icuBeds: number | null;
    otCount: number | null;
    accreditations: string[];
    internationalServices: string[];
    established?: number | null;
    airportDistance?: number | null;
    keyHighlights?: string[];
    specialitiesAndCentres?: string[];
    infrastructureAndFacilities?: string[];
    patientCare?: string[];
    whyChooseThisHospital?: string[];
    advancedTechnologies?: string[];
    connectivityLocation?: string[];
    specialties?: { id: string; name: string }[];
    
    
    
    translations?: any;
    isPublished?: boolean;
  };
  cities: { id: string; name: string }[];
  specialties: { id: string; name: string }[];
  action: (formData: FormData) => Promise<void>;
  isNew?: boolean;
};

export function HospitalForm({
  initialData,
  cities,
  specialties,
  action,
  isNew = false,
}: HospitalFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Hospital Profile
            </h2>
            <p className="text-sm text-slate-500">
              Basic information, infrastructure, and facilities.
            </p>
          </div>
        </div>
        {!isNew && initialData?.slug && (
          <div className="mt-4 flex items-center justify-end gap-2">
            {initialData.isPublished === false && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-500/20">Draft</span>
            )}
            <Link href={`/en/hospitals/${initialData.slug}`} target="_blank">
              <button type="button" className="px-4 py-2 text-sm font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all">Preview on Website</button>
            </Link>
          </div>
        )}
      </div>

      <form action={action} className="p-6 sm:p-8 space-y-8">
        {/* Section 1: Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              Hospital Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name || ""}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              placeholder="Enter hospital name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={initialData?.slug || ""}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              placeholder="e.g. max-super-speciality"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              City / Location <span className="text-red-500">*</span>
            </label>
            <select
              name="cityId"
              defaultValue={initialData?.cityId || ""}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
            >
              <option value="" disabled>Select a city...</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              Cover Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={initialData?.imageUrl || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            Description / About Hospital
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            placeholder="Detailed description of the hospital..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            Street Address
          </label>
          <textarea
            name="address"
            rows={2}
            defaultValue={initialData?.address || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            placeholder="Full physical address..."
          />
        </div>

        {/* Section 2: Infrastructure & Logistics */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Infrastructure & Logistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Total Beds</label>
              <input
                type="number"
                name="beds"
                defaultValue={initialData?.beds || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. 500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">ICU Beds</label>
              <input
                type="number"
                name="icuBeds"
                defaultValue={initialData?.icuBeds || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. 150"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">OT Count</label>
              <input
                type="number"
                name="otCount"
                defaultValue={initialData?.otCount || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. 15"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Established Year</label>
              <input
                type="number"
                name="established"
                defaultValue={initialData?.established || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. 2006"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Airport Distance (km)</label>
              <input
                type="number"
                name="airportDistance"
                defaultValue={initialData?.airportDistance || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. 13"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Accreditations (comma-separated)</label>
              <input
                type="text"
                name="accreditations"
                defaultValue={initialData?.accreditations?.join(", ") || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. JCI, NABH, ISO"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">International Services (comma-separated)</label>
              <input
                type="text"
                name="internationalServices"
                defaultValue={initialData?.internationalServices?.join(", ") || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                placeholder="e.g. Airport Transfer, Visa Assistance, Translators"
              />
            </div>
          </div>
        </div>

        {/* Section: Medical Specialties */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Medical Specialties</h3>
          <p className="text-sm text-slate-500 mb-6">Select all the medical specialties offered by this hospital. This is used for frontend filtering.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            {specialties.map((specialty) => {
              const isChecked = initialData?.specialties?.some((s) => s.id === specialty.id);
              return (
                <label key={specialty.id} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      name="specialtyIds"
                      value={specialty.id}
                      defaultChecked={isChecked}
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:border-primary checked:bg-primary transition-colors cursor-pointer"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">
                    {specialty.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 3: Lists and Content */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Hospital Content Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicListInput 
              name="keyHighlights" 
              label="Key Highlights" 
              initialItems={initialData?.keyHighlights || []} 
            />
            
            <DynamicListInput 
              name="specialitiesAndCentres" 
              label="Specialities & Centres of Excellence" 
              initialItems={initialData?.specialitiesAndCentres || []} 
            />
            
            <DynamicListInput 
              name="advancedTechnologies" 
              label="Advanced Medical Technologies" 
              initialItems={initialData?.advancedTechnologies || []} 
            />
            
            <DynamicListInput 
              name="infrastructureAndFacilities" 
              label="Infrastructure & Hospital Facilities" 
              initialItems={initialData?.infrastructureAndFacilities || []} 
            />
            
            <DynamicListInput 
              name="patientCare" 
              label="Patient Care" 
              initialItems={initialData?.patientCare || []} 
            />
            
            <DynamicListInput 
              name="connectivityLocation" 
              label="Location & Connectivity" 
              initialItems={initialData?.connectivityLocation || []} 
            />
            
            <DynamicListInput 
              name="whyChooseThisHospital" 
              label="Why Choose This Hospital" 
              initialItems={initialData?.whyChooseThisHospital || []} 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <label className="text-sm font-semibold text-slate-900">Visibility Status:</label>
            <select name="isPublished" defaultValue={initialData?.isPublished === false ? "false" : "true"} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-primary">
              <option value="true">Published (Public)</option>
              <option value="false">Draft (Hidden)</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/admin/hospitals">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <SubmitButton>
              <Save className="w-4 h-4 mr-2 inline-block" />
              {isNew ? "Create Hospital" : "Save Changes"}
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
