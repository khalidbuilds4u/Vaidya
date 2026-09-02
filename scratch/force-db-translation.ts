import { prisma } from '../src/lib/prisma';
import { buildTranslations } from '../src/lib/translator';

const TARGET_LANGS = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

async function forceTranslateHospitals() {
  console.log('🏥 Force Translating Hospitals...');
  const hospitals = await prisma.hospital.findMany();
  let count = 0;

  for (const hospital of hospitals) {
    console.log(`Translating Hospital: ${hospital.name}`);
    
    // Pass empty translations object to force a full re-translation
    const newTranslations = await buildTranslations({
      name: hospital.name,
      description: hospital.description,
      address: hospital.address,
      keyHighlights: hospital.keyHighlights as string[],
      specialitiesAndCentres: hospital.specialitiesAndCentres as string[],
      advancedTechnologies: hospital.advancedTechnologies as string[],
      connectivityLocation: hospital.connectivityLocation as string[],
      infrastructureAndFacilities: hospital.infrastructureAndFacilities as string[],
      patientCare: hospital.patientCare as string[],
      whyChooseThisHospital: hospital.whyChooseThisHospital as string[],
    }, {});

    if (newTranslations) {
      await prisma.hospital.update({
        where: { id: hospital.id },
        data: { translations: newTranslations }
      });
      count++;
    }
  }
  console.log(`✅ Force Translated ${count} Hospitals.`);
}

async function main() {
  try {
    await forceTranslateHospitals();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
