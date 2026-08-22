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
  
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {}

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

function extractConditionData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    specialtyId: formData.get("specialtyId") as string,
    
    causesAndSymptoms: parseTextArray(formData.get("causesAndSymptoms")),
    diagnosis: parseTextArray(formData.get("diagnosis")),
    treatmentOptions: parseTextArray(formData.get("treatmentOptions")),
    faqs: parseFaqs(formData.get("faqs")),
  };
}

export async function createCondition(formData: FormData) {
  const data = extractConditionData(formData);
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  await prisma.condition.create({
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/admin/conditions");
  redirect("/admin/conditions");
}

export async function updateCondition(id: string, formData: FormData) {
  const data = extractConditionData(formData);

  await prisma.condition.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/conditions");
  redirect("/admin/conditions");
}

export async function deleteCondition(id: string) {
  await prisma.condition.delete({
    where: { id },
  });

  revalidatePath("/admin/conditions");
  redirect("/admin/conditions");
}
