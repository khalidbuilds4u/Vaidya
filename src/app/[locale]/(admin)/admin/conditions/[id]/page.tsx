import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save, Trash2, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createCondition, updateCondition, deleteCondition } from "@/app/actions/conditionActions";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Condition Editor | Asad Healthcare",
};

export default async function ConditionEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let condition = null;
  if (!isNew) {
    condition = await prisma.condition.findUnique({
      where: { id },
    });
    if (!condition) notFound();
  }

  // Fetch relations for dropdowns
  const specialties = await prisma.specialty.findMany({ orderBy: { name: "asc" } });

  const updateConditionWithId = isNew
    ? createCondition
    : updateCondition.bind(null, condition!.id);
  
  const deleteConditionWithId = isNew ? async () => {} : deleteCondition.bind(null, condition!.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/conditions">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isNew ? "Add New Condition" : "Edit Condition"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isNew
              ? "Add a medical condition that your specialties treat."
              : `Updating details for ${condition?.name}`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Condition Details
              </h2>
              <p className="text-sm text-slate-500">
                Basic details to show on the specialty pages.
              </p>
            </div>
          </div>
        </div>

        <form action={updateConditionWithId} className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Condition Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={condition?.name || ""}
                required
                placeholder="e.g. Breast Cancer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Specialty Category <span className="text-red-500">*</span>
              </label>
              <select
                name="specialtyId"
                defaultValue={condition?.specialtyId || ""}
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
              Short Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={condition?.description || ""}
              placeholder="e.g. Cancer that forms in the cells of the breasts."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            />
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Detailed Medical Information
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Add comprehensive details to show on the condition's public page. Enter each point on a new line to create bulleted lists.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Causes & Symptoms
              </label>
              <textarea
                name="causesAndSymptoms"
                rows={4}
                defaultValue={condition?.causesAndSymptoms?.join('\n') || ""}
                placeholder="List causes and symptoms, one per line..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Diagnosis Methods
              </label>
              <textarea
                name="diagnosis"
                rows={4}
                defaultValue={condition?.diagnosis?.join('\n') || ""}
                placeholder="List diagnostic procedures, one per line..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Treatment Options
              </label>
              <textarea
                name="treatmentOptions"
                rows={4}
                defaultValue={condition?.treatmentOptions?.join('\n') || ""}
                placeholder="List available treatment options, one per line..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Frequently Asked Questions
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Format each FAQ exactly like this:<br/>
                <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">Q: What is this condition?<br/>A: It is a medical condition.</code><br/>
                Leave a blank line between different FAQs.
              </p>
              <textarea
                name="faqs"
                rows={6}
                defaultValue={
                  condition?.faqs
                    ? (condition.faqs as any[]).map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
                    : ""
                }
                placeholder="Q: What are the first signs?&#10;A: The first signs include..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>
          </div>



          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link href="/admin/conditions">
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
              {isNew ? "Create Condition" : "Save Changes"}
            </SubmitButton>
          </div>
        </form>
      </div>

      {!isNew && (
        <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 flex items-center justify-between mt-6">
          <div>
            <h3 className="text-red-800 font-bold">Danger Zone</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Permanently delete this condition. It will be removed from the specialty page.
            </p>
          </div>
          <form action={deleteConditionWithId}>
            <SubmitButton
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
            >
              <Trash2 className="w-4 h-4 mr-2 inline-block" />
              Delete Condition
            </SubmitButton>
          </form>
        </div>
      )}
    </div>
  );
}
