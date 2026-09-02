import { prisma } from '../src/lib/prisma';
import { buildTranslations } from '../src/lib/translator';

const TARGET_LANGS = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

async function backfillHospitals() {
  console.log('🏥 Checking Hospitals...');
  const hospitals = await prisma.hospital.findMany();
  let count = 0;

  for (const hospital of hospitals) {
    const translations = hospital.translations as any || {};
    const needsTranslation = TARGET_LANGS.some(lang => !translations[lang] || Object.keys(translations[lang]).length === 0);
    
    if (needsTranslation) {
      console.log(`Translating Hospital: ${hospital.name}`);
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
      }, translations);

      if (newTranslations) {
        await prisma.hospital.update({
          where: { id: hospital.id },
          data: { translations: newTranslations }
        });
        count++;
      }
    }
  }
  console.log(`✅ Translated ${count} Hospitals.`);
}

async function backfillDoctors() {
  console.log('\n👨‍⚕️ Checking Doctors...');
  const doctors = await prisma.doctor.findMany();
  let count = 0;

  for (const doctor of doctors) {
    const translations = doctor.translations as any || {};
    const needsTranslation = TARGET_LANGS.some(lang => !translations[lang] || Object.keys(translations[lang]).length === 0);
    
    if (needsTranslation) {
      console.log(`Translating Doctor: ${doctor.name}`);
      const newTranslations = await buildTranslations({
        name: doctor.name,
        qualifications: doctor.qualifications,
        designation: doctor.designation,
        biography: doctor.biography,
        medicalQualifications: doctor.medicalQualifications as string[],
        professionalExperience: doctor.professionalExperience as string[],
        specialInterests: doctor.specialInterests as string[],
        careerHighlights: doctor.careerHighlights as string[],
        researchFellowships: doctor.researchFellowships as string[],
        awardsRecognitions: doctor.awardsRecognitions as string[],
        allTreatments: doctor.allTreatments as string[],
        areasOfExpertise: doctor.areasOfExpertise as string[],
        fellowshipsAndTraining: doctor.fellowshipsAndTraining as string[],
        researchPublications: doctor.researchPublications as string[],
        professionalMemberships: doctor.professionalMemberships as string[],
        whyChooseThisDoctor: doctor.whyChooseThisDoctor as string[],
      }, translations);

      if (newTranslations) {
        await prisma.doctor.update({
          where: { id: doctor.id },
          data: { translations: newTranslations }
        });
        count++;
      }
    }
  }
  console.log(`✅ Translated ${count} Doctors.`);
}

async function backfillTreatments() {
  console.log('\n⚕️ Checking Treatments...');
  const treatments = await prisma.treatment.findMany();
  let count = 0;

  for (const treatment of treatments) {
    const translations = treatment.translations as any || {};
    const needsTranslation = TARGET_LANGS.some(lang => !translations[lang] || Object.keys(translations[lang]).length === 0);
    
    if (needsTranslation) {
      console.log(`Translating Treatment: ${treatment.name}`);
      const newTranslations = await buildTranslations({
        name: treatment.name,
        description: treatment.description,
        overview: treatment.overview,
        recovery: treatment.recovery,
        risks: treatment.risks,
        causesAndSymptoms: treatment.causesAndSymptoms as string[],
        diagnosis: treatment.diagnosis as string[],
        preOpPrep: treatment.preOpPrep as string[],
        postOpCare: treatment.postOpCare as string[],
        procedureDetails: treatment.procedureDetails as string[],
      }, translations);

      if (newTranslations) {
        await prisma.treatment.update({
          where: { id: treatment.id },
          data: { translations: newTranslations }
        });
        count++;
      }
    }
  }
  console.log(`✅ Translated ${count} Treatments.`);
}

async function main() {
  if (!process.env.DEEPL_API_KEY) {
    console.warn('\n⚠️ WARNING: DEEPL_API_KEY is not set. Using the free Google scraper fallback. This may be slow and get rate-limited for large databases.');
  } else {
    console.log('\n🚀 DEEPL_API_KEY detected. Using high-quality DeepL translation.');
  }

  try {
    await backfillHospitals();
    await backfillDoctors();
    await backfillTreatments();
    console.log('\n🎉 Database Backfill Complete! All existing data is now bilingual.');
  } catch (error) {
    console.error('\n❌ Error during backfill:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
