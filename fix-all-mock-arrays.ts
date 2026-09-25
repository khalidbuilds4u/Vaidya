import 'dotenv/config';
import { translateText } from './src/lib/translator';
import * as fs from 'fs';

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enMockArrays = en.TreatmentDetail.mockArrays;

// All string arrays we need to translate (exclude faqs which we already did)
const arraysToTranslate: Record<string, string[]> = {
  causesAndSymptoms: enMockArrays.causesAndSymptoms,
  diagnosis: enMockArrays.diagnosis,
  preOpPrep: enMockArrays.preOpPrep,
  postOpCare: enMockArrays.postOpCare,
  procedureDetails: enMockArrays.procedureDetails,
  risks: enMockArrays.risks,
};

const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

async function translateArray(items: string[], lang: string): Promise<string[]> {
  const results: string[] = [];
  for (const item of items) {
    const translated = await translateText(item, lang);
    results.push(translated || item);
    await new Promise(r => setTimeout(r, 150));
  }
  return results;
}

async function main() {
  for (const lang of locales) {
    console.log(`\nTranslating mockArrays for ${lang}...`);
    const filePath = `messages/${lang}.json`;
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const [key, items] of Object.entries(arraysToTranslate)) {
      console.log(`  Translating ${key}...`);
      const translated = await translateArray(items, lang);
      content.TreatmentDetail.mockArrays[key] = translated;
      console.log(`  ✓ ${key}: ${JSON.stringify(translated[0].substring(0, 40))}...`);
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }

  console.log('\nAll done!');
}

main().catch(console.error);
