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
    premiumFacilities?: string[];
    advancedTechnologies?: string[];
    connectivityLocation?: string[];
    excellenceInCare?: string[];
    multiSpecialties?: string[];
    hospitalFacilities?: any;
    specialties?: { id: string; name: string }[];
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
          </div>
        </div>

        {/* Section 3: Lists and Content */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Hospital Content Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicListInput 
              name="premiumFacilities" 
              label="Premium Facilities during Hospital Stay" 
              initialItems={initialData?.premiumFacilities || []} 
              placeholder="e.g. 539+ beds in the hospital" 
            />
            <DynamicListInput 
              name="multiSpecialties" 
              label="Multi Speciality Services" 
              initialItems={initialData?.multiSpecialties || []} 
              placeholder="e.g. Cardiology, Neurology" 
            />
            <DynamicListInput 
              name="advancedTechnologies" 
              label="Advanced Medical Technologies" 
              initialItems={initialData?.advancedTechnologies || []} 
              placeholder="e.g. TrueBeam Linac with Exactrac" 
            />
            <DynamicListInput 
              name="connectivityLocation" 
              label="Connectivity & Location" 
              initialItems={initialData?.connectivityLocation || []} 
              placeholder="e.g. Airport is 13 km away" 
            />
            <DynamicListInput 
              name="excellenceInCare" 
              label="Excellence in patient care" 
              initialItems={initialData?.excellenceInCare || []} 
              placeholder="e.g. Accredited by JCI and NABH" 
            />
          </div>
        </div>

        {/* Section 4: Hospital Facilities Categories */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Hospital Facilities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DynamicListInput 
              name="facilityFood" 
              label="Food" 
              initialItems={initialData?.hospitalFacilities?.["Food"] || []} 
              placeholder="e.g. Diet on Request, Restaurant" 
            />
            <DynamicListInput 
              name="facilityComfort" 
              label="Comfort During Stay" 
              initialItems={initialData?.hospitalFacilities?.["Comfort During Stay"] || []} 
              placeholder="e.g. TV in room, Free wifi" 
            />
            <DynamicListInput 
              name="facilityTransportation" 
              label="Transportation" 
              initialItems={initialData?.hospitalFacilities?.["Transportation"] || []} 
              placeholder="e.g. Airport pickup" 
            />
            <DynamicListInput 
              name="facilityLanguage" 
              label="Language" 
              initialItems={initialData?.hospitalFacilities?.["Language"] || []} 
              placeholder="e.g. Interpretation, Translation" 
            />
            <DynamicListInput 
              name="facilityMoney" 
              label="Money Matters" 
              initialItems={initialData?.hospitalFacilities?.["Money Matters"] || []} 
              placeholder="e.g. Health insurance, ATM" 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
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
      </form>
    </div>
  );
}
