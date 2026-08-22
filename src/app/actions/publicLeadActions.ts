"use server";

import { prisma } from "@/lib/prisma";

export async function submitPatientLead(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const country = formData.get("country") as string;
  const condition = formData.get("condition") as string;
  const dobString = formData.get("dob") as string;
  const ageString = formData.get("age") as string;

  const age = ageString ? parseInt(ageString, 10) : undefined;
  const dob = dobString ? new Date(dobString) : undefined;

  if (!firstName || !email || !phone || !condition) {
    throw new Error("Missing required fields");
  }

  // 1. Try to find existing patient by email
  let patient = await prisma.patient.findFirst({
    where: { email },
  });

  // 2. If no patient, create one
  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        firstName,
        lastName: lastName || "",
        email,
        phone,
        country,
        age,
        dob,
      },
    });
  } else {
    // Optionally update phone/country/age/dob if they provided new ones
    patient = await prisma.patient.update({
      where: { id: patient.id },
      data: { 
        phone, 
        country,
        ...(age !== undefined && { age }),
        ...(dob !== undefined && { dob }),
      },
    });
  }

  // 3. Generate a reference ID for the case (e.g. CASE-123456)
  const referenceId = `CASE-${Date.now().toString().slice(-6)}`;

  // 4. Create the patient case
  await prisma.patientCase.create({
    data: {
      referenceId,
      patientId: patient.id,
      medicalCondition: condition,
      status: "NEW",
    },
  });

  return { success: true, referenceId };
}
