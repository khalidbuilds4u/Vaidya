require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dr = await prisma.doctor.findFirst({ where: { slug: 'dr-viney-jetley' }, select: { slug: true, translations: true } });
  console.log('Viney:', JSON.stringify(dr.translations, null, 2));
  
  const dr2 = await prisma.doctor.findFirst({ where: { slug: 'dr-hitesh-garg' }, select: { slug: true, translations: true } });
  console.log('Hitesh:', JSON.stringify(dr2.translations, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
