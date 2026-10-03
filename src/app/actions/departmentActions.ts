"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { buildTranslations } from "@/lib/translator";

function parseFaqs(text: any) {
  if (!text || typeof text !== 'string') return [];
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

export async function createSpecialty(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const statSuccessRate = formData.get("statSuccessRate") as string || null;
  const statPatients = formData.get("statPatients") as string || null;
  const statHospitals = formData.get("statHospitals") as string || null;
  const statCostSavings = formData.get("statCostSavings") as string || null;

  const whatIs = formData.get("whatIs") as string || null;
  const advancedTechniques = formData.get("advancedTechniques") as string || null;
  const treatmentCost = formData.get("treatmentCost") as string || null;
  const whyChooseIndia = formData.get("whyChooseIndia") as string || null;
  const faqs = parseFaqs(formData.get("faqs"));

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  const translations = await buildTranslations({
    name, description, whatIs, advancedTechniques, treatmentCost, whyChooseIndia,
    faqs: faqs.length > 0 ? JSON.stringify(faqs) : ""
  }, undefined);

  const specialty = await prisma.specialty.create({
    data: {
      name,
      slug,
      description,
      imageUrl,
      statSuccessRate,
      statPatients,
      statHospitals,
      statCostSavings,
      whatIs,
      advancedTechniques,
      treatmentCost,
      whyChooseIndia,
      faqs,
      translations
    },
  });

  revalidatePath("/admin/departments");
  return { success: true, id: specialty.id };
}

export async function updateSpecialty(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const statSuccessRate = formData.get("statSuccessRate") as string || null;
  const statPatients = formData.get("statPatients") as string || null;
  const statHospitals = formData.get("statHospitals") as string || null;
  const statCostSavings = formData.get("statCostSavings") as string || null;

  const whatIs = formData.get("whatIs") as string || null;
  const advancedTechniques = formData.get("advancedTechniques") as string || null;
  const treatmentCost = formData.get("treatmentCost") as string || null;
  const whyChooseIndia = formData.get("whyChooseIndia") as string || null;
  const faqs = parseFaqs(formData.get("faqs"));

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  const existingSpecialty = await prisma.specialty.findUnique({ where: { id } });
  
  const translations = await buildTranslations({
    name, description, whatIs, advancedTechniques, treatmentCost, whyChooseIndia,
    faqs: faqs.length > 0 ? JSON.stringify(faqs) : ""
  }, existingSpecialty?.translations || undefined);

  await prisma.specialty.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      imageUrl,
      statSuccessRate,
      statPatients,
      statHospitals,
      statCostSavings,
      whatIs,
      advancedTechniques,
      treatmentCost,
      whyChooseIndia,
      faqs,
      translations
    },
  });

  revalidatePath(`/admin/departments/${id}`);
  revalidatePath("/admin/departments");
  return { success: true };
}

export async function deleteSpecialty(id: string) {
  try {
    await prisma.specialty.delete({
      where: { id },
    });
    revalidatePath("/admin/departments");
    return { success: true };
  } catch (error) {
    console.error("Error deleting specialty:", error);
    return { success: false, error: "Failed to delete specialty" };
  }
}
