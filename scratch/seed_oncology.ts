import { prisma } from '../src/lib/prisma';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test4') });

const oncologyTreatments = [
  {
    name: 'Chemotherapy',
    slug: 'chemotherapy',
    description: 'Systemic treatment using powerful chemicals to kill fast-growing cancer cells in the body.',
    minEstimate: 2000,
    maxEstimate: 5000,
    ar: {
      name: 'العلاج الكيميائي',
      description: 'علاج جهازي يستخدم مواد كيميائية قوية لقتل الخلايا السرطانية سريعة النمو في الجسم.'
    }
  },
  {
    name: 'Radiation Therapy',
    slug: 'radiation-therapy',
    description: 'High doses of radiation to kill cancer cells and shrink tumors.',
    minEstimate: 3000,
    maxEstimate: 7000,
    ar: {
      name: 'العلاج الإشعاعي',
      description: 'جرعات عالية من الإشعاع لقتل الخلايا السرطانية وتقليص الأورام.'
    }
  },
  {
    name: 'Bone Marrow Transplant',
    slug: 'bone-marrow-transplant',
    description: 'A procedure to replace damaged or destroyed bone marrow with healthy bone marrow stem cells.',
    minEstimate: 15000,
    maxEstimate: 25000,
    ar: {
      name: 'زراعة نخاع العظم',
      description: 'إجراء لاستبدال نخاع العظم التالف أو المدمر بخلايا جذعية سليمة لنخاع العظم.'
    }
  },
  {
    name: 'Immunotherapy',
    slug: 'immunotherapy',
    description: 'A type of cancer treatment that helps your immune system fight cancer.',
    minEstimate: 4000,
    maxEstimate: 10000,
    ar: {
      name: 'العلاج المناعي',
      description: 'نوع من علاج السرطان يساعد جهاز المناعة في محاربة السرطان.'
    }
  }
];

async function seedOncologyTreatments() {
  console.log("Seeding Oncology Treatments...");
  
  const oncology = await prisma.specialty.findUnique({
    where: { slug: 'oncology' }
  });

  if (!oncology) {
    console.log("Oncology specialty not found!");
    return;
  }

  for (const treatment of oncologyTreatments) {
    const existing = await prisma.treatment.findUnique({
      where: { slug: treatment.slug }
    });

    if (!existing) {
      await prisma.treatment.create({
        data: {
          name: treatment.name,
          slug: treatment.slug,
          description: treatment.description,
          minEstimate: treatment.minEstimate,
          maxEstimate: treatment.maxEstimate,
          specialtyId: oncology.id,
          translations: {
            ar: {
              name: treatment.ar.name,
              description: treatment.ar.description
            }
          }
        }
      });
      console.log(`Created treatment: ${treatment.name}`);
    } else {
      await prisma.treatment.update({
        where: { id: existing.id },
        data: {
          translations: {
            ...((existing.translations as any) || {}),
            ar: {
              name: treatment.ar.name,
              description: treatment.ar.description
            }
          }
        }
      });
      console.log(`Updated translations for: ${treatment.name}`);
    }
  }
}

seedOncologyTreatments().catch(console.error).finally(() => prisma.$disconnect());
