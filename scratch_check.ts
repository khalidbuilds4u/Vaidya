import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const doctor = await prisma.doctor.findFirst({
    where: { name: { contains: 'Hitesh' } }
  });
  console.log("Biography:", doctor?.biography);
}
main().finally(() => prisma.$disconnect());
