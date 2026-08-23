const { prisma } = require('./src/lib/prisma.ts');

async function main() {
  const hospitals = await prisma.hospital.findMany({
    take: 5,
    select: { id: true, accreditations: true, internationalServices: true }
  });
  console.log(JSON.stringify(hospitals, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
