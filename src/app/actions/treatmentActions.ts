"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseTextArray(val: FormDataEntryValue | null): string[] {
  if (!val) return [];
  return val.toString().split('\n').map(s => s.trim()).filter(Boolean);
}

function parseFaqs(val: FormDataEntryValue | null) {
  if (!val) return [];
  const text = val.toString().trim();
  if (!text) return [];
  
  // Try JSON first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {}

  // Fallback to text parsing (Q: ... A: ...)
  const faqs: {question: string, answer: string}[] = [];
  const blocks = text.split('\n\n');
  for (const block of blocks) {
    const qMatch = block.match(/Q:\s*(.+)/);
    const aMatch = block.match(/A:\s*([^]+)/);
    if (qMatch && aMatch) {
      faqs.push({ question: qMatch[1].trim(), answer: aMatch[1].trim() });
    }
  }
  return faqs;
}

function extractTreatmentData(formData: FormData) {
  const name_ar = formData.get("name_ar") as string;
  const description_ar = formData.get("description_ar") as string;
  const overview_ar = formData.get("overview_ar") as string;
  const recovery_ar = formData.get("recovery_ar") as string;
  const risks_ar = formData.get("risks_ar") as string;
  const causesAndSymptoms_ar = parseTextArray(formData.get("causesAndSymptoms_ar"));
  const diagnosis_ar = parseTextArray(formData.get("diagnosis_ar"));
  const preOpPrep_ar = parseTextArray(formData.get("preOpPrep_ar"));
  const postOpCare_ar = parseTextArray(formData.get("postOpCare_ar"));
  const procedureDetails_ar = parseTextArray(formData.get("procedureDetails_ar"));
  const faqs_ar = parseFaqs(formData.get("faqs_ar"));

  let translations = undefined;
  if (name_ar || description_ar || overview_ar || recovery_ar || risks_ar || causesAndSymptoms_ar.length > 0 || diagnosis_ar.length > 0 || preOpPrep_ar.length > 0 || postOpCare_ar.length > 0 || procedureDetails_ar.length > 0 || faqs_ar.length > 0) {
    translations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
        overview: overview_ar || undefined,
        recovery: recovery_ar || undefined,
        risks: risks_ar || undefined,
        causesAndSymptoms: causesAndSymptoms_ar.length > 0 ? causesAndSymptoms_ar : undefined,
        diagnosis: diagnosis_ar.length > 0 ? diagnosis_ar : undefined,
        preOpPrep: preOpPrep_ar.length > 0 ? preOpPrep_ar : undefined,
        postOpCare: postOpCare_ar.length > 0 ? postOpCare_ar : undefined,
        procedureDetails: procedureDetails_ar.length > 0 ? procedureDetails_ar : undefined,
        faqs: faqs_ar.length > 0 ? faqs_ar : undefined,
      }
    };
  }

  return {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    specialtyId: formData.get("specialtyId") as string,
    
    // New rich fields
    overview: (formData.get("overview") as string) || null,
    procedure: (formData.get("procedure") as string) || null,
    recovery: (formData.get("recovery") as string) || null,
    risks: (formData.get("risks") as string) || null,
    minEstimate: formData.get("minEstimate") ? parseFloat(formData.get("minEstimate") as string) : null,
    maxEstimate: formData.get("maxEstimate") ? parseFloat(formData.get("maxEstimate") as string) : null,

    causesAndSymptoms: parseTextArray(formData.get("causesAndSymptoms")),
    diagnosis: parseTextArray(formData.get("diagnosis")),
    preOpPrep: parseTextArray(formData.get("preOpPrep")),
    postOpCare: parseTextArray(formData.get("postOpCare")),
    procedureDetails: parseTextArray(formData.get("procedureDetails")),
    
    faqs: parseFaqs(formData.get("faqs")),
    translations: translations ? translations : undefined,
  };
}

export async function createTreatment(formData: FormData) {
  const data = extractTreatmentData(formData);
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  await prisma.treatment.create({
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/admin/treatments");
  redirect("/admin/treatments");
}

export async function updateTreatment(id: string, formData: FormData) {
  const data = extractTreatmentData(formData);

  await prisma.treatment.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/treatments");
  redirect("/admin/treatments");
}

export async function deleteTreatment(id: string) {
  await prisma.treatment.delete({
    where: { id },
  });

  revalidatePath("/admin/treatments");
  redirect("/admin/treatments");
}
