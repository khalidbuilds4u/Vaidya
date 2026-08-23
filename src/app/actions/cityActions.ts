"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCity(formData: FormData) {
  const name = formData.get("name") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  const name_ar = formData.get("name_ar") as string;
  const description_ar = formData.get("description_ar") as string;

  let translations = undefined;
  if (name_ar || description_ar) {
    translations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
      }
    };
  }

  await prisma.city.create({
    data: {
      name,
      slug,
      country,
      state,
      description,
      imageUrl,
      translations: translations ? translations : undefined,
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

  let translations = undefined;
  if (name_ar || description_ar) {
    translations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
      }
    };
  }

  await prisma.city.update({
    where: { id },
    data: {
      name,
      country,
      state,
      description,
      imageUrl,
      translations: translations ? translations : undefined,
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
