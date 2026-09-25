import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import { buildTranslations } from './src/lib/translator';

async function main() {
  console.log("Translating Treatments (all fields)...");
  const treatments = await prisma.treatment.findMany();
  for (const t of treatments) {
    console.log("Treatment:", t.name);
    
    // Convert faqs array to an array of strings to translate properly, or stringify.
    // Wait, buildTranslations can handle arrays! If faqs is an array of objects, we can't just pass it to buildTranslations.
    // If t.faqs is [{question: '...', answer: '...'}], we should stringify it, translate it as a single block of JSON string?
    // GPT-4o-mini might handle JSON strings well. Or we can just extract questions and answers.
    
    const faqsArray = t.faqs ? (Array.isArray(t.faqs) ? t.faqs : []) : [];
    
    const trans = await buildTranslations({ 
      name: t.name, 
      description: t.description || '',
      overview: t.overview || '',
      recovery: t.recovery || '',
      causesAndSymptoms: t.causesAndSymptoms && t.causesAndSymptoms.length > 0 ? t.causesAndSymptoms : undefined,
      diagnosis: t.diagnosis && t.diagnosis.length > 0 ? t.diagnosis : undefined,
      preOpPrep: t.preOpPrep && t.preOpPrep.length > 0 ? t.preOpPrep : undefined,
      postOpCare: t.postOpCare && t.postOpCare.length > 0 ? t.postOpCare : undefined,
      procedureDetails: t.procedureDetails && t.procedureDetails.length > 0 ? t.procedureDetails : undefined,
      risks: t.risks || '',
      faqs: t.faqs ? JSON.stringify(t.faqs) : undefined,
    }, t.translations);
    
    await prisma.treatment.update({ where: { id: t.id }, data: { translations: trans } });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
