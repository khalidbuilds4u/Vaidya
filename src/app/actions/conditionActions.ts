"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildTranslations } from "@/lib/translator";

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

async function extractConditionData(formData: FormData, existingId?: string) {
  const name_ar = formData.get("name_ar") as string;
  const description_ar = formData.get("description_ar") as string;

  let manualTranslations = undefined;
  if (name_ar || description_ar) {
    manualTranslations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
      }
    };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const causesAndSymptoms = parseTextArray(formData.get("causesAndSymptoms"));
  const diagnosis = parseTextArray(formData.get("diagnosis"));
  const treatmentOptions = parseTextArray(formData.get("treatmentOptions"));

  const existingCondition = existingId ? await prisma.condition.findUnique({ where: { id: existingId }, select: { translations: true } }) : null;
  const existingTranslations = (existingCondition?.translations as any) || {};

  if (manualTranslations?.ar) {
    existingTranslations.ar = { ...existingTranslations.ar, ...manualTranslations.ar };
  }

  const finalTranslations = await buildTranslations({
    name, description, causesAndSymptoms, diagnosis, treatmentOptions
  }, existingTranslations);

  return {
    name,
    description,
    specialtyId: formData.get("specialtyId") as string,
    
    causesAndSymptoms,
    diagnosis,
    treatmentOptions,
    faqs: parseFaqs(formData.get("faqs")),
    translations: finalTranslations ? finalTranslations : undefined,
  };
}

export async function createCondition(formData: FormData) {
  const data = await extractConditionData(formData);
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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
  const data = await extractConditionData(formData, id);

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
