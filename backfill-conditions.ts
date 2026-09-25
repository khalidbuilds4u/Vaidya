import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import { buildTranslations } from './src/lib/translator';

async function main() {
  console.log("Translating Conditions...");
  const conditions = await prisma.condition.findMany();
  for (const c of conditions) {
    console.log("Condition:", c.name);
    const trans = await buildTranslations({ name: c.name, description: c.description || '' }, c.translations);
    await prisma.condition.update({ where: { id: c.id }, data: { translations: trans } });
  }

  console.log("Translating Treatments...");
  const treatments = await prisma.treatment.findMany();
  for (const t of treatments) {
    console.log("Treatment:", t.name);
    const trans = await buildTranslations({ 
      name: t.name, 
      description: t.description || '',
    }, t.translations);
    await prisma.treatment.update({ where: { id: t.id }, data: { translations: trans } });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
