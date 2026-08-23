import { prisma } from '@/lib/prisma';
export default async function TreatmentsDirectory() {
  const dbTreatments = await prisma.treatment.findMany();
  return <div>Treatments {dbTreatments.length}</div>;
}
