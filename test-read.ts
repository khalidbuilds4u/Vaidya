import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function main() {
  const t = await prisma.treatment.findFirst({where: {slug: 'knee-replacement-surgery'}});
  console.log("DB FAQs:", t?.faqs);
  console.log("Translated Bengali FAQs:", t?.translations?.bn?.faqs);
}

main().finally(() => prisma.$disconnect());
