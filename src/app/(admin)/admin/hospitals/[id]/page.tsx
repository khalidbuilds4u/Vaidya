import { HospitalForm } from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";


export default async function EditHospitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const hospital = await prisma.hospital.findUnique({
    where: { id: resolvedParams.id },
    include: { specialties: true }
  });

  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  const cities = await prisma.city.findMany({
    orderBy: { name: 'asc' }
  });

  if (!hospital) {
    notFound();
  }

  return <HospitalForm initialData={hospital} allSpecialties={specialties} allCities={cities} />;
}
