import { prisma } from './src/lib/prisma';

async function main() {
  const dr = await prisma.doctor.findFirst({ where: { slug: 'dr-viney-jetley' } });
  console.log('Viney:', JSON.stringify(dr.translations, null, 2));
  
  const dr2 = await prisma.doctor.findFirst({ where: { slug: 'dr-hitesh-garg' } });
  console.log('Hitesh:', JSON.stringify(dr2.translations, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
