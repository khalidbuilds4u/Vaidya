"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildTranslations } from "@/lib/translator";

export async function createCity(formData: FormData) {
  const name = formData.get("name") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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

  const finalTranslations = await buildTranslations({
    name, description
  }, manualTranslations);

  await prisma.city.create({
    data: {
      name,
      slug,
      country,
      state,
      description,
      imageUrl,
      translations: finalTranslations ? finalTranslations : undefined,
    },
  });

  revalidatePath("/admin/cities");
  redirect("/admin/cities");
}

export async function updateCity(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

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

  const existingCity = await prisma.city.findUnique({ where: { id }, select: { translations: true } });
  const existingTranslations = (existingCity?.translations as any) || {};

  if (manualTranslations?.ar) {
    existingTranslations.ar = { ...existingTranslations.ar, ...manualTranslations.ar };
  }

  const finalTranslations = await buildTranslations({
    name, description
  }, existingTranslations);

  await prisma.city.update({
    where: { id },
    data: {
      name,
      country,
      state,
      description,
      imageUrl,
      translations: finalTranslations ? finalTranslations : undefined,
    },
  });

  revalidatePath("/admin/cities");
  redirect("/admin/cities");
}

export async function deleteCity(id: string) {
  await prisma.city.delete({
    where: { id },
  });

  revalidatePath("/admin/cities");
  redirect("/admin/cities");
}
