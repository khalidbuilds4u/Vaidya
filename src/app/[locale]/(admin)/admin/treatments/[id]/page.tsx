import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save, Trash2, Syringe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createTreatment, updateTreatment, deleteTreatment } from "@/app/actions/treatmentActions";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Procedure Editor | Asad Healthcare",
};

export default async function TreatmentEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let treatment = null;
  if (!isNew) {
    treatment = await prisma.treatment.findUnique({
      where: { id },
    });
    if (!treatment) notFound();
  }

  // Fetch relations for dropdowns
  const specialties = await prisma.specialty.findMany({ orderBy: { name: "asc" } });

  const updateTreatmentWithId = isNew
    ? createTreatment
    : updateTreatment.bind(null, treatment!.id);
  
  const deleteTreatmentWithId = isNew ? async () => {} : deleteTreatment.bind(null, treatment!.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/treatments">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isNew ? "Add New Procedure" : "Edit Procedure"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isNew
              ? "Add a new medical procedure to your offerings."
              : `Updating details for ${treatment?.name}`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Procedure Details
              </h2>
              <p className="text-sm text-slate-500">
                Configure procedure details and categorization.
              </p>
            </div>
          </div>
        </div>

        <form action={updateTreatmentWithId} className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Procedure Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={treatment?.name || ""}
                required
                placeholder="e.g. Knee Replacement"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Specialty Category <span className="text-red-500">*</span>
              </label>
              <select
                name="specialtyId"
                defaultValue={treatment?.specialtyId || ""}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              >
                <option value="" disabled>Select a specialty...</option>
                {specialties.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={treatment?.description || ""}
              placeholder="Explain what this procedure involves..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Minimum Estimate ($)
              </label>
              <input
                type="number"
                name="minEstimate"
                defaultValue={treatment?.minEstimate || ""}
                placeholder="e.g. 4500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Maximum Estimate ($)
              </label>
              <input
                type="number"
                name="maxEstimate"
                defaultValue={treatment?.maxEstimate || ""}
                placeholder="e.g. 6500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Recovery Time
              </label>
              <input
                type="text"
                name="recovery"
                defaultValue={treatment?.recovery || ""}
                placeholder="e.g. 2-3 Weeks"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Detailed Medical Information</h3>
            <p className="text-sm text-slate-500 mb-4">
              Type each point on a new line. They will be formatted as lists automatically.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Causes & Symptoms
                </label>
                <textarea
                  name="causesAndSymptoms"
                  rows={4}
                  defaultValue={treatment?.causesAndSymptoms?.join('\n') || ""}
                  placeholder="Severe joint pain&#10;Chronic knee inflammation"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Diagnosis & Tests
                </label>
                <textarea
                  name="diagnosis"
                  rows={4}
                  defaultValue={treatment?.diagnosis?.join('\n') || ""}
                  placeholder="X-Rays&#10;MRI Scans&#10;Blood tests"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Pre-Op Preparation
                </label>
                <textarea
                  name="preOpPrep"
                  rows={4}
                  defaultValue={treatment?.preOpPrep?.join('\n') || ""}
                  placeholder="Complete physical examination&#10;Adjusting current medications"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Post-Op Care
                </label>
                <textarea
                  name="postOpCare"
                  rows={4}
                  defaultValue={treatment?.postOpCare?.join('\n') || ""}
                  placeholder="Physical therapy&#10;Strict wound care"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Procedure Details (Step-by-step)
                </label>
                <textarea
                  name="procedureDetails"
                  rows={4}
                  defaultValue={treatment?.procedureDetails?.join('\n') || ""}
                  placeholder="Anesthesia is administered.&#10;The surgeon removes damaged cartilage..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  Potential Risks
                </label>
                <textarea
                  name="risks"
                  rows={4}
                  defaultValue={treatment?.risks || ""}
                  placeholder="Infection, blood clots, nerve damage"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                FAQs (Q & A format)
              </label>
              <textarea
                name="faqs"
                rows={6}
                defaultValue={treatment?.faqs ? (treatment.faqs as any[]).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') : ""}
                placeholder="Q: Is the surgery painful?&#10;A: You will receive anesthesia during the surgery...&#10;&#10;Q: When can I return to work?&#10;A: Usually after 3-4 weeks."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y font-mono"
              />
            </div>
          </div>

          {/* Arabic Translations */}
          <div className="pt-6 border-t border-slate-100">
                        <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Arabic Translations (الترجمة العربية)
              </h3>
              <p className="text-sm text-amber-600 mt-1 font-medium bg-amber-50 p-2 rounded border border-amber-100">
                ✨ <strong>Optional:</strong> Leave these fields completely blank to automatically translate them from English using AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">
                  Procedure Name (Arabic)
                </label>
                <input
                  type="text"
                  name="name_ar"
                  defaultValue={(treatment?.translations as any)?.ar?.name || ""}
                  dir="rtl"
                  placeholder="اسم العملية..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>
            <div className="space-y-2 mt-6">
              <label className="text-sm font-semibold text-slate-900">
                Description (Arabic)
              </label>
              <textarea
                name="description_ar"
                rows={4}
                defaultValue={(treatment?.translations as any)?.ar?.description || ""}
                dir="rtl"
                placeholder="وصف العملية..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">
                  Recovery Time (Arabic)
                </label>
                <input
                  type="text"
                  name="recovery_ar"
                  defaultValue={(treatment?.translations as any)?.ar?.recovery || ""}
                  dir="rtl"
                  placeholder="وقت التعافي..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Causes & Symptoms (Arabic)</label>
                <textarea
                  name="causesAndSymptoms_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.causesAndSymptoms?.join('\n') || ""}
                  dir="rtl"
                  placeholder="الأسباب والأعراض..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Diagnosis & Tests (Arabic)</label>
                <textarea
                  name="diagnosis_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.diagnosis?.join('\n') || ""}
                  dir="rtl"
                  placeholder="التشخيص والفحوصات..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Pre-Op Preparation (Arabic)</label>
                <textarea
                  name="preOpPrep_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.preOpPrep?.join('\n') || ""}
                  dir="rtl"
                  placeholder="التحضير قبل العملية..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Post-Op Care (Arabic)</label>
                <textarea
                  name="postOpCare_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.postOpCare?.join('\n') || ""}
                  dir="rtl"
                  placeholder="الرعاية بعد العملية..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Procedure Details (Arabic)</label>
                <textarea
                  name="procedureDetails_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.procedureDetails?.join('\n') || ""}
                  dir="rtl"
                  placeholder="تفاصيل العملية..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Potential Risks (Arabic)</label>
                <textarea
                  name="risks_ar"
                  rows={4}
                  defaultValue={(treatment?.translations as any)?.ar?.risks || ""}
                  dir="rtl"
                  placeholder="المخاطر المحتملة..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <label className="text-sm font-semibold text-slate-900">FAQs (Arabic) (Q & A format)</label>
              <textarea
                name="faqs_ar"
                rows={6}
                defaultValue={(treatment?.translations as any)?.ar?.faqs ? ((treatment?.translations as any).ar.faqs as any[]).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') : ""}
                dir="rtl"
                placeholder="س: هل العملية مؤلمة؟&#10;ج: ستتلقى تخديراً...&#10;&#10;س: متى يمكنني العودة للعمل؟&#10;ج: عادة بعد 3-4 أسابيع."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y font-mono"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link href="/admin/treatments">
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
              {isNew ? "Create Procedure" : "Save Changes"}
            </SubmitButton>
          </div>
        </form>
      </div>

      {!isNew && (
        <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 flex items-center justify-between mt-6">
          <div>
            <h3 className="text-red-800 font-bold">Danger Zone</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Permanently delete this procedure. Patient cases linked to it will lose their procedure reference.
            </p>
          </div>
          <form action={deleteTreatmentWithId}>
            <SubmitButton
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
            >
              <Trash2 className="w-4 h-4 mr-2 inline-block" />
              Delete Procedure
            </SubmitButton>
          </form>
        </div>
      )}
    </div>
  );
}
