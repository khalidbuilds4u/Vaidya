"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDoctor(formData: FormData) {
  const name = formData.get("name") as string;
  const qualifications = formData.get("qualifications") as string;
  const experienceYears = parseInt(formData.get("experienceYears") as string) || 0;
  const biography = formData.get("biography") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const hospitalId = formData.get("hospitalId") as string;
  const specialtyId = formData.get("specialtyId") as string;
  const cityId = formData.get("cityId") as string || null;

  const parseArray = (key: string) => {
    const val = formData.get(key) as string;
    if (!val) return [];
    try { return JSON.parse(val); } catch { return []; }
  };

  const medicalQualifications = parseArray("medicalQualifications");
  const professionalExperience = parseArray("professionalExperience");
  const specialInterests = parseArray("specialInterests");
  const careerHighlights = parseArray("careerHighlights");
  const researchFellowships = parseArray("researchFellowships");
  const awardsRecognitions = parseArray("awardsRecognitions");
  const allTreatments = parseArray("allTreatments");

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  await prisma.doctor.create({
    data: {
      name,
      slug,
      qualifications,
      experienceYears,
      biography,
      imageUrl,
      hospitalId,
      specialtyId,
      cityId,
      medicalQualifications,
      professionalExperience,
      specialInterests,
      careerHighlights,
      researchFellowships,
      awardsRecognitions,
      allTreatments,
    },
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  redirect("/admin/doctors");
}

export async function updateDoctor(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const qualifications = formData.get("qualifications") as string;
  const experienceYears = parseInt(formData.get("experienceYears") as string) || 0;
  const biography = formData.get("biography") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const hospitalId = formData.get("hospitalId") as string;
  const specialtyId = formData.get("specialtyId") as string;
  const cityId = formData.get("cityId") as string || null;

  const parseArray = (key: string) => {
    const val = formData.get(key) as string;
    if (!val) return [];
    try { return JSON.parse(val); } catch { return []; }
  };

  const medicalQualifications = parseArray("medicalQualifications");
  const professionalExperience = parseArray("professionalExperience");
  const specialInterests = parseArray("specialInterests");
  const careerHighlights = parseArray("careerHighlights");
  const researchFellowships = parseArray("researchFellowships");
  const awardsRecognitions = parseArray("awardsRecognitions");
  const allTreatments = parseArray("allTreatments");

  await prisma.doctor.update({
    where: { id },
    data: {
      name,
      qualifications,
      experienceYears,
      biography,
      imageUrl,
      hospitalId,
      specialtyId,
      cityId,
      medicalQualifications,
      professionalExperience,
      specialInterests,
      careerHighlights,
      researchFellowships,
      awardsRecognitions,
      allTreatments,
    },
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  redirect("/admin/doctors");
}

export async function deleteDoctor(id: string) {
  await prisma.doctor.delete({
    where: { id },
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  redirect("/admin/doctors");
}
