import { prisma } from '../src/lib/prisma';

async function run() {
  console.log("Fixing Doctor slugs...");
  const doctors = await prisma.doctor.findMany();
  for (const doc of doctors) {
    if (doc.slug.match(/-\d{13}$/)) {
      const newSlug = doc.slug.replace(/-\d{13}$/, '');
      await prisma.doctor.update({ where: { id: doc.id }, data: { slug: newSlug } });
      console.log(`Updated Doctor: ${doc.slug} -> ${newSlug}`);
    }
  }

  console.log("Fixing Hospital slugs...");
  const hospitals = await prisma.hospital.findMany();
  for (const hospital of hospitals) {
    if (hospital.slug.match(/-\d{13}$/)) {
      const newSlug = hospital.slug.replace(/-\d{13}$/, '');
      await prisma.hospital.update({ where: { id: hospital.id }, data: { slug: newSlug } });
      console.log(`Updated Hospital: ${hospital.slug} -> ${newSlug}`);
    }
  }

  console.log("Fixing Treatment slugs...");
  const treatments = await prisma.treatment.findMany();
  for (const treatment of treatments) {
    if (treatment.slug.match(/-\d{13}$/)) {
      const newSlug = treatment.slug.replace(/-\d{13}$/, '');
      await prisma.treatment.update({ where: { id: treatment.id }, data: { slug: newSlug } });
      console.log(`Updated Treatment: ${treatment.slug} -> ${newSlug}`);
    }
  }

  console.log("Fixing Condition slugs...");
  const conditions = await prisma.condition.findMany();
  for (const condition of conditions) {
    if (condition.slug.match(/-\d{13}$/)) {
      const newSlug = condition.slug.replace(/-\d{13}$/, '');
      await prisma.condition.update({ where: { id: condition.id }, data: { slug: newSlug } });
      console.log(`Updated Condition: ${condition.slug} -> ${newSlug}`);
    }
  }
  
  console.log("Fixing City slugs...");
  const cities = await prisma.city.findMany();
  for (const city of cities) {
    if (city.slug.match(/-\d{13}$/)) {
      const newSlug = city.slug.replace(/-\d{13}$/, '');
      await prisma.city.update({ where: { id: city.id }, data: { slug: newSlug } });
      console.log(`Updated City: ${city.slug} -> ${newSlug}`);
    }
  }

  console.log("Fixing PatientStory slugs...");
  const stories = await prisma.patientStory.findMany();
  for (const story of stories) {
    if (story.slug.match(/-\d{13}$/)) {
      const newSlug = story.slug.replace(/-\d{13}$/, '');
      await prisma.patientStory.update({ where: { id: story.id }, data: { slug: newSlug } });
      console.log(`Updated PatientStory: ${story.slug} -> ${newSlug}`);
    }
  }

  console.log("Done fixing all slugs!");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
