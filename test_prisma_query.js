const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Testing query on port 6543...");
  const users = await prisma.user.findMany({ take: 1 });
  console.log("Query success! Users:", users.length);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error("Query failed:", e);
  process.exit(1);
});
