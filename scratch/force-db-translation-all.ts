import { prisma } from '../src/lib/prisma';
import { buildTranslations } from '../src/lib/translator';

async function forceTranslateDoctors() {
  console.log('👨‍⚕️ Force Translating Doctors...');
  const doctors = await prisma.doctor.findMany();
  let count = 0;

  for (const doctor of doctors) {
    console.log(`Translating Doctor: ${doctor.name}`);
    
    const newTranslations = await buildTranslations({
      name: doctor.name,
      designation: doctor.designation,
      qualifications: doctor.qualifications,
      description: doctor.description,
      professionalExperience: doctor.professionalExperience as string[],
      areasOfExpertise: doctor.areasOfExpertise as string[],
      treatmentsAndProcedures: doctor.treatmentsAndProcedures as string[],
      specialInterests: doctor.specialInterests as string[],
      fellowshipsAndTraining: doctor.fellowshipsAndTraining as string[],
      researchPublications: doctor.researchPublications as string[],
      awardsRecognitions: doctor.awardsRecognitions as string[],
      professionalMemberships: doctor.professionalMemberships as string[],
      whyChooseThisDoctor: doctor.whyChooseThisDoctor as string[],
    }, {});

    if (newTranslations) {
      await prisma.doctor.update({
        where: { id: doctor.id },
        data: { translations: newTranslations }
      });
      count++;
    }
  }
  console.log(`✅ Force Translated ${count} Doctors.`);
}

async function forceTranslateTreatments() {
  console.log('💉 Force Translating Treatments...');
  const treatments = await prisma.treatment.findMany();
  let count = 0;

  for (const treatment of treatments) {
    console.log(`Translating Treatment: ${treatment.name}`);
    
    const newTranslations = await buildTranslations({
      name: treatment.name,
      description: treatment.description,
      overview: treatment.overview,
      benefits: treatment.benefits as string[],
      risks: treatment.risks as string[],
      recovery: treatment.recovery,
      whyIndia: treatment.whyIndia,
    }, {});

    if (newTranslations) {
      await prisma.treatment.update({
        where: { id: treatment.id },
        data: { translations: newTranslations }
      });
      count++;
    }
  }
  console.log(`✅ Force Translated ${count} Treatments.`);
}

async function main() {
  try {
    await forceTranslateDoctors();
    await forceTranslateTreatments();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
