"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSpecialty(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  const specialty = await prisma.specialty.create({
    data: {
      name,
      slug,
      description,
      imageUrl,
    },
  });

  revalidatePath("/admin/specialties");
  return { success: true, id: specialty.id };
}

export async function updateSpecialty(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  await prisma.specialty.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      imageUrl,
    },
  });

  revalidatePath(`/admin/specialties/${id}`);
  revalidatePath("/admin/specialties");
  return { success: true };
}
