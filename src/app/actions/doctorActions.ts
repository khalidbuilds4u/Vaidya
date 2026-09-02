"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildTranslations } from "@/lib/translator";

export async function createDoctor(formData: FormData) {
  const name = formData.get("name") as string;
  const qualifications = formData.get("qualifications") as string;
  const designation = formData.get("designation") as string;
  const experienceYears = parseInt(formData.get("experienceYears") as string) || 0;
  const biography = formData.get("biography") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const hospitalId = formData.get("hospitalId") as string;
  const specialtyId = formData.get("specialtyId") as string;
  const cityId = formData.get("cityId") as string || null;
  const isPublished = formData.get("isPublished") === "true";

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
  const areasOfExpertise = parseArray("areasOfExpertise");
  const fellowshipsAndTraining = parseArray("fellowshipsAndTraining");
  const researchPublications = parseArray("researchPublications");
  const professionalMemberships = parseArray("professionalMemberships");
  const whyChooseThisDoctor = parseArray("whyChooseThisDoctor");

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const name_ar = formData.get("name_ar") as string;
  const qualifications_ar = formData.get("qualifications_ar") as string;
  const designation_ar = formData.get("designation_ar") as string;
  const biography_ar = formData.get("biography_ar") as string;

  let manualTranslations = undefined;
  if (name_ar || qualifications_ar || designation_ar || biography_ar) {
    manualTranslations = {
      ar: {
        name: name_ar || undefined,
        qualifications: qualifications_ar || undefined,
        designation: designation_ar || undefined,
        biography: biography_ar || undefined,
      }
    };
  }

  const finalTranslations = await buildTranslations({
    name,
    qualifications,
    designation,
    biography,
    medicalQualifications,
    professionalExperience,
    specialInterests,
    careerHighlights,
    researchFellowships,
    awardsRecognitions,
    allTreatments,
    areasOfExpertise,
    fellowshipsAndTraining,
    researchPublications,
    professionalMemberships,
    whyChooseThisDoctor
  }, manualTranslations);

  await prisma.doctor.create({
    data: {
      name,
      slug,
      qualifications,
      designation,
      experienceYears,
      biography,
      imageUrl,
      hospitalId,
      specialtyId,
      cityId,
      isPublished,
      medicalQualifications,
      professionalExperience,
      specialInterests,
      careerHighlights,
      researchFellowships,
      awardsRecognitions,
      allTreatments,
      areasOfExpertise,
      fellowshipsAndTraining,
      researchPublications,
      professionalMemberships,
      whyChooseThisDoctor,
      translations: finalTranslations ? finalTranslations : undefined,
    },
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  redirect("/admin/doctors");
}

export async function updateDoctor(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const qualifications = formData.get("qualifications") as string;
  const designation = formData.get("designation") as string;
  const experienceYears = parseInt(formData.get("experienceYears") as string) || 0;
  const biography = formData.get("biography") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const hospitalId = formData.get("hospitalId") as string;
  const specialtyId = formData.get("specialtyId") as string;
  const cityId = formData.get("cityId") as string || null;
  const isPublished = formData.get("isPublished") === "true";

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
  const areasOfExpertise = parseArray("areasOfExpertise");
  const fellowshipsAndTraining = parseArray("fellowshipsAndTraining");
  const researchPublications = parseArray("researchPublications");
  const professionalMemberships = parseArray("professionalMemberships");
  const whyChooseThisDoctor = parseArray("whyChooseThisDoctor");

  const name_ar = formData.get("name_ar") as string;
  const qualifications_ar = formData.get("qualifications_ar") as string;
  const designation_ar = formData.get("designation_ar") as string;
  const biography_ar = formData.get("biography_ar") as string;

  let manualTranslations = undefined;
  if (name_ar || qualifications_ar || designation_ar || biography_ar) {
    manualTranslations = {
      ar: {
        name: name_ar || undefined,
        qualifications: qualifications_ar || undefined,
        designation: designation_ar || undefined,
        biography: biography_ar || undefined,
      }
    };
  }

  // Preserve existing translations from DB to avoid overwriting unrelated languages
  const existingDoctor = await prisma.doctor.findUnique({ where: { id }, select: { translations: true } });
  const existingTranslations = (existingDoctor?.translations as any) || {};

  // Merge manual translations over existing ones
  if (manualTranslations?.ar) {
    existingTranslations.ar = { ...existingTranslations.ar, ...manualTranslations.ar };
  }

  const finalTranslations = await buildTranslations({
    name,
    qualifications,
    designation,
    biography,
    medicalQualifications,
    professionalExperience,
    specialInterests,
    careerHighlights,
    researchFellowships,
    awardsRecognitions,
    allTreatments,
    areasOfExpertise,
    fellowshipsAndTraining,
    researchPublications,
    professionalMemberships,
    whyChooseThisDoctor
  }, existingTranslations);

  await prisma.doctor.update({
    where: { id },
    data: {
      name,
      qualifications,
      designation,
      experienceYears,
      biography,
      imageUrl,
      hospitalId,
      specialtyId,
      cityId,
      isPublished,
      medicalQualifications,
      professionalExperience,
      specialInterests,
      careerHighlights,
      researchFellowships,
      awardsRecognitions,
      allTreatments,
      areasOfExpertise,
      fellowshipsAndTraining,
      researchPublications,
      professionalMemberships,
      whyChooseThisDoctor,
      translations: finalTranslations ? finalTranslations : undefined,
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
