import { prisma } from "../src/lib/prisma";

async function main() {
  const specialties = await prisma.specialty.findMany({ select: { name: true } });
  console.log("Specialties:", specialties.map(s => s.name));
  const treatments = await prisma.treatment.findMany({ select: { name: true } });
  console.log("Treatments:", treatments.map(t => t.name).slice(0, 10)); // just first 10
}
main().catch(console.error);
