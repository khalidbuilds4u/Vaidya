import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local because that's where DATABASE_URL is
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const MOCK_TREATMENTS = [
  {
    slug: 'knee-replacement',
    name: 'Knee Replacement Surgery',
    specialty: 'Orthopedics',
    minEstimate: 4500,
    maxEstimate: 6500,
    recoveryTime: '2-3 Weeks',
    description: 'A minimally invasive surgical procedure to replace damaged cartilage and bone with high-durability prosthetic implants.',
  },
  {
    slug: 'coronary-artery-bypass',
    name: 'Coronary Artery Bypass Grafting (CABG)',
    specialty: 'Cardiology',
    minEstimate: 5500,
    maxEstimate: 8000,
    recoveryTime: '4-6 Weeks',
    description: 'Advanced beating-heart and robotic surgical bypass improving coronary blood flow with high long-term success rates.',
  },
  {
    slug: 'brain-tumor-surgery',
    name: 'Brain Tumor Surgery & Radiosurgery',
    specialty: 'Neurology',
    minEstimate: 6000,
    maxEstimate: 9500,
    recoveryTime: '4-8 Weeks',
    description: 'Cutting-edge intraoperative MRI and CyberKnife robotic radiosurgery to precisely excise abnormal cranial lesions.',
  }
];

async function main() {
  console.log('Starting seed...');

  for (const t of MOCK_TREATMENTS) {
    // 1. Ensure specialty exists
    const specialtySlug = t.specialty.toLowerCase().replace(/\s+/g, '-');
    let specialty = await prisma.specialty.findUnique({
      where: { slug: specialtySlug }
    });

    if (!specialty) {
      specialty = await prisma.specialty.create({
        data: {
          name: t.specialty,
          slug: specialtySlug,
          description: `Specialized care in ${t.specialty}`
        }
      });
      console.log(`Created specialty: ${t.specialty}`);
    }

    // 2. Ensure treatment exists
    const treatment = await prisma.treatment.upsert({
      where: { slug: t.slug },
      update: {
        name: t.name,
        description: t.description,
        minEstimate: t.minEstimate,
        maxEstimate: t.maxEstimate,
        recovery: t.recoveryTime,
        specialtyId: specialty.id,
      },
      create: {
        slug: t.slug,
        name: t.name,
        description: t.description,
        minEstimate: t.minEstimate,
        maxEstimate: t.maxEstimate,
        recovery: t.recoveryTime,
        specialtyId: specialty.id,
      }
    });
    console.log(`Upserted treatment: ${treatment.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
