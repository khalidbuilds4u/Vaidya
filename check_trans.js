require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dr = await prisma.doctor.findFirst({ where: { slug: 'dr-devi-shetty' }, select: { slug: true, translations: true, specialty: { select: { translations: true } } } });
  console.log('Devi Shetty Translations:', JSON.stringify(dr.translations, null, 2));
  console.log('Specialty Translations:', JSON.stringify(dr.specialty.translations, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
