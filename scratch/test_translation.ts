import { extractTreatmentData } from './src/app/actions/treatmentActions';
import { prisma } from './src/lib/prisma';
import { translateText, buildTranslations } from './src/lib/translator';

async function testTranslation() {
  console.log("Testing individual translation...");
  const text = await translateText("Robotic Knee Replacement is an advanced surgical procedure.");
  console.log("Translated text:", text);
  
  console.log("Testing buildTranslations...");
  const translations = await buildTranslations({
    name: "Brain Tumor Surgery",
    description: "Surgical removal of a brain tumor.",
    risks: ["Infection", "Bleeding"]
  });
  console.log("Translations object:", JSON.stringify(translations, null, 2));
}

testTranslation().catch(console.error);
