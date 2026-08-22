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
