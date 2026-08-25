import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const doctor = await prisma.doctor.findFirst({
    where: { slug: { contains: 'dr-viney' } }
  })
  console.log(JSON.stringify(doctor?.translations, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
