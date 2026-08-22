"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCaseStatus(caseId: string, formData: FormData) {
  const newStatus = formData.get("status") as any; // CaseStatus enum

  if (!newStatus) return;

  await prisma.patientCase.update({
    where: { id: caseId },
    data: { status: newStatus },
  });

  revalidatePath("/admin/cases");
}

export async function deleteCase(caseId: string) {
  await prisma.patientCase.delete({
    where: { id: caseId },
  });

  revalidatePath("/admin/cases");
}
