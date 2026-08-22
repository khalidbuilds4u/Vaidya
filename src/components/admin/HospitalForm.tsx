"use client";

import { createHospital, updateHospital, deleteHospital } from "@/app/actions/hospitals";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ArrowLeft, Trash2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Hospital = {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  cityId?: string;
  imageUrl?: string | null;
  beds: number | null;
  icuBeds: number | null;
  otCount: number | null;
  accreditations: string[];
  internationalServices: string[];
  specialties?: { id: string; name: string }[];
};

type Specialty = {
  id: string;
  name: string;
};

type City = {
  id: string;
  name: string;
};

export function HospitalForm({ initialData, allSpecialties, allCities }: { initialData?: Hospital, allSpecialties?: Specialty[], allCities?: City[] }) {
  const isEditing = !!initialData?.id;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function clientAction(formData: FormData) {
    if (isEditing) {
      await updateHospital(initialData.id!, formData);
    } else {
      await createHospital(formData);
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    if (!confirm("Are you sure you want to delete this hospital? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    await deleteHospital(initialData.id);
    // Router redirect is handled by the server action revalidatePath in this case, but we can also do it here:
    router.push("/admin/hospitals");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/hospitals"
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {isEditing ? "Edit Hospital" : "Add New Hospital"}
            </h1>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-sm transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete Hospital"}
          </button>
        )}
      </div>

      <form action={clientAction} className="bg-white/[0.04] border border-white/[0.06] rounded-3xl p-6 sm:p-8 space-y-8">
        
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Hospital Name</label>
              <input
                type="text"
                name="name"
                defaultValue={initialData?.name}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">URL Slug</label>
              <input
                type="text"
                name="slug"
                defaultValue={initialData?.slug}
                required
                placeholder="apollo-hospitals-delhi"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">City Location</label>
              <select
                name="cityId"
                defaultValue={initialData?.cityId || ""}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none"
              >
                <option value="" disabled>Select a city</option>
                {allCities?.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                defaultValue={initialData?.address || ""}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">About / Description</label>
            <textarea
              name="description"
              defaultValue={initialData?.description || ""}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
            />
          </div>
        </div>

        {/* Section 2: Facilities */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">
            Infrastructure & Facilities
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Total Beds</label>
              <input
                type="number"
                name="beds"
                defaultValue={initialData?.beds || ""}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">ICU Beds</label>
              <input
                type="number"
                name="icuBeds"
                defaultValue={initialData?.icuBeds || ""}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">OT Count</label>
              <input
                type="number"
                name="otCount"
                defaultValue={initialData?.otCount || ""}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2.5: Specialties */}
        {allSpecialties && allSpecialties.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">
              Key Clinical Specialties
            </h2>
            <p className="text-xs text-slate-400 mb-3">Select the core specialties this hospital is internationally recognized for.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {allSpecialties.map((specialty) => {
                const isSelected = initialData?.specialties?.some(s => s.id === specialty.id) || false;
                return (
                  <label key={specialty.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      name="specialtyIds" 
                      value={specialty.id} 
                      defaultChecked={isSelected}
                      className="w-4 h-4 rounded text-primary focus:ring-primary/50 bg-slate-900 border-white/20"
                    />
                    <span className="text-sm text-slate-200 font-medium">{specialty.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 3: Tags */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">
            Tags & Accreditations
          </h2>
          
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">Accreditations</label>
            <p className="text-xs text-slate-500 mb-3">Comma-separated (e.g., JCI, NABH, ISO)</p>
            <input
              type="text"
              name="accreditations"
              defaultValue={initialData?.accreditations?.join(", ") || ""}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">International Services</label>
            <p className="text-xs text-slate-500 mb-3">Comma-separated (e.g., Translators, Prayer Room, Visa Assistance)</p>
            <textarea
              name="internationalServices"
              defaultValue={initialData?.internationalServices?.join(", ") || ""}
              rows={2}
              placeholder="Translation, Visa Assistance, Airport Transfer..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300 mb-1">Hospital Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                name="imageUrl"
                defaultValue={initialData?.imageUrl || ""}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <SubmitButton 
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-teal-600 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm h-12"
            loadingText="Saving..."
          >
            {isEditing ? "Save Changes" : "Create Hospital"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
