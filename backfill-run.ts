import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import { buildTranslations } from './src/lib/translator';

async function main() {
  console.log("Translating Specialties...");
  const specialties = await prisma.specialty.findMany();
  for (const s of specialties) {
    console.log("Specialty:", s.name);
    const trans = await buildTranslations({ name: s.name, description: s.description || '' }, s.translations);
    await prisma.specialty.update({ where: { id: s.id }, data: { translations: trans } });
  }

  console.log("Translating Doctors (names and qualifications)...");
  const doctors = await prisma.doctor.findMany();
  for (const d of doctors) {
    console.log("Doctor:", d.name);
    const trans = await buildTranslations({ 
      name: d.name, 
      qualifications: d.qualifications,
    }, d.translations);
    await prisma.doctor.update({ where: { id: d.id }, data: { translations: trans } });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
