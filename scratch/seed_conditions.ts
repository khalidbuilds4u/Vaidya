import { prisma } from '../src/lib/prisma';

const conditionsToSeed = [
  // Orthopedics
  { slug: 'osteoarthritis', name: 'Osteoarthritis', description: 'Wear and tear of the joint cartilage over time.', specialtySlug: 'orthopedics' },
  { slug: 'rheumatoid-arthritis', name: 'Rheumatoid Arthritis', description: 'Chronic inflammatory disorder affecting joints.', specialtySlug: 'orthopedics' },
  { slug: 'post-traumatic-arthritis', name: 'Post-traumatic Arthritis', description: 'Arthritis resulting from a previous knee injury.', specialtySlug: 'orthopedics' },
  
  // Cardiology
  { slug: 'coronary-artery-disease', name: 'Coronary Artery Disease', description: 'Narrowing or blockage of the coronary arteries.', specialtySlug: 'cardiology' },
  { slug: 'heart-attack', name: 'Heart Attack', description: 'Sudden blockage of blood flow to a part of the heart.', specialtySlug: 'cardiology' },
  { slug: 'angina', name: 'Angina', description: 'Chest pain caused by reduced blood flow to the heart.', specialtySlug: 'cardiology' },
  
  // Neurology
  { slug: 'brain-tumor', name: 'Brain Tumor', description: 'Abnormal growths of cells in the brain, which can be benign or malignant.', specialtySlug: 'neurology' },
  { slug: 'glioblastoma', name: 'Glioblastoma', description: 'An aggressive type of cancer that can occur in the brain or spinal cord.', specialtySlug: 'neurology' },
  { slug: 'meningioma', name: 'Meningioma', description: 'A tumor that arises from the meninges, the membranes that surround your brain.', specialtySlug: 'neurology' }
];

async function main() {
  for (const condition of conditionsToSeed) {
    const specialty = await prisma.specialty.findUnique({
      where: { slug: condition.specialtySlug }
    });

    if (!specialty) {
      console.warn(`Specialty ${condition.specialtySlug} not found for ${condition.slug}. Skipping...`);
      continue;
    }

    await prisma.condition.upsert({
      where: { slug: condition.slug },
      update: {
        name: condition.name,
        description: condition.description,
        specialtyId: specialty.id
      },
      create: {
        slug: condition.slug,
        name: condition.name,
        description: condition.description,
        specialtyId: specialty.id
      }
    });
    console.log(`Seeded condition: ${condition.slug}`);
  }
  console.log("Finished seeding conditions!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
