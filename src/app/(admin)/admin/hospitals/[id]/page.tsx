import { HospitalForm } from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateHospital } from "@/app/actions/hospitals";

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
  
  const updateHospitalWithId = updateHospital.bind(null, hospital.id);

  return <HospitalForm initialData={hospital} specialties={specialties} cities={cities} action={updateHospitalWithId} />;
}
