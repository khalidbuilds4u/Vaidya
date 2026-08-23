const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({
  connectionString: "postgresql://postgres.hfpioqsydwrwfinhbbcd:Asad%40tourism2026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing Prisma adapter on 6543...");
  const users = await prisma.user.findMany({ take: 1 });
  console.log("Query success! Users:", users.length);
  await prisma.$disconnect();
  pool.end();
}

main().catch(e => {
  console.error("Query failed:", e);
  process.exit(1);
});
