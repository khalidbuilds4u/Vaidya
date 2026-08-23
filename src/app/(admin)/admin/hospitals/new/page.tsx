import { HospitalForm } from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";
import { createHospital } from "@/app/actions/hospitals";

export const dynamic = "force-dynamic";

export default async function NewHospitalPage() {
  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  const cities = await prisma.city.findMany({
    orderBy: { name: 'asc' }
  });

  return <HospitalForm specialties={specialties} cities={cities} action={createHospital} isNew={true} />;
}
