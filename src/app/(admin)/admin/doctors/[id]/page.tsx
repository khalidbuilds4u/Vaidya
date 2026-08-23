import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save, Trash2, UserPlus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DynamicListInput } from "@/components/admin/forms/DynamicListInput";
import { createDoctor, updateDoctor, deleteDoctor } from "@/app/actions/doctorActions";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Doctor Editor | Asad Healthcare",
};

export default async function DoctorEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let doctor = null;
  if (!isNew) {
    doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { treatments: true },
    });
    if (!doctor) notFound();
  }

  const [hospitals, specialties, cities, allTreatments] = await Promise.all([
    prisma.hospital.findMany({ orderBy: { name: "asc" } }),
    prisma.specialty.findMany({ orderBy: { name: "asc" } }),
    prisma.city.findMany({ orderBy: { name: "asc" } }),
    prisma.treatment.findMany({ orderBy: { name: "asc" } }),
  ]);

  const updateDoctorWithId = isNew
    ? createDoctor
    : updateDoctor.bind(null, doctor!.id);
  
  const deleteDoctorWithId = isNew ? async () => {} : deleteDoctor.bind(null, doctor!.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/doctors">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isNew ? "Add New Doctor" : "Edit Doctor"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isNew
              ? "Register a new medical specialist."
              : `Updating details for ${doctor?.name}`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Doctor Profile
              </h2>
              <p className="text-sm text-slate-500">
                Basic information and clinical affiliations.
              </p>
            </div>
          </div>
        </div>

        <form action={updateDoctorWithId} className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={doctor?.name || ""}
                required
                placeholder="Dr. Sarah Johnson"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                defaultValue={doctor?.qualifications || ""}
                placeholder="MBBS, MS, MCh (Cardiology)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Hospital Affiliation <span className="text-red-500">*</span>
              </label>
              <select
                name="hospitalId"
                defaultValue={doctor?.hospitalId || ""}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              >
                <option value="" disabled>Select a hospital...</option>
                {hospitals.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Primary Specialty <span className="text-red-500">*</span>
              </label>
              <select
                name="specialtyId"
                defaultValue={doctor?.specialtyId || ""}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              >
                <option value="" disabled>Select a specialty...</option>
                {specialties.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                City / Location
              </label>
              <select
                name="cityId"
                defaultValue={doctor?.cityId || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              >
                <option value="">Select a city (Optional)...</option>
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experienceYears"
                min="0"
                defaultValue={doctor?.experienceYears || ""}
                placeholder="15"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Profile Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={doctor?.imageUrl || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              Biography / Overview
            </label>
            <textarea
              name="biography"
              rows={4}
              defaultValue={doctor?.biography || ""}
              placeholder="Brief professional summary..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Detailed Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DynamicListInput 
                name="medicalQualifications" 
                label="Medical Qualifications" 
                initialItems={doctor?.medicalQualifications || []} 
                placeholder="e.g. DM (Cardiology), PGIMER" 
              />
              <DynamicListInput 
                name="professionalExperience" 
                label="Professional Experience" 
                initialItems={doctor?.professionalExperience || []} 
                placeholder="e.g. Associate Professor at AFMC" 
              />
              <DynamicListInput 
                name="specialInterests" 
                label="Special Interests" 
                initialItems={doctor?.specialInterests || []} 
                placeholder="e.g. Balloon Atrial Septostomy" 
              />
              <DynamicListInput 
                name="careerHighlights" 
                label="Career Highlights" 
                initialItems={doctor?.careerHighlights || []} 
                placeholder="e.g. Performed 10,000+ interventions" 
              />
              <DynamicListInput 
                name="researchFellowships" 
                label="Research & Fellowships" 
                initialItems={doctor?.researchFellowships || []} 
                placeholder="e.g. Member of Delhi Medical Council" 
              />
              <DynamicListInput 
                name="awardsRecognitions" 
                label="Awards & Recognition" 
                initialItems={doctor?.awardsRecognitions || []} 
                placeholder="e.g. Vishist Seva Medal" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Treatments Performed</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allTreatments.map(t => (
                  <label key={t.id} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="treatmentIds"
                      value={t.id}
                      defaultChecked={doctor?.treatments?.some((dt: any) => dt.id === t.id)}
                      className="mt-1 border-slate-300 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900 leading-tight">
                      {t.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link href="/admin/doctors">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11 px-6 font-semibold"
              >
                Cancel
              </Button>
            </Link>
            <SubmitButton>
              <Save className="w-4 h-4 mr-2 inline-block" />
              {isNew ? "Create Doctor" : "Save Changes"}
            </SubmitButton>
          </div>
        </form>
      </div>

      {!isNew && (
        <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-red-800 font-bold">Danger Zone</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Permanently delete this doctor from the database.
            </p>
          </div>
          <form action={deleteDoctorWithId}>
            <SubmitButton
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
            >
              <Trash2 className="w-4 h-4 mr-2 inline-block" />
              Delete Doctor
            </SubmitButton>
          </form>
        </div>
      )}
    </div>
  );
}
