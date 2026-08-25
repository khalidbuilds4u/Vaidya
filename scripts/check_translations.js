const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkTranslations() {
  const doctor = await prisma.doctor.findUnique({
    where: { slug: 'dr-hitesh-garg-1787657727224' },
    select: {
      name: true,
      translations: true,
      biography: true
    }
  });

  console.log(JSON.stringify(doctor, null, 2));
}

checkTranslations().catch(console.error).finally(() => prisma.$disconnect());
