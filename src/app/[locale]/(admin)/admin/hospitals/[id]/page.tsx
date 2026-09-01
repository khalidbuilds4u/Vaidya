import { HospitalForm } from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateHospital, deleteHospital } from "@/app/actions/hospitals";
import { Trash2 } from "lucide-react";
import { SubmitButton } from "@/components/admin/SubmitButton";

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
  const deleteHospitalWithId = deleteHospital.bind(null, hospital.id);

  return (
    <div className="space-y-6">
      <HospitalForm initialData={hospital} specialties={specialties} cities={cities} action={updateHospitalWithId} />
      
      <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-red-800 font-bold">Danger Zone</h3>
          <p className="text-red-600/80 text-sm mt-1">
            Permanently delete this hospital from the database.
          </p>
        </div>
        <form action={deleteHospitalWithId}>
          <SubmitButton
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
          >
            <Trash2 className="w-4 h-4 mr-2 inline-block" />
            Delete Hospital
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
