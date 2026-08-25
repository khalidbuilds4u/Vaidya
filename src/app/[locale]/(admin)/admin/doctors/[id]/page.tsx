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

  const [hospitals, specialties, cities] = await Promise.all([
    prisma.hospital.findMany({ orderBy: { name: "asc" } }),
    prisma.specialty.findMany({ orderBy: { name: "asc" } }),
    prisma.city.findMany({ orderBy: { name: "asc" } }),
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
        {!isNew && doctor && (
          <div className="ml-auto flex items-center gap-2">
            {!doctor.isPublished && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-500/20">Draft</span>
            )}
            <Link href={`/en/doctors/${doctor.slug}`} target="_blank">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Preview on Website</Button>
            </Link>
          </div>
        )}
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
                Designation / Role
              </label>
              <input
                type="text"
                name="designation"
                defaultValue={doctor?.designation || ""}
                placeholder="e.g. Cardiologist, Senior Surgeon"
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
                label="Education and Training" 
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
                name="areasOfExpertise" 
                label="Areas of Expertise" 
                initialItems={doctor?.areasOfExpertise || []} 
                placeholder="e.g. Complex Angioplasty" 
              />
              <DynamicListInput 
                name="specialInterests" 
                label="Advanced Techniques and Special Interests" 
                initialItems={doctor?.specialInterests || []} 
                placeholder="e.g. Balloon Atrial Septostomy" 
              />
              <DynamicListInput 
                name="fellowshipsAndTraining" 
                label="Fellowships and Professional Training" 
                initialItems={doctor?.fellowshipsAndTraining || []} 
                placeholder="e.g. Fellowship in Interventional Cardiology, USA" 
              />
              <DynamicListInput 
                name="researchPublications" 
                label="Research and Publications" 
                initialItems={doctor?.researchPublications || []} 
                placeholder="e.g. Published 50+ papers in leading journals" 
              />
              <DynamicListInput 
                name="awardsRecognitions" 
                label="Awards and Professional Recognition" 
                initialItems={doctor?.awardsRecognitions || []} 
                placeholder="e.g. Vishist Seva Medal" 
              />
              <DynamicListInput 
                name="professionalMemberships" 
                label="Professional Memberships" 
                initialItems={doctor?.professionalMemberships || []} 
                placeholder="e.g. Member of Delhi Medical Council" 
              />
              <div className="md:col-span-2">
                <DynamicListInput 
                  name="whyChooseThisDoctor" 
                  label="Why Choose This Doctor?" 
                  initialItems={doctor?.whyChooseThisDoctor || []} 
                  placeholder="e.g. Over 25 years of specialized experience in neurosurgery." 
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Treatments Performed</h3>
            <div className="max-w-md">
              <DynamicListInput 
                name="allTreatments" 
                label="All Treatments" 
                initialItems={doctor?.allTreatments || []} 
                placeholder="e.g. Brain Tumor Surgery" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Manual Arabic Translations</h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">Optional</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">If the auto-translation fails for long text (like Biography), or you want to override defaults, enter the Arabic text here.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">Name (Arabic)</label>
                <input type="text" name="name_ar" defaultValue={(doctor?.translations as any)?.ar?.name || ""} placeholder="دكتور سارة جونسون" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white text-right" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">Qualifications (Arabic)</label>
                <input type="text" name="qualifications_ar" defaultValue={(doctor?.translations as any)?.ar?.qualifications || ""} placeholder="بكالوريوس الطب والجراحة..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white text-right" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">Designation (Arabic)</label>
                <input type="text" name="designation_ar" defaultValue={(doctor?.translations as any)?.ar?.designation || ""} placeholder="استشاري أول..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white text-right" dir="rtl" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">Biography (Arabic)</label>
              <textarea name="biography_ar" rows={5} defaultValue={(doctor?.translations as any)?.ar?.biography || ""} placeholder="نبذة شخصية..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y text-right" dir="rtl" />
            </div>
          </div>




          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="text-sm font-semibold text-slate-900">Visibility Status:</label>
              <select name="isPublished" defaultValue={doctor?.isPublished === false ? "false" : "true"} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-primary">
                <option value="true">Published (Public)</option>
                <option value="false">Draft (Hidden)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
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
                {isNew ? "Save Doctor" : "Save Changes"}
              </SubmitButton>
            </div>
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
